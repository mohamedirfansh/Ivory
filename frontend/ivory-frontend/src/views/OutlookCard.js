import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

import { event1 } from "./defaultEvent";
import OutlookEvent from "./OutlookEvent";

import OutLookItem from "./OutlookItem";

const OutlookCard = (props) => {
    const [outLookLines, setOutLookLines] = useState([]);
    const defaultEvent = new OutlookEvent(event1);
    console.log(defaultEvent);

    useEffect(() => {
        // initialise lines on start
        // set up connections to APIs
        setOutLookLines((prev) => [defaultEvent])
    }, [setOutLookLines]);
    return (
    <Card className="card-events">
        <Card.Header>
            <Card.Title as="h4">Events and Notifications</Card.Title>
        </Card.Header>
    <Card.Body>
        <Table>
            <tbody>
            {
                outLookLines.map((outlookItemLineObj) => {
                    return (<OutLookItem {...outlookItemLineObj} key={outlookItemLineObj.id}/>);
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
    );
}

export default OutlookCard;