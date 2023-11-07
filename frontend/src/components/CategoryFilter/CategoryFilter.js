import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import axios from "axios";

const CategoryFilter = ({match}) => {
    const category = match.params.category
    const [content, setContent] = React.useState([])

    useEffect(() => {
        axios.post('http://localhost:3001/categories',{name:category})
            .then(res => {
                console.log(res.data)
                setContent(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <>
            <Navigator/>
            <Background/>
        </>
    );
};

export default CategoryFilter;