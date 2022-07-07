import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const JiraItem = (props) => {
    const jiraTicket = props.jiraTicket;
    const deadline = new Date(props.deadline);
    const createdOn = new Date(props.deadline);

    return (
        <tr>
            <td>
                {jiraTicket}
            </td>
            <td className="td-actions text-right">
                    <OverlayTrigger
                    overlay={
                        <Tooltip id="tooltip-488980961">
                        Edit
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

export default JiraItem;