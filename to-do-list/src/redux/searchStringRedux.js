// selectors
export const getSearchString = store => store.searchString;
export const countAllCards = store => store.cards.length;
export const countVisibleCards = store => store.cards.filter(card => new RegExp(store.searchString, 'i').test(card.title)).length;

// action name creator
const reducerName = 'searchString';
const createActionName = name => `app/${reducerName}/${name}`;

// actions types
export const CHANGE_STRING= createActionName('CHANGE_STRING');

// action creators
export const createAction_changeSearchString = payload => ({payload, type: CHANGE_STRING});

// reducer
export default function reducer(statePart = '', action = {}) {
  switch(action.type) {
    case CHANGE_STRING:
      return action.payload;
    default:
      return statePart;
  }
}

