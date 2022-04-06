# bili-downloader
纯网页版bilibili视频下载器，api采用腾讯云的Severless解决跨域问题

------
> 正式版已上线

## 功能
1. 显示视频信息
1. 下载视频
2. 没了


## 支持视频类型

|前缀|支持|介绍|
|--|--|--|
|bv|√|最常用视频类型|
|av|√|旧版视频类型|
|ep|√|番剧常用类型(常用于单集)|
|ss|√|番剧常用类型(常用于单季)|
|md|x|番剧常用类型(常用于详情界面)|

(目前md类型因为v3版本重构,暂无法获取)

## 目前存在问题
### 下载限制

- 目前番剧类因referer请求原因，对于以`bilivideo.com`开头的视频流，无法正常下载（因为加入了referer请求头验证），但可以复制下载链接，使用[wget](https://eternallybored.org/misc/wget/)或[aira2](https://github.com/aria2/aria2/releases)等第三方工具下载  
    > 需加入 ` --referer 'https://www.bilibili.com' ` 请求头

    > [第三方工具下载链接](https://github.com/feilongproject/bili-downloader/releases/tag/tools)
- flv格式的视频由于cookie原因无法获取720p及以上画质  
    > 更高画质视频可以通过dash模式下载，但会导致音视频分离
### 无法自动更改下载文件名
- 和[下载限制](#下载限制)差不多，服务器在response已设置文件名（只读），无法更改

## TODO
1. 人工设置cookie，并添加到浏览器cookie中
2. 美化界面(样式还没统一)

