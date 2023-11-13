import React from 'react';
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <div className={classes.footerBox}>
                <a href="https://sxca.miit.gov.cn/" target="_blank">晋IP证  </a>
                <a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank">晋公网IP1234567号</a>
            </div>
        </>
    );
};

export default Footer;