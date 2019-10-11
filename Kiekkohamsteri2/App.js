import React from 'react'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './components/home/Home'
import Kiekot from './components/kiekot/Kiekot'
import Kamera from './components/kamera/Kamera'
import { store } from './store'

const Nav = createStackNavigator(
  {
    Home: Home,
    Kiekot: Kiekot,
    Kamera: Kamera
  },
  {
    initialRouteName: 'Home',
  },
)

const AppContainer = createAppContainer(Nav)

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App
