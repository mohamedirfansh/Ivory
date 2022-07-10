import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'


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
import { CardText } from "reactstrap";

const Notetaking = () => {

    const [audioData, setAudioData] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
    })
    const handleAudioStop = (data) => {
        console.log(data);
        setAudioData(prev => data);
    }
    const handleAudioUpload = (file) => {
        console.log(file);
    }

    const handleReset = () => {
        const reset = {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        };
        setAudioData(prev => reset);
      }
    
    return (
        <>
        <Container fluid>
            <Row>
                <Col xs={5}>
                    <Card>
                        <Card.Header>
                                <Card.Title>
                                Taking notes for {"test"}
                                </Card.Title>
                        </Card.Header>
                        <Card.Body></Card.Body>
                    </Card>
                </Col>
                <Col xs={3}>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                View Notes
                            </Card.Title>
                        </Card.Header>
                        <Card.Body></Card.Body>
                    </Card>
                </Col>
                <Col xs={3}>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                Record Audio
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Recorder
                                record={true}
                                audioURL={audioData.url}
                                handleAudioStop={data => handleAudioStop(data)}
                                handleAudioUpload={file => handleAudioUpload(file)}
                                handleReset={() => handleReset()} />
                        </Card.Body>
                    </Card>
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

export default Notetaking;