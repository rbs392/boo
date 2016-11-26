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
      current: {
        suiteId: null,
        scenarioId: null,
      },
    };
    this.onStart = this.onStart.bind(this);
    this.onExtract = this.onExtract.bind(this);
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
  setCurrent(current) {
    this.setState({ current });
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
            extract={this.state.extract}
            onChange={this.setCurrent}
            start={this.state.start}
          />
        </div>
      </div>
    );
  }
}

export default Home;
