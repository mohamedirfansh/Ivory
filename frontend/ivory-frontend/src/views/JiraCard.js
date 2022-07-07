import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import JiraItem from "./JiraItem";

const JiraCard = (props) => {
    const [jiraItems, setJiraItems] = useState([]);

    useEffect(() => {
        // init
        setJiraItems(prev => ["JIRA 1", "JIRA 2"]);
    }, [setJiraItems]);
    return (
        <Card className="card-jira">
            <Card.Header>
                <Card.Title as="h4">Jira</Card.Title>
            </Card.Header>
            <Card.Body>
                <div className="table-full-width">
                    <Table>
                        <tbody>
                            {
                                jiraItems.map(jiraTicket => {
                                    return (<JiraItem jiraTicket={jiraTicket}/>)
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