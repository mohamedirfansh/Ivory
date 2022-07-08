import { Form, Button, OverlayTrigger, Tooltip, Card, Badge } from "react-bootstrap";

const JiraItem = (props) => {
    const jiraTicket = props.jiraTicket;
    const deadline = new Date(props.deadline);
    const createdOn = new Date(props.deadline);

    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    {jiraTicket.key}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                {jiraTicket.summary}
            </Card.Body>
            <Card.Footer>
                {jiraTicket.labels.map(label => {
                    return (
                        <h5>
                        <Badge bg="info">
                            {label}
                        </Badge>
                        </h5>
                    );
                })}
            </Card.Footer>
        </Card>
    );
}

export default JiraItem;