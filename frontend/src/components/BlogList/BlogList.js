import React from 'react';
import {Link} from "react-router-dom";
import classes from './BlogList.module.css'

const BlogList = ({content}) => {
    console.log(content)
    return (
        <>
            {content.map((item) =>
                <div className={classes.list}>
                    <Link exact to={`/blogs/${item.title}`}>
                        <div className={classes.titleList}>
                            <h2 key={item.id}>{item.title}</h2>
                        </div>
                    </Link>
                    <Link exaxt to={`/blogs/${item.title}`}>
                        <div className={classes.contentList}>
                            <div key={item.id}>{item.content}</div>
                        </div>
                    </Link>
                    <div>
                        <i className="iconfont icon-calendar2" ></i>
                        <span className={classes.date}>{item.date}</span>
                        <i className="iconfont icon-label_fill"></i>
                        <Link exact to={`/tags/${item.tags}`}>
                            <span className={classes.tag}>#{item.tags}</span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogList;