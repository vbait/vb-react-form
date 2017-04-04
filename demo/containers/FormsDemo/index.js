import React from 'react';
import classNames from 'classnames';
import {
  Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  OverlayTrigger,
  Popover,
  Glyphicon,
  Button
} from 'react-bootstrap';
import {
  Form, formConnector,
  Field,
  FormField,
  FormFieldErrors,
  FormErrors,
  EqualValidator,
  RequiredValidator,
  EmailValidator,
  PhoneValidator,
  WebSiteValidator,
  CurrencyValidator,
  PasswordValidator,
  MinLengthValidator,
  MaxLengthValidator,
  MinValueValidator,
  MaxValueValidator,
} from '../../../src';

class AsyncValidator {
  isValid(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        value === '111' ? reject(['Async error']) : resolve();
      }, 1000);
    });
  }
}

class FieldGroup extends React.Component {
  state = {isInvalid: false, pending: false};

  onValid = (field, formError) => {
    this.setState({
      isInvalid: field.dirty && (field.errors.length || field.asyncErrors.length || formError),
      dirty: field.dirty,
      pending: field.pending,
    });
  };

  render() {
    const {id, label, help, ...props} = this.props;
    const {isInvalid, pending, dirty} = this.state;
    const popover = (<Popover id="popover-focus">{help}</Popover>);
    let validationState = (isInvalid) ? 'error' : 'success';

    return (
      <FormGroup controlId={id} validationState={dirty && !pending ? validationState : null}>
        <ControlLabel>{label}</ControlLabel>
        <OverlayTrigger trigger="focus" placement="top" overlay={popover}>
          <div className="input-container">
            <FormField className="form-control" {...props} onValid={this.onValid} disabled={pending} />
            <FormControl.Feedback>
              {pending && <Glyphicon glyph="repeat fast-right-spinner" />}
            </FormControl.Feedback>
          </div>
        </OverlayTrigger>
        <HelpBlock><FormFieldErrors name={props.name} /></HelpBlock>
      </FormGroup>
    );
  }
}

class FieldCheckbox extends React.Component {
  state = {isInvalid: false};

  onValid = (field) => {
    this.setState({
      isInvalid: field.dirty && field.errors.length,
      dirty: field.dirty,
    });
  };

  render() {
    const {label, help, type, ...props} = this.props;
    const {isInvalid, dirty} = this.state;
    const popover = (<Popover id="popover-hover">{help}</Popover>);
    let validationState = isInvalid ? 'has-error' : 'has-success';

    return (
      <div className={classNames(type, dirty && validationState)}>
        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popover}>
          <label>
            <FormField {...props} type={type} onValid={this.onValid} /> {label}
          </label>
        </OverlayTrigger>
        <HelpBlock><FormFieldErrors name={props.name} /></HelpBlock>
      </div>
    )
  }
}

class FieldCheckboxGroup extends React.Component {
  state = {isInvalid: false};

  onValid = (field) => {
    this.setState({
      isInvalid: field.dirty && field.errors.length,
      dirty: field.dirty,
    });
  };

  render() {
    const {id, ...props} = this.props;
    const {isInvalid, dirty} = this.state;
    let validationState = isInvalid ? 'error' : 'success';

    return (
      <FormGroup controlId={id} validationState={dirty ? validationState : null}>
        <div className="input-container">
          <FormField {...props} onValid={this.onValid} />
        </div>
        <HelpBlock><FormFieldErrors name={props.name} /></HelpBlock>
      </FormGroup>
    )
  }
}

class FieldSelectGroup extends React.Component {
  state = {isInvalid: false};

  onValid = (field) => {
    this.setState({
      isInvalid: field.dirty && field.errors.length,
      dirty: field.dirty,
    });
  };

  render() {
    const {id, label, ...props} = this.props;
    const {isInvalid, dirty} = this.state;
    let validationState = isInvalid ? 'error' : 'success';

    return (
      <FormGroup controlId={id} validationState={dirty ? validationState : null}>
        <ControlLabel>{label}</ControlLabel>
        <div className="input-container">
          <FormField className="form-control" {...props} onValid={this.onValid} />
        </div>
        <HelpBlock><FormFieldErrors name={props.name} /></HelpBlock>
      </FormGroup>
    )
  }
}

const Actions = formConnector((props) => {
  return (
    <Button type="submit" disabled={!props.form.isValid}>SEND</Button>
  )
});

