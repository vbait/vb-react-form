export default `
class CustomValidator extends Validator {
  constructor(value, ...args) {
    super(...args);
    this.validValue = value;
  }
  
  convertValue(value) {
    return value;
  }
  
  isValid(value) {
    return this.convertValue(value) === this.validValue;
  }

  error(name, value) {
    return 'Field "' + name + '" with "value=' + value + '" is not valid';
  }
}

class Example extends React.Component {
  render() {
    const validator = new CustomValidator('some-value');
    return (
      <div>
        <div>
          <b>isInvalid</b> = {validator.isInvalid('bad-value') && validator.error('Username', 'bad-value')}
        </div>
        <div>
          <b>isValid</b> = {validator.isValid('some-value') && 'Yes'}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Example />, mountNode);
`
