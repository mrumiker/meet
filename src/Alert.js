import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.position = 'fixed';
  }

  getPosition = () => {
    return {
      position: this.position,
    };
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  }

  render() {
    return (
      <div className="Alert" style={this.getPosition()}>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#b16304';
    this.position = 'static';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
    this.position = 'static';
  }
}

export { InfoAlert, WarningAlert, ErrorAlert };
