import { IApi, ICard } from '../../types';
import { ApiListResponse } from '../base/api';

export class AppApi {
	private _baseApi: IApi;
	readonly cdnApi: string;

	constructor(baseApi: IApi, cdnApi: string) {
		this._baseApi = baseApi;
		this.cdnApi = cdnApi;
	}

	async getCards(): Promise<ICard[]> {
		return await this._baseApi
			.get<ICard>(`/product/`)
			.then((data: ApiListResponse<ICard>) =>
				data.items.map((item: ICard) => ({
					...item,
					image: this.cdnApi + item.image,
				}))
			);
	}

	/* addCard(data: TCardInfo): Promise<ICard> {
		return this._baseApi.post<ICard>(`/cards`, data).then((card: ICard) => card);
	} */

	/* removeCard(cardID: string): Promise<{ message: string }> {
		return this._baseApi.post<{ message: string }>(`/cards/${cardID}`, {}, 'DELETE').then(
			(res: { message: string }) => res
		);
	} */

	/* setUserInfo(data: TUserBaseInfo): Promise<IUser> {
		return this._baseApi.post<IUser>(`/users/me`, data, 'PATCH').then((res: IUser) => res);
	} */

	/* setUserAvatar(data: TUserAvatar): Promise<IUser> {
		return this._baseApi.post<IUser>(`/users/me/avatar`, data, 'PATCH').then(
			(res: IUser) => res
		);
	} */

	/* changeLikeCardStatus(cardID: string, like: boolean): Promise<ICard> {
		const method = like ? 'DELETE' : 'PUT';
		return this._baseApi.post<ICard>(`/cards/like/${cardID}`, {}, method).then(
			(res: ICard) => res
		);
	} */
}
