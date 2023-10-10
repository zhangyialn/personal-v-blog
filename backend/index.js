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


let a = path.resolve('/home/zyl/markdown/npm.md')



app.get('/',(req,res) =>{
    fs.readdir('/home/zyl/markdown', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const arr = []
            data.toString().split(',').forEach((element) => {
                fs.readFile(`/home/zyl/markdown/${element}`, (err, content) => {
                    if (err) {
                        console.log(err);
                    } else {
                        arr.push(content.toString())
                    }
                })
            })
        res.send(arr)
        }
    })
})










