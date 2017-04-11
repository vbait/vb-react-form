export default `
class FieldGroup extends React.Component {
  state = {isInvalid: false, pending: false};

  onValid = (field, formError) => {
    this.setState({
      isInvalid: field.dirty && (!field.isValid || formError),
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

const Actions = formConnector((props) => {
  return (
    <Button type="submit" disabled={!props.form.isValid}>SEND</Button>
  )
});

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        password1: '',
      },
      formOptions: {
        validators: {
          '': {
            form: (fields) => {
              if (fields.username.isValid && fields.password1.isValid && fields.username.value === 'Vitalii' && fields.password1.value === '123456aA!') {
                return 'User is not valid';
              }
            },
            password1: (fields) => {
              if (fields.password.isValid && fields.password1.isValid) {
                return fields.password.value !== fields.password1.value && 'Passwords are not equal';
              }
            },
          },
          username: [new RequiredValidator(), new RegexValidator('^[A-Za-z0-9_]+$', 'This value is not valid username.')],
          email: [new RequiredValidator(), new EmailValidator()],
          password: [new RequiredValidator(), new MinLengthValidator(6), new PasswordValidator()],
          password1: [new RequiredValidator(), new MinLengthValidator(6), new PasswordValidator()],
        },
        validatorsOptions: {
          username: {multi: false},
          email: {multi: false},
        },
      }
    };
  }

  reset = () => {
    this.form.reset();
  };

  onSubmit = () => {
    alert('Form is valid');
  };

  render() {
    const {user, formOptions} = this.state;
    return (
      <div>
        <button className="btn btn-default" onClick={this.reset}>Reset Form</button>
        <div>&nbsp;</div>
        <p><strong>User: Vitalii/123456aA! is invalid</strong></p>

        <Form
          {...formOptions}
          onSubmit={this.onSubmit}
          ref={(form) => this.form = form}
        >
          <div className="form-group">
            <FormErrors errors={['form']} />
          </div>
          <FieldGroup
            name="username"
            value={user.username}
            component={Field.Input}
            label="Username"
            placeholder="Enter username"
            help="Help text for username field"
          />
          <FieldGroup
            name="email"
            value={user.email}
            component={Field.Input}
            label="Email"
            placeholder="Enter email"
            help="Help text for email field"
          />
          <FieldGroup
            name="password"
            type="password"
            value={user.password}
            component={Field.Input}
            label="Password"
            placeholder="Enter password"
            help="Help text for password field"
          />
          <FieldGroup
            name="password1"
            type="password"
            value={user.password1}
            component={Field.Input}
            label="Password"
            placeholder="Enter password again"
            help="Help text for password1 field"
          />
          <div className="form-group">
            <FormErrors errors={['form']} />
          </div>
          <Actions />
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<Example />, mountNode);
`
