import React from "react";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    login() {
        GoogleSignin.hasPlayServices()
            .then(GoogleSignin.signIn)
            .then(this.props.backendLogin)
            .catch(console.log)
    }
    render() {
        return <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => this.login()} />
    }
}
