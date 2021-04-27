import React from 'react';
import { TextInput, View } from 'react-native';
import { css } from '../Styles';

import Label from './Label';


export default class InputField extends React.Component {

  render () {
    return (
      <TextInput 
        placeholder={this.props.placeholder}
        onChangeText={this.props.onChange} 
        style={[this.props.style, css('w-full h-10 my-1 px-4 text-gray-600 border border-gray-300 rounded')]} 
        {...this.props}
      />
    )
  }
}