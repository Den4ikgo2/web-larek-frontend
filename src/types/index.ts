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

// Класс общего модального окна
class Modal implements IEventEmitter {
	//Открытие модального окна
	openModal(): void {}
	//Закртыие модального окна
	closeModal(): void {}
	// Назначение брокера событий
	emit: (event: string, data: unknown) => void;
	// Проверка валидации
	checkValidation(): void {}
	// Подсчёт цены всех товаров в корзине
	estimateProducts(): void {}
}

// Интерфейс для продукта
export interface IProduct {
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
	catalogProducts: IProduct[];
	// Свойство для выбора определнной карточки
	preview: string | null;
	// чтобы установить после загрузки из апи
	setProduct(items: IProduct[]): void;
	// чтобы получить при рендере списков
	getProduct(id: string): void;
	// Открытие модального окна продукта
	openProduct(): void;
}

// Класс для подгрузки с сервера карточки
class ShopApi implements TProductsAPI {
	// Подгрузка карточек с сервера
	setProduct(items: IProduct[]): void {}
	// чтобы получить при рендере списков
	getProduct(id: string): void {}
}

// Класс модального окна карточки продукта
class modalProduct implements IProduct {
	categoryProduct: string;
	titleProduct: string;
	imageProduct: string;
	priceProduct: number;
	descriptionProduct: string;
	idProduct: string;

	// При клике на кнопку перенос товра в корзину
	buyProduct(): void {}
}

// Интерфейс корзины
export interface IBasket {
	items: Map<string, number>;
	addProduct(id: string): void;
	removeProduct(id: string): void;
}

// Класс вызова метода, показывающий изменение в корзине
class Basket implements TBasketInfo {
	constructor(protected events: IEventEmitter) {}

	addProduct(_id: string): void {
		// что-то
		this._changed();
	}

	removeProduct(_id: string): void {
		// что-то
		this._changed();
	}

	// метод генерирующий уведомление об изменении
	protected _changed() {}
}

// Интерфейсы для конструктора. Отображение правильного модального окна, на входе в контейнер, в него будем выводить
interface IViewConstructor {
	new (container: HTMLElement, events?: IEventEmitter): IView;
}

// Интерфейс для самого класс отображения. Получает данные, возвращает в HTML разметке
interface IView {
	render(data?: object): HTMLElement;
}

// Класс для модального окна корзины, отображения товара в корзине
class BasketView implements IView {
	constructor(protected container: HTMLElement) {}
	render(data: { items: HTMLElement[] }) {
		if (data) {
			this.container.replaceChildren(...data.items);
		}
		return this.container;
	}
}

// Интерфейс данных пользователя
export interface IUser {
	paymentTerms: void;
	address: string;
	email: string;
	telephone: number;
}

// Класс модального окна способа оплаты и адреса доставки
class UserForm implements TUSerForm {
	paymentTerms: void;
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
