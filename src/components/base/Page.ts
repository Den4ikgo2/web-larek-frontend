import { ICard, IPage, ICardActions } from "../../types";
import { Component } from "./Component";
import { IEvents } from "./events";


export class Page extends Component<ICard> implements IPage {
    protected _content: HTMLElement;
    protected pageOpenBasket: HTMLButtonElement;
    
    protected counterBasket: HTMLSpanElement;
    protected events: IEvents;

    constructor(container: HTMLElement, actions?: ICardActions){
        super(container)
        this._content = this.container.querySelector('.gallery')
        this.counterBasket = this.container.querySelector('.header__basket-counter');
        this.pageOpenBasket = this.container.querySelector('.header__basket');

        this.pageOpenBasket.addEventListener('click', actions.onClick);
    }

    set counter (item: number){
        this.counterBasket.textContent = item.toString();
    }

    
    set content(cards: HTMLElement[]){
        if(cards) {
            this._content.replaceChildren(...cards)
        } else{
            this._content.innerHTML = '';
        }
    }

} 