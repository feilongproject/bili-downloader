import { PageIndex, htmlHeaders, cookieHeaders } from '../../var'


export async function PageInfoVideo(videoId: string): Promise<Response> {

    var videoApiUrl = "http://api.bilibili.com/x/web-interface/view?"

    if (videoId.toLowerCase().startsWith("av")) {
        videoApiUrl += `aid=${videoId.substr(2)}`
    } else if (videoId.toLowerCase().startsWith("bv")) {
        videoApiUrl += `bvid=${videoId}`
    }
    console.log(`fetching url: ${videoApiUrl}`)


    var videoInfoJson = await fetch(videoApiUrl,/*  { headers: cookieHeaders } */).then(res => {
        return res.text()
    }).then(res => {
        return JSON.parse(res)
    })

    var data = videoInfoJson.data
    //console.log(data)
    var infoPage = `
        <span style="line-height: 100%;margin: 10px;"><div style="margin: 10px 10px;">
            <table border="1">
                <tr>  <th>视频信息</th>  <th>值</th>                                      </tr>
                <tr>  <td>AV号</td>      <td>${data.aid}</td>                            </tr>
                <tr>  <td>BV号</td>      <td>${data.bvid}</td>                           </tr>
                <tr>  <td>标题</td>      <td>${data.title}</td>                          </tr>
                <tr>  <td>简介</td>      <td>${data.desc.replaceAll("\n", "<br>")}</td>  </tr>
                <tr>  <td>分P </td>      <td>共${data.pages.length}P</td>                </tr>
                <tr>  <td>封面</td>      <td><a href="${data.pic}">链接</a></td>         </tr>
            </table>
            <hr>
            <table border="1">
                <tr>  <th></th>   <th>分P标题</th>    <th>点击下载</th>    <th>CID</th>   </tr>
        `

    for (var i = 0; i < data.pages.length; i++) {
        var cid = data.pages[i].cid
        infoPage += `
                <tr>
                    <td>P${i + 1}</td>
                    <td>${data.pages[i].part}</td>
                    <td style="border-radius:10px;color:#00F;background-color: #fff;text-align: center;">
                        <a target="_blank" href = "/download?type=0&cid=${cid}&aid=${data.aid}&dash=0">flv方式</a><br><br>
                        <a target="_blank" href = "/download?type=0&cid=${cid}&aid=${data.aid}&dash=1">dash方式</a>
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