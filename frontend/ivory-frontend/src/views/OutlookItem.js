import { Form, Button, OverlayTrigger, Tooltip, Card } from "react-bootstrap";
import OutlookEvent from "./OutlookEvent";

const OutLookItem = (props) => {
    console.log(props);
    // console.log(outlookItemProp);
    // const outlookItem = JSON.parse(outlookItemProp);
    const start_time = new Date(props.start_time);
    const end_time = new Date(props.end_time);
    return (
        <>
        <tr>
            <td>
                <Card>
                    <Card.Header>
                        <Card.Title>
                        <OverlayTrigger overlay={
                            <Tooltip>
                                Until {end_time.toLocaleString("en-GB")}
                            </Tooltip>
                        }>
                            <b>
                                {start_time.toLocaleString("en-GB")}
                            <br/>
                            {props.subject}
                            </b>
                            </OverlayTrigger>

                        </Card.Title>
                        <Card.Subtitle as={"h6"}>
                        <hr/>
                        {props.location.displayName}
                        </Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                            {props.bodyPreview}
                    </Card.Body>
                    <Card.Footer>
                        Organised by {props.organizer_name}
                        <br/>
                        <OverlayTrigger
                    overlay={
                        <Tooltip id="tooltip-488980961">
                        Edit
                        </Tooltip>
                    }
                    >
                    <Button
                        className="btn-simple btn-link p-1"
                        type="button"
                        variant="info"
                    >
                        <i className="fas fa-edit"></i>
                    </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                    overlay={
                        <Tooltip id="tooltip-506045838">Remove</Tooltip>
                    }
                    >
                    <Button
                        className="btn-simple btn-link p-1"
                        type="button"
                        variant="danger"
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

export default OutLookItem;