export default class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      text: '',
      email: '',
      firstName: '',
      password: '',
      phone: '12025550174',
      checkbox: true,
      radio: true,
      selectRadio: '',
      selectCheckbox: [],
      select: '',
      selectMulti: [],
      formProps: {
        errors: [],
      },
      formOptions: {
        validators: {
          '': {
            form: (fields) => {
              return fields.input.value === '4444' && 'FORM ERROR';
            },
            input: (fields) => {
              return fields.input.value === '4444' && `Form validator error (${fields.input.name} = ${fields.input.value})`;
            },
            password: (fields) => {
              if (!fields.password.errors.length && !fields.password1.errors.length) {
                return fields.password.value !== fields.password1.value;
              }
            },
            password1: (fields) => {
              if (!fields.password.errors.length && !fields.password1.errors.length) {
                return fields.password.value !== fields.password1.value && 'Passwords are not equal';
              }
            }
          },
          input: [new MinLengthValidator(3)],
        },
        validatorsOptions: {
          input: {multi: true},
        },
        asyncValidator: {
          input: new AsyncValidator(),
        },
        asyncValidatorOptions: {
          input: {validateOn: ['blur'], validateAfterLocal: true}
        },
      }
    };
  }

  updateState = () => {
    this.setState({text: 'Baitaliuk', email: 'a@mail.ru'});
  };

  reset = () => {
    this.form.reset();
  };

  addField = () => {
    this.setState({emailField: !this.state.emailField});
  };

  onSubmit = (values) => {
    console.log('onSubmit', values);
  };

  render() {
    const {formProps, formOptions} = this.state;
    return (
      <Panel header="Basic example">
        <button className="btn" onClick={this.updateState}>Initialize Form</button>
        <button className="btn" onClick={this.reset}>Reset Form</button>
        <button className="btn" onClick={this.addField}>Add Field</button>
        <div>&nbsp;</div>

        <Form
          onSubmit={this.onSubmit}
          {...formOptions}
          ref={(form) => this.form = form}
        >
          <div className="form-group">
            <FormErrors errors={['form']} />
            {formProps.errors.map((error, index) => <div key={index}>{error}</div>)}
          </div>
          <FieldGroup
            id="idInput"
            name="input"
            value={this.state.input}
            component={Field.Input}
            validators={[new RequiredValidator()]}
            validatorsOptions={{multi: true}}
            asyncValidator={new AsyncValidator()}
            asyncValidatorOptions={{validateOn: ['blur'], validateAfterLocal: true}}
            label="Input"
            placeholder="Enter input"
            help="Help text for input field"
          />
          <FieldGroup
            id="idEmail"
            name="email"
            type="email"
            value={this.state.email}
            validators={[new RequiredValidator(), new EmailValidator()]}
            validatorsOptions={{multi: true}}
            label="Email"
            placeholder="Enter email"
            help="Help text for email field"
          />
          <FieldGroup
            id="idPassword"
            name="password"
            type="password"
            value={this.state.password}
            validators={[new RequiredValidator(), new MinLengthValidator(6), new PasswordValidator(false)]}
            validatorsOptions={{multi: false}}
            label="Password"
            placeholder="Enter password"
            help="Help text for password field"
          />
          <FieldGroup
            id="idPassword1"
            name="password1"
            type="password1"
            value={this.state.password1}
            validators={[new RequiredValidator(), new MinLengthValidator(6), new PasswordValidator(false)]}
            validatorsOptions={{multi: false}}
            label="Repeat Password"
            placeholder="Enter password again"
            help="Help text for password field"
          />
          <FieldGroup
            id="idPhone"
            name="phone"
            value={this.state.phone}
            validators={[new RequiredValidator(), new PhoneValidator('en-US')]}
            label="Phone"
            placeholder="Enter phone"
            help="Help text for phone field"
          />
          <FieldCheckbox
            id="idRadio"
            name="radio"
            type="radio"
            value={this.state.radio}
            label="Radio"
            help="Help text for radio field"
            validators={[new EqualValidator(true)]}
          />
          <FieldCheckbox
            id="idCheckbox"
            name="checkbox"
            type="checkbox"
            value={this.state.checkbox}
            label="Checkbox"
            help="Help text for checkbox field"
            validators={[new EqualValidator(true)]}
          />
          <FieldCheckboxGroup
            id="idSelectRadio"
            name="selectRadio"
            value={this.state.selectRadio}
            options={[{value: '1', label: 'Label 1'}, {value: '2', label: 'Label 2'}]}
            validators={[new RequiredValidator()]}
            component={Field.RadioGroup}
          />
          <FieldCheckboxGroup
            id="idSelectCheckbox"
            name="selectCheckbox"
            value={this.state.selectCheckbox}
            options={[{value: '1', label: 'Label 1'}, {value: '2', label: 'Label 2'}]}
            validators={[new RequiredValidator()]}
            component={Field.CheckboxGroup}
          />
          <FieldSelectGroup
            id="idSelect"
            name="select"
            value={this.state.select}
            label="Select"
            options={[{value: '', label: '------'}, {value: '1', label: 'Label 1'}, {value: '2', label: 'Label 2'}]}
            validators={[new RequiredValidator()]}
            component={Field.Select}
          />
          <FieldSelectGroup
            id="idSelectMulti"
            name="selectMulti"
            value={this.state.selectMulti}
            label="Select Multi"
            options={[{value: '1', label: 'Label 1'}, {value: '2', label: 'Label 2'}]}
            multiple
            validators={[new RequiredValidator()]}
            component={Field.Select}
          />
          <FieldGroup
            id="idText"
            name="text"
            value={this.state.text}
            component={Field.Text}
            validators={[new RequiredValidator()]}
            validatorsOptions={{multi: true}}
            asyncValidator={new AsyncValidator()}
            asyncValidatorOptions={{validateOn: ['blur'], validateAfterLocal: true}}
            label="Text"
            placeholder="Enter text"
            help="Help text for text field"
          />
          <Actions />
          <Button type="submit">SEND ALWAYS</Button>
        </Form>
      </Panel>
    );
  }
}
