import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PrismCode from 'react-prism';

class Docs extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <h2 className="page-header">Documentation</h2>
          <h3 className="page-header">Form</h3>
          <PrismCode component="pre" className="language-html">
            {`
              <VBForm
                onSubmit={...}
                onChangeForm={...}
                onLoadForm={...}
                validator={...}
              >...</VBForm>
            `}
          </PrismCode>
          <br />
          <PrismCode component="pre" className="language-javascript">
            {`
              onSubmit = (values, form) => {...};
              onChangeForm = (form) => {...};
              onLoadForm = (form) => {...};
              validator
            `}
          </PrismCode>
        </Col>
      </Row>
    )
  }
}

export default Docs;