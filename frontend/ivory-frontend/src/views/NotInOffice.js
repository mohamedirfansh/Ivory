const { useState } = require("react")
const { Button, Card, Alert, Toast } = require("react-bootstrap")
import { USER_EMAIL } from "./constants"

const CONVERT_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/meetings/tozoom/"
const MILLISECONDS_PER_DAY = 86400000
const now = new Date()
const now_sg = now.getTime() + (now.getTimezoneOffset() * 60000);

const NotInOffice = (props) => {
    const [alertShow, setAlertShow] = useState(false);
    const [wfh, setWfh] = useState(false);
    const onClick = (e) => {
        if (!wfh) {
            // physical => online
            fetch(CONVERT_ENDPOINT, {
                headers: {
                    email: USER_EMAIL, 
                    startTIme: now.getTime().toString(), 
                    endTime: new Date((Math.ceil(now.valueOf()/MILLISECONDS_PER_DAY)*MILLISECONDS_PER_DAY)).getTime().toString()
                }
            }).then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            });
        } else {
            // meetings that were converted online from before => back to physical
        }
        setWfh(!wfh);
        setAlertShow(true);
    }

    return (
        <div style={{paddingBottom: "3em"}}>
            <h6 style={{textAlign: "center", color: "#fff"}}>
                Today I'm...
            </h6>
            <div className="d-grid" style={{paddingLeft: "1em", paddingRight: "1em"}}>
                <Button style={{"width": "100%", color: "#fff"}} variant={ "light" } onClick={onClick}>
                    {wfh ? "In Office" : "Working from Home"}
                </Button>
                <Alert variant="primary" show={alertShow} onClose={() => setAlertShow(false)} dismissible style={{marginTop: "1em"}}>
                    <p style={{paddingTop: "5px", fontSize: "98%"}}>
                        { wfh ? "Meetings Converted to Virtual!" : "Meetings Converted Back!"}
                    </p>
                </Alert>
            </div>
        </div>

        // <Card style={{backgroundColor: "#4f4f4f", borderStyle: "none"}}>
        //     <Card.Header style={{backgroundColor: "#4f4f4f"}}>
        //         <Card.Title as="h5" style={{textAlign: "center", color: "#fff"}}>Today I'm...</Card.Title>
        //     </Card.Header>
        //     <Card.Body>
        //     <div className="d-grid">
        //         <Button style={{"width": "100%", color: "#fff"}} variant={ "secondary" } onClick={onClick}>
        //             {wfh ? "In Office" : "Working from Home"}
        //         </Button>
        //     </div>
        //     </Card.Body>
        //     {
        //         (converted) ? (<Card.Footer><p style={{"color": "green"}}>Meetings Converted!</p></Card.Footer>) : (<p></p>)
        //     }
        // </Card>
    )
}

export default NotInOffice