import fs from 'node:fs'
import  express  from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'




const app = express()
app.use(cors())
app.listen(3001,() => {
    console.log('服务器启动了');
})
let p = fileURLToPath(import.meta.url)


app.get('/',(req,res) => {
    fs.readdir('/home/zyl/markdown',(err,data) => {
        if(err){
            console.log(err);
        } else {
            let articleArr = []
            let arr = data.toString().split(',') 
            let length = arr.length
            for(let i = 0;i < length;i++){
                fs.readFile(`/home/zyl/markdown/${arr[i]}`,(err,content) => {
                    if(err){
                        console.log(err);
                    } else {
                        articleArr.push(content.toString())
                    }
                    if(articleArr.length === length) {
                        res.send(articleArr)
                    }
                })
            }
        }
    })
})


