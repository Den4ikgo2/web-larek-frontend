export interface ICardsData {
	items: ICard[];
}

export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	index: number;
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

export interface ICardActions{
	onClick: () => void;
}

export interface IOrderForm {
	address: string;
    email: string;
    phone: string;
}


export interface IOrder extends IOrderForm {
    items: string[]
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;