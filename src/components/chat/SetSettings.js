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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    }
};
const person = localStorage.getItem('username');

const GetSources = (props) => {
    const urlValue = React.useContext(UrlContext);
    const [sources, setSources] = React.useState([]);
    const entry = useAPI(urlValue.urlValue + `/getSources?person=${person}`)
    React.useEffect(() => {
        setSources(entry)
        //eslint-disable-next-line
    }, [entry]);
    return (
        sources
    )
}

const GetSource = (props) => {
    const urlValue = React.useContext(UrlContext);
    const [source, setSource] = React.useState([]);
    const entry = useAPI(urlValue.urlValue + `/getChat?person=${person}`)
    React.useEffect(() => {
        setSource(entry)
        //eslint-disable-next-line
    }, [entry]);
    return (
        source
    )
}

const SetSettings = (props) => {
    const urlValue = React.useContext(UrlContext);
    const [accuracyValue, setAccuracyValue] = React.useState(0.1);
    const [source, setSource] = React.useState([]);
    const [sources, setSources] = React.useState([]);
    const entry = useAPI(urlValue.urlValue + `/getChatSettings?person=${person}`)
    const fetchedSources = GetSources();
    const [personSource, setPersonSource] = React.useState(null);
    const fetchedSource = GetSource();
    React.useEffect(() => {
        // set 'source' state with fetchedSources
        setSource(fetchedSources);
        setPersonSource(fetchedSource);
    }, [fetchedSources, fetchedSource]);

    React.useEffect(() => {
        if (entry && source && personSource) {
            setAccuracyValue(entry.accuracy ? entry.accuracy : 0.1)
            setSources(source)
            setPersonSource(personSource)
        }
        //eslint-disable-next-line
    }, [entry,source, personSource]);

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
                            source: ''
                        }}
                        enableReinitialize
                        onSubmit={ async values  => {
                            props.setSettingsOpen(false);
                            const person = localStorage.getItem("username")
                            await axios.post(urlValue.urlValue + `/setChatSettings?accuracy=${accuracyValue}&person=${person}&source=${personSource.value}`, options)
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
                                        <ul>
                                            <Box sx={{ width: 200 }}>
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
                                <div className='row'>
                                    <div className="form-group">
                                        <ul>
                                            <Autocomplete
                                                options={sources}
                                                sx={{width: 300}}
                                                value={personSource}
                                                onChange={(event, newValue) => {
                                                    setPersonSource(newValue);  // Control the state based on changes
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Sources"/>}
                                            />
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