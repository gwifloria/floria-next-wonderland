import { BlogItemIF } from "./type"

const Mock = require('mockjs')

const generateMockData: () => { blog: BlogItemIF[] } = () => Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'blog|5-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'title': '@string("lower", 5, 10)',
        'content': '@paragraph',
        'author': '@name',
        'date': '@date("yyyy-MM-dd")',
    }]
})

export default generateMockData
