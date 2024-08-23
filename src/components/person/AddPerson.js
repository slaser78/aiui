import React from "react";
import {UrlContext} from "../../context";
import axios from "axios";
import {Formik, Field } from 'formik';
import {Form, Autocomplete } from "react-formik-ui";
import useAPI from "../../useAPI";
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

const AddPerson = (props) => {
    const urlValue = React.useContext(UrlContext);
    const roleEntries= useAPI(urlValue.urlValue + "/role");
    const [role, setRole ] = React.useState([]);

    React.useEffect(() => {
        setRole(roleEntries);
        //eslint-disable-next-line
    }, [roleEntries]);

    const MyInput = ({ field, form, ...props }) => {
        return <input {...field} {...props} />;
    };

    const cancel = () => {
        props.setAddOpen(false)
    };

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Add Person</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            name: '',
                            role: ''
                        }}
                        enableReinitialize
                        onSubmit={ async values => {
                            props.setAddOpen(false);
                            let role1 = '';
                            role.map(t => (t.role === values.role) ? role1 = t.id : null)
                            const body = {
                                name: values.name,
                                role: role1
                            };
                        await axios.post(urlValue.urlValue + `/person`, body, options)
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
                                            <br />
                                            <Field
                                                className="form-control"
                                                name="name"
                                                component={MyInput}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <div className="form-group">
                                            <label className="control-label">Role: </label>
                                            <Autocomplete
                                                name="role"
                                                suggestions={role.map((option) => {
                                                    return (
                                                        option.role
                                                    )
                                                })}
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

export default AddPerson;