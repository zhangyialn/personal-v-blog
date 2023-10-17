import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import classes from './Home.module.css'
import axios from "axios";
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
const Home = () => {
    let [content, setContent] = React.useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/')
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
            <div className={classes.background}>
                <div className={classes.container}>
                    <div className={classes.typing}>zhangyialn's blog</div>
                </div>
                <div className={classes.down}>
                    <i className="iconfont icon-arrowdown"></i>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.bar}>
                </div>
                <div className={classes.article}>
                    {content.map((ele, index) => <div key={index} className={classes.articleList}>
                        <h2 key={index}>{ele.title}</h2>
                    </div>)}
                </div>
            </div>
        </>
    );
};

export default Home;