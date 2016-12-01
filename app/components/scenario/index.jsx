import React, { Component, PropTypes } from 'react';
import './style.scss';
import TextInput from '../textInput';
import Expect from '../expect';

class Scenario extends Component {
  constructor(props) {
    super(props);
    this.onDone = this.onDone.bind(this);
    this.onShud = this.onShud.bind(this);
    this.update = this.update.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDeleteExtract = this.onDeleteExtract.bind(this);
    this.onUpdateExtract = this.onUpdateExtract.bind(this);
  }
  onShud(value) {
    this.update({ shud: value });
  }
  onDone(value) {
    this.update({ done: value });
  }
  onDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete(this.props.id);
  }
  onUpdateExtract(newExtact, id) {
    const extracts = this.props.extracts.map((extract) => {
      if (extract.id === id) {
        return Object.assign({}, extract, newExtact);
      }
      return extract;
    });
    this.update({ extracts });
  }
  onDeleteExtract(id) {
    const extracts = this.props.extracts.filter(extract => (extract.id !== id));
    this.update({ extracts });
  }
  update(scenarioObj) {
    const { shud, done, extracts, id } = this.props;
    const result = { shud, done, extracts, id };
    const scenario = Object.assign({}, result, scenarioObj);
    this.props.onUpdate(scenario, this.props.id);
  }
  render() {
    const { shud, done, extracts } = this.props;
    return (
      <div className={`component-scenario clearfix ${this.props.className}`}>
        <a href="" className="close" onClick={this.onDelete}>&times;</a>
        <span className="it">it(&quot;&nbsp;
        <TextInput className="sc-text" onChange={this.onShud} value={shud} />
        &nbsp;&quot;, function(
        <TextInput className="sc-text" onChange={this.onDone} value={done} />
        )&#123;
        {extracts.map(extract =>
          <Expect
            id={extract.id}
            key={extract.id}
            extract={extract}
            onUpdate={this.onUpdateExtract}
            onDelete={this.onDeleteExtract}
          />)}
          <div className="done">{((done.trim()) ? `${done.trim()}();` : null)}</div>
        &#125;);</span>
      </div>
    );
  }
}

Scenario.propTypes = {
  onUpdate: PropTypes.func,
  id: PropTypes.string,
  shud: PropTypes.string,
  done: PropTypes.string,
  className: PropTypes.string,
  extracts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  onDelete: PropTypes.func,
};

export default Scenario;
