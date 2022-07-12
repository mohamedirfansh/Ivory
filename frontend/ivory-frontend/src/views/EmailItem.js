import { Button, OverlayTrigger, Tooltip, Card } from "react-bootstrap";

const READ_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/outlook/read?emailId=";

const EmailItem = (props) => {
    console.log(props);
    // console.log(outlookItemProp);
    // const outlookItem = JSON.parse(outlookItemProp);
    const receivedDateTime = new Date(props.receivedDateTime);
    const sentDateTime = new Date(props.sentDateTime);
    const emailId = props.id;

    const handleRead = (e) => {
        e.preventDefault();
        fetch(READ_ENDPOINT + emailId, {
            method: "PATCH",  
            headers: {
                "Authorization": 'Bearer ' + process.env.REACT_APP_OUTLOOK_TOKEN, 
                "Content-Type": "application/json", 
            }
        }).then(_res => props.readHandle())
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
                            onClick={handleRead}
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