import os
import json
import hmac
import hashlib
from urllib.parse import unquote, parse_qs
from flask import Flask, request, jsonify, send_from_directory
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

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/process-order', methods=['POST'])
def process_order():
    # Логика обработки заказа (ваша версия здесь)
    return jsonify({"status": "success"})

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
    data = request.json
    init_data = data.get('initData')
    order_data = data.get('orderData')

    if not init_data or not order_data:
        return jsonify({"error": "initData or orderData is missing"}), 400

    is_valid, user_data = is_valid_init_data(init_data, BOT_TOKEN)

    if not is_valid:
        return jsonify({"error": "initData is invalid"}), 403

    try:
        user_id = user_data.get('id')
        user_name = user_data.get('first_name', 'Уважаемый клиент')

        items = order_data.get('items', {})
        total = order_data.get('total', 0)

        product_names = {
            1: "Классическое козье молоко",
            2: "Овсянка и мед",
            3: "Лавандовое спокойствие",
            4: "Угольный детокс"
        }

        message_lines = [
            f"🎉 Спасибо, {user_name}! Ваш заказ принят.",
            "---",
            "Детали заказа:"
        ]

        for product_id, quantity in items.items():
            pid = int(product_id)
            name = product_names.get(pid, f"Товар #{pid}")
            message_lines.append(f"• {name} x {quantity}")

        message_lines.append("---")
        message_lines.append(f"Итого: {total} RSD")
        message_lines.append("Мы скоро свяжемся с вами для уточнения доставки.")

        final_message = "\n".join(message_lines)

        async def send_confirmation():
            await bot.send_message(chat_id=user_id, text=final_message)

        # Асинхронный вызов без конфликта с Flask event loop
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(send_confirmation())
        loop.close()

        return jsonify({"status": "success", "message": "Заказ успешно размещён!"}), 200

    except Exception as e:
        print(f"[Ошибка сервера при заказе]: {e}")
        return jsonify({"error": "Internal server error"}), 500

# Этот блок нужен для локального тестирования. На хостинге будет использоваться Gunicorn.
# if __name__ == 'main':
    # app.run(debug=True, port=5001)
