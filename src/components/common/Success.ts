import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
    protected _priceOrder: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._priceOrder = this.container.querySelector('.order-success__description');

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }
    
    sumOrder(item: number){
        this._priceOrder.textContent = item.toString();
    }
}