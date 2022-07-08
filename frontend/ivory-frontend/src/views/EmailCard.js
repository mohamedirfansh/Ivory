import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

import EmailItem from "./EmailItem";
import { email } from "./defaultEvents";

const EMAIL_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/outlook/";
const USER_EMAIL = "test6@email.com";

const EmailCard = (props) => {
    const [emailLines, setEmailLines] = useState([]);

    const defaultEmail = email;

    useEffect(() => {

        // initialise lines on start
        // set up connections to APIs
        console.log(process.env);
        fetch(EMAIL_ENDPOINT, {
            mode: 'cors',
            headers: {
                "Authorization" : 'Bearer ' + process.env.REACT_APP_OUTLOOK_TOKEN
            }
        }).then(response => response.json())
          .then(result => {
            console.log(result);
          });
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