import React from 'react';
import { PanResponder, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { css, getColor } from '../Styles';
import { updateRoom } from '../Stores/App/Action';
import Label from './Label';


class Room extends React.Component {
  
  _previousX = this.props.rooms.find(x => x.name === this.props.name).x
  _previousY = this.props.rooms.find(x => x.name === this.props.name).y
  roomRef = null

  state = {
    name: '', 
    color: '',
    width: 0, 
    height: 0, 
    x: 0,
    y: 0,
    active: false,
    overlap: false,
  }

  componentDidMount() {
    this.setState({
      ...this.props.rooms.find(x => x.name === this.props.name)
    })
  }

  componentDidUpdate(prev) {
    const current = this.props.rooms.find(x => x.name === this.props.name)
    if (current.x !== prev.x || current.y !== prev.y) {      
      this.setState({
        ...this.props.rooms.find(x => x.name === this.props.name)
      })
    }
  }

  _handleStartShouldSetPanResponder = (event, gestureState) => true
  _handleMoveShouldSetPanResponder = (event, gestureState) => true
  _handlePanResponderGrant = (event, gestureState) => {
    this.setState({ active: true })
  }
  _handlePanResponderEnd = (event, gestureState) => {
    this.setState({ active: false })
    this.props.updateRoom({
      name: this.state.name,
      x: this.state.x,
      y: this.state.y,
      overlap: true,
    })
    this._previousX += gestureState.dx
    this._previousY += gestureState.dy
  }

  _handlePanResponderMove = (event, gestureState) => {
    const newX = this._previousX + gestureState.dx
    const newY = this._previousY + gestureState.dy

    this.setState({ x: newX, y: newY, overlap: false })

    this.props.rooms.map((other, i) => {

      if (this.state.name === other.name) return

      const overlapDetection = ((newX + this.state.width) > (other.x) && (newX) < (other.x + other.width) && (newY + this.state.height) > (other.y) && (newY) < (other.y + other.height))

      if (overlapDetection) {
        this.setState({
          x: this.state.x,
          y: this.state.y,
          overlap: true,
        })
      }      

    })
  }

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderGrant,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd,
  });

  render() {
    return (
      <>
      <View
        ref={room => {
          this.roomRef = room
        }}
        style={[
          {
            left: 50,
            top: 100,
            width: this.props.width,
            height: this.props.height,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          },
          {
            transform: [{ translateX: this.state.x }, { translateY: this.state.y }],
            opacity: (this.state.active ? 0.8 : 1),
            zIndex: this.state.active ? 99 : 1,
            backgroundColor: getColor(this.state.color),
            borderWidth: 1,
            borderColor: getColor(this.state.color),
          },
        ]}
        {...this._panResponder.panHandlers}
      >
        <Label style={css('font-medium text-white')}>{this.props.name}</Label>
      </View>
      </>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  rooms: app.rooms,
})

const mapDispatchToProps = {
  updateRoom
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)