import React, { Component, PropTypes } from 'react';
import './style.scss';
import TextInput from '../textInput';
import Expect from '../expect';

class Scenario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.value.id,
      shud: props.value.shud || 'Should do scenario',
      done: props.value.done || ' ',
      extracts: [],
    };
    this.onDone = this.onDone.bind(this);
    this.onShud = this.onShud.bind(this);
  }
  componentDidMount() {
    this.props.onUpdate(this.state);
  }
  componentWillReceiveProps(nextProps) {
    const extracts = this.state.extracts.slice();
    const lastExtract = extracts[extracts.length - 1];
    if (!this.checkForDuplicateExtract(lastExtract, nextProps.extract)) {
      extracts.push(nextProps.extract);
      this.setState({ extracts });
    }
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
  // TODO: implement better generic functionality
  checkForDuplicateExtract(oldVal, newVal) {
    if (!oldVal) { return false; }
    return oldVal.selector === newVal.selector;
  }
  render() {
    const { shud, done } = this.props.value;
    return (
      <div className={`component-scenario ${this.props.className}`}>
        <span className="it">it(&quot;&nbsp;
        <TextInput className="sc-text" onChange={this.onShud} value={shud} />
        &nbsp;&quot;, function(
        <TextInput className="sc-text" onChange={this.onDone} value={done} />
        )&#123;
        {this.state.extracts.map((extract, i) => <Expect key={i} extract={extract} />)}
        &#125;);</span>
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
  extract: PropTypes.shape({
    attr: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
    value: PropTypes.string,
    selector: PropTypes.string,
  }),
};

export default Scenario;
