import {Component} from "../base/Component";
import {cloneTemplate, createElement, ensureElement} from "../../utils/utils";
import {EventEmitter} from "../base/events";
import { ICard, ICardActions } from "../../types";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;
    protected _priceBasket: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._list = this.container.querySelector('.basket__list')
        this._total = this.container.querySelector('.basket__total');
        this._button = this.container.querySelector('.basket__button');
        this._priceBasket = this.container.querySelector('.basket__price');

        if (this._button) {
            this._button.addEventListener('click', actions.onClick);
        }

        this.items = [];
        
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set priceBasket(item: number){
        this._priceBasket.textContent = item.toString();
    }
}