import React, { Component, PropTypes } from 'react';

class Popup extends Component {
  render() {
    return (
      <div style={this.props.style} className="component-popup">
        {this.props.children}
      </div>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.element,
  style: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
};

export default Popup;
