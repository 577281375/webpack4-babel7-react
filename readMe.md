每次配置 都要检测下 是不是可以用
## 环境变量
    npm i yargs-parser -D
## 配置 react 环境 babel
    babel npm i @babel/cli @babel/core babel-loader -D
    react
    npm i
    @babel/preset-env
    @babel/preset-react
    @babel/plugin-proposal-decorators
    @babel/plugin-proposal-class-properties
    @babel/plugin-proposal-export-default-from -D


## ESlint


## 环境插件配置
    webpack-build-notifier
    friendly-errors-webpack-plugin
    webpackbar
    hmr
    react-hot-loader 不可以和 hooks合用  弃用
    可以监听 那个文件更改 然后触发 这个函数
    if (module.hot) {
        module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');

        printMe();
        })
    }

## 静态资源解析
    assets
        css
            style-loader css-loader
        less
            npm install --save-dev less-loader less

        字体 file-loader
        image  url-loader


##  静态资源打包优化
    css mini-css-extract-plugin add-asset-html-webpack-plugin
## dll 第三方vendor
    npm i react react-dom react-router react-redux react-router-redux react-saga -S

## 后期 需要加
    jest
    ts
    saga
    lazy-load component router
    swagger api client








