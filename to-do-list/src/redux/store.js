import initialStoreData from '../data/dataStore';
import {combineReducers, createStore} from 'redux';
import columnsReducer from './columnsRedux';
import cardReducer from './cardsRedux';
import listReducer from './listsRedux';
import searchReducer from './searchStringRedux';

// define initial state and shallow-merge initial data
const initialState = {
  app: initialStoreData.app,
  lists: initialStoreData.lists,
  columns: initialStoreData.columns,
  cards: initialStoreData.cards,
  searchString: '',
};
  
// define reducers
const reducers = {
  columns: columnsReducer,
  cards: cardReducer,
  lists: listReducer,
  searchString: searchReducer,
};
  
// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});
  
// merge all reducers
const storeReducer = combineReducers(reducers);
  
// create store
const store = createStore(
  storeReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
  
export default store;