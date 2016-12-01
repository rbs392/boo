import React, { Component, PropTypes } from 'react';
import './style.scss';
import TextInput from '../textInput';

class Expect extends Component {
  constructor(props) {
    super(props);
    this.onEval = this.onEval.bind(this);
    this.onValue = this.onValue.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.formatEval = this.formatEval.bind(this);
    this.formatWait = this.formatWait.bind(this);
    this.formatClick = this.formatClick.bind(this);
    this.formatExtract = this.formatExtract.bind(this);
  }
  onEval(code) {
    this.props.onUpdate({ eval: code, attr: {} }, this.props.id);
  }
  onValue(value) {
    const extract = Object.assign({}, this.props.extract, { value });
    this.props.onUpdate(extract, this.props.id);
  }
  onDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete(this.props.id);
  }
  formatClick(selector) {
    return `$('${selector}').click()`;
  }
  formatWait(value) {
    return (<span>
      browser.waitUntil(new Promise((resolve) =&gt; &#123;
        <TextInput value={value} onChange={this.onValue} />
      &#125;));
      </span>);
  }
  formatExtract() {
    const { attr, selector, value } = this.props.extract || {};
    const { key, value: attrVal } = attr || {};
    switch (key) {
      case 'click': return this.formatClick(selector);
      case 'wait': return this.formatWait(value);
      default: {
        const isAttribute = !(key === 'text' || key === 'html');
        const attrStr = isAttribute ? `${key}("${attrVal}")` : `${key}()`;
        const assert = `$('${selector}').${attrStr}`;
        const expect = `expect(${assert}).to.equal("${value}");`;
        return expect;
      }
    }
  }
  formatEval() {
    return <TextInput value={this.props.extract.eval} onChange={this.onEval} />;
  }
  render() {
    return (
      <div className="component-expect clearfix">
        <a href="" onClick={this.onDelete} className="close">&times;</a>
        {(Object.keys(this.props.extract).length) ?
          <span>
            {this.props.extract.eval ? this.formatEval() : this.formatExtract()}
          </span> : null
        }
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
    eval: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
  id: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Expect;
