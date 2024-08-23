import React, {useContext, useState} from 'react';
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

export default function SetUpdateTemplate (props) {
    const [selectedFile, setSelectedFile] = useState("");
    const urlValue = useContext(UrlContext);

    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
    };

    const fileUpdateHandler = async() => {
        props.setUpdateTemplate(false);
        const fd = new FormData();
        fd.append (selectedFile.name, selectedFile);

        await axios({
            method: "POST",
            url: urlValue.urlValue +'/updateTemplate',
            data: fd,
            headers: options
        })
            .then(() => {
            }, (error) => {
                console.log(error);
            });
    };

    const cancel = () => {
        props.setUpdateTemplate(false);
    };

    return (
        <Dialog open={props.open}>
            <DialogTitle>Update Template</DialogTitle>
            <DialogContent>
                <div className="row">
                    <input type = "file" onChange = {fileSelectedHandler} />
                </div>
                <br />
                <div className="row">
               <span><button className="btn-info m-2 p-2" onClick={fileUpdateHandler} >Upload file</button>&nbsp;&nbsp;&nbsp;
                   <button className="btn-danger m-2 p-2" onClick={cancel}>Cancel</button>
               </span>
                </div>
            </DialogContent>
        </Dialog>
    )
}