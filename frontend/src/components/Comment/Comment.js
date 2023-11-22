import React from 'react';
import classes from './Comment.module.css'
const Comment = () => {
    return (

        <>
            <div className={classes.comment}>
                <div className={classes.head}>
                    <input type="text" placeholder="昵称"/>
                    <input type="text" placeholder="邮箱"/>
                    <input type="text" placeholder="网址(https://)"/>
                </div>
                <div className={classes.content}>
                   <textarea placeholder="请评论～" wrap="hard"></textarea>
                </div>
            </div>
        </>
    );
};

export default Comment;