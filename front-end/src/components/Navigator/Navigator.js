import React from 'react';
import styles from './Navigator.module.css'
const Navigator = () => {
    return (
        <>
            <div className={styles.navigator}>
                <h1>暮岁首阳</h1>
                <div>
                    <p>首页</p>
                    <p>归档</p>
                    <p>分类</p>
                    <p>标签</p>
                    <p>关于</p>
                </div>
            </div>
        </>
    );
};

export default Navigator;