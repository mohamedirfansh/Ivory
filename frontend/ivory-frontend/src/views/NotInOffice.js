const { useState } = require("react")
const { Button, Card } = require("react-bootstrap")

const NotInOffice = (props) => {

    const [wfh, setWfh] = useState(false);

    const onClick = (e) => {
        console.log("Online")
        setWfh(!wfh);
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h4">In Office?</Card.Title>
            </Card.Header>
            <Card.Body>
            <div className="d-grid">
                <Button size="lg" variant={ wfh ? "success" : "secondary" } onClick={onClick}>
                    {wfh ? "Not In" : "In Office"}
                </Button>
            </div>
            </Card.Body>
        </Card>
    )
}

export default NotInOffice