export default `
class Example extends React.Component {
  render() {
    const equalValidator = new EqualValidator('some-value');
    const requiredValidator = new RequiredValidator();
    const emailValidator = new EmailValidator();
    const phoneValidator = new PhoneValidator('en-US');
    const siteValidator = new WebSiteValidator();
    const currencyValidator = new CurrencyValidator();
    const passwordValidator = new PasswordValidator();
    const minLengthValidator = new MinLengthValidator(5);
    const maxLengthValidator = new MaxLengthValidator(10);
    const minValueValidator = new MinValueValidator(5);
    const maxValueValidator = new MaxValueValidator(10);
    return (
      <div>
        <div>
          new EqualValidator('some-value')
          <ul>
            <li>
              <b>valid value: </b> {equalValidator.isValid('some-value') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {equalValidator.isInvalid('bad-value') && equalValidator.error()}
            </li>
          </ul>
        </div>
        <div>
          new RequiredValidator()
          <ul>
            <li>
              <b>valid value: </b> {requiredValidator.isValid('some-value') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {requiredValidator.isInvalid('') && requiredValidator.error()}
            </li>
          </ul>
        </div>
        <div>
          new EmailValidator()
          <ul>
            <li>
              <b>valid value: </b> {emailValidator.isValid('admin@gmail.com') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {emailValidator.isInvalid('admin') && emailValidator.error()}
            </li>
          </ul>
        </div>
        <div>
          new PhoneValidator('en-US')
          <ul>
            <li>
              <b>valid value: </b> {phoneValidator.isValid('12025550174') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {phoneValidator.isInvalid('120255501744') && phoneValidator.error()}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Example />, mountNode);
`
