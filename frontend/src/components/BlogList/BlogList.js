import React from 'react';
import {Link} from "react-router-dom";
import classes from './BlogList.module.css'

const BlogList = ({content}) => {
    console.log(content)
    return (
        <>
            {content.map((item) =>
                <Link to={`/blog/${item.id}`}>
                    <div className={classes.titleList}>
                        <h2 key={item.id}>{item.title}</h2>
                    </div>
                </Link>
            )}
        </>
    );
};

export default BlogList;