import React, {Component, PropTypes} from 'react';
import './style.scss';

class Suite extends Component {
  render() {
    return (
      <div className="component-suite panel panel-default panel-body">
        <span className="describe">describe(&quot;&nbsp;
        <div className="suite-text" contentEditable>TestSuite 1</div>
        &nbsp;&quot;, function(
        <div className="suite-text" contentEditable>&nbsp;</div>
        )&#123;</span>
        {this.props.children}
        <span className="describe">&#125;);</span>
      </div>
    );
  }
}

Suite.propTypes = {

};

export default Suite;