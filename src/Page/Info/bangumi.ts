import { PageIndex, htmlHeaders, cookieHeaders } from '../../var'


export async function PageInfoBangumi(videoId: string): Promise<Response> {

    var videoApiUrl = "https://api.bilibili.com/pgc/view/web/season?"

    if (videoId.toLowerCase().startsWith("ss")) {
        videoApiUrl += `season_id=${videoId.substr(2)}`
    } else if (videoId.toLowerCase().startsWith("ep")) {
        videoApiUrl += `ep_id=${videoId.substr(2)}`
    } else if (videoId.toLowerCase().startsWith("md")) {
        await fetch(`http://api.bilibili.com/pgc/review/user?media_id=${videoId.substr(2)}`).then(res => {
            return res.text()
        }).then(res => {
            videoApiUrl += `season_id=${JSON.parse(res).result.media.season_id}`
        })
    }
    console.log(`fetching url: ${videoApiUrl}`)


    var videoInfoJson = await fetch(videoApiUrl,/*  { headers: cookieHeaders } */).then(res => {
        return res.text()
    }).then(res => {
        return JSON.parse(res).result
    })
    //var data = videoInfoJson
    //console.log(`videoInfoJson data: ${JSON.stringify(videoInfoJson)}`)

    var infoPage = `
        <span style="line-height: 100%;margin: 10px;"><div style="margin: 10px 10px;">
            <table border="1">
                <tr>  <th>视频信息</th>  <th>值</th>                                                             </tr>
                <tr>  <td>标题</td>      <td>${videoInfoJson.title}</td>                                         </tr>
                <tr>  <td>简介</td>      <td>${videoInfoJson.evaluate.replaceAll("\n", "<br>")}</td>             </tr>
                <tr>  <td>分P </td>      <td>目前${videoInfoJson.episodes.length}/${videoInfoJson.total}P</td>   </tr>
                <tr>  <td>简介URL</td>   <td><a href="${videoInfoJson.link}">${videoInfoJson.link}</a></td>      </tr>
                <tr>  <td>封面</td>      <td><a href="${videoInfoJson.cover}">链接</a></td>                      </tr>
            </table>
            <hr>
            <table border="1">
                <tr>  <th></th>   <th>分P标题</th>    <th>点击下载</th>    <th>CID</th>   </tr>
        `

    var epData = videoInfoJson.episodes
    for (var i = 0; i < epData.length; i++) {
        var cid = epData[i].cid
        var aid = epData[i].aid
        infoPage += `
                <tr>
                    <td>P${i + 1}</td>
                    <td>${epData[i].long_title}</td>
                    <td style="border-radius:10px;color:#00F;background-color: #fff;text-align: center;">
                        <a target="_blank" href = "/download?type=1&cid=${cid}&aid=${aid}&dash=0">flv方式</a><br><br>
                        <a target="_blank" href = "/download?type=1&cid=${cid}&aid=${aid}&dash=1">dash方式</a>
                    </td>
                    <td>${cid}<br></td>
                </tr>
                `
    }

    infoPage += `
            </table>
        </span>
    `

    infoPage = PageIndex.replaceAll("<!--INFOPAGE-->", infoPage)

    return new Response(infoPage, { headers: htmlHeaders })
    //return new Response(3, { headers: htmlHeaders })
}