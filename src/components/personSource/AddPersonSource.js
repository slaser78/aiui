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

const AddPersonSource = (props) => {
    const urlValue = React.useContext(UrlContext);
    const entry = useAPI(urlValue.urlValue+`/person`);
    const [persons, setPersons] = React.useState([]);
    const entry1 = useAPI(urlValue.urlValue+`/getSources1`);
    const [sources, setSources] = React.useState([]);

    React.useEffect ( () => {
        if (entry && entry1) {
            setPersons(entry);
            setSources(entry1);
        //eslint-disable-next-line
        }},[entry, entry1]);

    const cancel = () => {
        props.setAddOpen(false)
    };

    const handlePersonChange = (event, newValue, setFieldValue) => {
        setFieldValue('persons', newValue);
    };

    const handleSourceChange = (event, newValue, setFieldValue) => {
        setFieldValue('sources', newValue);
    };

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Add Person/Source</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues= {{
                            name: "",
                            source: ""
                        }}
                        enableReinitialize
                        onSubmit= { async values => {
                            props.setAddOpen(false);
                            var person2 = [];
                            var source2 = [];
                            var data2 = [...props.data];
                            for (let i = 0; i < values.persons.length; i++) {
                                person2.push(values.persons[i].name)
                            }
                            for (let j = 0; j < values.sources.length; j++) {
                                source2.push(values.sources[j].name)
                            }
                            await axios.post(urlValue.urlValue + `/addPersonsSources?sources=${source2}&persons=${person2}`, options1)
                                .then((response) => {
                                    const data3 = response.data;
                                    for (let j = 0; j < data3.data.length; j++) {
                                        data2.push(data3.data[j]);
                                    }
                                }, (error) => {
                                    console.log("API Error: ", error);
                                })
                                props.setData(data2)
                        }}
                    >
                        {({setFieldValue}) => (
                            <Form>
                                <br/>
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={persons}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => handlePersonChange(event, value, setFieldValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            placeholder="Persons"
                                        />
                                    )}
                                />
                                <br/>
                                <br/>
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={sources}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => handleSourceChange(event, value, setFieldValue)}
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

export default AddPersonSource


