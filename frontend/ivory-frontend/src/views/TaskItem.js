import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const TaskItem = (props) => {
    const taskText = props.taskText;
    return (
        <tr>
            <td>
                <Form.Check className="mb-1 pl-0">
                    <Form.Check.Label>
                    <Form.Check.Input
                        defaultValue=""
                        type="checkbox"
                    ></Form.Check.Input>
                    <span className="form-check-sign"></span>
                    </Form.Check.Label>
                </Form.Check>
            </td>

            <td>
                Edit
            </td>
            <td className="td-actions text-right">
                    <OverlayTrigger
                    overlay={
                        <Tooltip id="tooltip-488980961">
                        {taskText}
                        </Tooltip>
                    }
                    >
                    <Button
                        className="btn-simple btn-link p-1"
                        type="button"
                        variant="info"
                    >
                        <i className="fas fa-edit"></i>
                    </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                    overlay={
                        <Tooltip id="tooltip-506045838">Remove</Tooltip>
                    }
                    >
                    <Button
                        className="btn-simple btn-link p-1"
                        type="button"
                        variant="danger"
                    >
                        <i className="fas fa-times"></i>
                    </Button>
                    </OverlayTrigger>
            </td>
        </tr>
    );
}

export default TaskItem;