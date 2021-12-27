//import {cookieHeaders} from '../../var'
export const cookieHeaders = new Headers({
    cookies: "",
    "accept": `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
    "accept-language": `zh-CN,zh;q=0.9`,
    "cache-control": `max-age=0`,
    "sec-ch-ua": `" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"`,
    "sec-ch-ua-platform": "Windows",
    "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36`
})


export const htmlHeaders = new Headers({
    'Content-Type': 'text/html;charset=UTF-8'
})


export var PageIndex = `
<!DOCTYPE html>
<html>

<head>
    <link rel="icon" type="image/x-icon" href="//cdn.jsdelivr.net/gh/feilongproject/bili-downloader/favicon.ico">
    <meta charset="utf-8">
    <title>bilibili视频下载助手</title>
    <meta name="description" content="bilibili视频下载助手" />
    <meta name="keywords" content="bilibili,视频,下载,免费,飞龙project,feilongproject" />
    <meta name="author" content="飞龙project" />
    <!--<link rel="stylesheet" href="//res.layui.com/layui/dist/css/layui.css?v=351-1" media="all">-->
    <script src="//cdn.staticfile.org/jquery/1.12.3/jquery.min.js"></script>
    <script src="//cdn.jsdelivr.net/gh/feilongproject/bili-downloader/layer/layer.js"></script>
    <style type="text/css">
        body {
            margin: 5% 20% auto 20%;
            background-color: #0af;
            display: flex;
            flex-direction: column;
        }

        .header,
        .video-info,
        .tittle {
            background-color: #0df;
            margin: 10px 0 10px 0;
            box-shadow: 1px 1px 50px rgb(0 0 0 / 30%);
            border-radius: 5px;
        }

        .tittle {
            text-align: center;
        }
        
        .goto-input,
        .goto-btn,
        a.help {
            display: block;
            background-color: #fff;
            margin-top: 10px;
            border-radius: 5px;
            border: 5px solid #0000;

        }

        .about {
            flex-direction: row;
            justify-content: space-evenly;
            display: flex;
            flex-wrap: wrap;
        }

        .input {
            margin-bottom: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .goto-input {
            margin-left: 10px;
            margin-right: 10px;
            flex-grow: 0.7;
        }

        .goto-btn {
            margin-right:10px;
        }

        .download {
            flex-direction: column;
            display: flex;
            align-items: center;
        }

        .download-flv {

        }

        .download-dash {

        }
    </style>
    <script>
        console.log("欢迎使用bilibili视频下载助手")
        console.log("%c 作者 -> 飞龙project ", "background:#000; color:#fff");
        console.log("%c GitHub -> https://github.com/feilongproject/bili-downloader ", "background:#000; color:#fff");
        function HowToUse() {
            layer.open({
                //type: 1,
                //skin: 'demo-class', //样式类名
                title: "使用方法",
                closeBtn: 1, //显示关闭按钮
                anim: 2,
                shadeClose: true, //开启遮罩关闭
                content: \`
                    <p>方法1. 直接在网页将 " bilibili.com " 替换为" bili.gq"</p>
                    <p>方法2. 在输入框中输入bv/av/ss/ep/md号进行跳转</p>
                    <p>其中允许的链接格式有：</p>
                    <li>1. 网页链接中含有视频标识符的（如bv*，av*，ss*，ep*，md*）</li>
                    <li>2. 网页链接中查询字符id中含有视频标识符的（如?id=bv*，?id=av*，?id=ss*，?id=ep*，?id=md*）</li>
                    \`
            });
        };
        function AboutMe() {
            layer.open({
                //type: 1,
                //skin: 'demo-class', //样式类名
                title: "关于",
                closeBtn: 1, //显示关闭按钮
                anim: 2,
                shadeClose: true, //开启遮罩关闭
                content: \`
                    <p>作者 : 飞龙project</p>
                    <p>GitHub开源项目仓库: <a href="https://github.com/feilongproject/bili-downloader">github.com/feilongproject/bili-downloader</a></p>                    
                    \`
            });
        }
        function Todo() {
            layer.open({
                //type: 1,
                //skin: 'demo-class', //样式类名
                title: "TODO",
                closeBtn: 1, //显示关闭按钮
                anim: 2,
                shadeClose: true, //开启遮罩关闭
                content: \`
                    <p>美化界面(样式还没统一)</p>
                    <p>添加cookie，使能下载更高画质视频（更高画质视频可以通过dash模式下载，但会导致音视频分离）</p>
                    \`
            });
        }
        function KownBug() {
            layer.open({
                //type: 1,
                //skin: 'demo-class', //样式类名
                title: "已知bug",
                closeBtn: 1, //显示关闭按钮
                anim: 2,
                shadeClose: true, //开启遮罩关闭
                content: \`
                    <p>对于以<code>upos-sz-mirrorcosov.bilivideo.com</code>开头的视频流，无法正常下载（因为加入了referer请求头验证）</p>
                    <p>可以使用<a href="https://eternallybored.org/misc/wget/">wget</a>或<a href="https://github.com/aria2/aria2/releases">aira2</a>等工具下载（需加入<code>--referer 'https://www.bilibili.com'</code>请求头）</p>
                    <p>下载链接：</p>
                    <li>wget: 
                        <a href="https://github.com/feilongproject/bili-downloader/releases/download/tools/aria2-1.36.0-win-64bit-build1.zip">x64</a>
                        <a href="https://github.com/feilongproject/bili-downloader/releases/download/tools/aria2-1.36.0-win-32bit-build1.zip">x32</a>
                    </li>
                    <li>aria2: 
                        <a href="https://github.com/feilongproject/bili-downloader/releases/download/tools/wget-1.21.2-win32.zip">x64</a>
                        <a href="https://github.com/feilongproject/bili-downloader/releases/download/tools/wget-1.21.2-win64.zip">x32</a>
                    </li>
                    <p>在有必要的情况下可以在链接头部加入<code>https://ghproxy.com/</code>进行加速下载</p>
                    \`
            });
        }
    </script>
</head>

<body>

    <div class="tittle">
        <h1 style="padding: 20px;">bilibili视频下载助手</h1>
    </div>
    <div class="header">
        <div class="about">
            <a class="help" onclick="HowToUse()">使用方法</a>
            <a class="help" onclick="AboutMe()">关于</a>
            <a class="help" onclick="Todo()">TODO</a>
            <a class="help" onclick="KownBug()">已知问题</a>
        </div>
        <hr noshade="noshade" style="height: 10px;">

        <div class="input">
            <input class="goto-input" type="text" id="www" placeholder="输入AV/BV/EP/SS/MD号或视频链接" />
            <a class="goto-btn" onclick="tiaozhuan()">跳转</a>
            <script type="text/javascript">
                var tiaozhuan = function () {
                    if (!document.getElementById("www").value) layer.msg('请输入值');
                    else {
                        console.log("bangumi: " + document.getElementById("www").value)
                        document.location.href = '/info/?id=' + document.getElementById("www").value;
                    }

                }
            </script>
        </div>
    </div>
    <div class="video-info">
        <!--INFOPAGE-->
        <!--DOWNLOADPAGE-->
    </div>
</body>

</html>
`