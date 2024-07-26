import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IModal {
    content: HTMLElement
}

export class Modal extends Component<IModal>{

    protected closeButton: HTMLButtonElement;
    protected _content: HTMLElement;
   /*  protected addInBasket: HTMLButtonElement; */

    constructor(container:HTMLElement, protected events:IEvents){
        super(container);
        
        this.closeButton = this.container.querySelector('.modal__close');
        this._content= this.container.querySelector('.modal__content')

        this.closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('mousedown', (evt) => {
            if(evt.target === evt.currentTarget){
                this.close();
            }
        });

    }

    set content(value: HTMLElement){
        this._content.replaceChildren(value)
    }

    open(){
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close(){
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

    render(data: IModal): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}