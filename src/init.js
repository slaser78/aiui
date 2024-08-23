import {useContext, useEffect} from "react";
import {UrlContext} from "./context";
import axios from "axios";
import React from 'react';
import Banner from './banner';
export default function Init ()  {
    const urlValue = useContext(UrlContext);
    localStorage.clear();

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }

    const getData = async() => {
        await axios({
                    url: urlValue.urlValue + `/usernameGetInitial`,
                    method: "GET",
                    headers: headers})
                    .then (response => {
                        localStorage.setItem("username", response.data.username);
                        localStorage.setItem("role", response.data.role);
                    })
    };

    useEffect(() =>  {
        getData();
        //eslint-disable-next-line
    }, []);

    return (
        <Banner />
    )
}