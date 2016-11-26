import React, { Component, PropTypes } from 'react';
import './style.scss';
import TextInput from '../textInput';

class Scenario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.value.id,
      shud: props.value.shud || 'Should do scenario',
      done: props.value.done || ' ',
    };
    this.onDone = this.onDone.bind(this);
    this.onShud = this.onShud.bind(this);
  }
  componentDidMount() {
    this.props.onUpdate(this.state);
  }
  onShud(value) {
    this.setState({ shud: value }, () => {
      this.props.onUpdate(this.state);
    });
  }
  onDone(value) {
    this.setState({ done: value }, () => {
      this.props.onUpdate(this.state);
    });
  }
  render() {
    const { shud, done } = this.props.value;
    return (
      <div className={`component-scenario ${this.props.className}`}>
        <span className="it">it(&quot;&nbsp;
        <TextInput className="sc-text" onChange={this.onShud} value={shud} />
        &nbsp;&quot;, function(
        <TextInput className="sc-text" onChange={this.onDone} value={done} />
        )&#123;&#125;);</span>
      </div>
    );
  }
}

Scenario.propTypes = {
  onUpdate: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.shape({
    id: PropTypes.string,
    shud: PropTypes.string,
    done: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default Scenario;
