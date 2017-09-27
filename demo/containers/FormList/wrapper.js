import React from 'react';
import FormList from '.';

export default class Wrapper extends React.Component {
  state = { index: 1 };

  onChange = () => {
    console.log(11111111);
    this.setState(prev => ({
      index: prev.index + 1,
    }));
  };

  render() {
    return (
      <FormList onChange={this.onChange} />
    )
  }
}