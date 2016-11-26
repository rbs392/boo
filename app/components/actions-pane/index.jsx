import React, { Component, PropTypes } from 'react';
import './style.scss';
import Suite from '../suite';

class ActionsPane extends Component {
  static propTypes = {
    onStart: PropTypes.func,
    start: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      describe: '',
    };
    this.onStart = this.onStart.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
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
        <div className="scenarios-wrapper">
          {
            this.props.start ?
              <Suite onAddScenario={this.addScenario} />
            : null
          }
        </div>
      </div>
    );
  }
}

export default ActionsPane;
