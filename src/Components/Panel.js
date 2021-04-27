import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { css, getColor } from '../Styles';
import { addRoom, show3D, addDoor } from '../Stores/App/Action';
import Button from './Button';
import Modal from './Modal';
import InputField from './InputField';
import idGenerator from './Helpers/idGenerator';

class Panel extends React.Component {

  state = {
    modal: false,
    form: {
      name: '',
      width: null,
      height: null,
      depth: null,
      color: this.props.colors[this.props.rooms.length],
      isOverlap: false,
      x: 0,
      y: 0,
      type: 'room'
    }
  }

  _toggleModal() {
    this.setState({ modal: !this.state.modal })
  }

  _handleChange(value, key) {
    if (key === 'width' || key === 'height' || key === 'depth') {
      this.setState({ form: { ...this.state.form, [key]: parseFloat(value) * 10 } })
    } else {
      this.setState({ form: { ...this.state.form, [key]: value } })
    }
  }

  _cancel() {
    this.modalShow = false
  }

  _addNewRoom() {
    this.props.addRoom(this.state.form)
    this.setState({
      modal: false,
      form: { ...this.state.form, name: '', width: '', height: '', depth: '', color: '' }
    })
  }

  _addNewDoor() {
    const id = parseInt(Math.random()*10000)
    this.props.addRoom({
      name: `doors-${id}`,
      color: 'color12',
      isOverlap: false,
      width: 40,
      height: 10,
      x: 0,
      y: 0,
      type: 'door'
    })
  }

  _addNewWindows() {
    const id = parseInt(Math.random()*10000)
    this.props.addRoom({
      name: `windows-${id}`,
      color: 'color10',
      isOverlap: false,
      width: 10,
      height: 40,
      x: 0,
      y: 0,
      type: 'window'
    })
  }

  _show3D() {
    this.props.show3D()
  }

  render() {
    return (
      <>
        {this.state.modal &&
          <Modal title="Add Room">
            <InputField placeholder="Name" value={this.state.form.name} onChange={v => this._handleChange(v, 'name')} autoCapitailze="characters" />
            <View style={css('flex flex-row')}>
              <View style={css('flex-1')}>
                <InputField placeholder="Width (m)" value={this.state.form.width} onChange={v => this._handleChange(v, 'width')} keyboardType="numeric" />
              </View>
              <View style={css('flex-1 ml-2')}>
                <InputField placeholder="Height (m)" value={this.state.form.height} onChange={v => this._handleChange(v, 'height')} keyboardType="numeric" />
              </View>
            </View>
            <InputField placeholder="Depth (m)" value={this.state.form.depth} onChange={v => this._handleChange(v, 'depth')} keyboardType="numeric" />

            <View style={css('flex-row flex-wrap my-2')}>
              {this.props.colors.map(color => (
                <TouchableOpacity
                  key={color}
                  onPress={() => this._handleChange(color, 'color')}
                  style={[css('w-8 h-8 rounded-full mx-2 my-1 border-gray-800'), { borderWidth: color === this.state.form.color ? 2 : 0, backgroundColor: getColor(color) }]}
                ></TouchableOpacity>
              ))}
            </View>

            <View style={css('flex-row mt-2')}>
              <Button text="Cancel" onPress={this._toggleModal.bind(this)} bgColor={getColor('white')} textColor={getColor('gray-800')} />
              <View style={css('flex-1 ml-2')}>
                <Button
                  text="Create"
                  onPress={this._addNewRoom.bind(this)}
                  disabled={
                    this.state.form.name === '' ||
                    !this.state.form.width || this.state.form.width === '' ||
                    !this.state.form.height || this.state.form.height === '' ||
                    !this.state.form.depth || this.state.form.depth === '' ||
                    this.state.form.color === ''
                  }
                />
              </View>
            </View>
          </Modal>}
        <View style={css('flex-row items-end justify-between py-2 px-4 bg-gray-400')}>
          <Button
            text="Door"
            onPress={this._addNewDoor.bind(this)}
          />
          <View style={css('flex-1 ml-2')}>
            <Button
              text="Windows"
              onPress={this._addNewWindows.bind(this)}
            />
          </View>
          <View style={css('flex-1 ml-4')}>

          </View>
          <View style={css('flex-1 ml-4')}>

          </View>
        </View>
        <View style={css('flex-row items-start justify-between py-2 px-4 bg-gray-200')}>
          <Button
            text="Add Room"
            onPress={this._toggleModal.bind(this)}
          />
          <View style={css('flex-1 ml-4')}>
            <Button
              text={!this.props.show3D ? "2D" : "Build 3D"}
              onPress={this._show3D.bind(this)}
            />
          </View>
        </View>
      </>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  rooms: app.rooms,
  colors: app.colors,
  show3D: app.show3D,
})

const mapDispatchToProps = {
  addRoom,
  addDoor,
  show3D
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
