import fsPromises from 'node:fs/promises'
import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import matter from 'gray-matter'
import path from "node:path";

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

function dbQueryAsync(sql,values) {
    return new Promise((resolve,reject) => {
        db.query(sql,values,(err,result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

app.get('/', async (req, res) => {
    try {
        const files = await fsPromises.readdir('/home/zyl/markdown',{encoding: 'utf-8'})

        for (const file of files) {
            const filePath = path.join('/home/zyl/markdown',file)
            const data = await fsPromises.readFile(filePath,{encoding: 'utf-8'})
            const fileData = matter(data).data
            const date = new Date(fileData.date)
            fileData.date = date.toISOString().slice(0,19).replace('T',' ')

            //检查数据库中是否存在具有相同标题的行
            const results = await dbQueryAsync(`select * from Blogs where title = ?`,[fileData.title]);
            if (results.length > 0) {
                await dbQueryAsync(`update Blogs set author = ?,path = ?,date = ?,tags = ? where title = ?`,[fileData.author,filePath,fileData.date,fileData.tags,fileData.title])
                console.log('更新成功');
            } else {
                await dbQueryAsync(`insert into Blogs (title,author,path,date,tags) values (?,?,?,?,?)`,[fileData.title,fileData.author,filePath,fileData.date,fileData.tags])
                console.log('插入成功');
            }
        }
        res.send('操作完成')
    } catch (e) {
        console.log(e);
        res.status(500).send('服务器错误')
    }
    db.query('select * from Blogs', (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.post('/blogs',(req,res) => {
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

