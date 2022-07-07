import React from "react";
import ChartistGraph from "react-chartist";
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
import TaskCard from "./TaskCard";
import JiraCard from "./JiraCard";

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={4}>
            <OutlookCard/>
          </Col>

          <Col xs={4}>
            <JiraCard/>
          </Col>

          <Col xs={4}>
            <TaskCard/>
          </Col>
  
        </Row>
        <Row>
          <Col xs={12}>
            <Editor/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
