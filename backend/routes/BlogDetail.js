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
    console.log(req.body.id);
    db.query(`select path from Blogs where id = ${+req.body.id}`,(err,result) => {
        if (err) throw err
        fsPromises.readFile(result[0].path.toString(),{encoding: 'utf-8'})
            .then((content) => {
                let blog = matter(content).content
                res.send(blog)
            })
    })
})

export default router