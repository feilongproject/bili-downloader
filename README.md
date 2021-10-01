# bili-downloader
在cf-worker上的bilibili视频下载器

------
正式版貌似已上线

## 功能
1. 下载视频
2. 显示视频部分信息
2. 没了


## 支持视频类型
- BV：最常用视频类型
- AV：旧版视频类型
- EP：番剧常用类型
- SS：同上

## 目前存在问题
### 下载限制
- 目前番剧类因referer请求原因，未实现直接下载，需复制下载链接，使用第三方下载工具进行下载（如[wget](http://gnuwin32.sourceforge.net/packages/wget.htm)）
### 有些视频无法下载
- 可能是因为地域原因
### 无法自动更改下载文件名
- 和[下载限制](#下载限制)差不多，服务器在response已设置文件名（只读），无法更改

## TODO
4. 添加剧集下载
5. 人工设置cookie，并添加到浏览器cookie中
