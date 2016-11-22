import React, { Component } from 'react';
import { Iframe, ActionsPane } from '../components';

class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <Iframe />
        </div>
        <div className="col-md-4">
          <ActionsPane />
        </div>
      </div>
    );
  }
}

export default Home;
