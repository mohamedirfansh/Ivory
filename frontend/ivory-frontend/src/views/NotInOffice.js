const { useState } = require("react")
const { Button, Card, Alert } = require("react-bootstrap")

const USER_EMAIL = "IvoryGS@outlook.com"
const CONVERT_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/meetings/tozoom"

const MILLISECONDS_PER_DAY = 86400000
const now = new Date()
const TIMEZONE_OFFSET_MILLIS = now.getTimezoneOffset() * 60000
const end_of_today = new Date(Math.ceil((now.valueOf() - TIMEZONE_OFFSET_MILLIS)/MILLISECONDS_PER_DAY)*MILLISECONDS_PER_DAY + TIMEZONE_OFFSET_MILLIS);

const token = "EwCAA8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAdr2cgb7IyDY4w26VzVEh7LsG9JEDfCCHAY93u7yBJuSE/Rqv/3mUaK+dlSyxCAlW1pJPpRp2b0h1eJ2SrKzZc0YzwrFlgg7Eea2RasYX2pRnG+WBcruv6hXAEoMaDgfBqNoUbQwRuk0Zkwd24cJefzpCWXr2tCINLBBNeAtXNSxk/zlcx+FinAVTaTd6WDXXaem7iz89883ICoQIsTaxKnPy1qo/S7fgTIsFBAUcfl1ceTUq/yHTlJQxBBhkgMmnbtJ8oJbxybABbZipKCfoUQV/oeHUdwIFluZxLGnLZy2UVFzsIHELauEUDaKDauReQtqWfWHh6s8uwKMrw7SCVEDZgAACJOBIvcZWq2BUAKgPbBpyRFiddNW+diEi0fzWyPk0wMppbfkfSB8NvA4Qa77jIt1267z9ZzfAeQsQDL8KlO+NdtdPPe76WDNABPIh3Edb11appAXREAgHQVPkb82HNFndhUYnvHyewLCPWTc/32grXTB16xs2Sj0IWQ4Ug5crggMRzaUINvbH6yUUwuVngChE+AMpRZNdrFA/iiumbxKuka+WaRLjQk26E6BbNz5SP3ARn1ZteqVK798Mhrqlo1OzSzAL2eqdMJ5uXjYgKxcBI/vXpgkNy6+5jLkNOaol5SrRTjNnJmx2NhgXg+sgl+KFX+oEw0TBEX7g3aVELGsK6FyLorkmogsaqo+b6+zgvX/ERutUFUIKgNeF6h7OqfY+E0r1ROSreZIFtwQ2yfAUMPIYzlToeP/cImpRteAJr4LMNgDxXlckuEYmUjZgyWQtUbwax+PQot7t7AjtU0focVRuV6QVBWyLXbFt9UNhq4ICR3NK4N7ZM5X//qxqT9z2y9zVkl9oRuLA+DTUN2XgA14QaJFhed+p5+RqaxANWJ99FTB6Bcd4O2ilwe/HW6nEYKMgzBjKeefxrxkId2dCTQz08aK/BM/eyRd66yk61vP/TWBtaftadttKQBjyKAU6llNX1ijisg1ClWn8YyDBcWO/Mx9S7vtGpaBqIplZiVVONjywwCpjG/gn37lZZ9Md5VsZ2YBosKmbN9bQ2g1ubzd7WuO4QVuuqXlS/OGznQTjyLZGbohGl40s8c1rLsHXF9QgzLuNF5+JKcERroEKH5+1cltDZN+xCEgmgI="

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
                    "Authorization" : "Bearer " + token // process.env.REACT_APP_OUTLOOK_TOKEN
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