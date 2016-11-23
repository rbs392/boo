import React, { Component, PropTypes } from 'react';
import './style.scss';
import Scenario from '../scenario';

class ActionsPane extends Component {
  static propTypes = {
    onStart: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      describe: '',
      scenarios: [],
    };
    this.onStart = this.onStart.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.addScenario = this.addScenario.bind(this);
    this.onDescribeChange = this.onDescribeChange.bind(this);
  }
  onDescribeChange(e) {
    this.setState({ describe: e.target.value });
  }
  onUrlChange(e) {
    this.setState({ url: e.target.value });
  }
  onStart(e) {
    e.preventDefault();
    this.props.onStart(this.state.url);
  }
  addScenario() {
    const scenarios = this.state.scenarios.slice();
    scenarios.push(<Scenario key={`${scenarios.length}`} />);
    this.setState({ scenarios });
  }
  render() {
    return (
      <div className="component-actionspane">
        <form
          className="form-group panel panel-default panel-body"
          onSubmit={this.onStart}
        >
          <input
            placeholder="Enter page url"
            className="form-control"
            onChange={this.onUrlChange}
            value={this.state.url}
          />
          <input
            placeholder="Describe test"
            className="form-control"
            onChange={this.onDescribeChange}
            value={this.state.describe}
          />
          <input
            type="submit"
            className="btn btn-default"
            value="Start!"
          />
        </form>
        <div className="scenarios-wrapper">
          <button
            className="btn btn-default"
            onClick={this.addScenario}
          >Add scenario</button>
          {
            this.state.scenarios.map(scenario => scenario)
          }
        </div>
      </div>
    );
  }
}

export default ActionsPane;
