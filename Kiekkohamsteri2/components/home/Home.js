import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import Login from './Login'

import { login, logout } from './reducer'

const Home = props => {
    const user = props.user
    return user ? 
        (
            <View>
                <Text>{user.username}</Text>
                <Text>{user.etunimi} {user.sukunimi} #{user.pdga_num}</Text>
                <Text>{user.email}</Text>
                <Text>Kiekkoja: {user.discCount} ({user.publicDiscCount ? 'julkinen' : 'yksityinen'}) </Text>
                <Text>Julkinen listaus: {user.publicList ? 'Kyllä' : 'Ei'}</Text>
                <Button
                    raised
                    title="Kirjaudu ulos"
                    onPress={() => props.logout()}
                />
            </View>
        ) : (
            <View>
                <Login backendLogin={props.backendLogin} />
            </View>
        )
}

const mapStateToProps = state => ({
    user: state.home.user,
    error: state.home.error
})

const mapDispatchToProps = dispatch => ({
    backendLogin: message => dispatch(login(message)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)