import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import BlogList from "../BlogList/BlogList";
import classes from './Home.module.css'
import axios from "axios";
import 'markdown-navbar/dist/navbar.css'
const Home = () => {
    let [content, setContent] = React.useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setContent(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

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
                <div className={classes.article}>
                    <BlogList content={content}></BlogList>
                </div>
            </div>
        </>
    );
};

export default Home;