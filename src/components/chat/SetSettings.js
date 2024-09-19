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

const GetChat = (props) => {
    const urlValue = React.useContext(UrlContext);
    const [chat, setChat] = React.useState([]);
    const entry = useAPI(urlValue.urlValue + `/getChat?person=${person}`)
    React.useEffect(() => {
        setChat(entry)
        //eslint-disable-next-line
    }, [entry]);
    return (
        chat
    )
}

const GetSource = (props) => {
    const urlValue = React.useContext(UrlContext);
    const [source, setSource] = React.useState([]);
    const entry = useAPI(urlValue.urlValue + `/getSource?person=${person}`)
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
    const [temperatureValue, setTemperatureValue] = React.useState(0.1);
    const [sources, setSources] = React.useState([]);
    const [source, setSource] = React.useState(null);
    const [chat, setChat] = React.useState([]);

    const entry = useAPI(urlValue.urlValue + `/getChatSettings?person=${person}`);
    const fetchedSources = GetSources();
    const fetchedSource = GetSource();
    const fetchedChat = GetChat();

    React.useEffect(() => {
        setSources(fetchedSources);
        setSource(fetchedSource);
        setChat(fetchedChat);
    }, [fetchedSources, fetchedSource, fetchedChat]);

    React.useEffect(() => {
        if (entry && fetchedSources && fetchedSource && fetchedChat) {
            setTemperatureValue(entry.temperature ? entry.temperature : 0.1);
            setSource(fetchedSource);
            setSources(fetchedSources);
            setChat(fetchedChat);
        }
        //eslint-disable-next-line
    }, [entry, fetchedSources, fetchedSource, fetchedChat]);

    const cancel = () => {
        props.setSettingsOpen(false)
    };

    const handleChange = (event, newValue) => {
        setTemperatureValue(newValue);
    };

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            temperature: 0.7,
                            sources: sources,
                            source: source,
                            chat: chat
                        }}
                        enableReinitialize
                        onSubmit={ async values  => {
                            props.setSettingsOpen(false);
                            const person = localStorage.getItem("username")
                            await axios.post(urlValue.urlValue + `/setChatSettings?temperature=${temperatureValue}&person=${person}&source=${source.label}&id=${chat.id}`, options)
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
                                        <ul><label className="control-label">Temperature: </label></ul>
                                        <ul>
                                            <Box sx={{ width: 200 }}>
                                                <Slider
                                                    valueLabelDisplay="auto"
                                                    shiftStep={0.7}
                                                    step={0.1}
                                                    marks
                                                    min={0.1}
                                                    max={2.0}
                                                    value={temperatureValue} onChange={handleChange} />
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
                                                value={source}
                                                getOptionLabel={(option) => option.label || ""}
                                                onChange={(event, newValue) => {
                                                    setSource(newValue);  // Control the state based on changes
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