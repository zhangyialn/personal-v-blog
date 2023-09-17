import React from 'react';
import classes from './Navigator.module.css'
import {Link, NavLink} from "react-router-dom";
const Navigator = () => {
    return (
        <div>
            <div className={classes.navigator}>
                <h3>暮岁首阳</h3>
                <div className={classes.right}>
                    <div className={classes.search}>
                        <i className="iconfont icon-nav-search"></i>
                    </div>
                    <div className={classes.rightInner} >
                        <Link to="/about">
                            <i className="iconfont icon-timerauto"></i>
                            <p>关于</p>
                        </Link>
                    </div>
                    <div className={classes.rightInner}>
                        <Link exact to='/tags'>
                            <i className="iconfont icon-label_fill"></i>
                            <p>标签</p>
                        </Link>
                    </div>
                    <div className={classes.rightInner}>
                        <Link exact to='/categories'>
                            <i className="iconfont icon-menu"></i>
                            <p>分类</p>
                        </Link>
                    </div>
                    <div className={classes.rightInner}>
                        <Link exact to='/archives'>
                            <i className="iconfont icon-paper"></i>
                            <p>归档</p>
                        </Link>
                    </div>
                    <div className={classes.rightInner}>
                        <NavLink exact to="/"  >
                            <i className="iconfont icon-home2"></i>
                            <p>首页</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigator;