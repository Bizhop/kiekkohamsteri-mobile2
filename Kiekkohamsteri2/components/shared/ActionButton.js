import React from 'react'
import { Button } from 'react-native-elements'
import styles from '../shared/styles'

class ActionButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Button
        buttonStyle={styles.button}
        raised
        title={this.props.title}
        onPress={() => this.props.action()}
      />
    )
  }
}

export default ActionButton
