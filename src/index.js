// higher-order component that passes the dimensions of the window as props to
// the wrapped component
import React, { Component } from 'react';

export default (ComposedComponent) => {

  class windowSize extends Component {

    constructor() {
      super();
      this.state = {
        width: (typeof(document) != 'undefined' && document != null) ? document.body.clientWidth : null,
        height: (typeof(document) != 'undefined' && document != null) ? document.body.clientHeight : null,
      };
    }

    handleResize() {
      // set initial state
      this.setState({
        width: (typeof(document) != 'undefined' && document != null) ? document.body.clientWidth : null,
        height: (typeof(document) != 'undefined' && document != null) ? document.body.clientHeight : null,
      });
    }

    componentDidMount() {
      // bind window resize listeners
      this._handleResize = this.handleResize.bind(this);
      window.addEventListener('resize', this._handleResize);
      setTimeout(this._handleResize, 100);
    }

    componentWillUnmount() {
      // clean up listeners
      window.removeEventListener('resize', this._handleResize);
    }

    getWrappedInstance() {
      return this.wrappedInstance;
    }

    render() {
      // pass window dimensions as props to wrapped component
      return (
        <ComposedComponent
          {...this.props}
          ref={c => { this.wrappedInstance = c; }}
          windowWidth={this.state.width}
          windowHeight={this.state.height}
        />
      );
    }

  }

  const composedComponentName = ComposedComponent.displayName
    || ComposedComponent.name
    || 'Component';

  windowSize.displayName = `windowSize(${composedComponentName})`;
  return windowSize;

};
