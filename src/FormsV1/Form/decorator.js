import React from 'react';
import PropTypes from 'prop-types';
import { FormModel } from './FormModel';

const connectForm = (WrappedComponent) => {
  const HOC = class extends React.Component {
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
      return <WrappedComponent form={this.context.formModel.getPublic()} />;
    }
  };

  return HOC;
};

export { connectForm };
