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

export default function OpSystem (props) {
    const urlValue = useContext(UrlContext);

    const handleAction = async () => {
        props.setOpSystem(false);
        await axios.get(urlValue.urlValue + '/getOpSystems', options)
            .then(() => {
            }, (error) => {
                console.log(error);
            });
    };

    const cancel = () => {
        props.setOpSystem(false);
    };

    return (
        <Dialog open={props.open}>
            <DialogTitle>Get Operating Systems</DialogTitle>
            <DialogContent>
                <div className="container">
                    <div className="row">
                        <div>Are you sure?</div>
                        <span><button className="btn-info m-2 p-2" onClick={handleAction}>OK</button>&nbsp;&nbsp;&nbsp;
                       <button className="btn-danger m-2 p-2" onClick={cancel}>Cancel</button>
                       </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}