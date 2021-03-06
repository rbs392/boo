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
    this.onDeleteSuite = this.onDeleteSuite.bind(this);
    this.onDeleteScenario = this.onDeleteScenario.bind(this);
  }
  onDesc(value) {
    this.update({ desc: value }, this.props.currentScenarioId);
  }
  onDone(value) {
    this.update({ done: value }, this.props.currentScenarioId);
  }
  onUpdateIt(obj, currentScenarioId) {
    const oldScenarios = this.props.scenarios.slice();
    const scenarios = oldScenarios.map((scenario) => {
      if (obj.id === scenario.id) {
        return Object.assign({}, scenario, obj);
      }
      return scenario;
    });
    this.update({ scenarios }, currentScenarioId);
  }
  onDeleteScenario(id) {
    const scenarios = this.props.scenarios.filter(scenario => (scenario.id !== id));
    this.update({ scenarios }, null);
  }
  onDeleteSuite(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete(this.props.id);
  }
  update(suite, scenarioId) {
    const newSuite = Object.assign({}, this.props, suite);
    this.props.onUpdate(newSuite, this.props.id, scenarioId);
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
    this.update({ scenarios }, id);
  }
  render() {
    const { desc, done, currentScenarioId, scenarios } = this.props;
    return (
      <div className="component-suite panel panel-default panel-body">
        <a href="" className="close" onClick={this.onDeleteSuite}>&times;</a>
        <span className="describe">describe(&quot;&nbsp;
        <TextInput className="suite-text" onChange={this.onDesc} value={desc} />
        &nbsp;&quot;, function(
        <TextInput className="suite-text" onChange={this.onDone} value={done} />
        )&#123;</span>
        <div className="scenario-wrapper">
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
                onDelete={this.onDeleteScenario}
              />);
            })
          }
          <a className="add pull-right" tabIndex="-1" onClick={this.addScenario} >
            Add scenario &nbsp;
            <i className="glyphicon glyphicon-plus" />
          </a>
        </div>
        <div className="done">{((done.trim()) ? `${done.trim()}();` : null)}</div>
        <div className="describe">&#125;);</div>
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
  id: PropTypes.string,
  currentScenarioId: PropTypes.string,
  desc: PropTypes.string,
  done: PropTypes.string,
  getId: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Suite;
