import React, { Component, PropTypes } from 'react';
import './style.scss';

class Iframe extends Component {
  render() {
    return (
      <iframe
        className="component-iframe"
        height="100%"
        width="100%"
        srcDoc={this.props.html}
      />
    );
  }
}

Component.propTypes = {
  html: PropTypes.string,
};

export default Iframe;
