import { useState, useEffect } from "react";
import { Card, Table, Dropdown } from "react-bootstrap";
import Taskitem from "./TaskItem";

const TASK_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/etasks/"

const TOKEN = process.env.REACT_APP_OUTLOOK_TOKEN
const TaskCard = (props) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const dateSort = () => {
        fetch(TASK_ENDPOINT + "all/duedatetime", {
            headers: {
                'Authorization': "Bearer " + TOKEN
            }
        })
          .then(response => response.json())
          .then(result => setTasks(result))
          .catch(e => console.log(e))
          .finally(setLoading(false));  
    }

    const importanceSort = () => {
        fetch(TASK_ENDPOINT + "all/important", {
            headers: {
                'Authorization': "Bearer " + TOKEN
            }
        })
          .then(response => response.json())
          .then(result => setTasks(result))
          .catch(e => console.log(e))
          .finally(setLoading(false));  
    }

    useEffect(() => {
        dateSort();
    }, []);

    const handleClick = (sortType) => (e) => {
        e.preventDefault();
        sortType();
    }

    return (
        <Card className="card-tasks">
            <Card.Header>
                <Card.Title as="h4">eTasks

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
            <div className="table-full-width">
                <Table>
                <tbody>
                    {
                        tasks.map(task => (<Taskitem {...task} key={task.id}/>))
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

export default TaskCard;