import { useState, useEffect } from "react";
import { Card, Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import TodoItem from "./TodoItem";

const TODO_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/todos/";
const USER_EMAIL = "test6@email.com";

const TodoCard = (props) => {
    const [todos, setTodos] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("HIGH");
    const [loading, setLoading] = useState(true);
  
    const initTodos = () => {
        // get pending todos
        fetch(TODO_ENDPOINT + "pending?" + new URLSearchParams(
            {
                userEmail: USER_EMAIL
            }
        )).then(response => response.json())
          .then(result => result.todos)
          .then(todos => setTodos(todos))
          .catch(e => console.log(e))
          .finally(setLoading(false));  
    }

    const createTodo = (e) => {
        e.preventDefault();
        // const formData = new FormData(e.target);
        handleClose();
        let data = {
            "userEmail": USER_EMAIL,
            "title": title,
            "description": description,
            "deadline": deadline,
            "priority": priority,
            "done": "false"
        }
        fetch(TODO_ENDPOINT + "create", {
            method: "POST", 
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response.json());
            if (response.status < 300) {
                console.log("success");
                initTodos();
            }
        })
    }

    useEffect(() => {
        // init
        initTodos();
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose} className="modal">
                <Modal.Header closeButton>
                    Add Todo
                </Modal.Header>
                
                <Modal.Body>
                    <Form onSubmit={createTodo}>
    
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required type="input" onChange={x => setTitle(x.target.value)}/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required as={"textarea"} onChange={x => setDescription(x.target.value)}/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="deadline">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="date" onChange={x => {
                                let value = x.target.value;
                                setDeadline(value.split("-").reverse().join("/"))}
                            }/>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="priority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as={"select"} onChange={x => setPriority(x.target.value)}>
                                <option value="HIGH">HIGH</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="LOW">LOW</option>
                            </Form.Control>
                        </Form.Group>
    
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
    
                    </Form>
    
                </Modal.Body>
                
                {/* <Modal.Footer>
                    <Button variant="secondary">
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
    
            <Card className="card-tasks">
                <Card.Header>
                    <Card.Title as="h4">Todos
                    <Button className="btn-simple btn-link p-1"
                            type="button"
                            variant="primary"
                            style={{float: "right"}}
                            onClick={handleShow}
                    >
                        <i className="fas fa-plus"></i>
                    </Button>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                {
                (loading) ? (
                    <Spinner></Spinner>
                )  : (

                    <div className="table-full-width">
                        <Table>
                        <tbody>
                            {
                                todos.map(todo => (<TodoItem {...todo} key={todo.id} endpoint={TODO_ENDPOINT} refreshHandle={initTodos}/>))
                            }
                        </tbody>
                        </Table>
                    </div>
                )}
                </Card.Body>
                <Card.Footer>
                <hr></hr>
                {/* <Button>
                <div className="stats">
                    <i className="now-ui-icons loader_refresh spin"></i>
                    Refresh
                </div>
                </Button> */}
                </Card.Footer>
            </Card>
        </>
    );
}

export default TodoCard;