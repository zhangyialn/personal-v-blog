import React from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import classes from './Archive.module.css'
import Footer from "../Footer/Footer";
const Archive = () => {
    return (
        <>
            <Navigator/>
            <Background/>
            <div className={classes.content}>
                <div className={classes.blogList}></div>
                <Footer/>
            </div>
        </>
    );
};

export default Archive;