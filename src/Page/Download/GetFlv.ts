export function GetFlvPage(durls: durls[]) {
    var Page = ""

    for (var i = 0; i < durls.length; i++) {
        var DurlInfo = durls[i]
        console.log(`${i} ${durls.length} ${DurlInfo}`)
        Page +=
            `<p>
            <p>序号: ${DurlInfo.order}</p>
            <p>长度: ${DurlInfo.length}ms</p>
            <p>大小: ${DurlInfo.size}Byte</p>
            <p>视频链接: <a href="${DurlInfo.url}">url</a></p>
        </p>`
    }

    return Page
}
