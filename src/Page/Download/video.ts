import { PageIndex, htmlHeaders, cookieHeaders } from '../../var'
import { GetDashPage } from './GetDash'
import { GetFlvPage } from './GetFlv'


export async function PageDownloadVideo(cid: number, aid: number, dash: boolean, qn: number): Promise<Response> {

    var params
    if (dash) params = `?avid=${aid}&cid=${cid}&fnval=16&fnver=0&fourk=1`
    else params = `?avid=${aid}&cid=${cid}&fnval=0&fnver=0&fourk=1&qn=${qn}`
    var videoApiUrl = `https://api.bilibili.com/x/player/playurl${params}`

    console.log(`fetching url: ${videoApiUrl}`)

    var videoJson = await fetch(videoApiUrl, {
        headers: cookieHeaders
    }).then(res => {
        return res.text()
    }).then(res => {
        //console.log(res)
        var data = JSON.parse(res)
        if (data.code != 0)
            throw Error(res)
        return data.data
    })

    //console.log(JSON.stringify(videoJson))

    var infoPage = `
        <span style="line-height: 100%;margin: 10px;">
            <div style="margin: 10px;">
                <p>当前页面cid: ${cid}, aid: ${aid}</p>
                <p>当前视频格式: ${videoJson.dash ? `当前格式会出现音视频分离现象，请谨慎下载` : `${videoJson.format}(bilibili已对当前下载格式进行速度限制)`}</p>
                <details>
                    <summary>当前使用api</summary>
                    <p>dash: https://api.bilibili.com/x/player/playurl?avid=${aid}&cid=${cid}&fnval=16&fnver=0</p>
                    <p>flv: https://api.bilibili.com/x/player/playurl?avid=${aid}&cid=${cid}&fnval=0&fnver=0&qn=${qn}</p>
                </details>
        `

    var VideoSupportFormatsPage = `
        <table border="1">
            <tr>
                <th>支持画质</th>
            </tr>
        `
    for (var i = 0; i < videoJson.support_formats.length; i++) {
        var SupportFormat = videoJson.support_formats[i]
        //console.log(SupportFormat)
        if (videoJson.dash) VideoSupportFormatsPage += `
            <tr>
                <td>${SupportFormat.new_description}</td>
            </tr>`
        else if (SupportFormat.quality == videoJson.quality) VideoSupportFormatsPage += `
            <tr>
                <td>${SupportFormat.new_description}</td>
            </tr>`
        else VideoSupportFormatsPage += `
            <tr>
                <td><a href="/download?type=0&cid=${cid}&aid=${aid}&dash=0&qn=${SupportFormat.quality}"><b>${SupportFormat.new_description}<b></a></td>
            </tr>`
    }

    infoPage += VideoSupportFormatsPage + `
        </table>`



    if (dash && videoJson.dash)
        infoPage += GetDashPage(videoJson.dash)
    else
        infoPage += GetFlvPage(videoJson.durl)

    infoPage = infoPage + "</div></span>"


    infoPage = (PageIndex).replaceAll("<!--DOWNLOADPAGE-->", infoPage)

    return new Response(infoPage, { headers: htmlHeaders })
}
