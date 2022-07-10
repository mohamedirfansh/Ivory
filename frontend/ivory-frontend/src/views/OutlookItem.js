import { useEffect, useState } from "react";
import { Form, Button, OverlayTrigger, Tooltip, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import OutlookEvent from "./OutlookEvent";

const OutLookItem = (props) => {
    console.log(props);
    const start_time = new Date(props.Start.S);
    const end_time = new Date(props.End.S);

    // console.log(outlookItemProp);
    // const outlookItem = JSON.parse(outlookItemProp);
    const meetingId = props.MeetingId.S;
    // const noteId = props.NoteId.S;
    
    // const MEETING_ENDPOINT = "https://graph.microsoft.com/v1.0/me/events/"
    const [meeting, setMeeting] = useState({});
    const [loading, setLoading] = useState(false);

    const noteId = "NoteId" in props ? props.NoteId.S : v4().toString();
    // useEffect(() => {
    //     fetch(MEETING_ENDPOINT + meetingId, {
    //         headers: {
    //             "Authorization" : 'Bearer ' + process.env.REACT_APP_OUTLOOK_TOKEN, 
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(res => {
    //         console.log(res)
    //         return res;
    //     })
    //     .then(meeting => setMeeting(meeting))
    //     .catch(e => console.log(e))
    //     .finally(setLoading(false));
    //     // .then(result => setOutLookLines(result))

    // }, [setMeeting]);
    
    return (
        <>
        {
            (loading) ? 
                (<Spinner></Spinner>)
                : (
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
                                    {props.Subject.S}
                                    </b>
                                    </OverlayTrigger>

                                </Card.Title>
                                <Card.Subtitle as={"h6"}>
                                <hr/>
                                {"Location: " + props.Location.S}
                                </Card.Subtitle>
                            </Card.Header>
                            <Card.Body>
                                Organised by {props.Organizer.S}
                            </Card.Body>
                            <Card.Footer>
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
                                <Tooltip id="tooltip-notes">Notes</Tooltip>
                            }
                            >
                            <Link to={{
                                pathname: "/admin/notes", 
                                state: { id: noteId }
                            }}>
                            <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="secondary"
                            >
                                <i className="fas fa-book"></i>
                            </Button>
                            </Link>
                            </OverlayTrigger>

                            <OverlayTrigger
                            overlay={
                                <Tooltip id="tooltip-delete">Remove</Tooltip>
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
                )}
        </>
    );
}

export default OutLookItem;