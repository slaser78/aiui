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
const AddType = (props) => {
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
                <DialogTitle>Add Type</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            type1: ''
                        }}
                        enableReinitialize
                        onSubmit={ async values => {
                            props.setAddOpen(false);
                            const body = {
                                type1: values.type1
                            };

                        await axios.post(urlValue.urlValue + `/type1`, body, options)
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
                                            <label className="control-label">Type: </label>
                                            <br />
                                            <Field
                                                className="form-control"
                                                name="type1"
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
export default AddType;