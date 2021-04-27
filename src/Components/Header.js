import React from 'react';
import { Text, View } from 'react-native';

import { css } from '../Styles';
import Label from './Label';

export default class Header extends React.Component {

  render () {
    return (
      <View style={css('items-center justify-center h-12 bg-gray-800')}>
        <Label style={css('text-lg text-white font-bold')}>IRET-BCU DEMO</Label>
      </View>
    )
  }
}
