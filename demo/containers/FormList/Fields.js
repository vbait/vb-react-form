import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import { connectForm } from '../../../src/FormsV1';

const Actions = ({ form }) => {
  const isValid = form.isValid();
  return (
    <Button type="submit" bsStyle="success" disabled={!isValid}>
      {isValid ? 'Submit' : 'Not Valid'}
    </Button>
  )
};
Actions.propTypes = {
  form: PropTypes.object.isRequired,
};

const FormActions = connectForm(Actions);

const RBField = ({ model, inputComponent, ...props }) => {
  const invalid = model.touched && !model.isValid();
  const errors = model.errors();
  const Component = inputComponent || InputField;
  return (
    <FormGroup controlId={props.id} validationState={invalid ? 'error' : null}>
      {props.label && <ControlLabel>{props.label}</ControlLabel>}
      <Component {...props} />
      {invalid && (
        <HelpBlock>
          {errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </HelpBlock>
      )}
    </FormGroup>
  );
};

class InputField extends React.PureComponent {
  onChange = (event) => {
    event.preventDefault();
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <FormControl {...this.props} onChange={this.onChange} />
    )
  }
}

class ColorField extends React.PureComponent {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.props.onChange(color.rgb);
  };

  render() {
    const { value } = this.props;
    const color = value || {r: 255, g: 255, b: 255, a: 1};
    const styles = reactCSS({
      'default': {
        color: {
          width: '100%',
          height: '22px',
          borderRadius: '2px',
          background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        // cover: {
        //   position: 'fixed',
        //   top: '0px',
        //   right: '0px',
        //   bottom: '0px',
        //   left: '0px',
        // },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={color} onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

const ErrorComponent = ({ form, field }) => {
  let errors = [];
  let invalid = false;
  if (field) {
    errors = field.errors();
    invalid = field.touched && !field.isValid();
  } else {
    errors = form.errors().form;
    invalid = form.isTouched() && errors.length;
  }
  return (
    <div>
      {invalid ? (
        <Alert bsStyle="danger">
          {errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </Alert>
      ) : null}
    </div>
  )
};

export {
  FormActions,
  InputField,
  ErrorComponent,
  RBField,
  ColorField,
};
