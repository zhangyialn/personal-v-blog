import fsPromises from 'node:fs/promises'
import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.listen(3001, () => {
    console.log('服务器启动了');
})

let db = mysql.createPool({
    host: "localhost",
    database: "test",
    user: "zyl",
    password: "zyl123456"
})


app.get('/', (req, res) => {
    db.query('select * from Blogs', (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.post('/blogs',(req,res) => {
    console.log(req.body.id);
    db.query(`select path from Blogs where id = ${+req.body.id}`,(err,result) => {
        if (err) throw err
        fsPromises.readFile(result[0].path.toString(),{encoding: 'utf-8'},(err,data) => {
            if (err) throw err
            res.send(data)
        })
    })
})

