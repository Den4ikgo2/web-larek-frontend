import { IApi, ICard, IOrder, IOrderForm, /* IOrderResult */ } from '../types';
import { Api, ApiListResponse } from './base/api';

export class AppApi {
	private _baseApi: IApi;
	readonly cdnApi: string;

	constructor(baseApi: IApi, cdnApi: string) {
		this._baseApi = baseApi;
		this.cdnApi = cdnApi;
	}

	async getCards(): Promise<ICard[]> {
		return await this._baseApi
			.get(`/product/`)
			.then((data: ApiListResponse<ICard>) =>
				data.items.map((item: ICard) => ({
					...item,
					image: this.cdnApi + item.image,
				}))
			);
	}

	orderLots(order: IOrder): Promise<IOrderForm> {
        return this._baseApi.post('/order', order).then(
            (data: IOrderForm) => data
        );
    }

	
}
