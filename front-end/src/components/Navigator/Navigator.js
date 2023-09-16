import React from 'react';
import styles from './Navigator.module.css'
import {Link, NavLink} from "react-router-dom";
const Navigator = () => {
    return (
        <>
            <div className={styles.navigator}>
                <h3>暮岁首阳</h3>
                <div className={styles.right}>
                    <div className={styles.search}>
                        <i className="iconfont icon-nav-search"></i>
                    </div>
                    <div className={styles.rightInner} >
                        <Link to="/about">
                            <i className="iconfont icon-timerauto"></i>
                            <p>关于</p>
                        </Link>
                    </div>
                    <div className={styles.rightInner}>
                        <i className="iconfont icon-label_fill"></i>
                        <p>标签</p>
                    </div>
                    <div className={styles.rightInner}>
                        <i className="iconfont icon-menu"></i>
                        <p>分类</p>
                    </div>
                    <div className={styles.rightInner}>
                        <i className="iconfont icon-paper"></i>
                        <p>归档</p>
                    </div>
                    <div className={styles.rightInner}>
                        <NavLink exact to="/"  >
                            <i className="iconfont icon-home2"></i>
                            <p>首页</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigator;