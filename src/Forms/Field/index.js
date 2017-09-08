import React from 'react';
import PropTypes from 'prop-types';
import { getElementProps } from './utils';
import {
  FieldInput,
  FieldText,
  FieldRadio,
  FieldCheckbox,
  FieldSelect,
  FieldRadioGroup,
  FieldCheckboxGroup,
} from './fields';
import { FieldProps } from './FieldProps';
import { FieldModel } from './FieldModel';

class Field extends React.Component {
  componentDidMount() {
    const { onInit } = this.props;
    onInit();
  }

  componentWillUnmount() {
    const { onRemove = () => {} } = this.props;
    onRemove();
  }

  onFocus = (event) => {
    const { onFocus = () => {} } = this.props;
    onFocus(event);
  };

  onBlur = (event) => {
    const { onBlur = () => {} } = this.props;
    onBlur(event);
  };

  onChange = (value, event) => {
    const { onChange = () => {} } = this.props;
    onChange(value, event);
  };

  render() {
    let defaultComponent = FieldInput;
    const { component, type, value, model } = this.props;
    switch (type) {
      case 'checkbox':
        defaultComponent = FieldCheckbox;
        break;
      case 'radio':
        defaultComponent = FieldRadio;
        break;
      default:
        break;
    }
    return React.createElement(component || defaultComponent, {
      ...getElementProps(this.props),
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      value,
      model,
    });
  }
}

Field.propTypes = {
  ...FieldProps,
  onInit: PropTypes.func,
  onUpdate: PropTypes.func,
  onAsyncValid: PropTypes.func,
};

Field.defaultProps = {
  onInit: () => {},
  onUpdate: () => {},
  onAsyncValid: () => {},
};

Field.Input = FieldInput;
Field.Radio = FieldRadio;
Field.Checkbox = FieldCheckbox;
Field.RadioGroup = FieldRadioGroup;
Field.CheckboxGroup = FieldCheckboxGroup;
Field.Select = FieldSelect;
Field.Text = FieldText;

export { Field, FieldProps, FieldModel };
