import React, {useState, useContext} from 'react';
import axios from 'axios';
import {UrlContext} from "../../context";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        
    }
};

export default function UploadTemplate (props) {
    const [selectedFile, setSelectedFile] = useState("");
    const urlValue = useContext(UrlContext);

    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
    };

    const fileUploadHandler = async() => {
        props.setCalendar(false);
        const fd = new FormData();
        fd.append ("file", selectedFile);

        await axios({
            method: "POST",
            url: urlValue.urlValue +'/importCalendar',
            data: fd,
            options
        })
            .then(() => {
            }, (error) => {
                console.log(error);
            });
    };

    const cancel = () => {
        props.setCalendar(false);
    };

    return (
        <Dialog open={props.open}>
            <DialogTitle>Import Calendar</DialogTitle>
            <DialogContent>
                <div className="row">
                    <input type = "file" onChange = {fileSelectedHandler} />
                </div>
                <br />
                <div className="row">
                   <span><button className="btn-info m-2 p-2" onClick={fileUploadHandler} >Upload file</button>&nbsp;&nbsp;&nbsp;
                        <button className="btn-danger m-2 p-2" onClick={cancel}>Cancel</button>
                   </span>
                </div>
            </DialogContent>
        </Dialog>
    )
}