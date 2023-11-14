import express from "express";
import fsPromises from "node:fs/promises";
import matter from "gray-matter";
import mysql from "mysql";

const router = express.Router();
let db = mysql.createPool({
    host: "localhost",
    database: "test",
    user: "zyl",
    password: "zyl123456"
})

router.post('/',(req,res) => {
    console.log(req.body.title);
    const query = 'select path FROM Blogs where title = ?';
    const values = [req.body.title]
    db.query(query,values,(err,result) => {
        if (err) throw err
        fsPromises.readFile(result[0].path.toString(),{encoding: 'utf-8'})
            .then((content) => {
                let blog = matter(content).content
                res.send(blog)
            })
    })
})

export default router