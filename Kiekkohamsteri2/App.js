import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import SyncStorage from 'sync-storage'

import kiekkoReducer from './components/kiekot/reducer'
import Kiekot from './components/kiekot/Kiekot'
import secret from './secret'

const client = axios.create({
  baseURL: 'https://kiekkohamsteri.herokuapp.com/api',
  responseType: 'json'
})

const store = createStore(kiekkoReducer, applyMiddleware(axiosMiddleware(client)))

const App = () => {
  SyncStorage.init()
    .then(data => {
      SyncStorage.set('token', secret)
      console.log('Storage ready!', data)
    })
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Kiekot />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  }
})

export default App