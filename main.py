import os
import json
import hmac
import hashlib
from urllib.parse import unquote, parse_qs
from flask import Flask, request, jsonify
from telegram import Bot
import asyncio

# --- Конфигурация ---
# КРИТИЧЕСКИ ВАЖНО: Получаем токен бота из переменных окружения для безопасности.
# Никогда не храните токен прямо в коде!
BOT_TOKEN = os.environ.get('BOT_TOKEN')
if not BOT_TOKEN:
    raise ValueError("Токен бота (BOT_TOKEN) не найден в переменных окружения.")

# Инициализация Flask приложения и Telegram бота
app = Flask(__name__)
bot = Bot(token=BOT_TOKEN)


# --- Безопасность: Валидация данных от Telegram WebApp ---
def is_valid_init_data(init_data: str, bot_token: str) -> (bool, dict):
    """
    Проверяет строку initData, полученную от Telegram WebApp.
    Возвращает кортеж: (являются ли данные валидными, словарь с данными пользователя).
    """
    try:
        # Разбираем строку запроса
        parsed_data = parse_qs(init_data)
        received_hash = parsed_data.pop('hash', [None])[0]

        if not received_hash:
            return False, {}

        # Формируем строку для проверки: все поля сортируются и объединяются.
        data_check_string = "\n".join(
            f"{k}={v[0]}" for k, v in sorted(parsed_data.items())
        )

        # Вычисляем секретный ключ на основе токена бота
        secret_key = hmac.new(
            "WebAppData".encode(), bot_token.encode(), hashlib.sha256
        ).digest()

        # Вычисляем хеш от строки данных
        calculated_hash = hmac.new(
            secret_key, data_check_string.encode(), hashlib.sha256
        ).hexdigest()

        # Сравниваем хеши. Если они совпадают, данные подлинные.
        if calculated_hash == received_hash:
            # Данные верны, возвращаем информацию о пользователе
            user_data = json.loads(unquote(parsed_data.get('user', ['{}'])[0]))
            return True, user_data
        
        return False, {}

    except Exception as e:
        print(f"Ошибка валидации: {e}")
        return False, {}


# --- API эндпоинт для обработки заказов ---
@app.route('/process-order', methods=['POST'])
def process_order():
    """
    Получает данные о заказе из WebApp, проверяет их
    и отправляет пользователю сообщение с подтверждением.
    """
    data = request.json
    init_data = data.get('initData')
    order_data = data.get('orderData')

    if not init_data or not order_data:
        return jsonify({"error": "initData or orderData is missing"}), 400

    # 1. Проверяем запрос, чтобы убедиться, что он действительно пришел от Telegram
    is_valid, user_data = is_valid_init_data(init_data, BOT_TOKEN)

    if not is_valid:
        return jsonify({"error": "initData is invalid"}), 403

    # 2. Обрабатываем заказ
    try:
        user_id = user_data.get('id')
        user_name = user_data.get('first_name', 'Уважаемый клиент')
        
        items = order_data.get('items', {})
        total = order_data.get('total', 0)

        # ВАЖНО: Это "заглушка" с названиями товаров.
        # В реальном приложении вы должны получать названия из вашей базы данных по ID.
        product_names = {
            1: "Классическое козье молоко",
            2: "Овсянка и мед",
            3: "Лавандовое спокойствие",
            4: "Угольный детокс"
        }

        # 3. Формируем сообщение для подтверждения заказа
        message_lines = [
            f"🎉 Спасибо, {user_name}! Ваш заказ принят.",
            "---",
            "Детали заказа:",
        ]

        for product_id, quantity in items.items():
            # Ключ из JS будет строкой, преобразуем в число
            product_id_int = int(product_id)
            name = product_names.get(product_id_int, f"Товар #{product_id_int}")
            message_lines.append(f"• {name} x {quantity}")
        
        message_lines.append("---")
        message_lines.append(f"Итого: {total} RSD")
        message_lines.append("\nМы скоро свяжемся с вами для уточнения деталей доставки.")
        
        final_message = "\n".join(message_lines)
        # 4. Отправляем сообщение пользователю через бота
        # Используем asyncio для асинхронной отправки
        async def send_confirmation():
            await bot.send_message(
                chat_id=user_id,
                text=final_message,
                parse_mode='Markdown'
            )
        
        asyncio.run(send_confirmation())
        
        # 5. Отправляем успешный ответ в WebApp
        return jsonify({"status": "success", "message": "Заказ обработан"}), 200

    except Exception as e:
        print(f"Ошибка при обработке заказа: {e}")
        return jsonify({"error": "Internal error"}), 500

# Этот блок нужен для локального тестирования. На хостинге будет использоваться Gunicorn.
# if __name__ == 'main':
    # app.run(debug=True, port=5001)
