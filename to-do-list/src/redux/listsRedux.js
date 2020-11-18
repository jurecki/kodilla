import shortid from 'shortid';

//selectors

// action name creator
const reducerName = 'lists';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const ADD_LIST= createActionName('ADD_LIST');

// action creators
export const createActionAddList= payload => ({payload: {...payload, id: shortid.generate()}, type: ADD_LIST});

// reducer
export default function reducer(state = [], action ={}) {
  switch(action.type) {
    case ADD_LIST:
      return [action.payload, ...state];
    default:
      return state;
  }
}