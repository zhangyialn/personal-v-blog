import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import classes from './Category.module.css'
import axios from "axios";
import Footer from "../Footer/Footer";
const Category = () => {

    const [categories, setCategories] = React.useState([]) // 用于存储标签数据

    useEffect(() => {
        axios.get('http://localhost:3001/categories')
            .then(res => {
                console.log(res.data instanceof Array)
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    return (
        <>
            <Navigator/>
            <Background/>
            <div className={classes.content}>
                <div className={classes.categoryList}>
                    {categories.map((item) =>
                        <div>
                            <h2 key={item.id}>{item.name}</h2>
                        </div>
                    )}
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default Category;