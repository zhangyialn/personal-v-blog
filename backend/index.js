import express from 'express'
import cors from 'cors'
import Root from "./routes/Root.js";
import BlogDetail from "./routes/BlogDetail.js";
import Tag from "./routes/Tag.js";
import TagFilter from "./routes/TagFilter.js";
const app = express()
app.use(cors())
app.use(express.json())
app.listen(3001, () => {
    console.log('服务器启动了');
})

// 挂载根页面路由
app.use('/',Root)

// 挂载文章页面路由
app.use('/blogs',BlogDetail)

// 挂载标签页路由
app.use('/tags',Tag)

// 挂载标签筛选路由
app.use('/tags',TagFilter)
