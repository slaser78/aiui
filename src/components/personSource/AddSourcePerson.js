import React from "react";
import {UrlContext} from "../../context";
import axios from "axios";
import {Formik } from 'formik';
import {Form} from "react-formik-ui";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'
import useAPI from "../../useAPI";

const options1 = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    }
};

const AddSourcePerson = (props) => {
    const urlValue = React.useContext(UrlContext);

    const entry = useAPI(urlValue.urlValue+`/source`);
    const [sources, setSources] = React.useState([]);

    React.useEffect ( () => {
        if (entry) {
            setSources(entry);
        //eslint-disable-next-line
        }},[entry]);

    const cancel = () => {
        props.setAddSourcePersonOpen(false)
    };

    const handleValueChange = (event, newValue, setFieldValue) => {
        console.log ("New Value: " + newValue.name);
        console.log ("Sources: " + sources);
        setFieldValue('sources', newValue);
    };

    const name = 'scott'

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Add Source to Person</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues= {{
                            name: "",
                            sources: ""
                        }}
                        enableReinitialize
                        onSubmit= { async values => {
                            props.setAddSourcePersonOpen(false);
                            var source2 = [];
                            var i = 0;
                            for (i = 0; i < values.sources.length; i++) {
                                source2.push(values.sources[i].name)
                            }
                            await axios.post(urlValue.urlValue + `/addSourcesToPerson?name=${name}&sources=${source2}`, options1)
                                .then((response) => {
                                }, (error) => {
                                    console.log("API Error: ", error);
                                })
                        }}
                    >
                        {({setFieldValue}) => (
                            <Form>
                                <div className='row'>
                                    <div className="form-group">
                                        <span><label className="control-label">Name: </label>
                                            {name}</span>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={sources}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => handleValueChange(event, value, setFieldValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            placeholder="Sources"
                                        />
                                    )}
                                />
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

export default AddSourcePerson


