export default `
class Example extends React.Component {
  render() {
    const equalValidator = new EqualValidator('some-value');
    const regexValidator = new RegexValidator('^[a-z]+$', 'Value is not valid');
    const requiredValidator = new RequiredValidator();
    const emailValidator = new EmailValidator();
    const phoneValidator = new PhoneValidator('en-US');
    const siteValidator = new WebSiteValidator();
    const currencyValidator = new CurrencyValidator();
    const passwordValidator = new PasswordValidator(false); 
    const minLengthValidator = new MinLengthValidator(5);
    const maxLengthValidator = new MaxLengthValidator(10);
    const minValueValidator = new MinValueValidator(5);
    const maxValueValidator = new MaxValueValidator(10);
    return (
      <div>
        <div>
          new RegexValidator('^[a-z]+$', 'Value is not valid')
          <ul>
            <li>
              <b>valid value: </b> {regexValidator.isValid('value') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {regexValidator.isInvalid('bad-value') && regexValidator.error()}
            </li>
          </ul>
        </div>
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
        <div>
          new WebSiteValidator()
          <ul>
            <li>
              <b>valid value: </b> {siteValidator.isValid('google.com') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {siteValidator.isInvalid('google') && siteValidator.error()}
            </li>
          </ul>
        </div>
        <div>
          new CurrencyValidator()
          <ul>
            <li>
              <b>valid value: </b> {currencyValidator.isValid('12.45') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {currencyValidator.isInvalid('12.456') && currencyValidator.error()}
            </li>
          </ul>
        </div>
        <div>
          new PasswordValidator()
          <ul>
            <li>
              <b>valid value: </b> {passwordValidator.isValid('123456a') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {passwordValidator.isInvalid('123456') && passwordValidator.error()}
            </li>
          </ul>
        </div>
        <div>
          new MinLengthValidator(5)
          <ul>
            <li>
              <b>valid value: </b> {minLengthValidator.isValid('12345') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {minLengthValidator.isInvalid('1234') && minLengthValidator.error()}
            </li>
          </ul>
        </div>
        <div>
          new MaxLengthValidator(10)
          <ul>
            <li>
              <b>valid value: </b> {maxLengthValidator.isValid('1234567890') && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {maxLengthValidator.isInvalid('12345678901') && maxLengthValidator.error()}
            </li>
          </ul>
        </div>
        <div>
          new MinValueValidator(5)
          <ul>
            <li>
              <b>valid value: </b> {minValueValidator.isValid(5) && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {minValueValidator.isInvalid(4.99) && minValueValidator.error()}
            </li>
          </ul>
        </div>
        <div>
          new MaxLengthValidator(5)
          <ul>
            <li>
              <b>valid value: </b> {maxValueValidator.isValid(10) && 'Yes'}
            </li>
            <li>
              <b>invalid value: </b> {maxValueValidator.isInvalid(10.1) && maxValueValidator.error()}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Example />, mountNode);
`
