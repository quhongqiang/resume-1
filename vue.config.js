const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
const devServerOption = {
    /* 详情配置网址  https://webpack.js.org/configuration/dev-server */
    open: true,  // 自动打开浏览器页面
    hot: true,  //热更新,实时更新
    host: '0.0.0.0', // 默认是 localhost, 0.0.0.0可以被其他电脑访问，以ip形式出现
    port: 8020,  // 端口地址
    https: false,  //使用 https 提供服务
    inline: true, //开启页面自动刷新
    //lazy: false, //不启动懒加载
    //progress: true, //显示打包的进度
    // proxy: 'http://localhost:4000', // devServer.proxy 可以是一个指向开发环境 API 服务器的字符串
    proxy: {   // proxy 代理
        '/api': {
            target: 'url',  // 发环境 API 服务器 (后端服务器接口域名)
            //secure: false, //如果是https接口，需要配置这个参数
            ws: true, // proxy websockets
            changeOrigin: true, //如果接口跨域，需要进行这个参数配置
            pathRewrite: {  // 路径重写
                '^/api/old-path': '/api/new-path', // rewrite path
            }
        }
    }
}

//开发环境下,线上生产环境不会进入此配置
module.exports = {
    // 1. 项目根路径  production -> 开发  production-sub-path -> 子路径
    // publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
    // 2.打包输出路径：文件夹名  Default: 'dist'
    outputDir: 'dist',
    // 3. 配置代理、端口等配置操作
    devServer: devServerOption,
    // 4. 路径别名配置  参考网址[ https://www.jianshu.com/p/e4716e5bc8bb ]
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('base', resolve('src/base'))
            .set('static', resolve('src/static'))
    }
}