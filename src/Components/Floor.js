import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { css } from '../Styles';
import Room from './Room';

class Floor extends React.Component {  

  render () {
    return (
      <View style={css('flex-1 bg-white')}>
        {this.props.rooms.map((room) => (
          <Room key={room.name} {...room} />
        ))}
      </View>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  rooms: app.rooms,
  doors: app.doors
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Floor)