import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import axios from "axios";
import {Link} from "react-router-dom";
import classes from "./CategoryFilter.module.css";
import Footer from "../Footer/Footer";

const CategoryFilter = ({match}) => {
    const category = match.params.category
    const [content, setContent] = React.useState([])

    useEffect(() => {
        axios.post('http://localhost:3001/categories',{name:category})
            .then(res => {
                console.log(res.data)
                setContent(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <>
            <Navigator/>
            <Background/>
            <div className={classes.content}>
                <div className={classes.blogList}>
                    {content.map((item) =>
                        <Link to={`/blogs/${item.id}`}>
                            <h2 key={item.id}>{item.title}</h2>
                        </Link>
                    ) }
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default CategoryFilter;