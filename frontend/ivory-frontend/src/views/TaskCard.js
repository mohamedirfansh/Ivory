import { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import Taskitem from "./TaskItem";

const TASK_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/etasks/"

const TOKEN = process.env.REACT_APP_OUTLOOK_TOKEN
const TaskCard = (props) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // init
        fetch(TASK_ENDPOINT + "all")
          .then(response => response.json())
          .then(result => setTasks(result))
    }, [setTasks]);

    return (
        <Card className="card-tasks">
            <Card.Header>
                <Card.Title as="h4">eTasks</Card.Title>
                {/* <p className="card-category">Backend development</p> */}
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