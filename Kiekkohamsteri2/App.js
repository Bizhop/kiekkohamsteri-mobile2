import React from 'react'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './components/home/Home'
import Kiekot from './components/kiekot/Kiekot'
import { store } from './store'

const Nav = createStackNavigator(
  {
    Home: Home,
    Kiekot: Kiekot
  },
  {
    initialRouteName: 'Home',
  }
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