import {useEffect, useState} from "react";
import axios from "axios";
const useAPI = (endpoint) =>  {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    };
    const [data, setData] = useState([]);
    useEffect(() =>  {
        getData();
        //eslint-disable-next-line
    }, [endpoint]);

    const getData = async () => {
        const response = await axios.get(endpoint, options);
        setData(response.data);
    };
    return data;
};
export default useAPI;