import cuid from 'cuid';
import React, { Component, PropTypes } from 'react';
import './style.scss';
import Scenario from '../scenario';
import TextInput from '../textInput';

class Suite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scenarios: [],
      desc: 'TestSuite 1',
      done: ' ',
      currentScenario: null,
    };
    this.onDone = this.onDone.bind(this);
    this.onDesc = this.onDesc.bind(this);
    this.onUpdateIt = this.onUpdateIt.bind(this);
    this.addScenario = this.addScenario.bind(this);
  }
  onDesc(value) {
    this.setState({ desc: value });
  }
  onDone(value) {
    this.setState({ done: value });
  }
  onUpdateIt(obj) {
    const oldScenarios = this.state.scenarios.slice();
    const scenarios = oldScenarios.map((scenario) => {
      if (obj.id === scenario.id) {
        return Object.assign({}, scenario, obj);
      }
      return scenario;
    });
    this.setState({ scenarios });
  }
  addScenario() {
    const id = cuid();
    const scenarios = this.state.scenarios.slice();
    scenarios.push({ id });
    this.setState({ scenarios, currentScenario: id });
  }
  render() {
    const { desc, done, currentScenario } = this.state;
    return (
      <div className="component-suite panel panel-default panel-body">
        <span className="describe">describe(&quot;&nbsp;
        <TextInput className="suite-text" onChange={this.onDesc} value={desc} />
        &nbsp;&quot;, function(
        <TextInput className="suite-text" onChange={this.onDone} value={done} />
        )&#123;</span>
        <div className="suites-wrapper">
          {
            this.state.scenarios.map((obj) => {
              const current = (obj.id === currentScenario) ? 'active' : '';
              const extract = (obj.id === currentScenario) ? this.props.extract : {};
              return (<Scenario
                className={current}
                key={obj.id}
                value={obj}
                onUpdate={this.onUpdateIt}
                extract={extract}
              />);
            })
          }
          <a className="add-suite" tabIndex="-1" onClick={this.addScenario} >
            <i className="glyphicon glyphicon-plus" />
            Add scenario
          </a>
        </div>
        <span className="describe">&#125;);</span>
      </div>
    );
  }
}

Suite.propTypes = {
  extract: PropTypes.shape({
    attr: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
    value: PropTypes.string,
    selector: PropTypes.string,
  }),
};

export default Suite;
