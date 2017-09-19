import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormModel } from '../Form/FormModel';
import { FieldErrorsComponent } from './FieldErrorsComponent';

class FieldErrors extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    component: PropTypes.func,
  };

  static defaultProps = {
    name: '',
    component: FieldErrorsComponent,
  };

  static contextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.formModel = context.formModel;
  }

  componentDidMount() {
    this.subscriberId = this.formModel.addSubscriber(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.formModel.removeSubscriber(this.subscriberId);
  }

  render() {
    if (this.formModel.initialized) {
      const { name, component, ...other } = this.props;
      const field = this.formModel.fields.field(name);
      return React.createElement(component, {
        form: this.formModel,
        field: field,
        ...other,
      });
    }
    return null;
  }
}

export { FieldErrors };
