import React, { Component } from 'react';

import './style.scss';
import Services from '../../services';
import { Iframe, ActionsPane } from '../../components';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { html: '' };
    this.onStart = this.onStart.bind(this);
  }
  onStart(url) {
    Services.fetchPage(url)
    .then((data) => {
      this.setState({ html: data.data });
    });
  }

  render() {
    const classname = (this.state.html) ? 'row' : 'row inactive';
    return (
      <div className={classname} id="home">
        <div className="col-md-8 iframe-wrapper">
          <Iframe html={this.state.html} />
        </div>
        <div className="col-md-4 actionspane-wrapper">
          <ActionsPane onStart={this.onStart} />
        </div>
      </div>
    );
  }
}

export default Home;
