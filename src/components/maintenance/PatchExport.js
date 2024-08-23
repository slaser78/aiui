import React, {useContext} from 'react';
import {UrlContext} from "../../context";
import axios from 'axios';
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

export default function PatchExport (props) {
    const urlValue = useContext(UrlContext);

    const handleAction = async () => {
        props.setPatchExport(false);
        await axios.get(urlValue.urlValue + '/getPatchExport', options)
            .then(() => {
            }, (error) => {
                console.log(error);
            });
    };

    const cancel = () => {
        props.setPatchExport(false);
    };

    return (
        <Dialog open={props.open}>
            <DialogTitle>Export Patch Data</DialogTitle>
            <DialogContent>
                <div className="row">
                    <div>Are you sure?</div>
                    <span><button className="btn-info m-2 p-2" onClick={handleAction} >OK</button>&nbsp;&nbsp;&nbsp;
                   <button className="btn-danger m-2 p-2" onClick={cancel}>Cancel</button>
                   </span>
                </div>
            </DialogContent>
        </Dialog>
    )
}