import React, { Component, PropTypes } from 'react';
import './style.scss';
import Suite from '../suite';

class ActionsPane extends Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
    this.onStart = this.onStart.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onAddSuite = this.onAddSuite.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  onUrlChange(e) {
    this.setState({ url: e.target.value });
  }
  onStart(e) {
    e.preventDefault();
    this.props.onStart(this.state.url);
  }
  onAddSuite() {
    const currentSuiteId = this.props.getId();
    const suites = this.props.suites.slice();
    suites.push({
      id: currentSuiteId,
      done: ' ',
      scenarios: [],
      desc: 'Test Suite',
    });
    this.props.onUpdate(suites, currentSuiteId);
  }
  onUpdate(val) {
    const suites = this.props.suites.slice();
    const tmp = suites.map(suite => ((suite.id === val.id) ? val : suite));
    this.props.onUpdate(tmp, val.id, val.currentScenarioId);
  }
  render() {
    return (
      <div className="component-actionspane">
        <form
          className="form-inline form-group panel panel-default panel-body"
          onSubmit={this.onStart}
        >
          <input
            placeholder="Enter page url"
            className="form-control"
            onChange={this.onUrlChange}
            value={this.state.url}
          />
          <input type="submit" className="btn btn-default" value="Start!" />
        </form>
        <div className="suits-wrapper clearfix">
          {
            this.props.start ?
              <div>
                {
                  this.props.suites.map(suite =>
                    <Suite
                      id={suite.id}
                      key={suite.id}
                      desc={suite.desc}
                      done={suite.done}
                      getId={this.props.getId}
                      onUpdate={this.onUpdate}
                      scenarios={suite.scenarios}
                      onAddScenario={this.addScenario}
                      currentSuiteId={this.props.currentSuiteId}
                      currentScenarioId={this.props.currentScenarioId}
                    />,
                  )
                }
                <a className="add-suite pull-right" tabIndex="-1" onClick={this.onAddSuite} >
                   Add suite.&nbsp; <i className="glyphicon glyphicon-plus" />
                </a>
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}

ActionsPane.propTypes = {
  onStart: PropTypes.func,
  start: PropTypes.bool,
  suites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    scenarios: PropTypes.array,
  })),
  currentScenarioId: PropTypes.string,
  getId: PropTypes.func,
  onUpdate: PropTypes.func,
  currentSuiteId: PropTypes.string,
};
export default ActionsPane;
