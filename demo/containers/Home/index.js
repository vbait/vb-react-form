import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayground from '../../components/ReactPlayground';
import samples from '../../samples';

class Home extends React.Component {
  render() {
    console.log(1111, this);
    return <Row>
      <Col xs={12}>
        <ReactPlayground codeText={samples.Example} />
      </Col>
    </Row>
  }
}

Home.contextTypes = {
  metadata: React.PropTypes.object,
};

export default Home;
