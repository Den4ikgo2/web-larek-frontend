import { ICardsData, ICard, IOrderForm, IOrder, FormErrors } from "../types";
import { IEvents } from "./base/events";

export class CardData implements ICardsData {
    protected events: IEvents;
    protected _items: ICard[];
    protected _preview: string | null;
    protected _cardsInBasket: Array<string>;
    protected _basketCardArray: Array<ICard>;
    protected _priceBasket: number;
    order: IOrder = {
        address: '',
        email: '',
        phone: '',
        items: []
    };
    formErrors: FormErrors = {};


    constructor(events: IEvents) {
        this.events = events;
        this._basketCardArray = [];
        this._priceBasket = 0;
    }
    
    set items(items:ICard[]) {
        this._items = items;
        this.events.emit('cards:changed')
    }

    get items () {
        return this._items;
    }

    get basketCardArray () {
        return this._basketCardArray
    }


    //Добавление товара в корзину
    pushCardInBasket(card: ICard){
        if(this._basketCardArray.indexOf(card) < 0){
            this._basketCardArray.push(card)
        }
    }

    // Сумирование товаров в корзине
    sumCardsInBasket(item: number){
        return this._priceBasket = this._priceBasket + item;
    }

    // Вычет удаленых товаров в корзине
    subtractionCardsInBasket(item: number){
        return this._priceBasket = this._priceBasket - item;
    }

    setOrderField(field: keyof IOrderForm, value: string) {
        this.order[field] = value;

        if (this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    setContactsField(field: keyof IOrderForm, value: string) {
        this.order[field] = value;

        if (this.validateContacts()) {
            this.events.emit('contacts:ready', this.order);
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = "Необходимо заполнить поле адреса"
        }
        this.formErrors = errors;
        this.events.emit(`formErrorsOrder:change`, this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validateContacts(){
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
}
