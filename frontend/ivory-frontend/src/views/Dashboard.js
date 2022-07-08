import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import OutlookCard from "./OutlookCard";
import EmailCard from "./EmailCard";
import NotInOffice from "./NotInOffice";

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={4}>
            <OutlookCard/>
          </Col>

          <Col xs={5}>
            <EmailCard/>
          </Col>

          <Col xs={3}>
            <NotInOffice/>
          </Col>
  
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
