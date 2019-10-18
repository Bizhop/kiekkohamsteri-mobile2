import React from 'react'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import styles from '../shared/styles'

class NavButton extends React.Component {
  constructor(props) {
    super(props)
  }

  execute() {
    this.props.dispatch(this.props.action(this.props.params))
    this.props.navigation.navigate(this.props.destination)
  }

  render() {
    return (
      <Button
        buttonStyle={styles.button}
        raised
        title={this.props.title}
        onPress={() => this.execute()}
      />
    )
  }
}

export default connect()(withNavigation(NavButton))
