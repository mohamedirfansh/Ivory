import React from "react";
// import { Editor } from "react-draft-wysiwyg";
// import "";

// react-bootstrap components
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import TaskCard from "./TaskCard";
import JiraCard from "./JiraCard";
import TodoCard from "./TodoCard";

function DashboardPersonnal() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={4}>
            <TodoCard/>
          </Col>

          <Col xs={4}>
            <JiraCard/>
          </Col>

          <Col xs={4}>
            <TaskCard/>
          </Col>
  
        </Row>
      </Container>
    </>
  );
}

export default DashboardPersonnal;
