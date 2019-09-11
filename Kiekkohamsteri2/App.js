import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import kiekkoReducer from './components/kiekot/reducer'
import Kiekot from './components/kiekot/Kiekot'
import secret from './secret'

axios.defaults.headers.common['Authorization'] = secret
const client = axios.create({
  baseURL: 'https://kiekkohamsteri.herokuapp.com/api',
  responseType: 'json'
})

const store = createStore(kiekkoReducer, applyMiddleware(axiosMiddleware(client)))

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <Kiekot />
    </View>
  </Provider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  }
})

export default App