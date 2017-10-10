import uuid from 'uuid/v1';
import React from 'react';
import { uniq } from 'lodash';
import { Button, Row, Col } from 'react-bootstrap';
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter'
import { VBForm, requiredValidator } from '../../../src/FormsV1';
import { RBField, ColorField, FormActions, ErrorComponent } from './Fields';

const required = (name, value) => {
  return requiredValidator(value);
};

const formValidator = (form) => {
  const errors = { '': [] };
  const forms = form.forms();
  const cars = (forms.cars || [])
                .map(form => form.fields().name.value)
                .filter(value => !!value);
  if (cars.length !== uniq(cars).length) {
    errors[''].push('Names of cars should be unique!');
  }
  return errors;
};

class CarItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: []
    };
  }

  handleAdd = () => {
    const { cars } = this.state;
    this.setState(() => ({
      cars: [...cars, {id: uuid(), color: {r: 0, g: 0, b: 0, a: 1}}],
    }));
  };

  handleDelete = (index) => {
    const { cars } = this.state;
    const newCars = [...cars];
    newCars.splice(index, 1);
    this.setState(() => ({
      cars: newCars,
    }));
  };

  render() {
    const { name } = this.props;
    const { cars } = this.state;
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Button onClick={this.handleAdd}>Add Car</Button>
            <hr />
          </Col>
        </Row>
        {cars.map((car, index) => (
          <VBForm.Item key={car.id} name={name} asChild asList>
            <Row>
              <Col xs={5}>
                <VBForm.Field
                  name="name"
                  value={car.name}
                  label="Car Name"
                  validator={required}
                  component={RBField}
                  includeModel
                />
              </Col>
              <Col xs={5}>
                <VBForm.Field
                  name="color"
                  value={car.color}
                  label="Car color"
                  component={RBField}
                  inputComponent={ColorField}
                  includeModel
                />
              </Col>
              <Col xs={2}>
                <Button onClick={() => {this.handleDelete(index)}}>Del</Button>
              </Col>
            </Row>
          </VBForm.Item>
        ))}
      </div>
    )
  }
}

class FormList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {}
    };
  }

  onLoad = (form) => {
    console.log(form);
    console.log(form.fields());
    console.log(form.forms());
    // this.props.onChange(form);
  };

  onChange = (form) => {
    // this.props.onChange(form);
  };

  onSubmit = (values) => {
    this.setState(() => ({ values }));
  };

  render() {
    const { values } = this.state;

    return (
      <Row>
        <Col xs={12}>
          <h3 className="page-header">Cars</h3>
          <VBForm
            onSubmit={this.onSubmit}
            onChangeForm={this.onChange}
            onLoadForm={this.onLoad}
            validator={formValidator}
          >
            <Row>
              <Col xs={12}>
                <VBForm.Errors component={ErrorComponent}/>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <VBForm.Field
                  name="fullName"
                  label="Full Name"
                  validator={required}
                  component={RBField}
                  includeModel
                />
                <hr />
              </Col>
            </Row>
            <CarItems name="cars" />
            <div className="text-right">
              <FormActions />
            </div>
          </VBForm>
          <br />
        </Col>
        <Col xs={12}>
          <ReactJsonSyntaxHighlighter obj={values} />
        </Col>
      </Row>
    );
  }
}

export default FormList;
