import fsPromises from 'node:fs/promises'
import express from 'express'
import cors from 'cors'
import path from 'node:path'

const app = express()
app.use(cors())
app.listen(3001, () => {
    console.log('服务器启动了');
})

app.get('/', (req, res) => {
    fsPromises.readdir('/home/zyl/markdown', { encoding: 'utf-8' })
        .then(result => {
            const filePaths = result.map(ele => path.join('/home/zyl/markdown/', ele));

            const articlePromises = filePaths.map(filePath => {
                const fileName = path.basename(filePath);
                return fsPromises.readFile(filePath, { encoding: 'utf-8' })
                    .then(content => {
                        return { title: fileName, content };
                    });
            });

            return Promise.all(articlePromises);
        })
        .then(contents => {
            res.send(contents)
        })
        .catch(err => console.log(err))
})


