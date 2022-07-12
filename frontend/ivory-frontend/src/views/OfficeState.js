import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OfficeOccupancy from 'components/OfficeState/OfficeOccupancy';
import { OfficeCapacity } from 'components/OfficeState/OfficeCapacity';
import { OfficeByTeams } from 'components/OfficeState/OfficeByTeams';

function OfficeState() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={4}>
            <OfficeCapacity />
          </Col>
          <Col xs={8}>
            <OfficeOccupancy />
          </Col>
          <Col className="office-by-teams" xs={8}>
            <OfficeByTeams />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OfficeState;
