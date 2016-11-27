import React, { Component, PropTypes } from 'react';
import './style.scss';
import TextInput from '../textInput';
import Expect from '../expect';

class Scenario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shud: props.shud,
      done: props.done,
    };
    this.onDone = this.onDone.bind(this);
    this.onShud = this.onShud.bind(this);
    this.update = this.update.bind(this);
  }
  onShud(value) {
    this.setState({ shud: value }, this.update);
  }
  onDone(value) {
    this.setState({ done: value }, this.update);
  }
  update() {
    const scenario = Object.assign({}, this.props, this.state);
    this.props.onUpdate(scenario, this.props.id);
  }
  render() {
    const { shud, done, extracts } = this.props;
    return (
      <div className={`component-scenario ${this.props.className}`}>
        <span className="it">it(&quot;&nbsp;
        <TextInput className="sc-text" onChange={this.onShud} value={shud} />
        &nbsp;&quot;, function(
        <TextInput className="sc-text" onChange={this.onDone} value={done} />
        )&#123;
        {extracts.map((extract) => <Expect key={extract.id} extract={extract} />)}
        &#125;);</span>
      </div>
    );
  }
}

Scenario.propTypes = {
  onUpdate: PropTypes.func,
  id: PropTypes.string,
  shud: PropTypes.string,
  done: PropTypes.string,
  className: PropTypes.string,
  extracts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
};

export default Scenario;
