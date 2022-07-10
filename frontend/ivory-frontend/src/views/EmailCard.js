import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

import EmailItem from "./EmailItem";
import { email } from "./defaultEvents";

const EmailCard = (props) => {
    const [emailLines, setEmailLines] = useState([]);

    const defaultEmail = email;

    useEffect(() => {
        // initialise lines on start
        // set up connections to APIs
        setEmailLines((prev) => [defaultEmail])
    }, [setEmailLines]);
    return (
        <Card className="card-events">
            <Card.Header>
                <Card.Title as="h4">Unread emails</Card.Title>
            </Card.Header>
        <Card.Body>
            <Table>
                <tbody>
                {
                    emailLines.map((emailObj) => {
                        return (<EmailItem {...emailObj} key={emailObj.id}/>);
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

export default EmailCard;