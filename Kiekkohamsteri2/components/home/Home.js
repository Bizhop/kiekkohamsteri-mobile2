import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { path } from 'ramda'
import SyncStorage from 'sync-storage'
import ImagePicker from 'react-native-image-crop-picker'

import Login from './Login'
import NavButton from '../shared/NavButton'
import { login, logout } from './reducer'
import { getDiscs } from '../kiekot/reducer'
import styles from '../shared/styles'
import ActionButton from '../shared/ActionButton'

const Home = props => {
  const user = props.user
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
      <ActionButton title="Ota kuva" action={openCamera} />
      <ActionButton title="Valitse kuva" action={selectPhoto} />
      <ActionButton title="Kirjaudu ulos" action={props.logout} />
    </View>
  ) : (
    <View>
      <Login backendLogin={props.backendLogin} />
    </View>
  )
}

const openCamera = () => {
  ImagePicker.openCamera(imageProperties)
    .then(image => {
      console.log(image)
    })
    .catch(error => {
      console.log(error)
    })
}

const selectPhoto = () => {
  ImagePicker.openPicker(imageProperties)
    .then(image => {
      console.log(image)
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
