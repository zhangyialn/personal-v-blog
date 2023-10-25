import mysql from "mysql"
import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";
let db =  mysql.createPool({
    host: "localhost",
    database: "test",
    user: "zyl",
    password: "zyl123456"
})


try {
    fs.readdir('/home/zyl/markdown',{encoding: 'utf-8'},(err,files) => {
        let filePath = files.map(file => path.join('/home/zyl/markdown',file))
        filePath.forEach(path => {
            fs.readFile(path,{encoding: 'utf-8'},(err,data) => {
                let fileData = matter(data).data
                const date = new Date(fileData.date);
                fileData.date = date.toISOString().slice(0, 19).replace('T', ' ');
                db.query(`update Blogs set path ='${fileData.path}' where title ='${fileData.title}'`,(err,result) => {
                    if (err) throw err
                    console.log(result)
                })
            })
        })
    })
} catch (e) {
    console.log(e)
}






