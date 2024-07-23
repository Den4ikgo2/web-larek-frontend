import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IModal {
    content: HTMLElement
}

export class Modal extends Component<IModal>{
    /* protected modal: HTMLElement; */
    protected closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container:HTMLElement, protected events:IEvents){
        super(container);
        
        this.closeButton = this.container.querySelector('.modal__close');
        this._content= this.container.querySelector('.modal__content')
        /* this.modal = ensureElement<HTMLElement>('.modal__content', container); */

        this.closeButton.addEventListener('click', this.close.bind(this));
        /* this.container.addEventListener('click', this.close.bind(this)); */
        /* this.modal.addEventListener('click', (event)=>{event.stopPropagation()}) */
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

    pushButtonEscUp(evt: KeyboardEvent){
        if (evt.key === "Escape"){
            this.close();
        }
    }

    render(data: IModal): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}