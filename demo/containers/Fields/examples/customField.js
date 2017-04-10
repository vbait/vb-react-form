export default `
class DateValidator extends Validator {
  isValid(value) {
    return validator.isISO8601(this.convertValue(value));
  }

  error(name, value) {
    return 'This value is not a valid date.';
  }
}

class Example extends React.Component {
  state = {
    initialValue: '2016-05-19T12:00:00.000Z',
    lastAction: '',
    value: '',
    errors: [],
    asyncErrors: [],
  };

  onInit = (field) => {
    this.updateState(field, 'onInit');
  };

  onFocus = (field) => {
    this.updateState(field, 'onFocus');
  };

  onChange = (field) => {
    this.updateState(field, 'onChange');
  };

  onBlur = (field) => {
    this.updateState(field, 'onBlur');
  };

  onUpdate = (field) => {
    this.updateState(field, 'onUpdate');
  };

  updateState(field, action) {
    this.setState({
      lastAction: action,
      value: field.value,
      errors: field.errors,
      fieldsAttr: JSON.stringify(field.getFieldOptions(), null, '\t'),
    });
  }

  render() {
    const {initialValue, lastAction, value, errors, asyncErrors, fieldsAttr} = this.state;
    const fieldErrors = [...errors, ...asyncErrors];
    return (
      <div>
        <Field
          name="name"
          value={initialValue}
          validators={[new DateValidator()]}
          onInit={this.onInit}
          onFocus={this.onFocus}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onUpdate={this.onUpdate}
          className="form-control"
          placeholder="Enter Name"
          component={DatePicker}
        />
        <div>
          <strong>Last Action: </strong> {lastAction}
        </div>
        <div>
          <strong>Value: </strong> {value}
        </div>
        <div>
          <strong>Errors: </strong>
          {fieldErrors.length ? <ul>
            {fieldErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul> : 'Is valid'}
        </div>
        <div>
          <strong>Attributes</strong>
          <div>{fieldsAttr}</div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Example />, mountNode);
`
