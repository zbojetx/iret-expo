import React from 'react';
import { Text } from 'react-native';


export default class Panel extends React.Component {

  render () {
    return (
      <Text {...this.props}>
        {this.props.children}
      </Text>
    )
  }
}
