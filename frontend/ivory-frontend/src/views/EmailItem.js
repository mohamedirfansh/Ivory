import { Button, OverlayTrigger, Tooltip, Card } from "react-bootstrap";

const EmailItem = (props) => {
    console.log(props);
    // console.log(outlookItemProp);
    // const outlookItem = JSON.parse(outlookItemProp);
    const receivedDateTime = new Date(props.receivedDateTime);
    const sentDateTime = new Date(props.sentDateTime);
    return (
        <>
        <tr>
            <td>
                <Card>
                    <Card.Header>
                        <Card.Title>
                        <OverlayTrigger overlay={
                            <Tooltip>
                                Sent on {sentDateTime.toLocaleString("en-GB")}
                            </Tooltip>
                        }>
                            <b>
                                {receivedDateTime.toLocaleString("en-GB")}
                            <br/>
                            {props.subject}
                            </b>
                            </OverlayTrigger>

                        </Card.Title>
                        <Card.Subtitle as={"h6"}>
                        <hr/>
                        {props.sender.emailAddress.name}
                        </Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                            {props.bodyPreview}
                    </Card.Body>
                    <Card.Footer>

                        <OverlayTrigger
                        overlay={
                            <Tooltip id="tooltip-delete">Mark as Read</Tooltip>
                        }
                        >
                        <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="info"
                        >
                            <i className="fas fa-times"></i>
                        </Button>
                    </OverlayTrigger>

                    </Card.Footer>
                </Card>
                {/*Contents*/}
            </td>

        </tr>
        </>
    );
}

export default EmailItem;