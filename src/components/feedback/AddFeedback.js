import React from "react";
import {UrlContext} from "../../context";
import useAPI from "../../useAPI";
import axios from "axios";
import {Formik, Field } from 'formik';
import {Form, Autocomplete } from "react-formik-ui";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const username = localStorage.getItem('username');

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


const AddFeedback = (props) => {
    const urlValue = React.useContext(UrlContext);
    const [topic, setTopic] = React.useState([]);
    const entries = useAPI(urlValue.urlValue + `/topic`);
    const [person, setPerson] = React.useState([]);
    const entries1 = useAPI(urlValue.urlValue + `/person`);

    React.useEffect(() => {
        setTopic(entries)
        setPerson(entries1)
        //eslint-disable-next-line
    }, [entries, entries1]);

    const cancel = () => {
        props.setAddOpen(false)
    };

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Add Feedback</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            topic: '',
                            comment: ''
                        }}
                        enableReinitialize
                        onSubmit={ async values => {
                            props.setAddOpen(false);
                            let person1 = '';
                            person.map(t => (t.name === username) ? person1 = t.id : null)
                            let topic1 = '';
                            topic.map(t => (t.name === values.topic) ? topic1 = t.id : null)
                            const body = {
                                topic: {"id":parseInt(topic1)},
                                person: {"id":parseInt(person1)},
                                submitDate: new Date(),
                                comment: values.comment
                            };

                        await axios.post(urlValue.urlValue + `/feedback`, body, options)
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
                                    <label className="control-label">Topic: </label>
                                    <Autocomplete
                                        name="topic"
                                        suggestions={topic.map((option) => {
                                            return (
                                                option.name
                                            )
                                        })}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className="form-group">
                                    <label className="control-label">Comment: </label><br/>
                                    <Field as="textarea" className="form-control" name="comment" style={boxStyle}/>
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

export default AddFeedback;