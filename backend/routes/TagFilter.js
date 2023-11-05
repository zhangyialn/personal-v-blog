import express from "express";
import mysql from "mysql";

const router = express.Router();
let db = mysql.createPool({
    host: "localhost",
    database: "test",
    user: "zyl",
    password: "zyl123456"
})

try {
    router.post('/',async (req,res) => {
        db.query(`select * from Blogs where tags = '${req.body.name}'`,(err,result) => {
            if(err) throw err
            res.send(result)
        })
    })
} catch (e) {
    console.log(e);
}

export default router;