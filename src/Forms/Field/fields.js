/* eslint-disable react/no-multi-comp, jsx-a11y/label-has-for */

import React from 'react';
import PropTypes from 'prop-types';

const isFieldProp = propName => (
  propName === 'model'
);

const getProps = (props) => {
  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
    if (!isFieldProp(propName)) {
      elementProps[propName] = propValue;
    }
  });

  return elementProps;
};


class FieldInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  };
  static defaultProps = {
    onChange: () => {
    },
  };

  onChange = (event) => {
    this.props.onChange(event.target.value, event);
  };

  render() {
    return (
      <input type="text" {...getProps(this.props)} onChange={this.onChange} />
    );
  }
}

class FieldText extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  };
  static defaultProps = {
    onChange: () => {
    },
  };

  onChange = (event) => {
    this.props.onChange(event.target.value, event);
  };

  render() {
    return (
      <textarea {...getProps(this.props)} onChange={this.onChange} />
    );
  }
}

class FieldRadio extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool,
  };
  static defaultProps = {
    onChange: () => {
    },
    value: false,
  };

  onChange = (event) => {
    this.props.onChange(event.target.checked, event);
  };

  render() {
    return (
      <input checked={this.props.value} {...getProps(this.props)} type="radio" onChange={this.onChange} />
    );
  }
}

class FieldCheckbox extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool,
  };
  static defaultProps = {
    onChange: () => {
    },
    value: false,
  };

  onChange = (event) => {
    this.props.onChange(event.target.checked, event);
  };

  render() {
    return (
      <input checked={this.props.value} {...getProps(this.props)} type="checkbox" onChange={this.onChange} />
    );
  }
}

class FieldRadioGroup extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    })).isRequired,
    value: PropTypes.any,
  };
  static defaultProps = {
    onChange: () => {
    },
    value: null,
  };

  onChange = (event) => {
    this.props.onChange(event.target.value, event);
  };

  render() {
    const { options, value, ...other } = this.props;
    return (
      <div>
        {options.map(option => (
          <div className="radio" key={option.value}>
            <label>
              <input
                checked={option.value === value}
                value={option.value}
                {...other}
                type="radio"
                onChange={this.onChange}
              />
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

class FieldCheckboxGroup extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    })).isRequired,
    value: PropTypes.arrayOf(PropTypes.any),
  };
  static defaultProps = {
    onChange: () => {
    },
    value: [],
  };

  onChange = (event) => {
    const value = (this.props.value || []).slice(0);
    if (value.indexOf(event.target.value) === -1) {
      value.push(event.target.value);
    } else {
      value.splice(value.indexOf(event.target.value), 1);
    }
    this.props.onChange(value, event);
  };

  render() {
    const { options, value = [], ...other } = this.props;
    return (
      <div>
        {options.map(option => (
          <div className="checkbox" key={option.value}>
            <label>
              <input
                checked={value.indexOf(option.value) !== -1}
                value={option.value}
                {...other}
                type="checkbox"
                onChange={this.onChange}
              />
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

class FieldSelect extends React.Component {
  static propTypes = {
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    })).isRequired,
    value: PropTypes.any,
  };
  static defaultProps = {
    multiple: false,
    value: '',
    onChange: () => {
    },
  };

  onChange = (event) => {
    event.preventDefault();
    const { multiple } = this.props;
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
    const { options, value = '', multiple, ...other } = this.props;
    let selectValue = value;
    if (multiple && !selectValue) {
      selectValue = [];
    }
    return (
      <select {...other} value={selectValue} multiple={multiple} onChange={this.onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    );
  }
}

export {
  FieldInput,
  FieldText,
  FieldRadio,
  FieldCheckbox,
  FieldSelect,
  FieldRadioGroup,
  FieldCheckboxGroup,
};
