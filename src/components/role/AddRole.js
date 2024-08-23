import React from "react";
import {UrlContext} from "../../context";
import axios from "axios";
import {Formik, Field } from 'formik';
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
const AddRole = (props) => {
    const urlValue = React.useContext(UrlContext);
    const MyInput = ({ field, form, ...props }) => {
        return <input {...field} {...props} />;
    };
    const cancel = () => {
        props.setAddOpen(false)
    };

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Add Role</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            role: '',
                            description: ''
                        }}
                        enableReinitialize
                        onSubmit={ async values => {
                            props.setAddOpen(false);
                            const body = {
                                role: values.role,
                                description: values.description
                            };

                        await axios.post(urlValue.urlValue + `/role`, body, options)
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
                                            <label className="control-label">Role: </label>
                                            <br />
                                            <Field
                                                className="form-control"
                                                name="role"
                                                component={MyInput}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <div className="form-group">
                                            <label className="control-label">Description: </label>
                                            <br />
                                            <Field
                                                className="form-control"
                                                name="description"
                                                component={MyInput}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <span><input className="btn-info m-2 p-2" type="submit"/>
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
export default AddRole;