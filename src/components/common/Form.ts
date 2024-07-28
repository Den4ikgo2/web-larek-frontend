import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IFormState {
	valid: boolean;
	errors: string[];
}

export class Form<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;
	protected _buttonOnline: HTMLButtonElement;
	protected _buttonHandse: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = this.container.querySelector('.button[type=submit]');
		this._errors = this.container.querySelector('.form__errors');
		/* this._buttonOnline = this.container.querySelector('.button_alt_online')
        this._buttonHandse = this.container.querySelector('.button_alt_hands') */

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});

		/* if(this._buttonOnline){
            this._buttonOnline.addEventListener('click', () => {
                this.events.emit(`${this.container.name}:${this._buttonOnline.textContent}`)
            })
        }

        if(this._buttonHandse){
            this._buttonHandse.addEventListener('click', () => {
                this.events.emit(`${this.container.name}:${this._buttonHandse.textContent}`)
            })
        } */
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
		/* if(this._buttonHandse){
            this._buttonHandse.disabled = !value
        }
        if(this._buttonOnline){
            this._buttonOnline.disabled = !value
        } */
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
