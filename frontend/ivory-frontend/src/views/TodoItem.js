import { Button, OverlayTrigger, Tooltip, Card, Col, Row } from "react-bootstrap";

const TodoItem = (props) => {
    console.log(props);
    const deadline = new Date(props.deadline);
    const createdOn = new Date(props.createdOn);
    return (
        <>
        <tr>
            <td>
                <Card>
                    <Card.Header>
                        <Card.Title>
                        <OverlayTrigger overlay={
                            <Tooltip>
                                Created on {createdOn.toLocaleDateString("en-GB")}
                            </Tooltip>
                        }>
                            <>
                            <b>
                                {deadline.toLocaleDateString("en-GB")}
                            </b>

                                <br/>
                            {props.title}
                            </>
                            </OverlayTrigger>

                        </Card.Title>
                        <Card.Subtitle as={"h6"}>
                            <hr style={{ "margin": "7px" }}/>
                            <Row className="align-items-center">
                                <Col xs={6}>
                                    {props.priority}
                                </Col>
                                <Col xs={3}>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id="tooltip-done">Mark as Done</Tooltip>
                                        }
                                        >
                                        <Button
                                            className="btn-simple btn-link p-1"
                                            type="button"
                                            variant="info"
                                        >
                                            <i className="fas fa-check"></i>
                                        </Button>
                                    </OverlayTrigger>

                                </Col>
                                <Col xs={3}>

                                    <OverlayTrigger
                                    overlay={
                                        <Tooltip id="tooltip-delete">Delete</Tooltip>
                                    }
                                    >
                                    <Button
                                        className="btn-simple btn-link p-1"
                                        type="button"
                                        variant="danger"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                    </OverlayTrigger>

                                </Col>
                            </Row>
                        


                        </Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                            {props.description}
                    </Card.Body>
                    <Card.Footer>


                    </Card.Footer>
                </Card>
            </td>

        </tr>
        </>
    );
}

export default TodoItem;