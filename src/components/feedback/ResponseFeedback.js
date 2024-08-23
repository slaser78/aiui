import React from "react";
import {UrlContext} from "../../context";
import useAPI from "../../useAPI";
import axios from "axios";
import {Formik, Field } from 'formik';
import {Form } from "react-formik-ui";
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

const boxStyle = {
    height: '200px',
    width: '500px',
    wrap: true
};

const ResponseFeedback = (props) => {
    const urlValue = React.useContext(UrlContext);
    const [feedback, setFeedback] = React.useState([]);
    const entry = useAPI(urlValue.urlValue + `/feedback/${props.rowSelectionModel}`);
    React.useEffect(() => {
        if (entry) {
            setFeedback(entry)
        }
        //eslint-disable-next-line
    }, [entry]);
    const cancel = () => {
        props.setResponseOpen(false)
    };
    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Add Response</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            response: feedback.response
                        }}
                        enableReinitialize
                        onSubmit= {async values => {
                            props.setResponseOpen(false);
                            let data2 = props.data;
                            let dataUpdate = [...props.data];
                                for (let j = 0; j < data2.length; j++) {
                                if (data2[j].id === props.rowSelectionModel[0]) {
                                    let body = {
                                        response: values.response
                                    };
                                    dataUpdate[j].response = values.response
                                    await axios.put (urlValue.urlValue + `/feedback/${props.rowSelectionModel[0]}`, body, options)
                                        .then ((response) => {
                                            console.log(response);
                                            },
                                            (error) => {
                                                console.log(error);
                                            })
                                    }
                                }
                                props.setData(dataUpdate);
                            }
                        }
                    >
                        {() => (
                            <Form>
                                <div className='row'>
                                    <div className="form-group">
                                        <label className="control-label">Response: </label><br/>
                                        <Field as="textarea" className="form-control" name="response" style={boxStyle}/>
                                    </div>
                                </div>
                                <br/>
                                <span><input className="btn-info m-2 p-2" type="submit"/>&nbsp;
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

export default ResponseFeedback;