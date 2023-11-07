import React from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import  classes from './About.module.css'
import Footer from "../Footer/Footer";
const About = () => {
    return (
        <>
            <Navigator/>
            <Background/>
            <div className={classes.content}>
                <div className={classes.profile}>
                    <img src="https://zylsblog.oss-cn-beijing.aliyuncs.com/blog-img202311071032432.jpg" alt="avatar" className={classes.avatar}/>
                    <p>张某人的个人博客</p>
                    <a href="https://github.com/zhangyialn/personal-v-blog" target="_blank">
                        <i className="iconfont icon-github"></i>
                    </a>
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default About;