import fsPromises from 'node:fs/promises'
import  express  from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'




const app = express()
app.use(cors())
app.listen(3001,() => {
    console.log('服务器启动了');
})

app.get('/',(req,res) => {
    fsPromises.readdir('/home/zyl/markdown',{encoding: 'utf-8'})
    .then(result => {
        console.log(result);
        const filePaths = result.map(ele => path.join('/home/zyl/markdown/',ele))
        return Promise.all(filePaths.map(filePaths => fsPromises.readFile(filePaths,{encoding: 'utf-8'})))
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => console.log(err))
})


