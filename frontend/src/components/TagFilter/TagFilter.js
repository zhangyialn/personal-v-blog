import React, {useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
const TagFilter = ({match}) => {
    const tagName = match.params.tag
    const [content, setContent] = React.useState([])

    useEffect(() => {
        axios.post('http://localhost:3001/tags', {name:tagName})
            .then(res => {
                console.log(res.data)
                setContent(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])


    return (
        <>
            <Navigator/>
            <Background/>
            {content.map((item) =>
                <Link to={`/blogs/${item.id}`}>
                    <h2 key={item.id}>{item.title}</h2>
                </Link>
            ) }
        </>
    );
};

export default TagFilter;