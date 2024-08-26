import React from "react";
import {UrlContext} from "../../context";
import axios from "axios";
import {Formik } from 'formik';
import {Form} from "react-formik-ui";
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

const DeleteSource = (props) => {
    const urlValue = React.useContext(UrlContext);

    const cancel = () => {
        props.setDeleteOpen(false)
    };

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Delete Source</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            authority: '',
                            description: ''
                        }}
                        enableReinitialize
                        onSubmit={ ()  => {
                            props.setDeleteOpen(false);
                            const dataDelete = [...(props.data)];
                            for (let j=0; j< props.selectionModel.length; j++) {
                                let dataValue = props.selectionModel[j]
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        let item1 = "";
                                        for (let i=0; i< dataDelete.length; i++) {
                                            if (dataDelete[i].id === dataValue){
                                                item1 = i
                                            }
                                        }
                                        dataDelete.splice(item1, 1);
                                        props.setData([...dataDelete]);
                                        axios.delete(urlValue.urlValue + `/source/${dataValue}`, options)
                                            .then(() => {
                                            }, (error) => {
                                                console.log(error);
                                            });
                                        resolve();
                                    }, 1000);
                                })
                            }
                        }}
                    >
                        {() => (
                            <Form>
                                <div className='row'>
                                    <div className="form-group">
                                        <label className="control-label">Are you sure?</label>
                                    </div>
                                </div>
                                <br />
                                <span><input className="btn-info m-2 p-2" type="submit"/>&nbsp;&nbsp;&nbsp;
                                        <button className="btn-danger m-2 p-2" type='button' onClick={cancel}>Cancel</button>
                                    </span>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    )
};
export default DeleteSource;