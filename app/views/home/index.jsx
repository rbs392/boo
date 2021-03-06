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
      currentSuiteId: null,
      currentScenarioId: null,
      suites: [],
    };
    this.resultWindow = null;
    this.run = this.run.bind(this);
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
      this.setState({ html: data.data, start: true, url });
    });
  }
  onExtract(extract) {
    const { currentSuiteId, currentScenarioId, suites } = this.state;
    const newSuites = suites.map((suite) => {
      const scenarios = suite.scenarios.map((scenario) => {
        if (suite.id === currentSuiteId && scenario.id === currentScenarioId) {
          scenario.extracts.push(Object.assign({}, extract, { id: cuid() }));
        }
        return scenario;
      });
      return Object.assign({}, suite, { scenarios });
    });
    this.setState({ suites: newSuites });
  }
  onUpdate(suites, currentSuiteId, currentScenarioId) {
    this.setState({ suites, currentSuiteId, currentScenarioId });
  }
  run(e) {
    e.preventDefault();
    e.stopPropagation();
    Services.fetchOutput(this.state.suites, this.state.url)
    .then((data) => {
      if (!this.resultWindow || this.resultWindow.closed) {
        this.resultWindow = window.open('about:blank', 'output');
      }
      this.resultWindow.document.body.innerHTML = `<pre>${data}</pre>`;
      this.resultWindow.focus();
    });
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
            run={this.run}
            getId={cuid}
            onStart={this.onStart}
            onUpdate={this.onUpdate}
            start={this.state.start}
            suites={this.state.suites}
            extract={this.state.extract}
            currentSuiteId={this.state.currentSuiteId}
            currentScenarioId={this.state.currentScenarioId}
          />
        </div>
      </div>
    );
  }
}

export default Home;
