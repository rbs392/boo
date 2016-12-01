/* eslint-disable class-methods-use-this*/
import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { select } from 'optimal-select';
import Popup from './templates';
import './style.scss';

class Iframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      style: {
        top: '0px',
        left: '0px',
      },
      selectedEl: null,
      showPopup: false,
    };
    this.extract = this.extract.bind(this);
    this.onClick = this.onClick.bind(this);
    this.bindEventListeners = this.bindEventListeners.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.html !== this.props.html) {
      setTimeout(this.bindEventListeners, 100);
    }
  }
  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.showPopup) {
      return this.setState({ showPopup: false });
    }
    const offset = 20;
    const attributes = [
      { key: 'text', value: 'text' },
      { key: 'html', value: 'html' },
      { key: 'eval', value: 'Custom eval' },
      { key: 'click', value: 'click' },
      { key: 'wait', value: 'Add wait' },

    ];
    const style = Object.assign({}, this.state.style, {
      top: `${e.clientY + offset}px`,
      left: `${e.clientX + offset}px`,
    });

    $.each(e.target.attributes, (k, v) => {
      attributes.push({ key: 'attr', value: v.name });
    });
    return this.setState({
      attributes,
      style,
      selectedEl: e.target,
      showPopup: true,
    });
  }
  onMouseOver(e) {
    e.stopPropagation();
    $(e.target).trigger('mouseleave');
    $(e.target).addClass('boo-el-active');
  }
  onMouseLeave(e) {
    const staleEl = $(e.target).parents().find('.boo-el-active');
    $(staleEl).removeClass('boo-el-active');
  }
  clearEventListeners() {
    const iframeEls = $('#iframe').contents(0).find('body').find('*');
    $(iframeEls).off('click');
    $(iframeEls).off('mouseover');
    $(iframeEls).off('mouseleave');
  }
  bindEventListeners() {
    this.clearEventListeners();
    $('#iframe').contents(0).find('head').append('<style>.boo-el-active{box-shadow: 0px 0px 2px teal;}</style>');
    const iframeEls = $('#iframe').contents(0).find('body').find('*');
    $(iframeEls).click(this.onClick);
    $(iframeEls).mouseover(this.onMouseOver);
    $(iframeEls).mouseleave(this.onMouseLeave);
  }
  extract(el) {
    return () => {
      let value = '';
      const attr = { key: el.key };
      const selector = select(this.state.selectedEl);
      let customEval = null;
      switch (el.key) {
        case 'eval':
          customEval = '/* Enter your custom script here */';
          break;
        case 'click':
          value = '';
          $(this.state.selectedEl).click();
          break;
        case 'wait': value = '/* Enter your custom script here */';
          break;
        case 'text':
        case 'html':
          value = $(this.state.selectedEl)[el.key]();
          break;
        default:
          value = $(this.state.selectedEl)[el.key](el.value);
          attr.value = el.value;
      }
      this.setState({ showPopup: false, selectedEl: null }, () => {
        this.props.onExtract({
          attr,
          value,
          selector,
          eval: customEval,
        });
      });
    };
  }

  render() {
    return (
      <div className="component-iframe">
        <iframe
          id="iframe"
          className="component-iframe"
          height="100%"
          width="100%"
          srcDoc={this.props.html}
        />
        {
          this.state.showPopup ?
            <Popup style={this.state.style}>
              <ul className="popup-list list-unstyled">
                {this.state.attributes.map(x =>
                  <li key={x.value}>
                    <button className="btn btn-default" onClick={this.extract(x)}>
                      {x.value}
                    </button>
                  </li>)
                }
              </ul>
            </Popup> : null
        }
      </div>
    );
  }
}

Iframe.propTypes = {
  html: PropTypes.string,
  onExtract: PropTypes.func,
};

export default Iframe;
