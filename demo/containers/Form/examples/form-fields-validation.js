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
        <Form
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
            validators={[new RequiredValidator(), new RegexValidator('^[A-Za-z0-9_]+$', 'This value is not valid username.')]}
            validatorsOptions={{multi: false}}
            label="Username"
            placeholder="Enter username"
            help="Help text for username field"
          />
          <FieldGroup
            name="email"
            value={user.email}
            component={Field.Input}
            validators={[new RequiredValidator(), new EmailValidator()]}
            validatorsOptions={{multi: false}}
            label="Email"
            placeholder="Enter email"
            help="Help text for email field"
          />
          <Actions />
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<Example />, mountNode);
`
