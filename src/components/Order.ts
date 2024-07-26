import { ICardActions, IOrderForm } from "../types";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";


export class Order extends Form<IOrderForm>{
    constructor(container: HTMLFormElement, protected events: IEvents){
        super(container, events)
    }

    set address(value: string){
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    /* set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    } */

    /* set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    } */
}