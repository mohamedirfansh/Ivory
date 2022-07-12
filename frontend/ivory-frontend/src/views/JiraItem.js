import { Form, Button, OverlayTrigger, Tooltip, Card, Badge } from "react-bootstrap";

const JiraItem = (props) => {
    console.log(props)
    const jiraTicket = props.jiraTicket;

    return (
        <tr>
        <td>

        <Card>
            <Card.Header>
                <Card.Title>
                    <b>
                        {jiraTicket.key}
                    </b>
                </Card.Title>
            </Card.Header>
            <Card.Subtitle as={"h6"}>
                <hr style={{ "margin": "7px", "padding-left": "1em", "padding-right": "1em" }}/>
            </Card.Subtitle>
            <Card.Body>
                {jiraTicket.summary}
            </Card.Body>
            <Card.Footer>
                {jiraTicket.labels.map(label => {
                    return (
                        <h5 key={label}>
                        <Badge bg="info">
                            {label}
                        </Badge>
                        </h5>
                    );
                })}
            </Card.Footer>
        </Card>
        </td>
        </tr>
    );
}

export default JiraItem;