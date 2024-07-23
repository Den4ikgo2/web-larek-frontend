export interface ICardsData {
	items: ICard[];
	/* preview: string | null; */
	/* deleteCard(cardId: string, payload: Function | null): void; */
	/* updateCard(card: ICard, payload: Function | null): void; */
	/* getCard(cardId: string): ICard; */
	/* checkValidation(data: Record<keyof TCardInfo, string>): boolean; */
}

export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export type ApiPostMethods = 'POST' | 'GET';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IPage {
	content: HTMLElement[];
	counter: number;
}


