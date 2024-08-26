import React from "react";
import {UrlContext} from "../../context";
import axios from "axios";
import {Formik, Field} from 'formik';
import {Form, Checkbox} from "react-formik-ui";
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
const AddSource = (props) => {
    const urlValue = React.useContext(UrlContext);

    const cancel = () => {
        props.setAddOpen(false)
    };

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Add Source</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            name: '',
                            description: ''
                        }}
                        enableReinitialize
                        onSubmit={ async values => {
                            props.setAddOpen(false);
                            const body = {
                                name: values.name,
                                description: values.description,
                                enabled: values.enabled,
                                public1: values.public1
                            };

                        await axios.post(urlValue.urlValue + `/source`, body, options)
                            .then((response) => {
                                props.setData([...props.data, response.data])
                            }, (error) => {
                                console.log(error);
                            })
                        }}
                    >
                    {() => (
                        <Form>
                            <div className='row'>
                                <div className="form-group">
                                    <label className="control-label">Name: </label>
                                    <br/>
                                    <Field
                                        className="form-control"
                                        name="name"
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className="form-group">
                                    <label className="control-label">Description: </label>
                                    <br/>
                                    <Field
                                        className="form-control"
                                        name="description"
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className="form-group">
                                    <label className="control-label">Enabled: </label>
                                    <br/>
                                    <Checkbox name="enabled"/>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className="form-group">
                                    <label className="control-label">Public: </label>
                                    <br/>
                                    <Checkbox name="public1"/>
                                </div>
                            </div>
                            <br/>
                            <span>
                                <input className="btn-info m-2 p-2" type="submit"/>&nbsp;&nbsp;
                                <button className="btn-danger m-2 p-2" type='button'
                                        onClick={cancel}>Cancel</button>
                                </span>
                        </Form>
                    )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    )
};
export default AddSource;