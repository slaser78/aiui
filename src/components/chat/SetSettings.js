import React from "react";
import {UrlContext} from "../../context";
import axios from "axios";
import {Formik } from 'formik';
import {Form} from "react-formik-ui";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useAPI from "../../useAPI";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    }
};
const person = localStorage.getItem('username');

const SetSettings = (props) => {
    const urlValue = React.useContext(UrlContext);
    const [accuracyValue, setAccuracyValue] = React.useState("");
    const entry = useAPI(urlValue.urlValue + `/getChatSettings?person=${person}`)

    React.useEffect(() => {
        if (entry) {
            setAccuracyValue(entry)
        }
        //eslint-disable-next-line
    }, [entry]);

    const cancel = () => {
        props.setSettingsOpen(false)
    };

    const handleChange = (event, newValue) => {
        setAccuracyValue(newValue);
    };

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            accuracy: '',
                        }}
                        enableReinitialize
                        onSubmit={ async values  => {
                            props.setSettingsOpen(false);
                            const person = localStorage.getItem("username")
                            await axios.post(urlValue.urlValue + `/setChatSettings?accuracy=${accuracyValue}&person=${person}`, options)
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
                                        <ul><label className="control-label">Accuracy: </label></ul>
                                        <ul><Box sx={{ width: 200 }}>
                                            <Slider
                                                valueLabelDisplay="auto"
                                                shiftStep={0.7}
                                                step={0.1}
                                                marks
                                                min={0.1}
                                                max={1.0}
                                                value={accuracyValue} onChange={handleChange} />
                                        </Box>
                                        </ul>
                                    </div>
                                </div>
                                <br/>
                                <span><input className="btn-info m-2 p-2" type="submit"/>&nbsp;&nbsp;&nbsp;
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

export default SetSettings;