import express from "express";
import mysql from "mysql";

const router = express.Router();
let db = mysql.createPool({
    host: "localhost",
    database: "test",
    user: "zyl",
    password: "zyl123456"
})

router.get('/',(req,res) => {
    const query = 'select * from Blogs order by Year(date) desc,Month(date) desc,Day(date) desc';
    db.query(query,(err,result) => {
        if (err) {
            console.log(err);
        }

        const count = result.length
        const archive = result.reduce((accumulate,blog) => {
            const year = blog.date.getFullYear();
            const month = blog.date.getMonth() + 1;
            const day = blog.date.getDate();
            const formattedMonth = month > 9 ? month : `0${month}`;
            const formattedDay = day > 9 ? day : `0${day}`;
            const date = `${formattedMonth}-${formattedDay}`;
            if (!accumulate[year]) {
                accumulate[year] = {year, blog: [],count };
            }
            accumulate[year].blog.push({
                title: blog.title,
                date: date
            })

            return accumulate;
        },{})

        // 将对象转换为数组，并按年份降序排序
        const archiveList = Object.values(archive).sort((a,b) => b.year - a.year);
        console.log(archiveList)
        // 发送数据
        res.send(archiveList);
    })
})
export default router;