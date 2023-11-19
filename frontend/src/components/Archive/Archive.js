import React, {useEffect, useState} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import classes from './Archive.module.css'
import Footer from "../Footer/Footer";
import axios from "axios";
import {Link} from "react-router-dom";
import TopScrollButton from "../../common/TopScrollButton/TopScrollButton";

const Archive = () => {

    const [archives,setArchives] = useState([])
    const [count,setCount] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/archive')
            .then((res) => {
                setArchives(res.data)
                setCount(res.data[0].count)
            })
            .catch((err) => {
                console.log(err);
            })
    },[])

    return (
        <>
            <Navigator/>
            <Background/>
            <div className={classes.content}>
                <div className={classes.blogList}>
                    <h1>{`共计${count || 0}篇文章`}</h1>
                    {archives.map((item) =>
                        <div className={classes.contentDetail}>
                            <h2>{item.year}</h2>
                            {item.blog.map((blog) =>
                                <Link exact to={`/blogs/${blog.title}`}>
                                    <div className={classes.blog}>
                                        <span>{blog.date}</span>
                                        <span>{blog.title}</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                <Footer/>
                <div className={classes.button}>
                    <TopScrollButton/>
                </div>
            </div>
        </>
    )
};

export default Archive;