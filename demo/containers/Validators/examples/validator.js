export default `
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new Validator('Valid validator');
  }

  render() {
    return (
      <div>
        <div>
          <b>isValid</b> = {this.validator.isValid() ? this.validator.error() : 'False'}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Example />, mountNode);
`
