import React from 'react';
import Navigator from "../Navigator/Navigator";
import classes from './Home.module.css'
const Home = () => {
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