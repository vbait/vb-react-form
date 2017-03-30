import React from 'react';

class FieldInput extends React.Component {
  onChange = (event) => {
    this.props.onChange(event.target.value, event);
  };
  render() {
    return (
      <input type="text" {...this.props} onChange={this.onChange} />
    )
  };
}

class FieldRadio extends React.Component {
  onChange = (event) => {
    this.props.onChange(event.target.value, event);
  };
  render() {
    return (
      <input {...this.props} type="radio" onChange={this.onChange} />
    )
  };
}

class FieldCheckbox extends React.Component {
  onChange = (event) => {
    this.props.onChange(event.target.value, event);
  };
  render() {
    return (
      <input {...this.props} type="checkbox" onChange={this.onChange} />
    )
  };
}

export {FieldInput, FieldRadio, FieldCheckbox}