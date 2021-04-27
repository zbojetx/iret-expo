import { createStore, combineReducers } from 'redux';

import app from './App/Index';


const reducers = combineReducers({
  app,
})

const store = createStore(reducers)

export default store
