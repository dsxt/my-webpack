const path = require('path')
module.exports = {
    entry:{
        index:'./src/index.js'
    },
    output:{
        //cwd是指当前node命令执行时所在的文件夹目录
        //__dirname是指被执行js文件所在的文件夹目录
        path:path.resolve(process.cwd(),'dist'),
        //:hash:8-hash值被截断
        //chunkHash不同文件生成不同的hash值，且发生改变的文件会重新生成对应的文件;问题：test1.js和test1.css的chunkhash是一致的，修改test1.css会导致test1.js的chunkhash也发生改变，失去缓存意义
        //contentHash针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变
        filename:'[name].[chunkHash:8].js' 
    }
}