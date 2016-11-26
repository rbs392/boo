import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange() {
    this.props.onChange(this.node.innerHTML);
  }
  render() {
    return (
      <div
        contentEditable
        className={this.props.className}
        ref={(n) => { this.node = n; }}
        onInput={this.onChange}
        dangerouslySetInnerHTML={{ __html: this.props.value }}
      />
    );
  }
}

TextInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
};

export default TextInput;
