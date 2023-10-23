import fsPromises from 'node:fs/promises'
import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import path from 'node:path'
import matter from 'gray-matter'

const app = express()
app.use(cors())
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


