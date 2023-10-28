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

// 根页面路由
app.get('/', async (req, res) => {
    try {
        const files = await fsPromises.readdir('/home/zyl/markdown',{encoding: 'utf-8'})

        for (const file of files) {
            // 从数据库中获取所有标题,标签,分类
            const allTitles = await dbQueryAsync('select title from Blogs')
            const allTags = await dbQueryAsync('select name from Tags')
            const allCategories = await dbQueryAsync('select name from Categories')

            // 读取文件内容,并将文件内容转换为对象
            const filePath = path.join('/home/zyl/markdown',file)
            const data = await fsPromises.readFile(filePath,{encoding: 'utf-8'})
            const fileData = matter(data).data
            const date = new Date(fileData.date)
            fileData.date = date.toISOString().slice(0,19).replace('T',' ')

            // 检查数据库中是否存在具有相同标题的行,如果存在则更新,不存在则插入
            const isExist = allTitles.some(title => title.title === fileData.title)
            console.log(isExist);
            if (isExist) {
                await dbQueryAsync(`update Blogs set author = ?,path = ?,date = ?,tags = ?,categories = ? where title = ?`,[fileData.author,filePath,fileData.date,fileData.tags,fileData.categories,fileData.title])
                console.log('更新成功');
            } else {
                await dbQueryAsync(`insert into Blogs (title,author,path,date,tags,categories) values (?,?,?,?,?)`,[fileData.title,fileData.author,filePath,fileData.date,fileData.tags,fileData.categories])
                console.log('插入成功');
            }
            // 检查数据库中是否存在具有相同标签的行,如果存在则不插入,不存在则插入
            const tagsIsExist = allTags.some(tag => tag.name === fileData.tags)
            if (tagsIsExist) {
                console.log('标签已存在');
            } else {
                await dbQueryAsync(`insert into Tags (name) values (?)`,[fileData.tags])
                console.log('标签插入成功');
            }
            // 检查数据库中是否存在具有相同分类的行,如果存在则不插入,不存在则插入
            const categoriesIsExist = allCategories.some(category => category.name === fileData.categories)
            if (categoriesIsExist) {
                console.log('分类已存在');
            } else {
                await dbQueryAsync(`insert into Categories (name) values (?)`,[fileData.categories])
                console.log('分类插入成功');
            }
        }

        db.query('select * from Blogs', (err, result) => {
            if (err) throw err
            res.send(result)
        })
    } catch (e) {
        console.log(e);
        res.status(500).send('服务器错误')
    }
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

