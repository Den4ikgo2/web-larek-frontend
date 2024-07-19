import { IEvents } from "./events";
import { cloneTemplate } from "../../utils/utils";
import { ICard } from "../../types";

export class Card {
    protected cardButton: HTMLButtonElement;
    protected cardCategory: HTMLSpanElement;
    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardPrice: HTMLSpanElement;

    protected cardText: HTMLElement;
    protected cardBasketButton: HTMLButtonElement


    protected cardId: string;
    protected events: IEvents;
	protected element: HTMLElement;
	/* protected deleteButton: HTMLButtonElement; */
	
	

	constructor(template: HTMLTemplateElement, events: IEvents) {
		this.events = events;
		this.element = cloneTemplate(template);

		/* this.deleteButton = this.element.querySelector('.card__delete-button'); */
        this.cardButton = this.element.querySelector('.gallery__item card');
        this.cardCategory = this.element.querySelector('.card__category');
        this.cardTitle = this.element.querySelector('.card__title');
		this.cardImage = this.element.querySelector('.card__image');
        this.cardPrice = this.element.querySelector('.card__price');

        this.cardText = this.element.querySelector('.card__text');
        this.cardBasketButton = this.element.querySelector('.card__button');
		
		this.cardImage.addEventListener('click', () =>
			this.events.emit('card:select', { card: this })
		);

		/* this.deleteButton.addEventListener('click', () =>
			this.events.emit('card:delete', { card: this })
		); */
	}


	
/* 	setData(cardData: ICard) {
		this.cardId = cardData.id; */
		/* this.cardText.textContent = cardData.description; */
/* 		this.cardImage.src = cardData.image;
		this.cardTitle.textContent = cardData.title;
		this.cardCategory.textContent = cardData.category;
		this.cardPrice.textContent = cardData.price.toString();
	}




	render() {
		return this.element;
	}
 */


 	render(cardData: Partial<ICard>) {
		  const allCardData = cardData
		  Object.assign(this, allCardData)
		  return this.element
	}

	/* set description(description:string){
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

	set price(price: number){
		this.cardPrice.textContent = price.toString();
	}


/* 	get _id() {
		return this.cardId;
	} 

 */






	/* deleteCard() {
		this.element.remove();
		this.element = null;
	} */

}