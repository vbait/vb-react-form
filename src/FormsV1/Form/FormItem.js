import React from 'react';
import PropTypes from 'prop-types';
import { FormModel } from './FormModel';

class FormItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    asList: PropTypes.bool.isRequired,
    excluded: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
  };

  static defaultProps = {
    asList: false,
    excluded: false,
  };

  static contextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired,
  };

  static childContextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.formsModel = context.formModel.forms;
    this.model = new FormModel(props.name, props.validator, props.onChange, context.formModel);
    this.model.excluded = !!props.excluded;
    this.formsModel.add(this.model, !!props.asList);
  }

  getChildContext() {
    return { formModel: this.model };
  }

  render() {
    const { children } = this.props;
    return (
      <div>{children}</div>
    );
  }
}

export { FormItem };
