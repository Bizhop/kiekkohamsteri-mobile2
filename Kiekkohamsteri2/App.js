import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'

import Home from './components/home/Home'
import { store } from './store'

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home />
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