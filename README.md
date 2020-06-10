# iview-commonly-used-commponents
基于iview常用组件，如图片裁剪、头像上传、sql编辑等等组件

## 环境安装

前端代码运行本地需安装node.js 以及 vue-cli

### node.js 安装
[node.js 下载地址](https://nodejs.org/zh-cn/").
### vue-cli 安装
```
npm install -g @vue/cli
```

## Project setup
```
git checkout develop //切换到开发分支
npm install //安装第三方包 (第一次创建项目\有更新的话需要执行此命令)
git flow init //初始化git flow (只有第一次创建项目需要执行此命令)
git add . //添加到暂存区域
git commit -m '提交文件的描述信息' //添加描述
git checkout develop  //切换到开发分支
git pull //拉取最新dev代码
```

### develop合并到我本地的分支
```
git merge develop
```


### Compiles and hot-reloads for development（运行）
```
npm run serve
```


### Compiles and minifies for production （编译发布）
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
