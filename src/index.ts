import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CardData } from './components/common/AppData';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { AppApi } from './components/common/AppApi';
import { Card } from './components/base/Card';
import { testCards } from './utils/tempConstants';
import { CardsContainer } from './components/CardContainer';

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const cdnApi: string = CDN_URL;
const api = new AppApi(baseApi, cdnApi);

const cardsData = new CardData(events)

const cardTemplate: HTMLTemplateElement =
    document.getElementById('card-catalog') as HTMLTemplateElement

const cardsContainer = new CardsContainer(
    document.querySelector('.gallery')
)

events.onAll((event) => {
    console.log(event.eventName, event.data)
})

Promise.all([api.getCards()])
    .then(([initialCards]) => {
        cardsData.items = initialCards
    })
    .catch((err) => {
        console.log(err)
    })


/* const mesto = document.querySelector('.gallery')


const card = new Card(cardTemplate, events)
card.setData(testCards.items[1]);
mesto.append(card.render()) */


const card = new Card(cardTemplate, events);
const card1 = new Card(cardTemplate, events);

const cardArray = [];

cardArray.push(card.render(testCards.items[0]))
cardArray.push(card1.render(testCards.items[1]))

cardsContainer.render({catalog:cardArray})