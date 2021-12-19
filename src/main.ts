import { PageInfo } from './Page/Info'
import { PageDownload } from './Page/Download'
import { PageIndex, htmlHeaders } from './var'

async function Main(request: Request) {

    console.log(`request url: ${request.url}`)
    const requestURL = new URL(request.url)

    const path = (requestURL.pathname + "/").replaceAll("//", "/").split("/")
    const Path = [path[1], path[2], path[3]]

    console.log(`\npath0: ${Path[0]}\npath1: ${Path[1]}\npath2: ${Path[2]}\npath3: ${Path[3]}`)

    switch (Path[0]) {
        case "info":
            console.log(`page: info`)

            var VideoInfo = requestURL.searchParams.get("id")
            var videoId

            if (VideoInfo?.includes("bilibili.com")) {
                var VideoCut = VideoInfo.split("/")
                for (var i = 0; i < VideoCut.length; i++)
                    if (VideoCut[i].toLowerCase().includes("av") ||
                        VideoCut[i].toLowerCase().includes("bv") ||
                        VideoCut[i].toLowerCase().includes("ss") ||
                        VideoCut[i].toLowerCase().includes("ep")
                    ) videoId = VideoCut[i]
            } else if (VideoInfo?.toLowerCase().startsWith("av") ||
                VideoInfo?.toLowerCase().startsWith("bv") ||
                VideoInfo?.toLowerCase().startsWith("ss") ||
                VideoInfo?.toLowerCase().startsWith("ep")
            ) videoId = VideoInfo

            if (!VideoInfo || !videoId)
                return new Response(PageIndex, { headers: htmlHeaders })

            return await PageInfo(videoId)
        case "download":
            console.log(`page: download`)

            var cid = requestURL.searchParams.get('cid')
            var aid = requestURL.searchParams.get('aid')
            var type = requestURL.searchParams.get('type')
            var dash = (requestURL.searchParams.get('dash') == "0") || (!requestURL.searchParams.get('dash')) ? false : true
            if (!cid || !aid || !type) return new Response(PageIndex, { headers: htmlHeaders })
            console.log(`\nPageDownload:\ncid: ${cid}\naid: ${aid}\ntype: ${type}\ndash: ${dash}`)
            return PageDownload(parseInt(cid), parseInt(aid), parseInt(type), dash)
        default:
            console.log(`page: default`)
            return new Response(PageIndex, { headers: htmlHeaders })
    }

}

addEventListener("fetch", async event => {
    event.respondWith(Main(event.request).catch(err => {
        var message =
            "<body style=\"background-color:#0af;\">" +
            "<a href=\"https:\\bili.gq\">回到首页</a>" +
            "<h1>发生了一些错误</h1>" +
            "这可能是因为：<pre>" +
            "1. 错误的视频链接\n" +
            "2. 服务器响应出错</pre>" +
            "<br>如果您不知道发生了什么，请将页面URL：<pre>" + event.request.url + " </pre>与下方错误信息(可选)发送至 1728904631@qq.com" +
            "<pre>\n"
        message += (err.reason || err.stack || 'Unknown Error') + "</pre>"

        return new Response(message, {
            status: err.status || 500,
            statusText: err.statusText || null,
            headers: htmlHeaders
        })
    })
    )
})

