import React from 'react';
import classes from './TopScrollButton.module.css'

const TopScrollButton = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 使用平滑滚动
        });
    };

    window.addEventListener('scroll', () => {
        const button = document.querySelector(`.${classes.button}`)
        if (button) {
            if (window.scrollY >= 450) {
                button.style.display = 'block'
            } else {
                button.style.display = 'none'
            }
        }
    });

    return (
       <>
           <button className={classes.button} onClick={scrollToTop}>
               <i className="iconfont icon-arrowup"></i>
           </button>
       </>
    );
};

export default TopScrollButton;