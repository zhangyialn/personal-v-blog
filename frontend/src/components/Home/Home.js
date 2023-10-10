import React from 'react';
import Navigator from "../Navigator/Navigator";
import classes from './Home.module.css'
import axios from "axios";
const Home = () => {
    let [content, setContent] = React.useState('')
    axios.get('http://localhost:3001/')
        .then(res => {
            console.log(res.data)
            setContent(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    return (
        <>
            <Navigator/>
            <div className={classes.background}>
                <div className={classes.container}>
                    <div className={classes.typing}>zhangyialn's blog</div>
                </div>
                <div className={classes.down}>
                    <i className="iconfont icon-arrowdown"></i>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.article}></div>
            </div>
        </>
    );
};

export default Home;