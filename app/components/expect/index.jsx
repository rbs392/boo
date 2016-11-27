import React, { Component, PropTypes } from 'react';
import './style.scss';

class Expect extends Component {
  render() {
    const { attr, selector, value } = this.props.extract || {};
    const { key, value: attrVal } = attr || {};
    const isAttribute = !(key === 'text' || key === 'html');
    const attrStr = isAttribute ? `${key}("${attrVal}")` : `${key}()`;
    const assert = `$('${selector}').${attrStr}`;
    const expect = `expect(${assert}).to.equal("${value}");`;
    return (
      <div className="component-expect">
        {(Object.keys(this.props.extract).length) ? expect : null}
      </div>
    );
  }
}

Expect.propTypes = {
  extract: PropTypes.shape({
    attr: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
    value: PropTypes.string,
    selector: PropTypes.string,
  }),
};

export default Expect;
