import { HtmlTagObject } from 'html-webpack-plugin';
import { EventEmitter } from '../components/base/events';

// Создание типов, которые можно переиспользовать
export type TBasketInfo = Pick<IBasket, 'addProduct' | 'removeProduct'>;
export type TProductsAPI = Pick<IMainPage, 'setProduct' | 'getProduct'>;
export type TUSerForm = Pick<IUser, 'paymentTerms' | 'address'>;
export type TUserData = Pick<IUser, 'email' | 'telephone'>;

// Интерфейс брокера событий
export interface IEventEmitter {
	emit: (event: string, data: unknown) => void;
}

// Интерфейс для продукта
export interface IProductData {
	categoryProduct: string;
	titleProduct: string;
	imageProduct: string;
	priceProduct: number;
	descriptionProduct: string;
	idProduct: string;
}

// Интерфейс главной страницы
export interface IMainPage {
	// При открытии доложен подтянуть карточки продуктов
	catalogProducts: IProductData[];
	// Свойство для выбора определнной карточки
	preview: string | null;
	// Свойство хранящее в себе количество товаров в корзине
	numberProducts: number;
	// чтобы установить после загрузки из апи
	setProduct(items: IProductData[]): void;
	// чтобы получить при рендере списков
	getProduct(id: string): void;
	// Открытие модального окна продукта
	openProduct(): void;
}

// Класс для подгрузки с сервера карточки
class ShowApi implements TProductsAPI {
	items: [];
	id: string;
	// Подгрузка карточек с сервера
	setProduct(items: IProductData[]): void {}
	// чтобы получить при рендере списков
	getProduct(id: string): void {}
}

// Интерфейс корзины
export interface IBasket {
	items: Map<string, number>;
	addProduct(id: string): void;
	removeProduct(id: string): void;
}

// Класс модального окна содержащего в себе данные
class ModalData {
	// Свойство хранящее в себе сумму всех товаров в корзине
	amountProduct:number

	// Метод проверки на валидацию модальных окон
	checkValidation(): void {}

	// Метод хранящий в себе суммы всех продуктов
	showAmount(element: number): void {}

	// При клике на кнопку перенос товара в корзину
	buyProduct(): void {}
}

// Класс вызова метода, показывающий изменение в корзине
class BasketData implements TBasketInfo {

	_id:string;

	constructor(protected events: IEventEmitter) {}

	addProduct(_id: string): void {
		// что-то
	}

	removeProduct(_id: string): void {
		// что-то
	}
}

// Интерфейс данных пользователя
export interface IUser {
	paymentTerms: boolean;
	address: string;
	email: string;
	telephone: number;
}

// Класс модального окна способа оплаты и адреса доставки
class UserFormData implements TUSerForm {
	paymentTerms: boolean;
	address: string;

	// Установить способ оплаты
	setPaymentTerms(): void {}
	// Установить адрес доставки
	setAddress(): void {}
}

// Класс модального окна персональных данных пользователя
class UserData implements TUserData {
	email: string;
	telephone: number;
	//Заполнение Email
	setEmail(): void {}
	// Заполнение номера телфона
	setPhone(): void {}
}

// Интерфейсы для конструктора. Отображение правильного модального окна, на входе в контейнер, в него будем выводить
interface IViewConstructor {
	new (container: HTMLElement, events?: IEventEmitter): IView;
}

// Интерфейс для самого класс отображения. Получает данные, возвращает в HTML разметке
interface IView {
	render(data?: object): HTMLElement;
}

// Класс для хранения общих свойств и методов, для отображения всех модальных окон, форм и главного экрана
class components implements IView {
	/* Свойство хранящее в себе объект, содержащий обращение ко 
	всем нужным элементам разметки, для избежания дублей по вызову элементов разметки */
	htmlElement: HTMLElement;

	constructor(protected container: HTMLElement) {}
	render(data: { items: HTMLElement[] }) {
		if (data) {
			this.container.replaceChildren(...data.items);
		}
		return this.container;
	}

	// Отображение суммы товраров, там где это необходимо
	estimateProducts(): void {}

	// Метод отвечающий за отображение валидности модальных окон
	changeValiodation(): void {}
}

// Класс для отбражения каталога главной страницы
class MainView extends components {
	// Отображение количества товаров в корзине, возле иконки корзины
	renderMainNumberProducts(): void {}

	// Отображение каталога с продуктами на главной странице
	renderMainProduct(): void {}

	// Затемнение при вызове модального окна главной странице на фоне
	blackoutMain(): void {}

	// Снятие затемнение при закртии модального окна
	blackoutNotMain(): void {}
}

// Класс для отображения модального окна
class ModalView extends components {
	// Отображение выбранного модального окна
	renderModalWindow(): void {}

	// Очистка модального окна
	closeModalWindow(): void {}
}

// Класс для отображения формы
class FormView extends components {
	// Отображение поля ввода формы
	renderInput(): void {}

	// Очистка формы
	closeInput(): void {}

	// Метод отвечающий за отображение тексат ошибка валидации
	changeTextValidation(): void {}
}

/* Класс для отображения модального окна корзины, при изменениях 
исключащие из себя события закрытия модального окнва корзины или обновления страницы */
class BasketView extends components {
	// Отображение списка товаров корзины после выполнение событий над списком товаров в корзине
	renderArrayProducts(): void {}
}
