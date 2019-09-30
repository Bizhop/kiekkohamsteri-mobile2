import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import { login } from './reducer'

const Home = props => {
    _setupGoogleSignin()
    const user = props.user
    return user ? 
        (
            <View>
                <Text>{user.username}</Text>
                <Text>{user.etunimi} {user.sukunimi} #{user.pdga_num}</Text>
                <Text>{user.email}</Text>
                <Text>Kiekkoja: {user.discCount} ({user.publicDiscCount ? 'julkinen' : 'yksityinen'}) </Text>
                <Text>Julkinen listaus: {user.publicList ? 'Kyllä' : 'Ei'}</Text>
            </View>
        ) : (
            <View>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => _signIn(props)} />
            </View>
        )
}

_setupGoogleSignin = () => {
    GoogleSignin.configure({
        webClientId: "595234643015-bgemfas3rb4kqc7sfourtuos5uusii33.apps.googleusercontent.com",
        offlineAccess: false
    })
}

_signIn = async props =>  {
    try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        props.backendLogin(userInfo)
    }
    catch (error) {
        console.log(error)
    }
}

const mapStateToProps = state => ({
    user: state.home.user,
    error: state.home.error
})

const mapDispatchToProps = dispatch => ({
    backendLogin: message => dispatch(login(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)