import { PageIndex, htmlHeaders, cookieHeaders } from '../../var'
import { GetDashPage } from './GetDash'
import { GetFlvPage } from './GetFlv'

/**
 * 
 * @param cid cid
 * @param aid aid
 * @param dash 是否采用dash方式
 * @returns 返回response
 */
export async function PageDownloadBangumi(cid: number, aid: number, dash: boolean): Promise<Response> {

    //console.log(`aid: ${aid}\ncid: ${cid}`)
    var videoApiUrl: string

    if (dash) {

        videoApiUrl = `https://mysr.ellpew.xyz/pgc/player/web/playurl?avid=${aid}&cid=${cid}`//only dash
    } else {
        videoApiUrl = `https://bilibili.myhosts.ml/pgc/player/web/playurl?avid=${aid}&cid=${cid}`//only flv
    }

    console.log(`fetching url: ${videoApiUrl}`)

    var videoDownloadJson = await fetch(videoApiUrl, {
        headers: cookieHeaders
    }).then(res => {
        return res.text()
    }).then(res => {
        //console.log(res)
        var ress = JSON.parse(res)
        console.log(`code: ${ress.code}\nmessage: ${ress.message}`)
        console.log(`result: ${JSON.stringify(ress.result)}`)

        return ress.result
    })

    //console.log(videoDownloadJson)

    var infoPage = `
        <span style="line-height: 100%;margin: 10px;">
            <div style="margin: 10px;">
                <p>当前页面cid: ${cid}, aid: ${aid}</p>
                <p>当前视频格式: ${videoDownloadJson.type}${videoDownloadJson.type == "FLV" ? `(bilibili已对当前下载格式进行速度限制)` : `当前格式会出现音视频分离现象，请谨慎下载`}</p>
        `

    var VideoSupportFormatsPage = `
                <table border="1">
                    <tr>
                        <th>支持画质</th>
                        <th>是否需要登录</th>
                        <th>是否需要vip</th>
                    </tr>
                `
    for (var i = 0; i < videoDownloadJson.support_formats.length; i++) {
        var SupportFormat = videoDownloadJson.support_formats[i]
        //console.log(SupportFormat)
        if ((SupportFormat.quality == videoDownloadJson.quality) && (videoDownloadJson.type != "DASH")) VideoSupportFormatsPage += `
                    <tr>
                        <td><b>${SupportFormat.new_description}<b></td>
                        <td>${SupportFormat.need_login == true ? "是" : "否"}</td>
                        <td>${SupportFormat.need_vip == true ? "是" : "否"}</td>
                    </tr>`
        else VideoSupportFormatsPage += `
                    <tr>
                        <td>${SupportFormat.new_description}</td>
                        <td>${SupportFormat.need_login == true ? "是" : "否"}</td>
                        <td>${SupportFormat.need_vip == true ? "是" : "否"}</td>
                    </tr>`
    }
    infoPage += VideoSupportFormatsPage + `
                </table>
    `


    if (videoDownloadJson.type == "DASH")
        infoPage += GetDashPage(videoDownloadJson.dash)
    else
        infoPage += GetFlvPage(videoDownloadJson.durl)


    infoPage += `</div></span>`


    infoPage = (PageIndex).replaceAll("<!--DOWNLOADPAGE-->", infoPage)

    return new Response(infoPage, { headers: htmlHeaders })
}
