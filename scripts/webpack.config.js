const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry:{
        index:'./src/index.js'
    },
    output:{
        path:path.resolve(process.cwd(),'dist'),
        //cwd是指当前node命令执行时所在的文件夹目录  
        //__dirname是指被执行js文件所在的文件夹目录
　　    publicPath: './assets/',
        filename:'js/[name].[chunkHash:8].js' 
        //:hash:8-hash值被截断
        //chunkHash不同文件生成不同的hash值，且发生改变的文件会重新生成对应的文件;问题：test1.js和test1.css的chunkhash是一致的，修改test1.css会导致test1.js的chunkhash也发生改变，失去缓存意义
        //contentHash针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', 
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
                //loader执行顺序，后面的先执行,style-loader会把处理好的css加入到head里的style标签里（在head中createElement style标签）
                //webpack3及之前会使用extract-text-webpack-plugin把css提取成一个独立的css文件，一般现在会使用mini-css-extract-plugin
            },{
                test: /\.less$/,
                use: [
                    // 'style-loader', 
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    //顺序在css-loader之后（先执行）
                    //依赖autoprefixer、browserslist（数据都是来自Can I Use的）
                    {
                        loader:'less-loader',
                        options:{

                        }
                    }
                    //第二种写法，可以做一些配置项
                ],
            },{
                test: /\.(png|jpe?g|gif)$/i,
                // /u 表示按unicode(utf-8)匹配（主要针对多字节比如汉字）
                // /i 表示不区分大小写（如果表达式里面有 a， 那么 A 也是匹配对象）
                // /s 表示将字符串视为单行来匹配
                // /g (全文查找出现的所有匹配字符)
                // /m (多行查找)
                // /gi(全文查找、忽略大小写)
                // /ig(全文查找、忽略大小写)
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options:{
                    //         name: 'images/[name].[ext]',
                    //         // outputPath:'',
                    //         publicPath:'./'
                    //     }
                    // },
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 80,
                        name: 'images/[name].[ext]',
                        publicPath:'/'
                      },
                    },
                    //超出限制采用file-loader的处理方式，不超过采用转base64的方式,不会处理html中src引入的图片
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'我是webpack',
            filename:'index.html',
            template:'public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkHash:8].css'
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(process.cwd(),'src/static/'), 
                    to: path.resolve(process.cwd(),'dist/static/') 
                },
            ],
        }),
    ],
    devServer:{
        port:903,
        open:true
    }
}
//package.json中 development：开发使用，不会压缩代码；production：生成使用，会压缩代码。