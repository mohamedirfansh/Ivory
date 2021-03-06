import { useEffect, useState } from "react";
import { Card, Spinner, Table } from "react-bootstrap";
import JiraItem from "./JiraItem";

import { USER_EMAIL } from "./constants";

const JIRA_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/jira/";

const JiraCard = (props) => {
    const [jiraItems, setJiraItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // init
        setLoading(true);
        fetch(JIRA_ENDPOINT + "?" + new URLSearchParams(
            {
                "userEmail": USER_EMAIL
            }
        )).then(response => response.json())
          .then(result => setJiraItems(result.issues))
          .catch(e => console.log(e))
          .finally(setLoading(false));
    }, [setJiraItems, setLoading]);
    
    return (
        <Card className="card-jira">
            <Card.Header>
                <Card.Title as="h4">Jira
                
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <div className="table-full-width">
                <Table>
                    <tbody>
                        {
                            jiraItems.map(jiraTicket => {
                                return (<JiraItem jiraTicket={jiraTicket} key={jiraTicket.key}/>)
                            })
                        }
                    </tbody>
                </Table>
                </div>
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

export default JiraCard;