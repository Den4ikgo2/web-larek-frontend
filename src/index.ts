import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CardData } from './components/CardData';
import { IApi, ICard, IOrderForm, IOrderFormValid } from './types';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Card } from './components/Card';
import { testCards } from './utils/tempConstants';
import { CardsContainer } from './components/CardContainer';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Page } from './components/base/Page';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Form } from './components/common/Form';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/common/Success';

// Присвоение переменных, занесение классов в переменные
/* const basketCardArray: Array<ICard> = []; */
const events = new EventEmitter();
const cardsData = new CardData(events);
const modal = new Modal(document.getElementById('modal-container'), events);
const baseApi = new Api(API_URL, settings);
const api = new AppApi(baseApi, CDN_URL);
const pageView = new Page(document.querySelector('.page'), {
	onClick: () => {
		events.emit('basket:open');
	},
});
const cardsContainer = new CardsContainer(document.querySelector('.gallery'));

//Обозначение template элементов, присвоение переменных
const cardTemplateCard: HTMLTemplateElement = document.getElementById(
	'card-catalog'
) as HTMLTemplateElement;

const cardTemplateFullCard: HTMLTemplateElement = document.getElementById(
	'card-preview'
) as HTMLTemplateElement;

const basketTemplate: HTMLTemplateElement = document.getElementById(
	'basket'
) as HTMLTemplateElement;

const cardBasket: HTMLTemplateElement = document.getElementById(
	'card-basket'
) as HTMLTemplateElement;

const orderModal: HTMLTemplateElement = document.getElementById(
	'order'
) as HTMLTemplateElement;

const contactsModal: HTMLTemplateElement = document.getElementById(
	'contacts'
) as HTMLTemplateElement;

const successTemplate: HTMLTemplateElement = document.getElementById(
	'success'
) as HTMLTemplateElement;

//Обозначение перменной корзины
const basket = new Basket(cloneTemplate(basketTemplate), {
	onClick: () => {
		events.emit('order:open');
	},
});

const order = new Order(cloneTemplate(orderModal), events);
const contacts = new Contacts(cloneTemplate(contactsModal), events);

events.onAll((event) => {
	console.log(event.eventName, event.data);
});

/* Действия на проявление событий */
//Событие загрузки карточек на страницу
events.on('initialData: loaded', () => {
	const cardsArray = cardsData.items.map((card) => {
		const cardInstant = new Card(cloneTemplate(cardTemplateCard), {
			onClick: () => {
				events.emit('card:select', card);
			},
		});
		/* Работать здесь */

		cardInstant.showColorCategor(cardsData.definitionCategory(card.category));

		/* Работать здесь */
		return cardInstant.render(card);
	});

	cardsContainer.render({ catalog: cardsArray });
});

//Событие выбора карточки
events.on('card:select', (card: ICard) => {
	const modalCard = new Card(cloneTemplate(cardTemplateFullCard), {
		onClick: () => {
			events.emit('card:addInBasket', card);
		},
	});
	modalCard.showColorCategor(cardsData.definitionCategory(card.category));
	return modal.render({
		content: modalCard.render({
			title: card.title,
			category: card.category,
			description: card.description,
			image: card.image,
			price: card.price,
		}),
	});
});

//Событие открытия корзины, с уже подгружеными товарами в корзине
events.on('basket:open', () => {
	// рендер товаров в корзине
	let numberCard: number = 0;
	basket.items = cardsData.basketCardArray.map((item) => {
		const card = new Card(cloneTemplate(cardBasket), {
			onClick: () => {
				events.emit('basket:deleteCard', item);
			},
		});

		numberCard += 1;

		return card.render({
			title: item.title,
			price: item.price,
			index: numberCard,
		});
	});

	//Рендер самой корзины
	modal.render({
		content: createElement<HTMLElement>('div', {}, [basket.render()]),
	});
});

// Событие на добавление товара в корзину
events.on('card:addInBasket', (card: ICard) => {
	if (card.price != null) {
		basket.priceBasket = `${cardsData.sumCardsInBasket(
			card.price,
			card.id
		)} синапсов`;
		cardsData.pushCardInBasket(card);
		pageView.counter = cardsData.basketCardArray.length;
		cardsData.addCardIdInOrder(card.id);
	}
});

//Событие удаления карточки из корзины
events.on('basket:deleteCard', (card: ICard) => {
	let numberCard: number = 0;

	cardsData.basketCardArray.splice(cardsData.basketCardArray.indexOf(card), 1);

	basket.priceBasket = `${cardsData.subtractionCardsInBasket(
		card.price
	)} синапсов`;

	basket.items = cardsData.basketCardArray.map((item) => {
		const card = new Card(cloneTemplate(cardBasket), {
			onClick: () => {
				events.emit('basket:deleteCard', item);
			},
		});

		numberCard += 1;

		return card.render({
			title: item.title,
			price: item.price,
			index: numberCard,
		});
	});
	pageView.counter = cardsData.basketCardArray.length;
});

// Открытие модального окна способа оплаты и адреса доставки
events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось одно из полей, формы способа оплаты и адреса доставки
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderFormValid; value: string }) => {
		cardsData.setOrderField(data.field, data.value);
	}
);

// Изменилось состояние валидации формы, формы способа оплаты и адреса доставки
events.on('formErrorsOrder:change', (errors: Partial<IOrderForm>) => {
	const { address, payment } = errors;
	order.valid = !address && !payment;
	/* order.validPayment = !address && !payment; */
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
});

// Открытие модального окна почты и телефона
events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось одно из полей, формы почты и телефонв
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderFormValid; value: string }) => {
		cardsData.setContactsField(data.field, data.value);
	}
);

// Изменилось состояние валидации формы, формы почты и телефона
events.on('formErrorsContacts:change', (errors: Partial<IOrderForm>) => {
	const { phone, email } = errors;
	contacts.valid = !phone && !email;
	contacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

// Событие нажатия на кнопку оплата онлайн
events.on('formButton:buyOnline', () => {
	order.chooseOnline();
	cardsData.order.payment = 'Онлайн';

	if (cardsData.order.address != '') {
		order.valid = true;
		order.errors = '';
	}
});

// Событие нажатия на кнопку оплата при получении
events.on('formButton:buyHandse', () => {
	order.chooseHandse();
	cardsData.order.payment = 'При получении';

	if (cardsData.order.address != '') {
		order.valid = true;
		order.errors = '';
	}
	console.log(cardsData._priceBasket);
});

// Вызов оплаты
events.on('contacts:submit', () => {
	api
		.orderLots(cardsData.order)
		.then((result) => {
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
					events.emit('auction:changed');
					console.log(cardsData._priceBasket);
				},
			});

			cardsData.clearBasket();
			pageView.counter = 0;
			basket.priceBasket = '0';
			order.disableButtons();
			success.sumOrder(result.total);
			cardsData.clearOrder();

			modal.render({
				content: success.render({}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Работа с API
api
	.getCards()
	.then((initialCards) => {
		cardsData.items = initialCards;
		events.emit('initialData: loaded');
	})
	.catch((err) => {
		console.log(err);
	});
