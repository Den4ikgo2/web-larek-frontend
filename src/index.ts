import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CardData } from './components/CardData';
import { IApi, ICard } from './types';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Card } from './components/Card';
import { testCards } from './utils/tempConstants';
import { CardsContainer } from './components/CardContainer';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/base/Page';
import { Modal } from './components/common/Modal';

/* const cdnApi: string = CDN_URL; */
const events = new EventEmitter();
const cardsData = new CardData(events);

const baseApi = new Api(API_URL, settings);
const api = new AppApi(baseApi, CDN_URL);
const pageView = new Page(document.querySelector('.page'), events);
const modal = new Modal(document.getElementById('modal-container'), events);

const cardTemplateCard: HTMLTemplateElement =
    document.getElementById('card-catalog') as HTMLTemplateElement

const cardTemplateFullCard: HTMLTemplateElement =
    document.getElementById('card-preview') as HTMLTemplateElement

const cardsContainer = new CardsContainer(
    document.querySelector('.gallery')
)

events.onAll((event) => {
    console.log(event.eventName, event.data)
})

api.getCards()
    .then((initialCards) => {
        cardsData.items = initialCards
        /* console.log(cardsData.items); */
        events.emit('initialData: loaded')
    })
    .catch((err) => {
        console.log(err)
    })


/* const mesto = document.querySelector('.gallery')


const card = new Card(cardTemplate, events)
card.setData(testCards.items[1]);
mesto.append(card.render()) */


/* const card = new Card(cloneTemplate(cardTemplate), events);
const card1 = new Card(cloneTemplate(cardTemplate), events);
const card2 = new Card(cloneTemplate(cardTemplate), events);

const cardArray = [];

cardArray.push(card.render(testCards.items[0]))
cardArray.push(card1.render(testCards.items[1]))
cardArray.push(card2.render(testCards.items[5]))

cardsContainer.render({catalog:cardArray}) */

events.on('initialData: loaded', () => {
    const cardsArray = cardsData.items.map((card) => {
        const cardInstant = new Card(cloneTemplate(cardTemplateCard), events);
        return cardInstant.render(card)
    });

    cardsContainer.render({catalog: cardsArray});
})


/* events.on('card:select', (item: LotItem) => {
    appData.setPreview(item);
}); */

events.on('card:select', (card) => {
    console.log(card);
    const modalCard = new Card(cloneTemplate(cardTemplateFullCard), events);
    console.log(modalCard)
    return modal.render({
        content: modalCard.render({
            title: card.title,
        })
    })
})