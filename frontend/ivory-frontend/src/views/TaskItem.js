import { Form, Button, OverlayTrigger, Tooltip, Card } from "react-bootstrap";

const TaskItem = (props) => {
    const dueDateTime = new Date(props.dueDateTime.dateTime).toLocaleString("end-GB");
    const createdDateTime = new Date(props.createdDateTime).toLocaleString("end-GB");

    return (
        <tr>
            <td>
                <Card>
                    <Card.Header>
                        <Card.Title>
                            <OverlayTrigger overlay={
                                <Tooltip>
                                    Created on {createdDateTime}
                                </Tooltip>
                                }>
                                <b>
                                    {dueDateTime}
                                <br/>
                                {props.title}
                                </b>
                            </OverlayTrigger>
                        </Card.Title>
                        <Card.Subtitle as={"h6"}>
                            {props.importance.toUpperCase()}
                        </Card.Subtitle>
                    </Card.Header>

                    <Card.Body>
                        {props.body.content}
                    </Card.Body>
                </Card>
            </td>
        </tr>
    );
}

export default TaskItem;