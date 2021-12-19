//import {cookieHeaders} from '../../var'
export const cookieHeaders = new Headers({
    cookies: ""
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
        .downloadbutton {
            margin: 0px 5px 5px 5px;
        }

        html {
            line-height: 1;
            background-color: #00aaff;
        }

        .header,
        .info,
        .howuse,
        .todo,
        .tittle {
            background-color: #0cf;
            width: auto;
            margin: auto auto;
            box-shadow: 0 0 32px 0 #808080;
            border-radius: 15px;
        }

        .input {
            margin: 20px 20px;
            padding: 10px 10px;
            border: 1px solid #cdd;
            border-radius: 20px;
            width: 60%;
        }

        .header,
        .tittle {
            text-align: center;
        }

        button {
            text-align: center;
            margin: 10px 10px 0px 0px;
            padding: 10px 10px;
            border: 1px solid #cdd;
            border-radius: 20px;
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
                    <p>方法2. 在输入框中输入bv/av/ss/ep号进行跳转</p>\`
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
                    <p>demo link1 : <a href="http://bili.gq/video/BV1Ap4y1b7UC">http://bili.gq/video/BV1Ap4y1b7UC</a></p>\`
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
                    <p>添加剧集下载</p>
                    <p>美化界面(样式还没统一)</p>
                    <p>添加cookie，使能下载更高画质视频</p>\`
            });
        }
    </script>
</head>

<body style="margin: 5% 20% auto 20%;">

    <div class="tittle">
        <h1 style="padding: 20px;">bilibili视频下载助手</h1>
    </div>
    <div class="header" style="text-align: center;">
        <button type="button" onclick="HowToUse()">使用方法</button>
        <button type="button" onclick="AboutMe()">关于</button>
        <button type="button" onclick="Todo()">TODO</button>

        <hr noshade="noshade" style="height: 10px;">
        <p>
            <form name=fr>
                <input name="video_choice" type="radio" checked>视频</input>
            </form>
            <input class="input" type="text" id="www" placeholder="输入AV/BV/EP/SS号" />
            <input  type=button value=跳转 onclick="tiaozhuan()" />
        </p>
        <script type="text/javascript">
            var tiaozhuan = function () {
                if (!document.getElementById("www").value) layer.msg('请输入值');
				else{
					console.log("bangumi: "+document.getElementById("www").value)
					document.location.href =  '/info/?id=' + document.getElementById("www").value;
				}
					
            }
        </script>
    </div>
    <div class="info">
        <!--INFOPAGE-->
        <!--DOWNLOADPAGE-->
    </div>
</body>

</html>
`