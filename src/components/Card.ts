import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";
import { ICard } from "../types";
import { Component } from "./base/Component";

export class Card extends Component<ICard> {
    protected cardButton: HTMLButtonElement;
    protected cardCategory: HTMLSpanElement;
    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardPrice: HTMLSpanElement;

    protected cardText: HTMLElement;
    protected cardBasketButton: HTMLButtonElement


    protected cardId: string;
    protected events: IEvents;
	/* protected deleteButton: HTMLButtonElement; */
	
	

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container)
		this.events = events;

		/* this.deleteButton = this.container.querySelector('.card__delete-button'); */
        this.cardButton = this.container.querySelector('.gallery__item card');
        this.cardCategory = this.container.querySelector('.card__category');
        this.cardTitle = this.container.querySelector('.card__title');
		this.cardImage = this.container.querySelector('.card__image');
        this.cardPrice = this.container.querySelector('.card__price');

        this.cardText = this.container.querySelector('.card__text');
        this.cardBasketButton = this.container.querySelector('.card__button');
		
		this.cardImage.addEventListener('click', () =>
			this.events.emit('card:select', { card: this })
		);

		/* this.deleteButton.addEventListener('click', () =>
			this.events.emit('card:delete', { card: this })
		); */
	}

 	render(cardData?: Partial<ICard> | undefined) {
		
		if(!cardData) return this.container;

		if(this.container.classList.contains('card__text') && cardData?.description) {
			this.cardText.textContent = cardData.description;
		}

		return super.render(cardData)

	}
	
/* 	set description(description:string){
		this.cardText.textContent = description;
	} */

	set id(id:string){
		this.cardId = id;
	}

	set image(image: string){
		this.cardImage.src = image;
	}	

	set title(title:string){
		this.cardTitle.textContent = title;
	}

	set category(category: string){
		this.cardCategory.textContent = category;
	}

	set price(price: number | null){
		this.cardPrice.textContent = "Бесценно";
		if(price !== null){
			this.cardPrice.textContent = `${price.toLocaleString()} синапсов`;
		} else {
		}
	}


/* 	get _id() {
		return this.cardId;
	} 

 */

	/* deleteCard() {
		this.container.remove();
		this.container = null;
	} */

}