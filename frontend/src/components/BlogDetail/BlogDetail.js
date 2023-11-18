import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import Footer from "../Footer/Footer";
import TopScrollButton from "../../common/TopScrollButton/TopScrollButton";
import axios from "axios";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import NavBar from 'markdown-navbar';
import classes from "./BlogDetail.module.css";
import Comment from "../Comment/Comment";

const BlogDetail = ({match}) => {
    const title = match.params.title

    let [content, setContent] = React.useState()
    const ref = React.useRef(null)
    const buttonRef = React.useRef(null)
    console.log(buttonRef.current)

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

    window.addEventListener('scroll', () => {
        if (ref.current) {
            if (window.scrollY >= 450) {
                ref.current.style.position = 'fixed'
                ref.current.style.top = '6.9vw'
            } else {
                ref.current.style.position = 'absolute'
                ref.current.style.top = '2vw'
            }
        }
        if(buttonRef.current) {
            if (window.scrollY >= 450) {
                buttonRef.current.style.display = 'block'
            } else {
                buttonRef.current.style.display = 'none'
            }
        }
    });



    // 代码高亮
    const components = {
        code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    language={match[1]}
                    style={dracula}
                    customStyle={{ overflowX: 'auto' }}
                    PreTag="div" {...props}>
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    };

    return (
        <>
            <Navigator/>
            <Background/>
            <div className={classes.content}>
                <div className={classes.article}>
                    <div className={classes.blogContent}>
                        <Markdown components={components}>
                            {content}
                        </Markdown>
                    </div>
                    <Comment/>
                </div>
                <Footer/>
                <div className={classes.navbar} ref={ref}>
                    <NavBar source={content} />
                </div>
                <div className={classes.button} ref={buttonRef}>
                    <TopScrollButton/>
                </div>
            </div>
        </>
    );
};

export default BlogDetail;