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
    var params = `?avid=${aid}&cid=${cid}&fnval=${dash?"16":"0"}&fnver=0`
    var videoApiUrl1 = `https://bili.lli.cx/pgc/player/web/playurl/${params}`
    var videoApiUrl2 = `https://mysr.ellpew.xyz/pgc/player/web/playurl/${params}`
    var videoApiUrl3 = `https://bilibili.myhosts.ml/pgc/player/web/playurl/${params}`

    var P1 = fetch(videoApiUrl1)
    var P2 = fetch(videoApiUrl2)
    var P3 = fetch(videoApiUrl3)

    var videoJson =await Promise.all([P1, P2, P3]).then(async res => {
        return [await res[0].text(), await res[1].text(), await res[2].text(),]
    }).then(text => {
        return [JSON.parse(text[0]), JSON.parse(text[1]), JSON.parse(text[2]),]
    }).then(res => {
        //console.log(`result: ${JSON.stringify(res[0].result)}`)
        //console.log(`result: ${JSON.stringify(res[1].result)}`)
        //console.log(`result: ${JSON.stringify(res[2].result)}`)
        if ((res[0].result.type == "DASH") && dash)
            return res[0].result
        if ((res[1].result.type == "DASH") && dash)
            return res[1].result
        return res[2].result
    })

    //console.log(videoDownloadJson)

    var infoPage = `
        <span style="line-height: 100%;margin: 10px;">
            <div style="margin: 10px;">
                <p>当前页面cid: ${cid}, aid: ${aid}</p>
                <p>当前视频格式: ${videoJson.type}${videoJson.type == "FLV" ? `(bilibili已对当前下载格式进行速度限制)` : `当前格式会出现音视频分离现象，请谨慎下载`}</p>
        `

    var VideoSupportFormatsPage = `
                <table border="1">
                    <tr>
                        <th>支持画质</th>
                        <th>是否需要登录</th>
                        <th>是否需要vip</th>
                    </tr>
                `
    for (var i = 0; i < videoJson.support_formats.length; i++) {
        var SupportFormat = videoJson.support_formats[i]
        //console.log(SupportFormat)
        if ((SupportFormat.quality == videoJson.quality) && (videoJson.type != "DASH")) VideoSupportFormatsPage += `
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


    if (videoJson.type == "DASH")
        infoPage += GetDashPage(videoJson.dash)
    else
        infoPage += GetFlvPage(videoJson.durl)


    infoPage += `</div></span>`


    infoPage = (PageIndex).replaceAll("<!--DOWNLOADPAGE-->", infoPage)

    return new Response(infoPage, { headers: htmlHeaders })
}
