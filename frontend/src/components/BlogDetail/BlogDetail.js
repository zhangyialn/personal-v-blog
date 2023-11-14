import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import Footer from "../Footer/Footer";
import TopScrollButton from "../../common/TopScrollButton/TopScrollButton";
import axios from "axios";
import Markdown from "react-markdown";
import classes from "./BlogDetail.module.css";
const BlogDetail = ({match}) => {
   const title = match.params.title
    console.log(title)

    let [content, setContent] = React.useState()

    useEffect(() => {
        axios.post('http://localhost:3001/blogs', {title:title})
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
            <Background/>
            <div className={classes.content}>
                <div className={classes.article}>
                    <Markdown>
                        {content}
                    </Markdown>
                </div>
                <Footer/>
                <div className={classes.button}>
                    <TopScrollButton/>
                </div>
            </div>
        </>
    );
};

export default BlogDetail;