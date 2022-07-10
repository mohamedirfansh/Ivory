import { useEffect, useState } from "react";
import { Card, Dropdown, Table } from "react-bootstrap";

import EmailItem from "./EmailItem";
import { email } from "./defaultEvents";

const EMAIL_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/outlook/unread";
const EMAIL_ENDPOINT_IMPORTANCE = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/outlook/unread/important";
const USER_EMAIL = "test6@email.com";

const EmailCard = (props) => {
    const [emailLines, setEmailLines] = useState([]);

    const defaultEmail = email;

    const dateSort = () => {
        fetch(EMAIL_ENDPOINT, {
            mode: 'cors',
            headers: {
                "Authorization" : 'Bearer ' + process.env.REACT_APP_OUTLOOK_TOKEN

            }
        }).then(response => response.json())
          .then(result => {
            console.log(result);
            setEmailLines(result);
          });
    }

    const importanceSort = () => {
        fetch(EMAIL_ENDPOINT_IMPORTANCE, {
            mode: 'cors',
            headers: {
                "Authorization" : 'Bearer ' + process.env.REACT_APP_OUTLOOK_TOKEN

            }
        }).then(response => response.json())
          .then(result => {
            console.log(result);
            setEmailLines(result);
          });
    }

    useEffect(() => {
        // initialise lines on start
        // set up connections to APIs
        //   setEmailLines([defaultEmail]);
        dateSort();
    }, []);

    const handleClick = (sortType) => (e) => {
        e.preventDefault();
        sortType();
    }
    
    return (
        <Card className="card-events">
            <Card.Header>
                <Card.Title as="h4">
                    Unread emails
                    <Dropdown style={{"float": "right", "border": "none", "padding": 0}}>

                        <Dropdown.Toggle variant="simple" style={{"border": "none", "padding": 0}}>
                            <i class='fas fa-sort'/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleClick(importanceSort)}>
                                Sort by importance
                            </Dropdown.Item>

                            <Dropdown.Item onClick={handleClick(dateSort)}>
                                Sort by received time
                            </Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>
                </Card.Title>
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