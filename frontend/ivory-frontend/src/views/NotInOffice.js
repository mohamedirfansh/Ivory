const { useState } = require("react")
const { Button, Card, Alert } = require("react-bootstrap")

const USER_EMAIL = "IvoryGS@outlook.com"
const CONVERT_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/meetings/tozoom"

const MILLISECONDS_PER_DAY = 86400000
const now = new Date()
const TIMEZONE_OFFSET_MILLIS = now.getTimezoneOffset() * 60000
const end_of_today = new Date(Math.ceil((now.valueOf() - TIMEZONE_OFFSET_MILLIS)/MILLISECONDS_PER_DAY)*MILLISECONDS_PER_DAY + TIMEZONE_OFFSET_MILLIS);

const NotInOffice = (props) => {
    console.log(now.toString())
    console.log(end_of_today.toString());

    const [alertShow, setAlertShow] = useState(false);
    const [wfh, setWfh] = useState(false);

    const onClick = (e) => {
        if (!wfh) {
            // physical => online
            fetch(CONVERT_ENDPOINT, {
                method: 'POST', 
                mode: 'cors',
                headers: {
                    "Authorization" : "Bearer " + process.env.REACT_APP_OUTLOOK_TOKEN
                },
                body: JSON.stringify({
                    userEmail: USER_EMAIL, 
                    startTime: now.toISOString().toString(), 
                    endTime: end_of_today.toISOString().toString()
                })
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
        <div style={{paddingBottom: "3em", paddingLeft: "1em", paddingRight: "1em"}}>
            <h6 style={{textAlign: "center", color: "#fff"}}>
                {"Today I'm Working " +
                    (wfh ? "From Home" : "In Office")}
            </h6>
            <div className="d-grid" style={{}}>
                <Button style={{"width": "100%", color: "#fff", fontSize: "77%"}} variant={ "light" } onClick={onClick}>
                    {wfh ? "Come to Office" : "Work from Home"}
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

export default NotInOffice;