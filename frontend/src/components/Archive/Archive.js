import React, {useEffect, useState} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import classes from './Archive.module.css'
import Footer from "../Footer/Footer";
import axios from "axios";

const Archive = () => {

    const [archives,setArchives] = useState([])
    const [count,setCount] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/archive')
            .then((res) => {
                setArchives(res.data)
                setCount(res.data[0].count)
                console.log(res.data)
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
                    <h1>{`共计${count}篇文章`}</h1>
                    {archives.map((item) =>
                        <h2>{item.year}</h2>

                    )}
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default Archive;