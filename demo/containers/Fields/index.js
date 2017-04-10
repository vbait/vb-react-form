import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayground from '../../components/ReactPlayground';
import samples from './samples';
// import PropTable from '../../components/PropTable';
import { Field, RequiredValidator, Validator } from '../../../src';
const DatePicker = require('react-bootstrap-date-picker');
const validator = require('validator');

const Fields = ({ children }) => (
  <Row>
    <Col xs={12}>
      <h2 className="page-header">Fields</h2>
      <h3>Base Field</h3>
      <ReactPlayground codeText={samples.Input} />
      <h3>Other Fields</h3>
      <ReactPlayground codeText={samples.Fields} />
      <h3>Custom Field</h3>
      <ReactPlayground codeText={samples.CustomField} />
      {/*<PropTable component="Field"/>*/}

      <h3>Props</h3>
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
            <td>name</td>
            <td><div>string</div></td>
            <td></td>
            <td>
              <div className="prop-desc">Field name</div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>value</td>
            <td><div>any</div></td>
            <td></td>
            <td>
              <div className="prop-desc">Field initial value</div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>options</td>
            <td><div>any</div></td>
            <td></td>
            <td>
              <div className="prop-desc">Additional Options for Field</div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>component</td>
            <td><div>function</div></td>
            <td>one of: <code>Field.Input</code>, <code>Field.Radio</code>, <code>Field.Checkbox</code></td>
            <td>
              <div className="prop-desc">Default component depends on Field <code>type</code> attribute</div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>onInit</td>
            <td><div>function</div></td>
            <td></td>
            <td>
              <div className="prop-desc">
                <p>Callback fired when the field did mount.</p>
                <pre>
                  <code className="lang-js">(field: object) =&gt; any</code>
                </pre>
              </div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>onFocus</td>
            <td><div>function</div></td>
            <td></td>
            <td>
              <div className="prop-desc">
                <p>Callback fired when the field focuses.</p>
                <pre>
                  <code className="lang-js">(field: object) =&gt; any</code>
                </pre>
              </div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>onChange</td>
            <td><div>function</div></td>
            <td></td>
            <td>
              <div className="prop-desc">
                <p>Callback fired when the field value changes.</p>
                <pre>
                  <code className="lang-js">(field: object) =&gt; any</code>
                </pre>
              </div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>onBlur</td>
            <td><div>function</div></td>
            <td></td>
            <td>
              <div className="prop-desc">
                <p>Callback fired when the field loses focus</p>
                <pre>
                  <code className="lang-js">(field: object) =&gt; any</code>
                </pre>
              </div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>onUpdate</td>
            <td><div>function</div></td>
            <td></td>
            <td>
              <div className="prop-desc">
                <p>Callback fired when the field takes new props</p>
                <pre>
                  <code className="lang-js">(field: object) =&gt; any</code>
                </pre>
              </div>
              <p>Props, one of: <code>value</code>, <code>validators</code>, <code>asyncValidator</code></p>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>onAsyncValid</td>
            <td><div>function</div></td>
            <td></td>
            <td>
              <div className="prop-desc">
                <p>Callback fired when the field <code>asyncValidator</code> is finished</p>
                <pre>
                  <code className="lang-js">(field: object) =&gt; any</code>
                </pre>
              </div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>validators</td>
            <td><div>array of: validators</div></td>
            <td></td>
            <td>
              <div className="prop-desc">
                <p>There are ready <code>validators</code></p>
                <pre>
                  <ul>
                    <li>EqualValidator</li>
                    <li>RequiredValidator</li>
                    <li>EmailValidator</li>
                    <li>PhoneValidator</li>
                    <li>WebSiteValidator</li>
                    <li>CurrencyValidator</li>
                    <li>PasswordValidator</li>
                    <li>MinLengthValidator</li>
                    <li>MaxLengthValidator</li>
                    <li>MinValueValidator</li>
                    <li>MaxValueValidator</li>
                  </ul>
                </pre>
                <p>For additional validators the best way to inherit from <code>Validator</code> class</p>
                <pre>
                  <code className="lang-js">class CustomValidator extends Validator</code>
                </pre>
              </div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>validatorsOptions</td>
            <td><code>&#123;multi: boolean&#125;</code></td>
            <td><code>&#123;multi: true&#125;</code></td>
            <td>
              <div className="prop-desc">
                <p><code>multi: true</code>&nbsp;-&nbsp;The field value checks for all validators and collect all errors.</p>
                <p><code>multi: false</code>&nbsp;-&nbsp;If the value is not valid then validation will stop and will get the first error message</p>
              </div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>asyncValidator</td>
            <td><div>function</div></td>
            <td></td>
            <td>
              <div className="prop-desc">
                <pre>
                  <code className="lang-js">(field: object) =&gt; Promise</code>
                </pre>
              </div>
            </td>
          </tr>
          <tr className="prop-table-row">
            <td>asyncValidatorOptions</td>
            <td><code>&#123;validateOn: array of: ['focus', 'change', 'blur'], validateAfterLocal: boolean&#125;</code></td>
            <td></td>
            <td>
              <div className="prop-desc">
                <p><code>validateOn</code>&nbsp;-&nbsp;events to indicate when to validate. Default: always</p>
                <p><code>validateAfterLocal</code>&nbsp;-&nbsp;use the async validator when all <code>validators</code> are valid</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Col>
  </Row>
);

export default Fields;
