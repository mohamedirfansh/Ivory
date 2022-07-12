const { useState } = require("react")
const { Button, Alert } = require("react-bootstrap")

const USER_EMAIL = "IvoryGS@outlook.com"
const CONVERT_ZOOM_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/meetings/tozoom"
const CONVERT_BACK_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/meetings/tophysical"

const MILLISECONDS_PER_DAY = 86400000

const NotInOffice = (props) => {

    const [alertShow, setAlertShow] = useState(false);
    const [wfh, setWfh] = useState(false);

    const onClick = (e) => {

        var now = new Date()
        var timezone_offset_millis = now.getTimezoneOffset() * 60000
        var end_of_today = new Date(Math.ceil((now.valueOf() - timezone_offset_millis)/MILLISECONDS_PER_DAY)*MILLISECONDS_PER_DAY + timezone_offset_millis);

        if (!wfh) {
            // physical => online
            fetch(CONVERT_ZOOM_ENDPOINT, {
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
            fetch(CONVERT_BACK_ENDPOINT, {
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
        }
        setWfh(!wfh);
        setAlertShow(true);
    }

    return (
        <div style={{paddingBottom: "3em", paddingLeft: "1em", paddingRight: "1em"}}>
            <Alert variant="primary" show={alertShow} onClose={() => setAlertShow(false)} dismissible style={{marginTop: "1em"}}>
                <p style={{paddingTop: "5px", fontSize: "98%"}}>
                    { wfh ? "Meetings Converted to Virtual!" : "Meetings Converted Back!"}
                </p>
            </Alert>
            <h6 style={{textAlign: "center", color: "#fff"}}>
                {"Today I'm Working " +
                    (wfh ? "From Home" : "In Office")}
            </h6>
            <div className="d-grid">
                <Button style={{"width": "100%", color: "#fff", fontSize: "77%"}} variant={ "light" } onClick={onClick}>
                    {wfh ? "Come to Office" : "Work from Home"}
                </Button>
            </div>
        </div>
    )
}

export default NotInOffice;