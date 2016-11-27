import cuid from 'cuid';
import React, { Component } from 'react';

import './style.scss';
import Services from '../../services';
import { Iframe, ActionsPane } from '../../components';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      start: false,
      extract: {},
      currentSuiteId: null,
      suites: [],
    };
    this.onStart = this.onStart.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onExtract = this.onExtract.bind(this);
  }
  componentDidMount() {
    this.onStart('http://localhost:3000/');
  }
  onStart(url) {
    Services.fetchPage(url)
    .then((data) => {
      this.setState({ html: data.data, start: true });
    });
  }
  onExtract(extract) {
    this.setState({ extract });
  }
  onUpdate(suites, currentSuiteId, currentScenarioId) {
    this.setState({ suites, currentSuiteId, currentScenarioId });
  }
  setCurrent(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    const classname = (this.state.html) ? 'row' : 'row inactive';
    return (
      <div className={classname} id="home">
        <div className="col-md-8 iframe-wrapper">
          <Iframe html={this.state.html} onExtract={this.onExtract} />
        </div>
        <div className="col-md-4 actionspane-wrapper">
          <ActionsPane
            onStart={this.onStart}
            onUpdate={this.onUpdate}
            start={this.state.start}
            onChange={this.setCurrent}
            suites={this.state.suites}
            extract={this.state.extract}
            getId={cuid}
          />
        </div>
      </div>
    );
  }
}

export default Home;
