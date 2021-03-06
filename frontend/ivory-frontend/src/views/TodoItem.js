import { Button, OverlayTrigger, Tooltip, Card, Col, Row } from "react-bootstrap";

const TodoItem = (props) => {
    console.log(props);

    // convert dd/mm/yyyy strings to JavaScript Date objects
    var deadlineParts = props.deadline.split("/");
    var createdOnParts = props.createdOn.split("/");
    // month is 0-based, so parts[1] - 1
    const deadline = new Date(+deadlineParts[2], deadlineParts[1] - 1, +deadlineParts[0]);
    const createdOn = new Date(+createdOnParts[2], createdOnParts[1] - 1, +createdOnParts[0]);

    const completeTodo = (e) => {
        e.preventDefault();
        const endpoint = props.endpoint;
        const data = {
            "userEmail": props.userEmail,
            "id": props.id,
            "title": props.title,
            "description": props.description,
            "deadline": props.deadline,
            "priority": props.priority,
            "done": "true"
        }
        fetch(endpoint + "update", {
            method: "POST", 
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(response => response.json())
          .then(results => {
            console.log(results);
            props.refreshHandle();
          });
    }

    const deleteTodo = (e) => {
        e.preventDefault();
        const endpoint = props.endpoint;
        fetch(endpoint + "?" + new URLSearchParams({
            userEmail: props.userEmail,
            id: props.id
        }), {
            method: "DELETE", 
            mode: 'cors',
        }).then(response => response.json())
        .then(results => {
            console.log(results);
            props.refreshHandle();
        });
    }

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
                                            onClick={completeTodo}
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
                                        onClick={deleteTodo}
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