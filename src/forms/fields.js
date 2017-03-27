import React from 'react';

class FieldInput extends React.Component {
  onChange = (event) => {
    this.props.onChange(event.target.value, event);
  };
  render() {
    return (
      <input type="text" {...this.props} onChange={this.onChange} />
    )
  };
}

export {FieldInput}