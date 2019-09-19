import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import { login } from './reducer'

const Home = props => {
    _setupGoogleSignin()
    return props.user ? 
        (
            <View>
                <Text>Email: {props.user.email}</Text>
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
        console.log(userInfo)
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