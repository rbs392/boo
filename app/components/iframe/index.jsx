import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { select } from 'optimal-select';
import { popup, selectorinfo } from './templates';
import './style.scss';

class Iframe extends Component {
  constructor(props) {
    super(props);
    this.state = { listenersActive: false };
    this.bindEventListeners = this.bindEventListeners.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.html && !this.state.listenersActive) {
      setTimeout(this.bindEventListeners, 100);
      this.setState({ listenersActive: true });
    }
  }
  bindEventListeners() {
    const style = '<style>body .cursor-active{ box-shadow: 0px 0px 3px red !important; position: relative !important; }</style>';
    $('#iframe').contents(0).find('head').append(style);
    const iframeEls = $('#iframe').contents(0).find('body').find('*');
    $('#iframe').contents(0).click(() => {
      iframeEls.find('#selector-popup').remove();
      iframeEls.find('#selector-info').remove();
      $('.cursor-active').removeClass('cursor-active');
    });
    iframeEls.mouseover((e) => {
      console.log(e.currentTarget === e.target)
      $(e.currentTarget).one('mouseleave', () => {
        if (iframeEls.find('#selector-popup').length) {
          return;
        }
        e.stopPropagation();
        iframeEls.find('#selector-info').remove();
        $(e.currentTarget).removeClass('cursor-active');  
      });
      if ($(e.currentTarget).hasClass('boo-el') || iframeEls.find('#selector-popup').length) {
        return this;
      }
      e.stopPropagation();
      const sel = select(e.currentTarget);
      $(e.currentTarget).addClass('cursor-active').append(selectorinfo(sel));
      return this;
    });


    iframeEls.click((e) => {
      e.preventDefault();
      e.stopPropagation();
      if ($(e.currentTarget).hasClass('boo-el')) {
        return;
      }
      console.log(e);
      $(e.currentTarget).append(popup(e.clientX, e.clientY, e.currentTarget.attributes));
      // $(e.currentTarget).removeClass('cursor-active');
    });
  }
  render() {
    return (
      <iframe
        id="iframe"
        className="component-iframe"
        height="100%"
        width="100%"
        srcDoc={this.props.html}
      />
    );
  }
}

Component.propTypes = {
  html: PropTypes.string,
};

export default Iframe;
