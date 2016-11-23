import React, { Component, PropTypes } from 'react';

class Scenario extends Component {
  render() {
    return (
      <div className="component-scenarion panel panel-default panel-body">
        it(<q><input className="form-control form-inline" /></q>, function()&#123;
          expect()
        &#125;)
      </div>
    );
  }
}

Scenario.propTypes = {

};

export default Scenario;
