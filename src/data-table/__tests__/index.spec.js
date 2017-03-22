import React from 'react';
import renderer from 'react-test-renderer';

import DataTable from '../';

describe('DataTable', () => {
  it('should create component', () => {
    const component = renderer.create(
      <DataTable />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
