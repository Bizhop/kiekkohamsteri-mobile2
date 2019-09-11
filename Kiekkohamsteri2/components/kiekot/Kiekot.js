
import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { getDiscs } from './reducer'

const Kiekot = props => {
    return props.loading ? 
    ( <ActivityIndicator size="large" /> ) :
    ( <FlatList
        styles={styles.container}
        data={props.kiekot}
        renderItem={Item}
        keyExtractor={item => item.id.toString()}
    /> )
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
    loading: state.loading
})

const mapDispatchToProps = dispatch => ({
    getDiscs: dispatch(getDiscs())
})

export default connect(mapStateToProps, mapDispatchToProps)(Kiekot)