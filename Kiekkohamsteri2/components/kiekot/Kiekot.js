import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { path } from 'ramda'
import SyncStorage from 'sync-storage'

import { getDiscs } from './reducer'
import styles from '../shared/styles'
import { discBasics, discStats, imagesUrl } from '../shared/text'

const Kiekot = props => (
    <View style={styles.container}>
        <InsideView props={props}/>
    </View>
)

const InsideView = ({props}) => {
    if(props.loading) return <ActivityIndicator size="large" />
    else if(props.kiekot != null) {
        return (
            <FlatList
                styles={styles.container}
                data={props.kiekot.content}
                renderItem={Item}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
    else return (
        <View>
            {props.error && <Text>{props.error}</Text>}
        </View>
    )
}

const Item = ({ item }) => (
    <ListItem
        bottomDivider
        title={discBasics(item)}
        subtitle={discStats(item)}
        leftAvatar={{ source: { uri: `${imagesUrl}t_lista/${item.kuva}` }}}
    />
)

const mapStateToProps = state => ({
    kiekot: path(['kiekko', 'kiekot'], state),
    loading: path(['kiekko', 'loading'], state),
    error: path(['kiekko', 'error'], state)
})

const mapDispatchToProps = dispatch => ({
    myDiscs: () => dispatch(getDiscs({ token: SyncStorage.get('token') }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Kiekot)