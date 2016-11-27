import React, { Component, PropTypes } from 'react';
import './style.scss';
import Scenario from '../scenario';
import TextInput from '../textInput';

class Suite extends Component {
  constructor(props) {
    super(props);
    this.onDone = this.onDone.bind(this);
    this.onDesc = this.onDesc.bind(this);
    this.update = this.update.bind(this);
    this.onUpdateIt = this.onUpdateIt.bind(this);
    this.addScenario = this.addScenario.bind(this);
  }
  onDesc(value) {
    this.update({ desc: value });
  }
  onDone(value) {
    this.update({ done: value });
  }
  onUpdateIt(obj, currentScenarioId) {
    const oldScenarios = this.props.scenarios.slice();
    const scenarios = oldScenarios.map((scenario) => {
      if (obj.id === scenario.id) {
        return Object.assign({}, scenario, obj);
      }
      return scenario;
    });
    this.update({ scenarios, currentScenarioId });
  }
  addScenario() {
    const id = this.props.getId();
    const scenarios = this.props.scenarios.slice();
    scenarios.push({
      id,
      shud: 'Should do scenario',
      done: ' ',
      extracts: [],
    });
    this.update({
      scenarios,
      currentScenarioId: id,
    });
  }
  update(suite) {
    const newSuite = Object.assign({}, this.props, suite);
    this.props.onUpdate(newSuite);
  }
  render() {
    const { desc, done, currentScenarioId, scenarios } = this.props;
    return (
      <div className="component-suite panel panel-default panel-body">
        <span className="describe">describe(&quot;&nbsp;
        <TextInput className="suite-text" onChange={this.onDesc} value={desc} />
        &nbsp;&quot;, function(
        <TextInput className="suite-text" onChange={this.onDone} value={done} />
        )&#123;</span>
        <div className="suites-wrapper">
          {
            scenarios.map((obj) => {
              const current = (obj.id === currentScenarioId) ? 'active' : '';
              return (<Scenario
                className={current}
                key={obj.id}
                id={obj.id}
                shud={obj.shud}
                done={obj.done}
                onUpdate={this.onUpdateIt}
                extracts={obj.extracts}
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
  onUpdate: PropTypes.func,
  scenarios: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    extracts: PropTypes.array,
  })),
  currentScenarioId: PropTypes.string,
  desc: PropTypes.string,
  done: PropTypes.string,
  getId: PropTypes.func,
};

export default Suite;
