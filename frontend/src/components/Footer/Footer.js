import React from 'react';
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <div className={classes.footerBox}>
                <a href="https://sxca.miit.gov.cn/">晋IP证  </a>
                <a href="https://beian.mps.gov.cn/#/query/webSearch">晋公网IP1234567号</a>
            </div>
        </>
    );
};

export default Footer;