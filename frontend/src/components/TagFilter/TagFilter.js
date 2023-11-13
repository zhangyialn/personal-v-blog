import React, {useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import Footer from "../Footer/Footer";
import classes from './TagFilter.module.css'
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
            <div className={classes.content}>
                <div className={classes.blogList}>
                    {content.map((item) =>
                        <Link to={`/blogs/${item.id}`}>
                            <h2 key={item.id}>{item.title}</h2>
                        </Link>
                    ) }
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default TagFilter;