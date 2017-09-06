import React from 'react';
import PropTypes from 'prop-types';

class ErrorsComponent extends React.Component {
  render() {
    const { dirty, isValid, errors, asyncErrors, className } = this.props;
    return (dirty && !isValid ? <div className={className}>
      {errors.map(error => <div key={error}>{error}</div>)}
      {asyncErrors.map(error => <div key={error}>{error}</div>)}
    </div> : null);
  }
}

ErrorsComponent.propTypes = {
  isValid: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  asyncErrors: PropTypes.array.isRequired,
  className: PropTypes.string,
};

ErrorsComponent.defaultProps = {
  className: '',
};

export { ErrorsComponent };
