import { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import Taskitem from "./TaskItem";

const TaskCard = (props) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // init
        setTasks(prev => ["TASK 1", "TASK 2"]);
    }, [setTasks]);

    return (
        <Card className="card-tasks">
            <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                {/* <p className="card-category">Backend development</p> */}
            </Card.Header>
            <Card.Body>
            <div className="table-full-width">
                <Table>
                <tbody>
                    {
                        tasks.map(task => (<Taskitem taskText={task}/>))
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