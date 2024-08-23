import React from 'react';
import {Button} from "@mui/material";

const banner2 = () => {
    function handleCancel ()  {
        window.location.replace("https://cvmt1.jten.mil/LOGOUT/index.html")
    }

    function handleIndex () {
        window.location.replace('/')
    }

    return (
        <>
            <div>You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only. By using this IS (which includes any device attached to this IS), you consent to the following conditions:</div>
            <div>-The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.</div>
            <div>-At any time, the USG may inspect and seize data stored on this IS.</div>
            <div>-Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.</div>
            <div>-This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.</div>
            <div>-Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details.</div>
            <span><Button variant='contained' color='primary' onClick={handleIndex}>Accept</Button> <Button variant='contained' color='secondary' onClick={handleCancel}>Cancel</Button></span>
        </>
    )
}
export default banner2;