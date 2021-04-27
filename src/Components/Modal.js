import React from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';

import { css } from '../Styles';
import Label from './Label';


class Modal extends React.Component {

  _submit () {
    this.props.addRoom(this.state.room)
  }

  render () {
    return (

      <View style={[css('absolute top-0 left-0 z-10 w-full h-full mt-12'), { backgroundColor: 'rgba(0,0,0,0.5)'}]}>
        <View style={css('flex-1 items-center')}>
          <View style={css('w-5/6 mt-20 bg-white items-center rounded-lg')}>
            {this.props.title &&
            <View style={css('w-full h-10 items-center justify-center bg-gray-200 rounded-t-lg')}>
              <Label style={css('font-bold text-gray-800')}>ADD ROOM</Label>
            </View>}
            <View style={css('w-full px-3 py-4')}>
              {this.props.children}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ app }) => ({

})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
