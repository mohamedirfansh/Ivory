import { useEffect, useState } from "react";
import { Card, Spinner, Table } from "react-bootstrap";

import { USER_EMAIL } from "./constants";

import OutLookItem from "./OutlookItem";

const MEETING_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/meetings/all"

const OutlookCard = (props) => {
    const [outLookLines, setOutLookLines] = useState([]);
    // const defaultEvent = new OutlookEvent(event1);
    // console.log(defaultEvent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // initialise lines on start
        // set up connections to APIs
        fetch(MEETING_ENDPOINT + "?" + new URLSearchParams({
            useremail: USER_EMAIL
        }), {
            mode: 'cors',
            headers: {
                "Authorization" : 'Bearer ' + process.env.REACT_APP_OUTLOOK_TOKEN
            }
        })
        .then(response => response.json())
        .then(result => setOutLookLines(result))
        .catch(e => console.log(e))
        .finally(setLoading(false));
        console.log(outLookLines);
    }, [setOutLookLines]);

    return (
        <>
        {
            (loading) ?
            (
                <Spinner></Spinner>
            ) : (
                <Card className="card-events">
                <Card.Header>
                    <Card.Title as="h4">Events and Meetings</Card.Title>
                </Card.Header>
            <Card.Body>
                <Table>
                    <tbody>
                    {
                        outLookLines.map((outlookItemLineObj) => {
                            return (<OutLookItem {...outlookItemLineObj} key={outlookItemLineObj.MeetingId.S}/>);
                        })
                    }
                    </tbody>
                </Table>
            </Card.Body>
            <Card.Footer>
                <hr></hr>
                <div className="stats">
                    <i className="now-ui-icons loader_refresh spin"></i>
                    Refresh
                </div>
            </Card.Footer>
            </Card>
        
            )
        }
        </>
    );
}

export default OutlookCard;