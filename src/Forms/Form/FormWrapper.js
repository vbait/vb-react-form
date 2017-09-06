/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';

class FormWrapper extends React.PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
  };

  static contextTypes = {
    // formModel: PropTypes.instanceOf(FormModel).isRequired,
    formModel: PropTypes.object.isRequired, // TODO: need to investigate
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
    const { component, ...other } = this.props;
    return React.createElement(component, {
      model: this.formModel.getPublicModel(),
      ...other,
    });
  }
}

export { FormWrapper };
