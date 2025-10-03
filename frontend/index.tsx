/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Type } from "@google/genai";

// FIX: Moved `declare global` to the top of the file. Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. Adding `export {}` at the end of the file makes it a module. This resolves errors related to `window.Telegram`.
declare global {
  interface Window {
    Telegram: any;
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// --- I18N (Internationalization) ---
type Language = 'en' | 'sr' | 'ru';

const translations = {
  en: {
    shopTitle: "Bela Zora Sapun",
    navHome: "Home",
    navNews: "News",
    navCatalog: "Catalog",
    navPromotions: "Promotions",
    navProfile: "Profile",
    navAdmin: "Admin",
    addToCart: "Add to Cart",
    inCart: "In Cart",
    cartTitle: "Your Shopping Cart",
    emptyCartHeader: "Your Cart is Empty",
    emptyCartMessage: "Looks like you haven't added any soap yet.",
    continueShopping: "Continue Shopping",
    checkout: "Checkout",
    processing: "Processing...",
    total: "Total",
    newsTitle: "News & Updates",
    promotionsTitle: "Special Offers",
    profileTitle: "My Profile",
    personalInfo: "Personal Information",
    name: "Name",
    email: "Email",
    orderHistory: "Order History",
    order: "Order",
    date: "Date",
    viewingCart: (count: number) => `View shopping cart, ${count} items`,
    adminTitle: "Admin Panel",
    adminWelcome: "Welcome, Administrator!",
    popularProducts: "Popular Products",
    latestNews: "Latest News",
    ourOffer: "Our Offer",
    salesStatistics: "Sales Statistics",
    startDate: "Start Date",
    endDate: "End Date",
    generateReport: "Generate Report",
    totalSold: "Total Sold",
    manageNews: "Manage News",
    addNews: "Add News Item",
    updateNews: "Update News Item",
    newsDate: "Date",
    titleLabel: "Title",
    contentLabel: "Content",
    managePromotions: "Manage Promotions",
    addPromotion: "Add Promotion",
    updatePromotion: "Update Promotion",
    delete: "Delete",
    manageProducts: "Manage Products",
    addProduct: "Add Product",
    nameLabel: "Product Name",
    descriptionLabel: "Description",
    priceLabel: "Price (RSD)",
    imageLabel: "Product Image",
    chooseFile: "Choose a file...",
    categoryLabel: "Category",
    pieces: "pcs.",
    edit: "Edit",
    updateProduct: "Update Product",
    cancel: "Cancel",
    voiceListening: "Listening...",
    voiceHeard: (command: string) => `Heard: "${command}"`,
    voiceCommandSuccess: (command: string) => `Executed: ${command}`,
    voiceCommandUnknown: "Unknown command.",
    translate: "Translate from English",
    reviews: "Reviews",
    noReviews: "No reviews yet.",
    averageRating: "Average Rating",
    submitReview: "Submit Your Review",
    yourRating: "Your Rating",
    reviewTitleLabel: "Review Title",
    yourCommentLabel: "Your Comment",
    submit: "Submit",
    reviewSubmitted: "Thank you! Your review has been submitted for moderation.",
    close: "Close",
    manageReviews: "Manage Reviews",
    pendingReviews: "Pending Reviews",
    approve: "Approve",
    reject: "Reject",
    generalSettings: "General Settings",
    uploadLogo: "Upload Logo",
    currentLogo: "Current Logo",
    uploadBanner: "Upload Home Banner",
    currentBanner: "Current Banner",
    manageNotifications: "Manage Notifications",
    orderStatusNotifications: "Order Status Notifications",
    enableNotificationsFor: "Enable notifications for the following order statuses:",
    statusProcessing: "Processing",
    statusShipped: "Shipped",
    statusDelivered: "Delivered",
    notificationTemplate: "Notification Template",
    templatePlaceholderInfo: "Use {order_id} and {customer_name} as placeholders.",
    saveSettings: "Save Settings",
    promotionalNotifications: "Promotional Notifications",
    composeAndSend: "Compose and Send",
    messageTitle: "Message Title",
    messageContent: "Message Content",
    sendNotification: "Send Notification",
    sentNotificationsHistory: "Sent Notifications History",
    noNotificationsSent: "No promotional notifications have been sent yet.",
    confirmSend: "Are you sure you want to send this notification to all users?",
    notificationSentSuccess: "Notification sent successfully!",
  },
  sr: {
    shopTitle: "Бела Зора Сапун",
    navHome: "Почетна",
    navNews: "Вести",
    navCatalog: "Каталог",
    navPromotions: "Промоције",
    navProfile: "Профил",
    navAdmin: "Админ",
    addToCart: "Додај у корпу",
    inCart: "У корпи",
    cartTitle: "Ваша корпа",
    emptyCartHeader: "Ваша корпа је празна",
    emptyCartMessage: "Изгледа да још нисте додали ниједан сапун.",
    continueShopping: "Наставите куповину",
    checkout: "Плаћање",
    processing: "Обрада...",
    total: "Укупно",
    newsTitle: "Вести и новости",
    promotionsTitle: "Посебне понуде",
    profileTitle: "Мој профил",
    personalInfo: "Лични подаци",
    name: "Име",
    email: "Е-пошта",
    orderHistory: "Историја наруџбина",
    order: "Наруџбина",
    date: "Датум",
    viewingCart: (count: number) => `Погледајте корпу, ${count} артикала`,
    adminTitle: "Админ панел",
    adminWelcome: "Добродошли, администраторе!",
    popularProducts: "Популарни производи",
    latestNews: "Најновије вести",
    ourOffer: "Наша понуда",
    salesStatistics: "Статистика продаје",
    startDate: "Почетни датум",
    endDate: "Крајњи датум",
    generateReport: "Генериши извештај",
    totalSold: "Укупно продато",
    manageNews: "Управљање вестима",
    addNews: "Додај вест",
    updateNews: "Ажурирај вест",
    newsDate: "Датум",
    titleLabel: "Наслов",
    contentLabel: "Садржај",
    managePromotions: "Управљање промоцијама",
    addPromotion: "Додај промоцију",
    updatePromotion: "Ажурирај промоцију",
    delete: "Обриши",
    manageProducts: "Управљање производима",
    addProduct: "Додај производ",
    nameLabel: "Назив производа",
    descriptionLabel: "Опис",
    priceLabel: "Цена (RSD)",
    imageLabel: "Слика производа",
    chooseFile: "Изаберите датотеку...",
    categoryLabel: "Категорија",
    pieces: "ком.",
    edit: "Измени",
    updateProduct: "Ажурирај производ",
    cancel: "Одустани",
    voiceListening: "Слушам...",
    voiceHeard: (command: string) => `Чуо сам: "${command}"`,
    voiceCommandSuccess: (command: string) => `Извршено: ${command}`,
    voiceCommandUnknown: "Непозната команда.",
    translate: "Преведи са енглеског",
    reviews: "Рецензије",
    noReviews: "Још нема рецензија.",
    averageRating: "Просечна оцена",
    submitReview: "Пошаљите своју рецензију",
    yourRating: "Ваша оцена",
    reviewTitleLabel: "Наслов рецензије",
    yourCommentLabel: "Ваш коментар",
    submit: "Пошаљи",
    reviewSubmitted: "Хвала! Ваша рецензија је послата на модерацију.",
    close: "Затвори",
    manageReviews: "Управљање рецензијама",
    pendingReviews: "Рецензије на чекању",
    approve: "Одобри",
    reject: "Одбиј",
    generalSettings: "Општа подешавања",
    uploadLogo: "Отпреми лого",
    currentLogo: "Тренутни лого",
    uploadBanner: "Отпреми банер",
    currentBanner: "Тренутни банер",
    manageNotifications: "Управљање обавештењима",
    orderStatusNotifications: "Обавештења о статусу поруџбине",
    enableNotificationsFor: "Омогући обавештења за следеће статусе поруџбине:",
    statusProcessing: "Обрада",
    statusShipped: "Послато",
    statusDelivered: "Испоручено",
    notificationTemplate: "Шаблон обавештења",
    templatePlaceholderInfo: "Користите {order_id} и {customer_name} као чуваре места.",
    saveSettings: "Сачувај подешавања",
    promotionalNotifications: "Промотивна обавештења",
    composeAndSend: "Састави и пошаљи",
    messageTitle: "Наслов поруке",
    messageContent: "Садржај поруке",
    sendNotification: "Пошаљи обавештење",
    sentNotificationsHistory: "Историја послатих обавештења",
    noNotificationsSent: "Још увек нису послата промотивна обавештења.",
    confirmSend: "Да ли сте сигурни да желите да пошаљете ово обавештење свим корисницима?",
    notificationSentSuccess: "Обавештење је успешно послато!",
  },
  ru: {
    shopTitle: "Бела Зора Сапун",
    navHome: "Главная",
    navNews: "Новости",
    navCatalog: "Каталог",
    navPromotions: "Акции",
    navProfile: "Профиль",
    navAdmin: "Админ",
    addToCart: "В корзину",
    inCart: "В корзине",
    cartTitle: "Ваша корзина",
    emptyCartHeader: "Ваша корзина пуста",
    emptyCartMessage: "Похоже, вы еще не добавили мыло.",
    continueShopping: "Продолжить покупки",
    checkout: "Оформить заказ",
    processing: "Обработка...",
    total: "Итого",
    newsTitle: "Новости и обновления",
    promotionsTitle: "Специальные предложения",
    profileTitle: "Мой профиль",
    personalInfo: "Личная информация",
    name: "Имя",
    email: "Эл. почта",
    orderHistory: "История заказов",
    order: "Заказ",
    date: "Дата",
    viewingCart: (count: number) => `Посмотреть корзину, ${count} товаров`,
    adminTitle: "Панель администратора",
    adminWelcome: "Добро пожаловать, администратор!",
    popularProducts: "Популярные товары",
    latestNews: "Последние новости",
    ourOffer: "Наше предложение",
    salesStatistics: "Статистика продаж",
    startDate: "Дата начала",
    endDate: "Дата окончания",
    generateReport: "Создать отчет",
    totalSold: "Всего продано",
    manageNews: "Управление новостями",
    addNews: "Добавить новость",
    updateNews: "Обновить новость",
    newsDate: "Дата",
    titleLabel: "Заголовок",
    contentLabel: "Содержание",
    managePromotions: "Управление акциями",
    addPromotion: "Добавить акцию",
    updatePromotion: "Обновить акцию",
    delete: "Удалить",
    manageProducts: "Управление товарами",
    addProduct: "Добавить товар",
    nameLabel: "Название товара",
    descriptionLabel: "Описание",
    priceLabel: "Цена (RSD)",
    imageLabel: "Изображение товара",
    chooseFile: "Выберите файл...",
    categoryLabel: "Категория",
    pieces: "шт.",
    edit: "Изменить",
    updateProduct: "Обновить товар",
    cancel: "Отмена",
    voiceListening: "Слушаю...",
    voiceHeard: (command: string) => `Распознано: "${command}"`,
    voiceCommandSuccess: (command: string) => `Выполнено: ${command}`,
    voiceCommandUnknown: "Неизвестная команда.",
    translate: "Перевести с английского",
    reviews: "Отзывы",
    noReviews: "Отзывов пока нет.",
    averageRating: "Средний рейтинг",
    submitReview: "Оставить свой отзыв",
    yourRating: "Ваша оценка",
    reviewTitleLabel: "Заголовок отзыва",
    yourCommentLabel: "Ваш комментарий",
    submit: "Отправить",
    reviewSubmitted: "Спасибо! Ваш отзыв отправлен на модерацию.",
    close: "Закрыть",
    manageReviews: "Управление отзывами",
    pendingReviews: "Ожидающие отзывы",
    approve: "Одобрить",
    reject: "Отклонить",
    generalSettings: "Общие настройки",
    uploadLogo: "Загрузить логотип",
    currentLogo: "Текущий логотип",
    uploadBanner: "Загрузить баннер",
    currentBanner: "Текущий баннер",
    manageNotifications: "Управление уведомлениями",
    orderStatusNotifications: "Уведомления о статусе заказа",
    enableNotificationsFor: "Включить уведомления для следующих статусов заказа:",
    statusProcessing: "В обработке",
    statusShipped: "Отправлено",
    statusDelivered: "Доставлено",
    notificationTemplate: "Шаблон уведомления",
    templatePlaceholderInfo: "Используйте {order_id} и {customer_name} в качестве плейсхолдеров.",
    saveSettings: "Сохранить настройки",
    promotionalNotifications: "Рекламные уведомления",
    composeAndSend: "Создать и отправить",
    messageTitle: "Заголовок сообщения",
    messageContent: "Содержание сообщения",
    sendNotification: "Отправить уведомление",
    sentNotificationsHistory: "История отправленных уведомлений",
    noNotificationsSent: "Рекламные уведомления еще не отправлялись.",
    confirmSend: "Вы уверены, что хотите отправить это уведомление всем пользователям?",
    notificationSentSuccess: "Уведомление успешно отправлено!",
  }
};


// --- DATA INTERFACES & INITIAL DATA ---
interface Product {
  id: number;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  price: number;
  image: string;
  category: { [key in Language]: string };
}
interface NewsItem {
    id: number;
    date: string;
    title: { [key in Language]: string };
    content: { [key in Language]: string };
}
interface Promotion {
    id: number;
    title: { [key in Language]: string };
    content: { [key in Language]: string };
}
interface Review {
    id: number;
    productId: number;
    author: string;
    rating: number;
    title: { [key in Language]: string };
    content: { [key in Language]: string };
    status: 'pending' | 'approved' | 'rejected';
}
interface OrderStatusNotificationSettings {
    [key: string]: {
        enabled: boolean;
        templates: { [key in Language]: string };
    };
}
interface PromotionalNotification {
    id: number;
    date: string;
    title: { [key in Language]: string };
    content: { [key in Language]: string };
}
interface UserProfile {
    name: string;
    email: string;
    orderHistory: { id: string; date: string; total: number }[];
}

// FIX: Removed redundant global `translateText` function and `click`/`submit` event listeners.
// These were causing scope errors as they tried to access `ai` and `setState` from outside the `App` component.
// The functionality is already correctly implemented inside the `App` component's event listeners and handlers,
// which also use the correct, up-to-date Gemini API.

const categories: { key: string; name: { [key in Language]: string } }[] = [
    { key: 'All', name: { en: 'All', sr: 'Све', ru: 'Все' } },
    { key: 'Classic', name: { en: 'Classic', sr: 'Класични', ru: 'Классика' } },
    { key: 'Herbal', name: { en: 'Herbal', sr: 'Биљни', ru: 'Травы' } },
    { key: 'Exfoliating', name: { en: 'Exfoliating', sr: 'Пилинг', ru: 'Пилинг' } },
    { key: 'Detox', name: { en: 'Detox', sr: 'Детокс', ru: 'Детокс' } },
];

const initialProducts: Product[] = [
  {
    id: 1,
    name: { en: "Classic Goat's Milk", sr: "Класично козје млеко", ru: "Классическое козье молоко" },
    description: { 
      en: "Pure and simple. The original recipe for sensitive skin, incredibly moisturizing and gentle.",
      sr: "Чисто и једноставно. Оригинални рецепт за осетљиву кожу, невероватно хидратантан и нежан.",
      ru: "Чистота и простота. Оригинальный рецепт для чувствительной кожи, невероятно увлажняющий и нежный."
    },
    price: 900,
    image: "https://placehold.co/300x300/f5f5dc/333333?text=Classic",
    category: { en: "Classic", sr: "Класични", ru: "Классика" }
  },
  {
    id: 2,
    name: { en: "Oatmeal & Honey", sr: "Овсена каша и мед", ru: "Овсянка и мед" },
    description: { 
      en: "A soothing blend with colloidal oatmeal to gently exfoliate and raw honey to nourish the skin.",
      sr: "Умирујућа мешавина са колоидном овсеном кашом за нежан пилинг и сировим медом за исхрану коже.",
      ru: "Успокаивающая смесь с коллоидной овсянкой для нежного отшелушивания и сырым медом для питания кожи."
    },
    price: 1000,
    image: "https://placehold.co/300x300/deb887/333333?text=Oatmeal",
    category: { en: "Exfoliating", sr: "Пилинг", ru: "Пилинг" }
  },
  {
    id: 3,
    name: { en: "Lavender Calm", sr: "Умирујућа лаванда", ru: "Лавандовое спокойствие" },
    description: { 
      en: "Infused with pure lavender essential oil for a calming aroma that relaxes the mind and body.",
      sr: "Обогаћено чистим есенцијалним уљем лаванде за умирујућу арому која опушта ум и тело.",
      ru: "Насыщено чистым эфирным маслом лаванды для успокаивающего аромата, расслабляющего ум и тело."
    },
    price: 1050,
    image: "https://placehold.co/300x300/e6e6fa/333333?text=Lavender",
    category: { en: "Herbal", sr: "Биљни", ru: "Травы" }
  },
   {
    id: 4,
    name: { en: "Charcoal Detox", sr: "Детокс са угљем", ru: "Угольный детокс" },
    description: { 
      en: "Activated charcoal helps draw out impurities, leaving your skin feeling fresh and deeply cleansed.",
      sr: "Активни угаљ помаже у извлачењу нечистоћа, остављајући вашу кожу свежом и дубински очишћеном.",
      ru: "Активированный уголь помогает выводить загрязнения, оставляя кожу свежей и глубоко очищенной."
    },
    price: 1050,
    image: "https://placehold.co/300x300/696969/ffffff?text=Charcoal",
    category: { en: "Detox", sr: "Детокс", ru: "Детокс" }
  },
];

const initialNewsItems: NewsItem[] = [
    { 
        id: 1,
        date: "2024-07-10",
        title: {en: "New Summer Collection!", sr: "Нова летња колекција!", ru: "Новая летняя коллекция!"},
        content: {en: "We're excited to launch our new summer-inspired soap line.", sr: "Узбуђени смо што представљамо нашу нову линију сапуна инспирисану летом.", ru: "Мы рады представить нашу новую линию мыла, вдохновленную летом."}
    },
];

const initialPromotions: Promotion[] = [
    {
        id: 1,
        title: {en: "Free Shipping on orders over 5500 RSD", sr: "Бесплатна достава за наруџбине преко 5500 дин", ru: "Бесплатная доставка при заказе свыше 5500 RSD"},
        content: {en: "Get your favorite soaps delivered to your door at no cost.", sr: "Набавите своје омиљене сапуне на кућну адресу без трошкова доставе.", ru: "Получите свои любимые мыла с доставкой на дом бесплатно."}
    }
];

const initialReviews: Review[] = [
    { id: 1, productId: 1, author: "Marko M.", rating: 5, title: { en: "The Best!", sr: "Најбоље!", ru: "Лучшее!" }, content: { en: "My skin has never felt better. So gentle and moisturizing.", sr: "Моја кожа се никад није осећала боље. Тако нежно и хидратантно.", ru: "Моя кожа никогда не чувствовала себя лучше. Такое нежное и увлажняющее." }, status: 'approved' },
    { id: 2, productId: 3, author: "Jelena P.", rating: 5, title: { en: "So relaxing", sr: "Тако опуштајуће", ru: "Так расслабляет" }, content: { en: "The lavender scent is perfect for an evening shower. I love it.", sr: "Мирис лаванде је савршен за вечерње туширање. Обожавам га.", ru: "Аромат лаванды идеален для вечернего душа. Я в восторге." }, status: 'approved' },
    { id: 3, productId: 2, author: "Ivan K.", rating: 4, title: { en: "Great for sensitive skin", sr: "Одлично за осетљиву кожу", ru: "Отлично для чувствительной кожи" }, content: { en: "Gently exfoliates without irritation. Will buy again.", sr: "Нежно врши пилинг без иритације. Купићу поново.", ru: "Нежно отшелушивает без раздражения. Куплю еще." }, status: 'approved' },
    { id: 4, productId: 1, author: "Anonymous", rating: 5, title: { en: "Wonderful Soap", sr: "Диван сапун", ru: "Замечательное мыло" }, content: { en: "I want to try all of them now!", sr: "Сада желим да их све испробам!", ru: "Теперь хочу попробовать все!" }, status: 'pending' },
];

const salesHistory = [
    { productId: 2, date: '2024-05-02', quantity: 3 }, { productId: 3, date: '2024-05-05', quantity: 2 }, { productId: 1, date: '2024-05-08', quantity: 5 }, { productId: 4, date: '2024-05-12', quantity: 1 }, { productId: 2, date: '2024-05-20', quantity: 2 }, { productId: 3, date: '2024-05-28', quantity: 4 },
    { productId: 3, date: '2024-06-01', quantity: 5 }, { productId: 1, date: '2024-06-04', quantity: 3 }, { productId: 4, date: '2024-06-10', quantity: 2 }, { productId: 2, date: '2024-06-15', quantity: 4 }, { productId: 3, date: '2024-06-22', quantity: 3 }, { productId: 1, date: '2024-06-29', quantity: 2 },
    { productId: 1, date: '2024-07-03', quantity: 4 }, { productId: 2, date: '2024-07-05', quantity: 1 }, { productId: 4, date: '2024-07-08', quantity: 3 }, { productId: 3, date: '2024-07-11', quantity: 6 }, { productId: 2, date: '2024-07-15', quantity: 3 }, { productId: 1, date: '2024-07-21', quantity: 1 },
];

const initialUserProfile: UserProfile = {
    name: "Ana Petrović",
    email: "ana.petrovic@email.com",
    orderHistory: [
        { id: "1024", date: "2024-06-20", total: 1950 },
        { id: "1011", date: "2024-05-15", total: 2800 }
    ]
};

// --- HELPERS ---
const loadFromStorage = <T,>(key: string, fallback: T): T => {
    const stored = localStorage.getItem(key);
    try {
        return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
        console.error(`Failed to parse ${key} from localStorage`, e);
        localStorage.removeItem(key);
        return fallback;
    }
};

const saveToStorage = <T,>(key: string, data: T) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Failed to save ${key} to localStorage`, e);
    }
};

const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};


// --- STATE MANAGEMENT (REFACTORED) ---
type View = 'home' | 'catalog' | 'cart' | 'news' | 'promotions' | 'profile' | 'admin';
type UserRole = 'user' | 'admin';
type SalesReportItem = { productId: number; name: { [key in Language]: string }; totalQuantity: number; };
type Cart = { [productId: number]: number };

// Define the shape of our global state
interface AppState {
    language: Language;
    role: UserRole;
    view: View;
    selectedCategory: string;
    cart: Cart;
    products: Product[];
    newsItems: NewsItem[];
    promotions: Promotion[];
    reviews: Review[];
    logoUrl: string;
    bannerUrl: string;
    orderStatusNotifSettings: OrderStatusNotificationSettings;
    promoNotifHistory: PromotionalNotification[];
    userProfile: UserProfile;
    activeProductReviews: Product | null;
    isEditingProfile: boolean;
    startDate: string;
    endDate: string;
    salesReport: SalesReportItem[] | null;
    editingProduct: Product | null;
    newProductImage: string | null;
    editingNewsItem: NewsItem | null;
    editingPromotion: Promotion | null;
    isListening: boolean;
    voiceFeedback: string | null;
    isTranslatingName: boolean;
    isTranslatingDesc: boolean;
}

// A single global state object with initial values.
const state: AppState = {
    language: 'en',
    role: 'user',
    view: 'home',
    selectedCategory: 'All',
    cart: {},
    products: initialProducts,
    newsItems: initialNewsItems,
    promotions: initialPromotions,
    reviews: initialReviews,
    logoUrl: "https://placehold.co/200x50/3d3d3d/fdfcf9?text=Bela+Zora",
    bannerUrl: "https://placehold.co/800x400/a3b18a/fdfcf9?text=Bela+Zora+Sapun",
    orderStatusNotifSettings: {
        processing: { enabled: true, templates: { en: "Hi {customer_name}, your order #{order_id} is now being processed.", sr: "Здраво {customer_name}, ваша поруџбина #{order_id} се сада обрађује.", ru: "Здравствуйте, {customer_name}, ваш заказ #{order_id} сейчас обрабатывается." }},
        shipped: { enabled: true, templates: { en: "Good news, {customer_name}! Your order #{order_id} has been shipped.", sr: "Добре вести, {customer_name}! Ваша поруџбина #{order_id} је послата.", ru: "Хорошие новости, {customer_name}! Ваш заказ #{order_id} отправлен." }},
        delivered: { enabled: false, templates: { en: "Your order #{order_id} has been delivered. We hope you enjoy your products!", sr: "Ваша поруџбина #{order_id} је испоручена. Надамо се да ћете уживати у нашим производима!", ru: "Ваш заказ #{order_id} доставлен. Надеемся, вам понравятся наши продукты!" }}
    },
    promoNotifHistory: [],
    userProfile: initialUserProfile,
    activeProductReviews: null,
    isEditingProfile: false,
    startDate: '2024-05-01',
    endDate: '2024-07-31',
    salesReport: null,
    editingProduct: null,
    newProductImage: null,
    editingNewsItem: null,
    editingPromotion: null,
    isListening: false,
    voiceFeedback: null,
    isTranslatingName: false,
    isTranslatingDesc: false,
};

// Define which keys are persisted to localStorage.
const persistedKeys = new Set<keyof AppState>([
    'products', 'newsItems', 'promotions', 'reviews', 'logoUrl', 'bannerUrl', 
    'orderStatusNotifSettings', 'promoNotifHistory', 'userProfile', 'cart'
]);

// Load persisted state from localStorage on startup.
for (const key of persistedKeys) {
    const storedValue = loadFromStorage(`bela-zora-${key}`, state[key]);
    if (storedValue) {
        (state as any)[key] = storedValue;
    }
}

// --- MAIN APP COMPONENT ---
const App = () => {
  // FIX: Moved `setState` inside the `App` component to resolve the scope issue where `render` was not accessible.
  // This function updates the global state, persists relevant parts, and triggers a re-render.
  function setState(newState: Partial<AppState>) {
    Object.assign(state, newState);

    for (const key in newState) {
        if (persistedKeys.has(key as keyof AppState)) {
            saveToStorage(`bela-zora-${key}`, (newState as any)[key]);
        }
    }
    
    // Using a microtask to batch potential synchronous updates into a single render.
    queueMicrotask(render);
}

  // --- App Initialization ---
  if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
  }

  // Gemini API initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const t = (key: keyof typeof translations.en, ...args: any[]) => {
    const lang = state.language;
    const translation = translations[lang][key] || translations.en[key];
    if (typeof translation === 'function') {
      return (translation as (...args: any[]) => string)(...args);
    }
    return translation;
  };

  // --- CART LOGIC ---
  const cartButtonAnimation = () => {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.classList.add('updated');
        setTimeout(() => {
            cartBtn.classList.remove('updated');
        }, 400);
    }
  };

  const addToCart = (productId: number) => {
      const newCart = {...state.cart};
      newCart[productId] = (newCart[productId] || 0) + 1;
      setState({ cart: newCart });
      cartButtonAnimation();
  };

  const decrementCartItem = (productId: number) => {
      const newCart = {...state.cart};
      if (newCart[productId] && newCart[productId] > 1) {
          newCart[productId] -= 1;
      } else {
          delete newCart[productId];
      }
      setState({ cart: newCart });
  };

  const removeFromCart = (productId: number) => {
      const newCart = {...state.cart};
      if (newCart[productId]) {
          delete newCart[productId];
      }
      setState({ cart: newCart });
  };

  const getCartItemCount = () => {
    return Object.values(state.cart).reduce((sum, count) => sum + count, 0);
  };
  
  const getCartTotal = () => {
    return Object.entries(state.cart).reduce((total, [productId, quantity]) => {
      const product = state.products.find(p => p.id === parseInt(productId, 10));
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  // --- RENDERING ---
  const renderQuantityControl = (product: Product, type: 'small' | 'large' = 'large') => {
      const quantity = state.cart[product.id] || 0;
      const lang = state.language;
      
      if (quantity > 0) {
          return `
            <div class="quantity-control ${type === 'small' ? 'small' : ''}">
                <button class="quantity-btn" data-product-id="${product.id}" data-action="decrement" aria-label="Decrement quantity">-</button>
                <span class="quantity-display">${quantity}</span>
                <button class="quantity-btn" data-product-id="${product.id}" data-action="increment" aria-label="Increment quantity">+</button>
            </div>
          `;
      }
  
      if (type === 'small') {
          return `<button class="add-to-cart-btn-small" data-product-id="${product.id}" data-action="increment" aria-label="Add ${product.name[lang]} to cart">+</button>`;
      }
      return `<button class="add-to-cart-btn" data-product-id="${product.id}" data-action="increment">${t('addToCart')}</button>`;
  }
  
  const renderHeader = () => {
    const cartItemCount = getCartItemCount();
    return `
      <header>
        <img class="header-logo" src="${state.logoUrl}" alt="${t('shopTitle')} Logo">
        <div class="header-controls">
            <div class="lang-switcher">
                <select id="lang-select" aria-label="Choose language">
                    <option value="en" ${state.language === 'en' ? 'selected' : ''}>EN</option>
                    <option value="sr" ${state.language === 'sr' ? 'selected' : ''}>SR</option>
                    <option value="ru" ${state.language === 'ru' ? 'selected' : ''}>RU</option>
                </select>
            </div>
            <button class="cart-button" id="cart-btn" aria-label="${t('viewingCart', cartItemCount)}">
            <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
            </svg>
            ${cartItemCount > 0 ? `<span class="cart-count">${cartItemCount}</span>` : ''}
            </button>
        </div>
      </header>
    `;
  };

  const renderFooterNav = () => {
      const navItems: {view: View, label: string, icon: string}[] = [
          { view: 'home', label: t('navHome'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />' },
          { view: 'catalog', label: t('navCatalog'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l.383-1.437M7.5 14.25V5.106M7.5 14.25H3.375c-.621 0-1.125-.504-1.125-1.125V11.25m17.25-6.188L16.625 16.5h-1.25a2.25 2.25 0 0 1-2.25-2.25V5.106M9 12.75h9.075M12 12.75v-1.5a1.5 1.5 0 0 1 3 0v1.5" />'},
          { view: 'news', label: t('navNews'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />'},
          { view: 'promotions', label: t('navPromotions'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />' },
          { view: 'profile', label: t('navProfile'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />' }
      ];

      if (state.role === 'admin') {
          navItems.push({ view: 'admin', label: t('navAdmin'), icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" />' });
      }

      return `
        <nav class="footer-nav">
          ${navItems.map(item => `
            <button class="nav-button ${state.view === item.view ? 'active' : ''}" data-view="${item.view}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">${item.icon}</svg>
              <span>${item.label}</span>
            </button>
          `).join('')}
        </nav>
      `;
  }

  const renderHomePage = () => {
    const lang = state.language;
    const latestPromotion = [...state.promotions].sort((a,b) => b.id - a.id)[0];
    const latestNews = [...state.newsItems].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    const popularProducts = state.products.slice(0, 3); // Top 3 products

    return `
      <div class="home-header">
        <img src="${state.bannerUrl}" alt="Bela Zora Sapun natural soaps header image" class="home-header-img"/>
      </div>

      ${latestPromotion ? `
      <section class="home-section">
        <h2 class="home-section-title">${t('ourOffer')}</h2>
        <div class="content-card">
            <h3>${latestPromotion.title[lang]}</h3>
            <p>${latestPromotion.content[lang]}</p>
        </div>
      </section>
      ` : ''}
      
      <section class="home-section">
        <h2 class="home-section-title">${t('popularProducts')}</h2>
        <div class="popular-products-carousel">
            ${popularProducts.map(product => `
                <div class="popular-product-card">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${product.image}" alt="${product.name[lang]}" class="popular-product-image lazy-load" loading="lazy">
                    <div class="popular-product-info">
                        <h4>${product.name[lang]}</h4>
                        <div class="popular-product-footer">
                            <span class="popular-product-price">${product.price.toFixed(0)} RSD</span>
                            ${renderQuantityControl(product, 'small')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
      </section>

      ${latestNews ? `
      <section class="home-section">
        <h2 class="home-section-title">${t('latestNews')}</h2>
        <div class="content-card">
            <h3>${latestNews.title[lang]}</h3>
            <p class="date">${latestNews.date}</p>
            <p>${latestNews.content[lang]}</p>
        </div>
      </section>
      ` : ''}
    `;
  };
  
  const renderCatalogPage = () => {
    const lang = state.language;
    
    const categoryFilters = `
        <div class="category-filters">
            ${categories.map(cat => `
                <button class="category-btn ${state.selectedCategory === cat.key ? 'active' : ''}" data-category="${cat.key}">
                    ${cat.name[lang]}
                </button>
            `).join('')}
        </div>
    `;

    const filteredProducts = state.selectedCategory === 'All'
        ? state.products
        : state.products.filter(p => p.category.en === state.selectedCategory);

    const productGrid = `
      <div class="product-grid">
        ${filteredProducts.map(product => {
            const approvedReviews = state.reviews.filter(r => r.productId === product.id && r.status === 'approved');
            const averageRating = approvedReviews.length > 0
                ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
                : 0;
            
            return `
              <div class="product-card">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${product.image}" alt="${product.name[lang]}" class="product-image lazy-load" loading="lazy">
                <div class="product-info">
                  <h3>${product.name[lang]}</h3>
                  <div class="product-reviews-summary" data-product-id="${product.id}" role="button" tabindex="0">
                      <div class="stars" style="--rating: ${averageRating.toFixed(2)};" aria-label="${t('averageRating')}: ${averageRating.toFixed(1)} / 5"></div>
                      <span class="review-count">(${approvedReviews.length})</span>
                  </div>
                  <p>${product.description[lang]}</p>
                  <div class="product-footer">
                    <span class="product-price">${product.price.toFixed(0)} RSD</span>
                    ${renderQuantityControl(product, 'large')}
                  </div>
                </div>
              </div>
            `;
        }).join('')}
      </div>
    `;

    return categoryFilters + productGrid;
  }

  const renderCartPage = () => {
    const lang = state.language;
    if (Object.keys(state.cart).length === 0) {
      return `
        <main class="cart-view">
            <div class="empty-cart">
                <h2 class="page-title">${t('emptyCartHeader')}</h2>
                <p>${t('emptyCartMessage')}</p>
                <button class="back-to-shop-btn" data-view="catalog">${t('continueShopping')}</button>
            </div>
        </main>
      `;
    }

    const cartItems = Object.entries(state.cart).map(([productIdStr, quantity]) => {
      const productId = parseInt(productIdStr, 10);
      const product = state.products.find(p => p.id === productId);
      if (!product) return '';
      return `
        <div class="cart-item" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name[lang]}" class="cart-item-img">
            <div class="cart-item-details">
                <h4>${product.name[lang]}</h4>
                <p class="cart-item-price">${(product.price * quantity).toFixed(0)} RSD</p>
                <p class="cart-item-subtotal">${quantity} ${t('pieces')} x ${product.price.toFixed(0)} RSD</p>
            </div>
            <div class="cart-item-actions">
                 <div class="quantity-control">
                    <button class="quantity-btn" data-product-id="${product.id}" data-action="decrement" aria-label="Decrement quantity">-</button>
                    <span class="quantity-display">${quantity}</span>
                    <button class="quantity-btn" data-product-id="${product.id}" data-action="increment" aria-label="Increment quantity">+</button>
                </div>
                <button class="delete-btn" data-product-id="${product.id}" data-action="remove" aria-label="Remove ${product.name[lang]} from cart">${t('delete')}</button>
            </div>
        </div>
      `;
    }).join('');

    return `
      <main class="cart-view">
        <h2 class="page-title">${t('cartTitle')}</h2>
        <div class="cart-items-list">${cartItems}</div>
        <div class="cart-summary">
            <div class="cart-total">
                <span>${t('total')}</span>
                <span>${getCartTotal().toFixed(0)} RSD</span>
            </div>
            <div class="cart-actions">
                <button class="back-to-shop-btn" data-view="catalog">${t('continueShopping')}</button>
                <button class="checkout-btn" id="checkout-btn">${t('checkout')}</button>
            </div>
        </div>
      </main>
    `;
  };

  const renderNewsPage = () => {
      const lang = state.language;
      const newsItems = [...state.newsItems].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return `
        <h2 class="page-title">${t('newsTitle')}</h2>
        ${newsItems.map(item => `
            <div class="content-card">
                <h3>${item.title[lang]}</h3>
                <p class="date">${item.date}</p>
                <p>${item.content[lang]}</p>
            </div>
        `).join('')}
      `;
  };

  const renderPromotionsPage = () => {
    const lang = state.language;
    const promotions = [...state.promotions].sort((a,b) => b.id - a.id);
    return `
      <h2 class="page-title">${t('promotionsTitle')}</h2>
      ${promotions.map(item => `
          <div class="content-card">
              <h3>${item.title[lang]}</h3>
              <p>${item.content[lang]}</p>
          </div>
      `).join('')}
    `;
  };
  
  const renderProfilePage = () => {
    const lang = state.language;

    const renderOrderHistory = () => `
        <div class="content-card">
            <h3>${t('orderHistory')}</h3>
            ${state.userProfile.orderHistory.map(order => `
                <div class="order-history-item">
                    <span>${t('order')} #${order.id} (${t('date')}: ${order.date})</span>
                    <strong>${order.total.toFixed(0)} RSD</strong>
                </div>
            `).join('')}
        </div>
    `;
    
    if (state.isEditingProfile) {
        return `
            <h2 class="page-title">${t('profileTitle')}</h2>
            <form id="profile-form" class="admin-form content-card">
                <h3>${t('personalInfo')}</h3>
                <div class="form-group">
                    <label for="profile-name">${t('name')}</label>
                    <input type="text" id="profile-name" value="${state.userProfile.name}" required>
                </div>
                <div class="form-group">
                    <label for="profile-email">${t('email')}</label>
                    <input type="email" id="profile-email" value="${state.userProfile.email}" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="admin-button">${t('saveSettings')}</button>
                    <button type="button" id="cancel-edit-profile-btn" class="cancel-btn">${t('cancel')}</button>
                </div>
            </form>
            ${renderOrderHistory()}
        `;
    }

    return `
        <h2 class="page-title">${t('profileTitle')}</h2>
        <div class="content-card profile-info">
            <button id="edit-profile-btn" class="edit-btn" style="float: right;">${t('edit')}</button>
            <h3>${t('personalInfo')}</h3>
            <p><strong>${t('name')}:</strong> ${state.userProfile.name}</p>
            <p><strong>${t('email')}:</strong> ${state.userProfile.email}</p>
        </div>
        ${renderOrderHistory()}
    `;
  };

  const renderAdminPage = () => {
      const lang = state.language;
      const { 
          salesReport, products, newsItems, promotions, reviews, editingProduct, 
          newProductImage, editingNewsItem, editingPromotion, orderStatusNotifSettings, 
          promoNotifHistory, isListening, voiceFeedback, isTranslatingName, isTranslatingDesc
      } = state;
      
      const renderReport = () => {
          if (!salesReport) return '';
          if (salesReport.length === 0) return `<p>No sales data for the selected period.</p>`;
          return `
              <ul class="sales-report-list">
                  ${salesReport.map(item => `
                      <li>
                          <span>${item.name[lang]}</span>
                          <strong>${t('totalSold')}: ${item.totalQuantity}</strong>
                      </li>
                  `).join('')}
              </ul>
          `;
      };
      
      const pendingReviews = reviews.filter(r => r.status === 'pending');

      return `
        <h2 class="page-title">${t('adminTitle')}</h2>
        
        <!-- General Settings -->
        <div class="admin-section" id="admin-settings-section">
            <h3>${t('generalSettings')}</h3>
            <div class="admin-form">
                <div class="form-group">
                    <label for="logo-upload">${t('uploadLogo')}</label>
                    <input type="file" id="logo-upload" class="file-input" accept="image/*">
                    <label for="logo-upload" class="file-input-label">${t('chooseFile')}</label>
                    <div class="settings-preview-container">
                        <p>${t('currentLogo')}:</p>
                        <img src="${state.logoUrl}" alt="Current Logo Preview" class="settings-preview-img logo-preview"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="banner-upload">${t('uploadBanner')}</label>
                    <input type="file" id="banner-upload" class="file-input" accept="image/*">
                    <label for="banner-upload" class="file-input-label">${t('chooseFile')}</label>
                    <div class="settings-preview-container">
                        <p>${t('currentBanner')}:</p>
                        <img src="${state.bannerUrl}" alt="Current Banner Preview" class="settings-preview-img banner-preview"/>
                    </div>
                </div>
            </div>
        </div>

        <!-- Notification Management -->
        <div class="admin-section" id="admin-notifications-section">
            <h3>${t('manageNotifications')}</h3>
            
            <!-- Order Status Notifications -->
            <div class="admin-subsection">
                <h4>${t('orderStatusNotifications')}</h4>
                <p class="subsection-description">${t('enableNotificationsFor')}</p>
                <form id="order-status-notif-form" class="admin-form">
                    ${Object.keys(orderStatusNotifSettings).map(statusKey => `
                        <div class="form-group notification-status-group">
                            <label class="toggle-switch">
                                <input type="checkbox" id="notif-enabled-${statusKey}" ${orderStatusNotifSettings[statusKey].enabled ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                            <label for="notif-enabled-${statusKey}" class="toggle-label">${t(`status${statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}` as any)}</label>
                            
                            <div class="i18n-textarea-group">
                                <label>${t('notificationTemplate')}</label>
                                <textarea id="notif-template-${statusKey}-en" rows="3" placeholder="EN Template">${orderStatusNotifSettings[statusKey].templates.en}</textarea>
                                <textarea id="notif-template-${statusKey}-sr" rows="3" placeholder="SR Template">${orderStatusNotifSettings[statusKey].templates.sr}</textarea>
                                <textarea id="notif-template-${statusKey}-ru" rows="3" placeholder="RU Template">${orderStatusNotifSettings[statusKey].templates.ru}</textarea>
                                <p class="form-hint">${t('templatePlaceholderInfo')}</p>
                            </div>
                        </div>
                    `).join('')}
                    <div class="form-actions">
                         <button type="submit" class="admin-button">${t('saveSettings')}</button>
                    </div>
                </form>
            </div>

            <!-- Promotional Notifications -->
            <div class="admin-subsection">
                 <h4>${t('promotionalNotifications')}</h4>
                 <form id="promo-notif-form" class="admin-form">
                    <p class="subsection-description">${t('composeAndSend')}</p>
                    <div class="form-group-i18n">
                        <label>${t('messageTitle')}</label>
                        <input type="text" id="promo-notif-title-en" placeholder="${t('messageTitle')} (EN)" required>
                        <input type="text" id="promo-notif-title-sr" placeholder="${t('messageTitle')} (SR)" required>
                        <input type="text" id="promo-notif-title-ru" placeholder="${t('messageTitle')} (RU)" required>
                    </div>
                    <div class="form-group-i18n">
                        <label>${t('messageContent')}</label>
                        <textarea id="promo-notif-content-en" placeholder="${t('messageContent')} (EN)" rows="4" required></textarea>
                        <textarea id="promo-notif-content-sr" placeholder="${t('messageContent')} (SR)" rows="4" required></textarea>
                        <textarea id="promo-notif-content-ru" placeholder="${t('messageContent')} (RU)" rows="4" required></textarea>
                    </div>
                    <div class="form-actions">
                         <button type="submit" class="admin-button">${t('sendNotification')}</button>
                    </div>
                 </form>

                 <div class="promo-history">
                    <h5>${t('sentNotificationsHistory')}</h5>
                    ${promoNotifHistory.length > 0 ? `
                        <ul class="promo-history-list">
                            ${promoNotifHistory.map(item => `
                                <li class="promo-history-item">
                                    <span class="history-date">${item.date}</span>
                                    <strong class="history-title">${item.title[lang]}</strong>
                                    <p class="history-content">${item.content[lang].substring(0, 80)}...</p>
                                </li>
                            `).join('')}
                        </ul>
                    ` : `<p class="form-hint">${t('noNotificationsSent')}</p>`}
                 </div>
            </div>
        </div>

        <!-- Review Management -->
        <div class="admin-section" id="admin-reviews-section">
            <h3>${t('manageReviews')}</h3>
            ${pendingReviews.length > 0 ? `
                <p>${t('pendingReviews')}: ${pendingReviews.length}</p>
                <ul class="manage-list">
                    ${pendingReviews.map(review => {
                        const product = products.find(p => p.id === review.productId);
                        return `
                        <li class="manage-list-item review-moderation-item">
                            <div class="review-moderation-info">
                                <strong>${product ? product.name[lang] : 'Unknown Product'}</strong> - ${review.author} (${review.rating} ★)
                                <p><em>"${review.title[lang]}"</em>: ${review.content[lang]}</p>
                            </div>
                            <div class="manage-list-item-actions">
                                <button class="approve-btn" data-id="${review.id}" data-type="review">${t('approve')}</button>
                                <button class="reject-btn" data-id="${review.id}" data-type="review">${t('reject')}</button>
                            </div>
                        </li>
                    `}).join('')}
                </ul>
            ` : `<p>${t('noReviews')} ${t('pendingReviews').toLowerCase()}.</p>`}
        </div>

        <!-- Product Management -->
        <div class="admin-section" id="admin-products-section">
            <h3>${t('manageProducts')}</h3>
            <form id="product-form" class="admin-form">
                <div class="form-group-i18n">
                    <label>${t('nameLabel')}</label>
                    <div class="translatable-field">
                      <input type="text" id="product-name-en" placeholder="${t('nameLabel')} (EN)" required>
                      <button type="button" class="translate-btn ${isTranslatingName ? 'loading' : ''}" data-field="name" title="${t('translate')}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                        </svg>
                      </button>
                    </div>
                    <input type="text" id="product-name-sr" placeholder="${t('nameLabel')} (SR)" required>
                    <input type="text" id="product-name-ru" placeholder="${t('nameLabel')} (RU)" required>
                </div>
                <div class="form-group-i18n">
                    <label>${t('descriptionLabel')}</label>
                    <div class="translatable-field">
                      <textarea id="product-desc-en" placeholder="${t('descriptionLabel')} (EN)" rows="3" required></textarea>
                      <button type="button" class="translate-btn ${isTranslatingDesc ? 'loading' : ''}" data-field="description" title="${t('translate')}">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                        </svg>
                      </button>
                    </div>
                    <textarea id="product-desc-sr" placeholder="${t('descriptionLabel')} (SR)" rows="3" required></textarea>
                    <textarea id="product-desc-ru" placeholder="${t('descriptionLabel')} (RU)" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label for="product-price">${t('priceLabel')}</label>
                    <input type="number" id="product-price" placeholder="e.g., 900" min="0" step="10" required>
                </div>
                <div class="form-group">
                    <label for="product-image-upload">${t('imageLabel')}</label>
                    <input type="file" id="product-image-upload" class="file-input" accept="image/*">
                    <label for="product-image-upload" class="file-input-label">${t('chooseFile')}</label>
                    <div class="image-preview-container">
                        ${newProductImage ? `<img src="${newProductImage}" alt="Image Preview" class="image-preview"/>` : ''}
                    </div>
                </div>
                <div class="form-group">
                    <label for="product-category">${t('categoryLabel')}</label>
                    <select id="product-category" required>
                        ${categories.filter(c => c.key !== 'All').map(cat => `<option value="${cat.key}">${cat.name[lang]}</option>`).join('')}
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="admin-button">${editingProduct ? t('updateProduct') : t('addProduct')}</button>
                    ${editingProduct ? `<button type="button" id="cancel-edit-product-btn" class="cancel-btn">${t('cancel')}</button>` : ''}
                </div>
            </form>
             <ul class="manage-list" id="product-list">
                ${products.map(product => `
                    <li class="manage-list-item">
                        <img src="${product.image}" alt="${product.name[lang]}" class="manage-list-item-img"/>
                        <span>${product.name[lang]}</span>
                        <div class="manage-list-item-actions">
                            <button class="edit-btn" data-id="${product.id}" data-type="product">${t('edit')}</button>
                            <button class="delete-btn" data-id="${product.id}" data-type="product">${t('delete')}</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>

        <!-- News Management -->
        <div class="admin-section" id="admin-news-section">
            <h3>${t('manageNews')}</h3>
            <form id="news-form" class="admin-form">
                <div class="form-group">
                    <label for="news-date">${t('newsDate')}</label>
                    <input type="date" id="news-date" required>
                </div>
                <div class="form-group-i18n">
                    <label>${t('titleLabel')}</label>
                    <input type="text" id="news-title-en" placeholder="${t('titleLabel')} (EN)" required>
                    <input type="text" id="news-title-sr" placeholder="${t('titleLabel')} (SR)" required>
                    <input type="text" id="news-title-ru" placeholder="${t('titleLabel')} (RU)" required>
                </div>
                <div class="form-group-i18n">
                    <label>${t('contentLabel')}</label>
                    <textarea id="news-content-en" placeholder="${t('contentLabel')} (EN)" rows="3" required></textarea>
                    <textarea id="news-content-sr" placeholder="${t('contentLabel')} (SR)" rows="3" required></textarea>
                    <textarea id="news-content-ru" placeholder="${t('contentLabel')} (RU)" rows="3" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="admin-button">${editingNewsItem ? t('updateNews') : t('addNews')}</button>
                    ${editingNewsItem ? `<button type="button" id="cancel-edit-news-btn" class="cancel-btn">${t('cancel')}</button>` : ''}
                </div>
            </form>
            <ul class="manage-list" id="news-list">
                ${newsItems.map(item => `
                    <li class="manage-list-item">
                        <span>${item.title[lang]} (${item.date})</span>
                        <div class="manage-list-item-actions">
                           <button class="edit-btn" data-id="${item.id}" data-type="news">${t('edit')}</button>
                           <button class="delete-btn" data-id="${item.id}" data-type="news">${t('delete')}</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>

        <!-- Promotions Management -->
        <div class="admin-section" id="admin-promotions-section">
            <h3>${t('managePromotions')}</h3>
            <form id="promo-form" class="admin-form">
                <div class="form-group-i18n">
                    <label>${t('titleLabel')}</label>
                    <input type="text" id="promo-title-en" placeholder="${t('titleLabel')} (EN)" required>
                    <input type="text" id="promo-title-sr" placeholder="${t('titleLabel')} (SR)" required>
                    <input type="text" id="promo-title-ru" placeholder="${t('titleLabel')} (RU)" required>
                </div>
                <div class="form-group-i18n">
                    <label>${t('contentLabel')}</label>
                    <textarea id="promo-content-en" placeholder="${t('contentLabel')} (EN)" rows="3" required></textarea>
                    <textarea id="promo-content-sr" placeholder="${t('contentLabel')} (SR)" rows="3" required></textarea>
                    <textarea id="promo-content-ru" placeholder="${t('contentLabel')} (RU)" rows="3" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="admin-button">${editingPromotion ? t('updatePromotion') : t('addPromotion')}</button>
                    ${editingPromotion ? `<button type="button" id="cancel-edit-promo-btn" class="cancel-btn">${t('cancel')}</button>` : ''}
                </div>
            </form>
            <ul class="manage-list" id="promo-list">
                ${promotions.map(item => `
                    <li class="manage-list-item">
                        <span>${item.title[lang]}</span>
                         <div class="manage-list-item-actions">
                           <button class="edit-btn" data-id="${item.id}" data-type="promo">${t('edit')}</button>
                           <button class="delete-btn" data-id="${item.id}" data-type="promo">${t('delete')}</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <!-- Sales Statistics -->
        <div class="admin-section" id="admin-statistics-section">
            <h3>${t('salesStatistics')}</h3>
            <div class="date-range-selector">
                <label for="start-date">${t('startDate')}</label>
                <input type="date" id="start-date" value="${state.startDate}">
                <label for="end-date">${t('endDate')}</label>
                <input type="date" id="end-date" value="${state.endDate}">
            </div>
            <button id="generate-report-btn" class="admin-button">${t('generateReport')}</button>
            <div id="sales-report-container">
                ${renderReport()}
            </div>
        </div>

        <!-- Voice Control UI -->
        <button id="voice-control-btn" class="voice-control-btn ${isListening ? 'listening' : ''}" title="Activate Voice Control">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m12 7.5v-1.5a6 6 0 0 0-6-6v-1.5a6 6 0 0 0-6 6v1.5m6 7.5a6 6 0 0 0 6-6" />
             </svg>
        </button>
        ${voiceFeedback ? `<div class="voice-feedback-toast">${voiceFeedback}</div>` : ''}
      `;
  };
  
  const renderProductReviewsModal = () => {
    const product = state.activeProductReviews;
    if (!product) return '';

    const lang = state.language;
    const approvedReviews = state.reviews.filter(r => r.productId === product.id && r.status === 'approved');

    return `
        <div class="reviews-modal-overlay" id="reviews-modal-overlay">
            <div class="reviews-modal-content">
                <button class="close-modal-btn" id="close-reviews-modal-btn" aria-label="${t('close')}">&times;</button>
                <h2>${t('reviews')} for ${product.name[lang]}</h2>
                
                <div class="reviews-list">
                    ${approvedReviews.length > 0 ? approvedReviews.map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <strong>${review.author}</strong>
                                <div class="stars" style="--rating: ${review.rating};" aria-label="${t('averageRating')}: ${review.rating} / 5"></div>
                            </div>
                            <h4>${review.title[lang]}</h4>
                            <p>${review.content[lang]}</p>
                        </div>
                    `).join('') : `<p>${t('noReviews')}</p>`}
                </div>

                <hr class="modal-divider"/>

                <h3>${t('submitReview')}</h3>
                <form id="review-form" class="admin-form">
                    <div class="form-group">
                        <label>${t('yourRating')}</label>
                        <div class="star-rating-input">
                           ${[5,4,3,2,1].map(star => `
                                <input type="radio" id="star${star}" name="rating" value="${star}" required/>
                                <label for="star${star}">&#9733;</label>
                           `).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="review-title">${t('reviewTitleLabel')}</label>
                        <input type="text" id="review-title" required placeholder="${t('titleLabel')}...">
                    </div>
                    <div class="form-group">
                        <label for="review-content">${t('yourCommentLabel')}</label>
                        <textarea id="review-content" rows="4" required placeholder="${t('contentLabel')}..."></textarea>
                    </div>
                    <button type="submit" class="admin-button">${t('submit')}</button>
                </form>
            </div>
        </div>
    `;
  }

  const showVoiceFeedback = (message: string) => {
      setState({ voiceFeedback: message });
      setTimeout(() => setState({ voiceFeedback: null }), 3000);
  };

  const handleVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase().trim();
    showVoiceFeedback(t('voiceHeard', command));

    let executedCommand: string | null = null;
    
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // Navigation
    if (command.includes('product') || command.includes('производ') || command.includes('товар')) {
        scrollToSection('admin-products-section');
        executedCommand = 'Show Products';
    } else if (command.includes('review') || command.includes('рецензиј') || command.includes('отзыв')) {
        scrollToSection('admin-reviews-section');
        executedCommand = 'Show Reviews';
    } else if (command.includes('news') || command.includes('вест') || command.includes('новост')) {
        scrollToSection('admin-news-section');
        executedCommand = 'Show News';
    } else if (command.includes('promotion') || command.includes('промоциј') || command.includes('акци')) {
        scrollToSection('admin-promotions-section');
        executedCommand = 'Show Promotions';
    } else if (command.includes('statistic') || command.includes('статистик')) {
        scrollToSection('admin-statistics-section');
        executedCommand = 'Show Statistics';
    } 
    // Actions
    else if (command.includes('generate report') || command.includes('генериши извештај') || command.includes('создать отчет')) {
        (document.getElementById('generate-report-btn') as HTMLButtonElement)?.click();
        executedCommand = 'Generate Report';
    } else if (command.includes('add new product') || command.includes('додај нови производ') || command.includes('добавить новый товар')) {
        scrollToSection('admin-products-section');
        (document.getElementById('product-name-en') as HTMLInputElement)?.focus();
        executedCommand = 'Add New Product';
    }
    // Exit
    else if (command.includes('go home') || command.includes('почетну') || command.includes('главную')) {
        setState({ view: 'home' });
        executedCommand = 'Go Home';
    } else if (command.includes('exit admin') || command.includes('изађи') || command.includes('выйти')) {
        setState({ view: 'home' });
        executedCommand = 'Exit Admin';
    }

    if (executedCommand) {
        setTimeout(() => showVoiceFeedback(t('voiceCommandSuccess', executedCommand!)), 1000);
    } else {
        setTimeout(() => showVoiceFeedback(t('voiceCommandUnknown')), 1000);
    }
  };

  if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
          setState({ isListening: true });
          showVoiceFeedback(t('voiceListening'));
      };
      
      recognition.onend = () => {
          setState({ isListening: false });
      };
      
      recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setState({ isListening: false });
      };

      recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleVoiceCommand(transcript);
      };
  }
  
  const handleTranslate = async (field: 'name' | 'description') => {
      const sourceTextEl = document.getElementById(`product-${field === 'name' ? 'name' : 'desc'}-en`) as HTMLInputElement | HTMLTextAreaElement;
      const sourceText = sourceTextEl.value;
      if (!sourceText) {
          alert('Please enter some English text first.');
          return;
      }

      if (field === 'name') setState({ isTranslatingName: true });
      else setState({ isTranslatingDesc: true });

      try {
          const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Translate the following product ${field} into Serbian and Russian: "${sourceText}"`,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: {
                      type: Type.OBJECT,
                      properties: {
                          sr: { type: Type.STRING, description: 'Serbian translation' },
                          ru: { type: Type.STRING, description: 'Russian translation' },
                      }
                  }
              }
          });
          const jsonText = response.text.trim();
          const translations = JSON.parse(jsonText);

          if (translations.sr) {
              (document.getElementById(`product-${field === 'name' ? 'name' : 'desc'}-sr`) as HTMLInputElement).value = translations.sr;
          }
          if (translations.ru) {
              (document.getElementById(`product-${field === 'name' ? 'name' : 'desc'}-ru`) as HTMLInputElement).value = translations.ru;
          }

      } catch (error) {
          console.error("Translation failed:", error);
          alert("Translation failed. Please check the console for details.");
      } finally {
          if (field === 'name') setState({ isTranslatingName: false });
          else setState({ isTranslatingDesc: false });
      }
  };

  const initializeLazyLoad = () => {
    const lazyImages = document.querySelectorAll('.lazy-load');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const src = img.dataset.src;
                    if (src) {
                        img.src = src;
                        img.onload = () => {
                            img.classList.add('loaded');
                        }
                    }
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '0px 0px 200px 0px' });

        lazyImages.forEach(img => {
            observer.observe(img);
        });
    } else {
        lazyImages.forEach(img => {
            const image = img as HTMLImageElement;
            const src = image.dataset.src;
            if (src) {
              image.src = src;
              image.classList.add('loaded');
            }
        });
    }
  };
  
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error("Root element not found");

  // --- GLOBAL EVENT LISTENER ---
  rootElement.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      
      const viewButton = target.closest<HTMLElement>('[data-view]');
      if (viewButton) {
          setState({ view: viewButton.dataset.view as View });
          return;
      }
      
      const categoryButton = target.closest<HTMLElement>('[data-category]');
      if (categoryButton) {
          setState({ selectedCategory: categoryButton.dataset.category! });
          return;
      }

      const quantityButton = target.closest<HTMLElement>('[data-product-id][data-action]');
      if (quantityButton) {
          const productId = parseInt(quantityButton.dataset.productId!, 10);
          const action = quantityButton.dataset.action;
          if (action === 'increment') {
              addToCart(productId);
          } else if (action === 'decrement') {
              decrementCartItem(productId);
          } else if (action === 'remove') {
              removeFromCart(productId);
          }
          return;
      }
      
      if (target.closest('#cart-btn')) { setState({ view: 'cart' }); return; }
      if (target.closest('#edit-profile-btn')) { setState({ isEditingProfile: true }); return; }
      if (target.closest('#cancel-edit-profile-btn')) { setState({ isEditingProfile: false }); return; }
      
      const reviewsSummary = target.closest<HTMLElement>('.product-reviews-summary');
      if(reviewsSummary) {
          const productId = parseInt(reviewsSummary.dataset.productId!, 10);
          const product = state.products.find(p => p.id === productId);
          if (product) setState({ activeProductReviews: product });
          return;
      }
      
      if (target.matches('#reviews-modal-overlay') || target.closest('#close-reviews-modal-btn')) {
          setState({ activeProductReviews: null });
          return;
      }
      
      const checkoutBtn = target.closest<HTMLButtonElement>('#checkout-btn');
      if (checkoutBtn) {
           if (window.Telegram?.WebApp) {
                const orderData = { items: state.cart, total: getCartTotal() };
                const backendUrl = 'https://bela-zora-sapun-bot.onrender.com/process-order';

                try {
                    checkoutBtn.disabled = true;
                    checkoutBtn.textContent = t('processing');
                    console.log({ window.Telegram.WebApp.initData, orderData });
                    const response = await fetch(backendUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderData, initData: window.Telegram.WebApp.initData }),
                    });
                    if (!response.ok) throw new Error(`Server responded with ${response.status}`);
                    window.Telegram.WebApp.close();
                } catch (error) {
                    console.error('Checkout failed:', error);
                    window.Telegram.WebApp.showAlert('Could not place order. Please try again later.');
                    checkoutBtn.disabled = false;
                    checkoutBtn.textContent = t('checkout');
                }
            } else {
               alert(`Order Placed!\nDetails: ${JSON.stringify(state.cart)}\n(This is a simulation)`);
               setState({ cart: {}, view: 'catalog' });
            }
            return;
      }
      
      // Admin Panel Actions
      if (state.view === 'admin') {
          if(target.closest('#generate-report-btn')) {
            const start = new Date(state.startDate);
            const end = new Date(state.endDate);
            end.setHours(23, 59, 59, 999);
            const filteredSales = salesHistory.filter(sale => {
                const saleDate = new Date(sale.date);
                return saleDate >= start && saleDate <= end;
            });
            const productSales = new Map<number, number>();
            filteredSales.forEach(sale => {
                const currentQty = productSales.get(sale.productId) || 0;
                productSales.set(sale.productId, currentQty + sale.quantity);
            });
            const reportData = Array.from(productSales.entries()).map(([productId, totalQuantity]) => {
                    const product = state.products.find(p => p.id === productId);
                    return { productId, name: product!.name, totalQuantity };
                }).sort((a, b) => b.totalQuantity - a.totalQuantity);
            setState({ salesReport: reportData });
            return;
          }

          if (target.closest('#cancel-edit-product-btn')) {
            (document.getElementById('product-form') as HTMLFormElement).reset();
            setState({ editingProduct: null, newProductImage: null }); return;
          }
          if (target.closest('#cancel-edit-news-btn')) {
            (document.getElementById('news-form') as HTMLFormElement).reset();
            setState({ editingNewsItem: null }); return;
          }
          if (target.closest('#cancel-edit-promo-btn')) {
            (document.getElementById('promo-form') as HTMLFormElement).reset();
            setState({ editingPromotion: null }); return;
          }

          if(target.closest('.translate-btn')) {
              const field = target.closest<HTMLElement>('.translate-btn')!.dataset.field as 'name' | 'description';
              if (field) handleTranslate(field); return;
          }

          if(target.closest('#voice-control-btn')) {
            if (!recognition) return;
            if (state.isListening) {
                recognition.stop();
            } else {
                const lang = state.language;
                recognition.lang = lang === 'sr' ? 'sr-RS' : lang === 'ru' ? 'ru-RU' : 'en-US';
                recognition.start();
            }
            return;
          }

          const actionButton = target.closest<HTMLElement>('.edit-btn, .delete-btn, .approve-btn, .reject-btn');
          if (actionButton) {
              const type = actionButton.dataset.type;
              const id = parseInt(actionButton.dataset.id!, 10);
              const isEdit = actionButton.classList.contains('edit-btn');
              const isApprove = actionButton.classList.contains('approve-btn');

              if (type === 'review') {
                  const newStatus: 'approved' | 'rejected' = isApprove ? 'approved' : 'rejected';
                  setState({ reviews: state.reviews.map(r => r.id === id ? {...r, status: newStatus} : r) });
              } else if (type === 'news') {
                  if (isEdit) {
                      const itemToEdit = state.newsItems.find(item => item.id === id);
                      if (itemToEdit) {
                          setState({ editingNewsItem: itemToEdit });
                          const form = document.getElementById('news-form');
                          if (form) {
                            (document.getElementById('news-date') as HTMLInputElement).value = itemToEdit.date;
                            (document.getElementById('news-title-en') as HTMLInputElement).value = itemToEdit.title.en;
                            (document.getElementById('news-title-sr') as HTMLInputElement).value = itemToEdit.title.sr;
                            (document.getElementById('news-title-ru') as HTMLInputElement).value = itemToEdit.title.ru;
                            (document.getElementById('news-content-en') as HTMLTextAreaElement).value = itemToEdit.content.en;
                            (document.getElementById('news-content-sr') as HTMLTextAreaElement).value = itemToEdit.content.sr;
                            (document.getElementById('news-content-ru') as HTMLTextAreaElement).value = itemToEdit.content.ru;
                            form.scrollIntoView({ behavior: 'smooth' });
                          }
                      }
                  } else {
                      setState({ newsItems: state.newsItems.filter(item => item.id !== id) });
                  }
              } else if (type === 'promo') {
                  if (isEdit) {
                        const itemToEdit = state.promotions.find(item => item.id === id);
                        if (itemToEdit) {
                          setState({ editingPromotion: itemToEdit });
                          const form = document.getElementById('promo-form');
                          if (form) {
                            (document.getElementById('promo-title-en') as HTMLInputElement).value = itemToEdit.title.en;
                            (document.getElementById('promo-title-sr') as HTMLInputElement).value = itemToEdit.title.sr;
                            (document.getElementById('promo-title-ru') as HTMLInputElement).value = itemToEdit.title.ru;
                            (document.getElementById('promo-content-en') as HTMLTextAreaElement).value = itemToEdit.content.en;
                            (document.getElementById('promo-content-sr') as HTMLTextAreaElement).value = itemToEdit.content.sr;
                            (document.getElementById('promo-content-ru') as HTMLTextAreaElement).value = itemToEdit.content.ru;
                            form.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                  } else {
                      setState({ promotions: state.promotions.filter(item => item.id !== id) });
                  }
              } else if (type === 'product') {
                  if (isEdit) {
                      const productToEdit = state.products.find(p => p.id === id);
                      if (productToEdit) {
                          setState({ editingProduct: productToEdit, newProductImage: productToEdit.image });
                          const form = document.getElementById('product-form');
                          if(form) {
                            (document.getElementById('product-name-en') as HTMLInputElement).value = productToEdit.name.en;
                            (document.getElementById('product-name-sr') as HTMLInputElement).value = productToEdit.name.sr;
                            (document.getElementById('product-name-ru') as HTMLInputElement).value = productToEdit.name.ru;
                            (document.getElementById('product-desc-en') as HTMLTextAreaElement).value = productToEdit.description.en;
                            (document.getElementById('product-desc-sr') as HTMLTextAreaElement).value = productToEdit.description.sr;
                            (document.getElementById('product-desc-ru') as HTMLTextAreaElement).value = productToEdit.description.ru;
                            (document.getElementById('product-price') as HTMLInputElement).value = productToEdit.price.toString();
                            const category = categories.find(c => c.name.en === productToEdit.category.en);
                            if(category) (document.getElementById('product-category') as HTMLSelectElement).value = category.key;
                            form.scrollIntoView({ behavior: 'smooth' });
                          }
                      }
                  } else {
                      setState({ products: state.products.filter(p => p.id !== id) });
                  }
              }
              return;
          }
      }
  });
  
  // Attach event listeners for elements that can't be handled by delegation
  const attachDynamicEventListeners = () => {
    // Language selector
    const langSelect = document.getElementById('lang-select') as HTMLSelectElement;
    if (langSelect) {
      langSelect.onchange = () => setState({ language: langSelect.value as Language });
    }

    // Review Form
    const reviewForm = document.getElementById('review-form') as HTMLFormElement;
    if (reviewForm) {
      reviewForm.onsubmit = (e) => {
        e.preventDefault();
        const product = state.activeProductReviews;
        if(!product) return;
        const rating = parseInt((reviewForm.querySelector('input[name="rating"]:checked') as HTMLInputElement)?.value, 10);
        const title = (document.getElementById('review-title') as HTMLInputElement).value;
        const content = (document.getElementById('review-content') as HTMLTextAreaElement).value;
        const newReview: Review = {
            id: Date.now(),
            productId: product.id,
            author: "User", rating,
            title: { en: title, sr: title, ru: title },
            content: { en: content, sr: content, ru: content },
            status: 'pending'
        };
        setState({ reviews: [newReview, ...state.reviews], activeProductReviews: null });
        alert(t('reviewSubmitted'));
      };
    }

    // Profile Edit Form
    const profileForm = document.getElementById('profile-form') as HTMLFormElement;
    if(profileForm) {
        profileForm.onsubmit = (e) => {
            e.preventDefault();
            const newName = (document.getElementById('profile-name') as HTMLInputElement).value;
            const newEmail = (document.getElementById('profile-email') as HTMLInputElement).value;
            setState({
                userProfile: { ...state.userProfile, name: newName, email: newEmail },
                isEditingProfile: false
            });
        };
    }

    // Admin Panel Forms & Inputs
    if(state.view === 'admin') {
      document.getElementById('logo-upload')?.addEventListener('change', async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) setState({ logoUrl: await fileToBase64(file) as string });
      });
      document.getElementById('banner-upload')?.addEventListener('change', async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) setState({ bannerUrl: await fileToBase64(file) as string });
      });

      const orderStatusNotifForm = document.getElementById('order-status-notif-form') as HTMLFormElement;
      if(orderStatusNotifForm) {
        orderStatusNotifForm.onsubmit = (e) => {
          e.preventDefault();
          const newSettings: OrderStatusNotificationSettings = {};
          Object.keys(state.orderStatusNotifSettings).forEach(statusKey => {
              newSettings[statusKey] = {
                  enabled: (document.getElementById(`notif-enabled-${statusKey}`) as HTMLInputElement).checked,
                  templates: {
                      en: (document.getElementById(`notif-template-${statusKey}-en`) as HTMLTextAreaElement).value,
                      sr: (document.getElementById(`notif-template-${statusKey}-sr`) as HTMLTextAreaElement).value,
                      ru: (document.getElementById(`notif-template-${statusKey}-ru`) as HTMLTextAreaElement).value,
                  }
              };
          });
          setState({ orderStatusNotifSettings: newSettings });
          alert('Notification settings saved!');
        };
      }
      
      const promoNotifForm = document.getElementById('promo-notif-form') as HTMLFormElement;
      if (promoNotifForm) {
        promoNotifForm.onsubmit = (e) => {
          e.preventDefault();
          if(confirm(t('confirmSend'))) {
              const newPromo: PromotionalNotification = {
                  id: Date.now(),
                  date: new Date().toISOString().split('T')[0],
                  title: {
                      en: (document.getElementById('promo-notif-title-en') as HTMLInputElement).value,
                      sr: (document.getElementById('promo-notif-title-sr') as HTMLInputElement).value,
                      ru: (document.getElementById('promo-notif-title-ru') as HTMLInputElement).value,
                  },
                  content: {
                      en: (document.getElementById('promo-notif-content-en') as HTMLTextAreaElement).value,
                      sr: (document.getElementById('promo-notif-content-sr') as HTMLTextAreaElement).value,
                      ru: (document.getElementById('promo-notif-content-ru') as HTMLTextAreaElement).value,
                  }
              };
              setState({ promoNotifHistory: [newPromo, ...state.promoNotifHistory] });
              promoNotifForm.reset();
              alert(t('notificationSentSuccess'));
          }
        };
      }

      const productForm = document.getElementById('product-form') as HTMLFormElement;
      if(productForm) {
        (document.getElementById('product-image-upload') as HTMLInputElement).onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) setState({ newProductImage: await fileToBase64(file) as string });
        };
        productForm.onsubmit = (e) => {
          e.preventDefault();
          const editingProduct = state.editingProduct;
          const categoryKey = (document.getElementById('product-category') as HTMLSelectElement).value;
          const categoryObj = categories.find(c => c.key === categoryKey);
          if (!categoryObj) return;

          const productData = {
              name: { en: (document.getElementById('product-name-en') as HTMLInputElement).value, sr: (document.getElementById('product-name-sr') as HTMLInputElement).value, ru: (document.getElementById('product-name-ru') as HTMLInputElement).value },
              description: { en: (document.getElementById('product-desc-en') as HTMLTextAreaElement).value, sr: (document.getElementById('product-desc-sr') as HTMLTextAreaElement).value, ru: (document.getElementById('product-desc-ru') as HTMLTextAreaElement).value },
              price: parseFloat((document.getElementById('product-price') as HTMLInputElement).value),
              image: state.newProductImage || (editingProduct ? editingProduct.image : 'https://placehold.co/300x300?text=No+Image'),
              category: categoryObj.name
          };

          if (editingProduct) {
              setState({ products: state.products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p) });
          } else {
              setState({ products: [{ id: Date.now(), ...productData }, ...state.products] });
          }
          productForm.reset();
          setState({ editingProduct: null, newProductImage: null });
        };
      }
      
      const newsForm = document.getElementById('news-form') as HTMLFormElement;
      if (newsForm) {
        newsForm.onsubmit = (e) => {
            e.preventDefault();
            const editingNewsItem = state.editingNewsItem;
            const newsData = {
                date: (document.getElementById('news-date') as HTMLInputElement).value,
                title: { en: (document.getElementById('news-title-en') as HTMLInputElement).value, sr: (document.getElementById('news-title-sr') as HTMLInputElement).value, ru: (document.getElementById('news-title-ru') as HTMLInputElement).value },
                content: { en: (document.getElementById('news-content-en') as HTMLTextAreaElement).value, sr: (document.getElementById('news-content-sr') as HTMLTextAreaElement).value, ru: (document.getElementById('news-content-ru') as HTMLTextAreaElement).value }
            };

            if (editingNewsItem) {
                setState({ newsItems: state.newsItems.map(item => item.id === editingNewsItem.id ? { ...item, ...newsData } : item) });
            } else {
                setState({ newsItems: [{ id: Date.now(), ...newsData }, ...state.newsItems] });
            }
            newsForm.reset();
            setState({ editingNewsItem: null });
        };
      }
      
      const promoForm = document.getElementById('promo-form') as HTMLFormElement;
      if (promoForm) {
        promoForm.onsubmit = (e) => {
            e.preventDefault();
            const editingPromotion = state.editingPromotion;
            const promoData = {
                title: { en: (document.getElementById('promo-title-en') as HTMLInputElement).value, sr: (document.getElementById('promo-title-sr') as HTMLInputElement).value, ru: (document.getElementById('promo-title-ru') as HTMLInputElement).value },
                content: { en: (document.getElementById('promo-content-en') as HTMLTextAreaElement).value, sr: (document.getElementById('promo-content-sr') as HTMLTextAreaElement).value, ru: (document.getElementById('promo-content-ru') as HTMLTextAreaElement).value }
            };
            if (editingPromotion) {
                setState({ promotions: state.promotions.map(item => item.id === editingPromotion.id ? { ...item, ...promoData } : item) });
            } else {
                setState({ promotions: [{ id: Date.now(), ...promoData }, ...state.promotions] });
            }
            promoForm.reset();
            setState({ editingPromotion: null });
        };
      }
      
      document.getElementById('start-date')?.addEventListener('change', e => setState({ startDate: (e.target as HTMLInputElement).value }));
      document.getElementById('end-date')?.addEventListener('change', e => setState({ endDate: (e.target as HTMLInputElement).value }));
    }
  };

  // FIX: Converted `render` to a function declaration. This hoists it, making it available to `setState` which is defined earlier in the component's scope.
  function render() {
    let pageContent = '';
    switch(state.view) {
        case 'home': pageContent = renderHomePage(); break;
        case 'catalog': pageContent = renderCatalogPage(); break;
        case 'cart': pageContent = renderCartPage(); break;
        case 'news': pageContent = renderNewsPage(); break;
        case 'promotions': pageContent = renderPromotionsPage(); break;
        case 'profile': pageContent = renderProfilePage(); break;
        case 'admin': pageContent = renderAdminPage(); break;
    }

    const modal = state.activeProductReviews ? renderProductReviewsModal() : '';

    rootElement.innerHTML = `
      ${renderHeader()}
      <main>${pageContent}</main>
      ${renderFooterNav()}
      ${modal}
    `;

    attachDynamicEventListeners();
    initializeLazyLoad();
  }

  // --- INITIAL RENDER ---
  if (window.Telegram?.WebApp?.initDataUnsafe?.start_param === 'BelaZoraAdmin2024') {
    setState({ role: 'admin', view: 'admin' });
  } else {
    render();
  }
};

App();

export {};