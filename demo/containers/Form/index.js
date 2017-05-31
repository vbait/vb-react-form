import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayground from '../../components/ReactPlayground';
import samples from './samples';
import {Link} from "react-router-dom";
import Highlight from 'react-highlight';

const FormDemo = ({ children }) => (
  <Row>
    <Col xs={12}>
      <h2 className="page-header">Form + FormField</h2>

      <h3>Props</h3>
      <p><code>validators, asyncValidator, validatorsOptions</code> and <code>asyncValidatorOptions</code> see below in examples and here <Link to="/fields">Fields Props</Link></p>
      <p>If the key of the <code>validators</code> is the empty string <code>('': &#123;...&#125;)</code>, then the validator will belong to the form model itself (i.e., it is for form-wide validation).</p>
      <table className="prop-table table table-striped table-bordered">
        <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr className="prop-table-row">
          <td>onSubmit</td>
          <td><div>function</div></td>
          <td></td>
          <td>
            <div className="prop-desc">
              <p>Callback fired when fields and a form are valid.</p>
              <pre>
                <code className="lang-js">(values: object) =&gt; any</code>
              </pre>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <h3>FormField</h3>
      <p><code>FormField</code> component - special field wrapper to communicate with form. <code>Form</code> parent component is required.</p>
      <div>
        <Highlight fill className="javascript">
          {`{
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.any,
  options: React.PropTypes.any,
  component: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onValid: React.PropTypes.func,
  validators: React.PropTypes.arrayOf(React.PropTypes.shape({
    isValid: React.PropTypes.func.isRequired,
    error: React.PropTypes.func.isRequired,
  })),
  validatorsOptions: React.PropTypes.shape({
    multi: React.PropTypes.bool,
  }),
  asyncValidator: React.PropTypes.func,
  asyncValidatorOptions: React.PropTypes.shape({
    validateOn: React.PropTypes.arrayOf(React.PropTypes.string),
    validateAfterLocal: React.PropTypes.bool,
  })
}`}
        </Highlight>
        <Highlight fill className="javascript">
          {`onValid = (field, formError) => {...}`}
        </Highlight>
        Other descriptions for props you can find here <Link to="/fields">Fields Props</Link>
      </div>

      <h3>FormFieldErrors</h3>
      <p><code>FormFieldErrors</code> component - special wrapper to show errors for a field by name. <code>Form</code> parent component is required.</p>
      <div>
        <Highlight fill className="javascript">
          {`{
  name: React.PropTypes.string.isRequired,
  component: React.PropTypes.func,
}`}
        </Highlight>
        <Highlight fill className="javascript">
          {`component - UI component to show errors. Base component:
class FormFieldErrorsComponent extends React.Component {
  render() {
    const {field, formError, ...other} = this.props;
    return (field.dirty ? <div {...other}>
      {field.errors.map((error, index) => <div key={index}>{error}</div>)}
      {field.asyncErrors.map((error, index) => <div key={index}>{error}</div>)}
      {formError}
    </div> : null)
  };
}`}
        </Highlight>
      </div>

      <h3>FormErrors</h3>
      <p><code>FormErrors</code> component - special wrapper to show errors for form-wide validation. <code>Form</code> parent component is required.</p>
      <div>
        <Highlight fill className="javascript">
          {`{
  errors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  component: React.PropTypes.func,
}`}
        </Highlight>
        <Highlight fill className="javascript">
          {`errors - list of form-wide error keys`}
        </Highlight>
        <Highlight fill className="javascript">
          {`component - UI component to show errors. Base component:
class FormErrorsComponent extends React.Component {
  render() {
    const {errors, ...other} = this.props;
    return <div {...other}>
      {map(errors, (error, key) => <div key={key || 'err'}>{error}</div>)}
    </div>
  };
}`}
        </Highlight>
        More info you can find in examples bellow: Form (form validation), Form (mixed validation)
      </div>

      <h3>Form (form validation)</h3>
      <ReactPlayground codeText={samples.FormValidation} />
      <h3>Form (fields validation)</h3>
      <ReactPlayground codeText={samples.FormFieldsValidation} />
      <h3>Form (mixed validation)</h3>
      <ReactPlayground codeText={samples.FormMixedValidation} />
    </Col>
  </Row>
);

export default FormDemo;