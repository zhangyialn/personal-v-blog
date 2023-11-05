import React, {useEffect,useRef} from 'react';
import Navigator from "../Navigator/Navigator";
import BlogList from "../BlogList/BlogList";
import Footer from "../Footer/Footer";
import TopScrollButton from "../../common/TopScrollButton/TopScrollButton";
import classes from './Home.module.css'
import axios from "axios";
import 'markdown-navbar/dist/navbar.css'
const Home = () => {
    let [content, setContent] = React.useState([])
    const targetElementRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setContent(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    const scrollToTop = () => {
        if (targetElementRef.current) {
            targetElementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Navigator/>
            <div className={classes.background}>
                <div className={classes.container}>
                    <div className={classes.typing}>zhangyialn's blog</div>
                </div>
                <div className={classes.down} onClick={scrollToTop}>
                    <i className="iconfont icon-arrowdown"></i>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.article} ref={targetElementRef}>
                    <BlogList content={content}></BlogList>
                </div>
                <Footer/>
                <div className={classes.button}>
                    <TopScrollButton/>
                </div>
            </div>
        </>
    );
};

export default Home;