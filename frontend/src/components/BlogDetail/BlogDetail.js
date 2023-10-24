import React, {useEffect} from 'react';
import Navigator from "../Navigator/Navigator";
import Background from "../Background/Background";
import axios from "axios";
const BlogDetail = ({match}) => {
   const id = match.params.id

    let [content, setContent] = React.useState()

    useEffect(() => {
        axios.post('http://localhost:3001/blogs', {id:id})
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return (
        <>
            <Navigator/>
            <Background/>
            <div>
                <h1>博客细节</h1>
            </div>
        </>
    );
};

export default BlogDetail;