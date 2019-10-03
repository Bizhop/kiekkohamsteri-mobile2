import React from 'react'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Home from './components/home/Home'
import Kiekot from './components/kiekot/Kiekot'
import { store } from './store'

const Tabs = createBottomTabNavigator({
    Home: Home,
    Kiekot: Kiekot
})

const AppContainer = createAppContainer(Tabs)

const App = () => {
  return (
    <Provider store={store}>
        <AppContainer />
    </Provider>
  )
}

export default App