import React from 'react'
import { ChromePicker } from 'react-color'

class ButtonExample extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };
  handleChangeComplete = color => {
    this.handleClose();
    this.props.setColor(color);
  }

  render() {
    const holder = {
      display: 'inline-block'
    }
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div style={holder}>
        <button onClick={ this.handleClick }>Pick Color</button>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <ChromePicker onChangeComplete={ this.handleChangeComplete } />
        </div> : null }
      </div>
    )
  }
}

export default ButtonExample