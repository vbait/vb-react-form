import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormModel } from '../Form/FormModel';
import { FormItemModel } from '../Form/FormItemModel';
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
    formItemModel: PropTypes.instanceOf(FormItemModel),
  };

  constructor(props, context) {
    super(props, context);
    this.formModel = context.formModel;
    this.formItemModel = context.formItemModel;
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
      let field = null;
      if (this.formItemModel) {
        field = this.formItemModel.fields.field(name);
      } else {
        field = this.formModel.fields.field(name);
      }
      return React.createElement(component, {
        form: this.formModel.getPublic(),
        formItem: this.formItemModel && this.formItemModel.getPublic(),
        field: field && field.getPublic(),
        ...other,
      });
    }
    return null;
  }
}

export { FieldErrors };
