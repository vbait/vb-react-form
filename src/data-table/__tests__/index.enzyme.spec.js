import React from 'react';
import { Table } from 'react-bootstrap';
import { shallow } from 'enzyme';

import DataTable from '../';

function setup() {
  const enzymeWrapper = shallow(<DataTable />);

  return {
    enzymeWrapper,
  };
}

describe('DataTable', () => {
  it('has table', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find(Table).length).toBe(1);
  });
});
