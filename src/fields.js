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
    this.props.onChange(event.target.checked, event);
  };
  render() {
    return (
      <input checked={this.props.value} {...this.props} type="radio" onChange={this.onChange} />
    )
  };
}

class FieldCheckbox extends React.Component {
  onChange = (event) => {
    this.props.onChange(event.target.checked, event);
  };
  render() {
    return (
      <input checked={this.props.value} {...this.props} type="checkbox" onChange={this.onChange} />
    )
  };
}

class FieldRadioGroup extends React.Component {
  onChange = (event) => {
    // this.props.onChange(event.target.checked, event);
  };
  render() {
    const {options, value, ...other} = this.props;
    return (
      <div>
        <input checked={value} {...other} type="radio" onChange={this.onChange} />
      </div>
    )
  };
}

export {FieldInput, FieldRadio, FieldCheckbox, FieldRadioGroup}