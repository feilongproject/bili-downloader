import { PageInfo } from './Page/Info'
import { PageDownload } from './Page/Download'
import { PageIndex, htmlHeaders } from './var'

async function Main(request: Request) {

    console.log(`request url: ${request.url}`)
    const requestURL = new URL(request.url)
    var { pathname } = requestURL
    const pathPart = pathname.split("/")
    console.log(`\npath part: ${pathPart}`)

    var pattern = /(av)\d*|(bv)\w*|(ss)\d*|(ep)\d*/i
    var exp = pattern.exec(pathname)
    var params = requestURL.searchParams.get("id")
    console.log(`pathname exp: ${exp}\nparams: ${params}`)

    if (exp || params) {
        console.log(`page: info`)
        if (exp) return await PageInfo(exp[0])
        if (params) {
            var exp = pattern.exec(params)
            console.log(`params exp: ${exp}`)
            if (exp) return await PageInfo(exp[0])
        }
        return new Response(PageIndex, { headers: htmlHeaders })
    } else if (pathPart[1] == "download") {
        console.log(`page: download`)

        var cid = requestURL.searchParams.get('cid')
        var aid = requestURL.searchParams.get('aid')
        var type = requestURL.searchParams.get('type')
        var dash = (requestURL.searchParams.get('dash') == "0") || (!requestURL.searchParams.get('dash')) ? false : true
        if (!cid || !aid || !type) return new Response(PageIndex, { headers: htmlHeaders })
        console.log(`\nPageDownload:\ncid: ${cid}\naid: ${aid}\ntype: ${type}\ndash: ${dash}`)
        return PageDownload(parseInt(cid), parseInt(aid), parseInt(type), dash)
    } else {
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

