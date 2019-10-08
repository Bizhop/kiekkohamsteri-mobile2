import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import SyncStorage from 'sync-storage'
import { GoogleSignin } from 'react-native-google-signin'
import { store } from './store'
import { myDetails } from './components/home/reducer'

AppRegistry.registerComponent(appName, () => App)
SyncStorage.init().then(() => {
  store.dispatch(myDetails({ token: SyncStorage.get('token') }))
})
GoogleSignin.configure({
  webClientId: '595234643015-bgemfas3rb4kqc7sfourtuos5uusii33.apps.googleusercontent.com',
  offlineAccess: false,
})
