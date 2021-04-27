import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { css, getColor } from '../Styles';
import Label from './Label';

export default class Panel extends React.Component {

  state = {
    bgColor: this.props.bgColor || getColor('gray-800'),
    textColor: this.props.textColor || getColor('white'),
    borderColor: this.props.borderColor || getColor('gray-800'),
  }

  render () {
    return (
      <View style={css('flex-1')}>
        <TouchableOpacity 
          onPress={this.props.onPress} 
          disabled={this.props.disabled} 
          style={[css('w-full items-center px-4 py-3 rounded-lg border'), { backgroundColor: this.props.disabled ? getColor('gray-400') : this.state.bgColor, borderColor: this.props.disabled ? getColor('gray-400') : this.state.borderColor }]}
        >
          <Label style={[css('font-medium'), { color: this.state.textColor }]}>{this.props.text}</Label>
        </TouchableOpacity>
      </View>
    )
  }
}
