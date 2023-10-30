import express from "express";
import mysql from "mysql";

const router = express.Router();
let db = mysql.createPool({
    host: "localhost",
    database: "test",
    user: "zyl",
    password: "zyl123456"
})

function dbQueryAsync(sql,values) {
    return new Promise((resolve,reject) => {
        db.query(sql,values,(err,result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}
try {
    router.get('/',async (req,res) => {
        db.query('select * from Tags',(err,result) => {
            if(err) throw err
            res.send(result)
        })
    })
} catch(e) {
    console.log(e);
}
export default router;