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

export default function AddDocument (props) {
    const [selectedFile, setSelectedFile] = useState("");
    const urlValue = useContext(UrlContext);
    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
    };

    const fileUploadHandler = async() => {
        props.setAddDocOpen(false);
        const fd = new FormData();
        fd.append ("file", selectedFile);
        fd.append ("source", "jllis");
        fd.append ("fileName", selectedFile.name)

        await axios({
            method: "POST",
            url: urlValue.urlValue +'/documentUpload',
            data: fd,
            headers: options
        })
            .then(() => {
            }, (error) => {
                console.log(error);
            });
    };

    const cancel = () => {
        props.setAddDocOpen(false);
    };

    return (
        <Dialog open={props.open}>
            <DialogTitle>Add Document to: jllis</DialogTitle>
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