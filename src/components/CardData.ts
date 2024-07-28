import {
	ICardsData,
	ICard,
	IOrderForm,
	IOrder,
	FormErrors /* IOrderResult */,
	IOrderFormValid,
} from '../types';
import { IEvents } from './base/events';

export class CardData implements ICardsData {
	protected events: IEvents;
	protected _items: ICard[];
	protected _basketCardArray: Array<ICard>;
	_priceBasket: number;
	order: IOrder = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};
	formErrors: FormErrors = {};
	protected category: { [key: string]: string } = {
		_soft: 'софт-скил',
		_hard: 'хард-скил',
		_other: 'другое',
		_additional: 'дополнительное',
		_button: 'кнопка',
	};

	constructor(events: IEvents) {
		this.events = events;
		this._basketCardArray = [];
		this._priceBasket = 0;
	}

	set items(items: ICard[]) {
		this._items = items;
		this.events.emit('cards:changed');
	}

	get items() {
		return this._items;
	}

	get basketCardArray() {
		return this._basketCardArray;
	}

	//Функция для определния категории объекта
	definitionCategory(item: string) {
		return Object.keys(this.category).find(
			(key) => this.category[key] === item
		);
	}

	//Добавление товара в корзину
	pushCardInBasket(card: ICard) {
		if (this._basketCardArray.indexOf(card) < 0) {
			this._basketCardArray.push(card);
		}
	}

	// Сумирование товаров в корзине
	sumCardsInBasket(item: number, cardId: string) {
		const fondCard = this._basketCardArray.find((card) => card.id === cardId);
		if (!fondCard) {
			this.order.total = this._priceBasket + item;
			return (this._priceBasket = this._priceBasket + item);
		} else {
			return this._priceBasket;
		}
	}

	// Вычет удаленых товаров в корзине
	subtractionCardsInBasket(item: number) {
		this.order.total = this._priceBasket - item;
		return (this._priceBasket = this._priceBasket - item);
	}

	setOrderField(field: keyof IOrderFormValid, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setContactsField(field: keyof IOrderFormValid, value: string) {
		this.order[field] = value;

		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо заполнить поле адреса';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо заполнить способ оплаты';
		}
		this.formErrors = errors;
		this.events.emit(`formErrorsOrder:change`, this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit(`formErrorsContacts:change`, this.formErrors);
		return Object.keys(errors).length === 0;
	}

	addCardIdInOrder(cardId: string) {
		const fondCard = this.order.items.find((card) => card === cardId);
		if (!fondCard) {
			this.order.items.push(cardId);
		}
	}

	clearOrder() {
		this.order.address = '';
		this.order.email = '';
		this.order.items = [];
		this.order.payment = '';
		this.order.phone = '';
		this.order.total = 0;
	}

	clearBasket() {
		this._basketCardArray = [];
		this._priceBasket = 0;
	}
}
