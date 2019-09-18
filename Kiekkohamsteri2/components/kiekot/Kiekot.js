import React from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native'
import { connect } from 'react-redux'

import { getDiscs } from './reducer'
import SyncStorage from 'sync-storage'

const Kiekot = props => {
    if(props.error) {
        return <View style={styles.container}><Text>{props.error}</Text></View>
    }
    else if(props.loading) {
        return <View style={styles.container}><ActivityIndicator size="large" /></View>
    }
    else if(props.kiekot == null) {
        return (
            <View>
                <Button 
                    title="Hae kiekot"
                    onPress={() => props.myDiscs()}
                />
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <Text>Kiekot: {props.kiekot.totalElements}</Text>
                <FlatList
                    styles={styles.container}
                    data={props.kiekot.content}
                    renderItem={Item}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}

const Item = ({ item }) => (
    <View style={styles.item}>
        <Text>{item.mold}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});

const mapStateToProps = state => ({
    kiekot: state.kiekot,
    loading: state.loading,
    error: state.error,
    token: state.token
})

const mapDispatchToProps = dispatch => ({
    myDiscs: () => dispatch(getDiscs(SyncStorage.get('token')))
})

export default connect(mapStateToProps, mapDispatchToProps)(Kiekot)