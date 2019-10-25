import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { path } from 'ramda'
import SyncStorage from 'sync-storage'
import ImagePicker from 'react-native-image-crop-picker'

import Login from './Login'
import NavButton from '../shared/NavButton'
import { login, logout } from './reducer'
import { getDiscs, newDisc } from '../kiekot/reducer'
import styles from '../shared/styles'
import ActionButton from '../shared/ActionButton'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Kiekkohamsteri',
  }

  render() {
    const user = this.props.user
    return user ? (
      <View style={styles.container}>
        <Text>{user.username}</Text>
        <Text>
          {user.etunimi} {user.sukunimi} #{user.pdga_num}
        </Text>
        <Text>{user.email}</Text>
        <Text>
          Kiekkoja: {user.discCount} ({user.publicDiscCount ? 'julkinen' : 'yksityinen'}){' '}
        </Text>
        <Text>Julkinen listaus: {user.publicList ? 'Kyllä' : 'Ei'}</Text>
        <NavButton
          action={getDiscs}
          params={{ token: SyncStorage.get('token') }}
          destination="Kiekot"
          title="Hae kiekot"
        />
        <ActionButton
          title="Ota kuva"
          action={openCamera}
          dispatch={this.props.newDisc}
          params={{ token: SyncStorage.get('token') }}
        />
        <ActionButton
          title="Valitse kuva"
          action={selectPhoto}
          dispatch={this.props.newDisc}
          params={{ token: SyncStorage.get('token') }}
        />
        <ActionButton title="Kirjaudu ulos" action={this.props.logout} />
      </View>
    ) : (
      <View>
        <Login backendLogin={this.props.backendLogin} />
      </View>
    )
  }
}

const openCamera = params => {
  ImagePicker.openCamera(imageProperties)
    .then(image => {
      params.dispatch({
        token: path(['params', 'token'], params),
        image: image.data,
      })
    })
    .catch(error => {
      console.log(error)
    })
}

const selectPhoto = params => {
  ImagePicker.openPicker(imageProperties)
    .then(image => {
      params.dispatch({
        token: path(['params', 'token'], params),
        image: image.data,
      })
    })
    .catch(error => {
      console.log(error)
    })
}

const imageProperties = {
  width: 400,
  height: 400,
  cropping: true,
  includeBase64: true,
  compressImageQuality: 0.8,
}

const mapStateToProps = state => ({
  user: path(['home', 'user'], state),
  error: path(['home', 'error'], state),
})

const mapDispatchToProps = dispatch => ({
  backendLogin: message => dispatch(login(message)),
  logout: () => dispatch(logout()),
  newDisc: params => dispatch(newDisc(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
