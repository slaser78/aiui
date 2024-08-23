import React, {useContext} from 'react';
import {UrlContext} from "../../context";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',

    }
};

export default function Lookup (props) {
    const urlValue = useContext(UrlContext);

    const handleAction = async () => {
        props.setLookup(false);
        await axios.get(urlValue.urlValue + '/setASVSFalse', options)
            .then(() => {
            }, (error) => {
                console.log(error);
            });
    };

    const cancel = () => {
        props.setLookup(false);
    };

    return (
        <Dialog open={props.open}>
            <DialogTitle>Set ASVS Reviewed False</DialogTitle>
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