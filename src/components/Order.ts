import { ICardActions, IOrderForm } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Order extends Form<IOrderForm> {
	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._buttonOnline = this.container.querySelector('.button_alt_online');
		this._buttonHandse = this.container.querySelector('.button_alt_hands');

        this._buttonHandse.disabled = true;
        this._buttonOnline.disabled = true;

        this._buttonHandse.addEventListener('click', () =>{
            events.emit('formButton:buyHandse')
        })

        this._buttonOnline.addEventListener('click', () =>{
            events.emit('formButton:buyOnline')
        })
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set validPayment(value: boolean) {
		this._buttonHandse.disabled = !value;
		this._buttonOnline.disabled = !value;

	}

    chooseOnline(){
        this._buttonOnline.classList.add('button_alt-active')
        this._buttonHandse.classList.remove('button_alt-active')

        this._buttonHandse.disabled = true;
        this._buttonOnline.disabled = false;

    }

    chooseHandse(){
        this._buttonOnline.classList.remove('button_alt-active')
        this._buttonHandse.classList.add('button_alt-active')

        this._buttonHandse.disabled = false;
        this._buttonOnline.disabled = true;
    }

    disableButtons(){
        this._buttonOnline.classList.remove('button_alt-active')
        this._buttonHandse.classList.remove('button_alt-active')

        this._buttonHandse.disabled = true;
        this._buttonOnline.disabled = true;
    }

}
