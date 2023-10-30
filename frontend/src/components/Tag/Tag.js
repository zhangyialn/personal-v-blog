import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import './Tag.module.css'
import axios from "axios";
import {Link} from "react-router-dom";
import  classes from "./Tag.module.css";
const Tag = () => {

    const [tags, setTags] = React.useState([]) // 用于存储标签数据

    useEffect(() => {
        axios.get('http://localhost:3001/tags')
            .then(res => {
                console.log(res.data instanceof Array)
                setTags(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return (
        <>
            <Navigator/>
            <Background/>
            <div className={classes.tagList}>
                {tags.map((item) =>
                    <div>
                        <p key={item.id}>-{item.name}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Tag;