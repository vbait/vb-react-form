import uuid from 'uuid/v1';
import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { VBForm, requiredValidator, passwordValidator } from '../../../src/FormsV1';
import { RBField, FormActions } from './Fields';

const required = (name, value) => {
  return requiredValidator(value);
};

const formValidator = (fields, data) => {
  const errors = {};
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
      cars: [...cars, {id: uuid()}],
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
                  validator={required}
                  component={RBField}
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
      errors: {}
    };
  }

  onSubmit = (values) => {
    console.log(1111111, values);
    this.setState(() => ({
      errors: {
        fullName: 'Server error.',
      },
    }));
  };

  render() {
    const { errors } = this.state;

    return (
      <Row>
        <Col xs={12}>
          <h3 className="page-header">Cars</h3>
          <VBForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            onLoad={this.onLoad}
            validator={formValidator}
          >
            <Row>
              <Col xs={12}>
                <VBForm.Field
                  name="fullName"
                  label="Full Name"
                  validator={required}
                  component={RBField}
                  includeModel
                  submissionErrors={errors.fullName}
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
      </Row>
    );
  }
}

export default FormList;
