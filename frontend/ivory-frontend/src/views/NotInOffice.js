const { useState } = require("react")
const { Button, Card } = require("react-bootstrap")
import { USER_EMAIL } from "./constants"

const CONVERT_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/convertMeetingToZoom"

const NotInOffice = (props) => {

    const [wfh, setWfh] = useState(false);
    const [converted, setConverted] = useState(false);
    const onClick = (e) => {
        console.log("Online")
        setWfh(!wfh);
        fetch(CONVERT_ENDPOINT, {
            headers: {
                email: USER_EMAIL, 
                startTIme: new Date().getTime().toString(), 
                endTime: new Date().getTime().toString()
            }
        }).then(res => setConverted(true))
          .catch(e => {
            console.log(e);
            setConverted(true);
          });
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Toggle Work From Home</Card.Title>
            </Card.Header>
            <Card.Body>
            <div className="d-grid">
                <Button style={{"width": "100%"}} variant={ wfh ? "success" : "secondary" } onClick={onClick}>
                    {wfh ? "Not In" : "In Office"}
                </Button>
            </div>
            </Card.Body>
            {
                (converted) ? (<Card.Footer><p style={{"color": "green"}}>Meetings Converted!</p></Card.Footer>) : (<p></p>)
            }

        </Card>
    )
}

export default NotInOffice