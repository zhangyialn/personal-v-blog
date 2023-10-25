import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import axios from "axios";
import Markdown from "react-markdown";
import classes from "./BlogDetail.module.css";
const BlogDetail = ({match}) => {
   const id = match.params.id

    let [content, setContent] = React.useState()

    useEffect(() => {
        axios.post('http://localhost:3001/blogs', {id:id})
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
            </div>
        </>
    );
};

export default BlogDetail;