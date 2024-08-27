import React from "react";
import {UrlContext} from "../../context";
import axios from "axios";
import {Formik } from 'formik';
import {Form, Autocomplete} from "react-formik-ui";
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

const SetSettings = (props) => {
    const urlValue = React.useContext(UrlContext);
    const [value, setValue] = React.useState(null);
    const [type1, setType1] = React.useState([]);
    const entry = useAPI(urlValue.urlValue + "/type1");
    const entry1 = useAPI(urlValue.urlValue + "chat")

        React.useEffect(() => {
            setType1(entry);
            setValue(entry1.accuracy)
            //eslint-disable-next-line
        }, [entry, entry1]);

    const cancel = () => {
        props.setSettingsOpen(false)
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            accuracy: '',
                            type: ''
                        }}
                        enableReinitialize
                        onSubmit={ async values  => {
                            props.setDeleteOpen(false);
                            localStorage.setItem("accuracy", values.accuracy)
                            let type11 = '';
                            type1.map(t => (t.type1 === values.type1) ? type11 = t.id : null)
                            const body = {
                                accuracy: values.accuracy,
                                type1: type11
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
                                        <ul><label className="control-label">Accuracy: </label></ul>
                                        <ul><Box sx={{ width: 200 }}>
                                            <Slider
                                                aria-label="Accuracy"
                                                valueLabelDisplay="auto"
                                                shiftStep={0.7}
                                                step={0.1}
                                                marks
                                                min={-1.0}
                                                max={1.0}
                                                value={value} onChange={handleChange} />
                                        </Box>
                                        </ul>
                                    </div>
                                </div>
                                <br/>
                                <div className='row'>
                                    <div className="form-group">
                                        <ul><label className="control-label">Type: </label></ul>
                                        <ul><Autocomplete
                                            name="type1"
                                            defaultValue={type1[0]}
                                            suggestions={type1.map((option) => {
                                                return (
                                                    option.type1
                                                )
                                            })}
                                        /></ul>
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