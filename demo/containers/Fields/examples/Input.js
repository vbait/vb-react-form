export default `

class Example extends React.Component {
  state = {
    initialValue: '',
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

  onAsyncValid = (field) => {
    this.updateState(field, 'onAsyncValid');
  };

  updateValue = () => {
    this.setState({initialValue: 'updated value'});
  };

  updateState(field, action) {
    this.setState({
      lastAction: action,
      value: field.value,
      errors: field.errors,
      asyncErrors: field.asyncErrors,
      fieldsAttr: JSON.stringify(field.getFieldOptions(), null, '\t'),
    });
  }
  
  asyncValidator = (field) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        field.value === '111' ? reject(['Async error']) : resolve();
      }, 1000);
    });
  }

  render() {
    const {initialValue, lastAction, value, errors, asyncErrors, fieldsAttr} = this.state;
    const fieldErrors = [...errors, ...asyncErrors];
    return (
      <div>
        <div>
          <button className="btn" onClick={this.updateValue}>Update Value</button>
        </div>
        <br />
        <Field
          name="name"
          value={initialValue}
          validators={[new RequiredValidator(), new MinLengthValidator(3)]}
          validatorsOptions={{multi: true}}
          asyncValidator={this.asyncValidator}
          asyncValidatorOptions={{validateOn: ['focus', 'change', 'blur'], validateAfterLocal: true}}
          onInit={this.onInit}
          onFocus={this.onFocus}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onUpdate={this.onUpdate}
          onAsyncValid={this.onAsyncValid}
          className="form-control"
          placeholder="Enter Name"
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
