import React, {useEffect} from 'react';
import  './Navigator.css'
import {Link, NavLink} from "react-router-dom";
const Navigator = () => {

    const [isTransparent, setIsTransparent] = React.useState(true);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[]);

    // 监听滚动条
    const handleScroll = () => {
        let  scrollY = window.scrollY;
        const scrollThreshold = 0;
        if (scrollY <= scrollThreshold) {
            setIsTransparent(true);
        } else {
            setIsTransparent(false);
        }
    }

    // 监听搜索框
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    let styleChanger = ()=>{
        let change = document.querySelector('.change')
        let pullDownMenu = document.querySelector('.pullDownMenu')
        if(change.classList[1] ==='icon-menu2'){
            change.classList.replace('icon-menu2','icon-off-search')
            pullDownMenu.classList.replace('pullDownMenu2','pullDownMenu1')
        } else {
            change.classList.replace('icon-off-search','icon-menu2')
            pullDownMenu.classList.replace('pullDownMenu1','pullDownMenu2')
        }
    }

    return (
        <div>
            <div className={`navigator ${isTransparent ? 'transparent' : ''}`}>
                <div className="topNav">
                    <Link exact to="/">
                        <h3>暮岁首阳</h3>
                    </Link>
                    <div className="menu" onClick={styleChanger}>
                        <i className="iconfont icon-menu2 change"></i>
                    </div>
                </div>
                <div className="pullDownMenu pullDownMenu2">
                    <div className="search" onClick={toggleSearch}>
                        <i className="iconfont icon-nav-search"></i>
                    </div>
                    <div className="rightInner" >
                        <Link exact to="/about">
                            <i className="iconfont icon-timerauto"></i>
                            <p>关于</p>
                        </Link>
                    </div>
                    <div className="rightInner">
                        <Link exact to='/tags'>
                            <i className="iconfont icon-label_fill"></i>
                            <p>标签</p>
                        </Link>
                    </div>
                    <div className="rightInner">
                        <Link exact to='/categories'>
                            <i className="iconfont icon-menu"></i>
                            <p>分类</p>
                        </Link>
                    </div>
                    <div className="rightInner">
                        <Link exact to='/archives'>
                            <i className="iconfont icon-paper"></i>
                            <p>归档</p>
                        </Link>
                    </div>
                    <div className="rightInner">
                        <NavLink exact to="/"  >
                            <i className="iconfont icon-home2"></i>
                            <p>首页</p>
                        </NavLink>
                    </div>
                </div>
            </div>

            {isSearchOpen && (
                <div className="search-overlay">
                    <div className="search-box">
                        <div>
                            <h1>搜索</h1>
                            <i className="iconfont icon-off-search" onClick={toggleSearch}></i>
                        </div>
                        <hr/>
                        <input type="text" placeholder="搜索..." className="input"/>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Navigator;