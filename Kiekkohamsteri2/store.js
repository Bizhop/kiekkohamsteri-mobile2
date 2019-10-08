import { createStore, applyMiddleware, combineReducers } from 'redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import kiekkoReducer from './components/kiekot/reducer'
import homeReducer from './components/home/reducer'

const client = axios.create({
  baseURL: 'https://kiekkohamsteri.herokuapp.com/api',
  responseType: 'json',
})

export const store = createStore(
  combineReducers({
    kiekko: kiekkoReducer,
    home: homeReducer,
  }),
  applyMiddleware(axiosMiddleware(client)),
)
