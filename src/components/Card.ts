import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";
import { ICard, ICardActions } from "../types";
import { Component } from "./base/Component";


export class Card extends Component<ICard> {
    protected cardButton: HTMLButtonElement;
    protected cardCategory: HTMLSpanElement;
    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardPrice: HTMLSpanElement;
	protected cardIndex: HTMLSpanElement;
    protected cardText: HTMLElement;
    protected addInBasket: HTMLButtonElement;


    protected cardId: string;
    protected events: IEvents;
	/* protected deleteButton: HTMLButtonElement; */
	
	

	constructor(protected container: HTMLElement, actions?: ICardActions) {
		super(container)
		/* this.events = events; */

		/* this.deleteButton = this.container.querySelector('.card__delete-button'); */
        this.cardButton = this.container.querySelector('.gallery__item card');
        this.cardCategory = this.container.querySelector('.card__category');
        this.cardTitle = this.container.querySelector('.card__title');
		this.cardImage = this.container.querySelector('.card__image');
        this.cardPrice = this.container.querySelector('.card__price');
		this.cardIndex = this.container.querySelector('.basket__item-index');
        this.cardText = this.container.querySelector('.card__text');
        this.addInBasket = this.container.querySelector('.card__button');
		
		
		if(this.addInBasket){
			this.addInBasket.addEventListener('click', actions.onClick);
		} else {
			this.container.addEventListener('click', actions.onClick);
		}
	}

 	render(cardData?: Partial<ICard> | undefined) {
		
		if(!cardData) return this.container;

		return super.render(cardData)

	}
	
	set description(description:string){
		if(this.cardText) {
			this.cardText.textContent = description;
		}
	}

	set id(id:string){
		this.cardId = id;
	}

	set image(image: string){
		if(this.cardImage){
			this.cardImage.src = image;
		}
	}	

	set title(title:string){
		this.cardTitle.textContent = title;
	}

	set category(category: string){
		if(this.cardCategory){
			this.cardCategory.textContent = category;
		}
	}

	set price(price: number | null){
		this.cardPrice.textContent = "Бесценно";
		if(price !== null){
			this.cardPrice.textContent = `${price.toLocaleString()} синапсов`;
		} 
		
	}

	set index(index: number){
		if(this.cardIndex){
			this.cardIndex.textContent = index.toLocaleString();
		}
	}
}