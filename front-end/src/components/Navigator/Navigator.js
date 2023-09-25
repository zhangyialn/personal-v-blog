import React from 'react';
import  './Navigator.css'
import {Link, NavLink} from "react-router-dom";
const Navigator = () => {


    let styleChanger = ()=>{
        let change = document.querySelector('.change')
        let bar = document.querySelector('.bar')
        if(change.classList[1] ==='icon-menu2'){
            change.classList.replace('icon-menu2','icon-off-search')
            bar.classList.replace('navigator','newBar')
        } else {
            change.classList.replace('icon-off-search','icon-menu2')
            bar.classList.replace('newBar','navigator')
        }
    }

    return (
        <div>
            <div className="navigator bar">
                <h3>暮岁首阳</h3>
                <div className="right">
                  <div className="menu" onClick={styleChanger}>
                      <i className="iconfont icon-menu2 change"></i>
                    </div>
                    <div className="search">
                      <i className="iconfont icon-nav-search"></i>
                    </div>
                    <div className="rightInner" >
                        <Link to="/about">
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
        </div>
    );
};

export default Navigator;