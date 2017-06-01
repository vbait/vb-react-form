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

class FieldText extends React.Component {
  onChange = (event) => {
    this.props.onChange(event.target.value, event);
  };
  render() {
    return (
      <textarea {...this.props} onChange={this.onChange} />
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
    this.props.onChange(event.target.value, event);
  };
  render() {
    const {options, value, ...other} = this.props;
    return (
      <div>
        {options.map((option, index) => (
          <div className="radio" key={index}>
            <label>
              <input checked={option.value === value}
                     value={option.value} {...other} type="radio" onChange={this.onChange} />
              {option.label}
            </label>
          </div>
        ))}
      </div>
    )
  };
}

class FieldCheckboxGroup extends React.Component {
  onChange = (event) => {
    let value = (this.props.value || []).slice(0);
    if (value.indexOf(event.target.value) === -1) {
      value.push(event.target.value);
    } else {
      value.splice(value.indexOf(event.target.value), 1);
    }
    this.props.onChange(value, event);
  };
  render() {
    const {options, value = [], ...other} = this.props;
    return (
      <div>
        {options.map((option, index) => (
          <div className="checkbox" key={index}>
            <label>
              <input checked={value.indexOf(option.value) !== -1}
                     value={option.value} {...other} type="checkbox" onChange={this.onChange} />
              {option.label}
            </label>
          </div>
        ))}
      </div>
    )
  };
}

class FieldSelect extends React.Component {
  onChange = (event) => {
    event.preventDefault();
    const {multiple} = this.props;
    if (multiple) {
      const options = Array.from(event.target.options);
      const value = [];
      options.forEach((option) => {
        if (option.selected) {
          value.push(option.value);
        }
      });
      this.props.onChange(value, event);
    } else {
      this.props.onChange(event.target.value, event);
    }
  };

  render() {
    const {options, value = '', multiple, ...other} = this.props;
    let selectValue = value;
    if (multiple && !selectValue) {
      selectValue = [];
    }
    return <select {...other} value={selectValue} multiple={multiple} onChange={this.onChange}>
      {options.map((option, index) => {
        return <option key={index} value={option.value}>{option.label}</option>
      })}
    </select>
  };
}

export {FieldInput, FieldText, FieldRadio, FieldCheckbox, FieldSelect, FieldRadioGroup, FieldCheckboxGroup}