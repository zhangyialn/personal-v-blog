import React from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import  classes from './About.module.css'
const About = () => {
    return (
        <>
            <Navigator/>
            <Background/>
            <div className={classes.content}>
                <div className={classes.profile}>

                </div>
            </div>
        </>
    );
};

export default About;