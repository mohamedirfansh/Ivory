import React from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import OutlookCard from "./OutlookCard";
import EmailCard from "./EmailCard";

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={6}>
            <OutlookCard/>
          </Col>

          <Col xs={6}>
            <EmailCard/>
          </Col>

          {/* <Col xs={3}>
            <NotInOffice/>
          </Col> */}
  
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
