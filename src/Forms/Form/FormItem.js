import React from 'react';
import PropTypes from 'prop-types';
import { FormModel } from './FormModel';

class FormItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    asList: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
  };

  static defaultProps = {
    asList: false,
  };

  static contextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired,
  };

  static childContextTypes = {
    formModel: PropTypes.instanceOf(FormModel).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.parentModel = context.formModel;
    this.model = new FormModel(props.name, this.onChange);
    if (props.asList) {
      this.parentModel.onInitForm(this.model, true);
    } else {
      this.parentModel.onInitForm(this.model);
    }
  }

  getChildContext() {
    return { formModel: this.model };
  }

  componentDidMount() {
    this.model.validate();
    this.model.setInitialized(true);
    this.model.publish();
    this.parentModel.onUpdateForm();
  }

  componentWillUnmount() {
    this.parentModel.onRemoveForm(this.model);
  }

  onChange = () => {
    this.parentModel.onUpdateForm();
  };

  reset = () => {
    this.model.reset();
  };

  update = (values) => {
    this.model.update(values);
  };

  render() {
    const { children } = this.props;
    return (
      <div>{children}</div>
    );
  }
}

export { FormItem };
