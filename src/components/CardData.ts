import { ICardsData, ICard } from "../types";
import { IEvents } from "./base/events";

export class CardData implements ICardsData {
    protected events: IEvents;
    protected _items: ICard[];
    protected _preview: string | null;

    constructor(events: IEvents) {
        this.events = events;
    }
    
    set items(items:ICard[]) {
        this._items = items;
        this.events.emit('cards:changed')
    }

    get items () {
        return this._items;
    }
    
    /* getCard(cardId: string) {
        return this._items.find((item) => item.id === cardId)
    }

    setPreview(item: ICard) {
        this._preview = item.id;
        this.events.emit('preview:changed', item);
    } */

}
