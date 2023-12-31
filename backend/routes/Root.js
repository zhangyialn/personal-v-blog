import fsPromises from "node:fs/promises";
import fs from "node:fs";
import express from "express";
import path from "node:path";
import matter from "gray-matter";
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

router.get('/', async (req, res) => {
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
            if (isExist) {
                await dbQueryAsync(`update Blogs set author = ?,path = ?,date = ?,tags = ?,categories = ? where title = ?`,[fileData.author,filePath,fileData.date,fileData.tags,fileData.categories,fileData.title])
            } else {
                await dbQueryAsync(`insert into Blogs (title,author,path,date,tags,categories) values (?,?,?,?,?)`,[fileData.title,fileData.author,filePath,fileData.date,fileData.tags,fileData.categories])
                console.log('插入成功');
            }
            // 检查数据库中是否存在具有相同标签的行,如果存在则不插入,不存在则插入
            const tagsIsExist = allTags.some(tag => tag.name === fileData.tags)
            if (tagsIsExist) {
            } else {
                await dbQueryAsync(`insert into Tags (name) values (?)`,[fileData.tags])
                console.log('标签插入成功');
            }
            // 检查数据库中是否存在具有相同分类的行,如果存在则不插入,不存在则插入
            const categoriesIsExist = allCategories.some(category => category.name === fileData.categories)
            if (categoriesIsExist) {
            } else {
                await dbQueryAsync(`insert into Categories (name) values (?)`,[fileData.categories])
                console.log('分类插入成功');
            }
        }
        // 创建记录将博客文章和标签、分类相关联,如果已经存在则不插入
        const blogs = await dbQueryAsync('select * from Blogs')
        const tags = await dbQueryAsync('select * from Tags')
        const categories = await dbQueryAsync('select * from Categories')
        
        for (const blog of blogs) {
            for (const tag of tags) {
                if (blog.tags === tag.name) {
                    const existingRelation = await dbQueryAsync('select * from BlogTags where blog_id = ? and tag_id = ?', [blog.id, tag.id]);
                    if (existingRelation.length === 0) {
                        await dbQueryAsync('insert into BlogTags (blog_id, tag_id) values (?, ?)', [blog.id, tag.id]);
                    }
                }
            }

            for (const category of categories) {
                if (blog.categories === category.name) {
                    const existingRelation = await dbQueryAsync('select * from BlogCategories where blog_id = ? and category_id = ?', [blog.id, category.id]);
                    if (existingRelation.length === 0) {
                        await dbQueryAsync('insert into BlogCategories (blog_id, category_id) values (?, ?)', [blog.id, category.id]);
                    }
                }
            }
        }

        // 从数据库中获取所有博客文章
        const query = 'select * from Blogs order by Year(date) desc,Month(date) desc,Day(date) desc';
        db.query(query, async(err,result) => {
            if (err) {
                console.log(err);
            }
            const archiveList = result.map(blog => {
                const year = blog.date.getFullYear();
                const month = blog.date.getMonth() + 1;
                const day = blog.date.getDate();
                const formattedMonth = month > 9 ? month : `0${month}`;
                const formattedDay = day > 9 ? day : `0${day}`;
                const date = `${year}-${formattedMonth}-${formattedDay}`;
                const content = matter(fs.readFileSync(blog.path.toString(),{encoding: 'utf-8'})).content;

                return {
                    title: blog.title,
                    date: date,
                    tags: blog.tags,
                    categories: blog.categories,
                    content: content
                };
            });

            // 发送数据
            res.send(archiveList);
        })
    } catch (e) {
        console.log(e);
        res.status(500).send('服务器错误')
    }
})

export default router