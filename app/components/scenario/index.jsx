import React, { Component, PropTypes } from 'react';
import './style.scss';

class Scenario extends Component {
  render() {
    return (
      <div className="component-scenario">
        <span className="it">it(&quot;&nbsp;
        <div className="scenario-text" contentEditable>Scenario 1</div>
        &nbsp;&quot;, function(
        <div className="scenario-text" contentEditable>&nbsp;</div>
        )&#123;&#125;);</span>
      </div>
    );
  }
}

Scenario.propTypes = {

};

export default Scenario;
