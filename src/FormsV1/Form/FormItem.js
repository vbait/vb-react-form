import React from 'react';
import PropTypes from 'prop-types';
import { FormModel } from './FormModel';
import { FormItemModel } from './FormItemModel';

class FormItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
    asList: PropTypes.bool,
    asChild: PropTypes.bool,
    excluded: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
  };

  static defaultProps = {
    asList: false,
    asChild: false,
    excluded: false,
    validator: () => ([]),
  };

  static contextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired,
    formItemModel: PropTypes.instanceOf(FormItemModel),
  };

  static childContextTypes = {
    formItemModel: PropTypes.instanceOf(FormItemModel).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const { formModel, formItemModel } = context;
    this.forms = formModel.forms;
    if (formItemModel && props.asChild) {
      this.forms = formItemModel.forms;
    }
    this.formItemModel = this.forms.add(props, !!props.asList);
    this.formModel = formModel;
  }

  getChildContext() {
    return { formItemModel: this.formItemModel };
  }

  componentDidMount() {
    if (this.formModel.initialized) {
      this.formModel.validate();
    }
  }

  componentWillUnmount() {
    this.forms.remove(this.formItemModel);
    if (this.formModel.initialized) {
      this.formModel.validate();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div>{children}</div>
    );
  }
}

export { FormItem };
