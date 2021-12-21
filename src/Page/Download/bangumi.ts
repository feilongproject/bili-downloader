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
export async function PageDownloadBangumi(cid: number, aid: number, dash: boolean, qn: number): Promise<Response> {

    //console.log(`aid: ${aid}\ncid: ${cid}`)
    var params
    if (dash) params = `?avid=${aid}&cid=${cid}&fnval=16&fnver=0`
    else params = `?avid=${aid}&cid=${cid}&fnval=0&fnver=0&qn=${qn}`
    var videoApiUrls = new Array
    videoApiUrls.push(`https://bili.lli.cx/pgc/player/web/playurl/${params}`)
    videoApiUrls.push(`https://mysr.ellpew.xyz/pgc/player/web/playurl/${params}`)
    videoApiUrls.push(`https://bilibili.myhosts.ml/pgc/player/web/playurl/${params}}`)

    var P1 = fetch(videoApiUrls[0], { headers: cookieHeaders })
    var P2 = fetch(videoApiUrls[1], { headers: cookieHeaders })
    var P3 = fetch(videoApiUrls[2], { headers: cookieHeaders })

    var videoJson = await Promise.all([P1, P2, P3]).then(async res => {
        var ret = []
        for (var i = 0; i < res.length; i++) {
            var body = await res[i].text()
            ret.push(body)
        }
        if (!ret[0]) throw new Error(`未从api获得任何信息！ret: ${ret}`);
        return ret
    }).then(text => {
        var ret = new Array
        var err = new Array
        for (var i = 0; i < text.length; i++) {
            try {
                ret.push(JSON.parse(text[i]))
                console.log(`\nerror0: ${text[i]}`)
            } catch (error) {
                err.push({ err: error, info: text[i] });
                console.log(`${i}->err url: ${videoApiUrls[i]}\nerror: ${error}\nerror: ${text[i]}`)
            }
        }
        //console.log(JSON.stringify(ret))
        return { ret, err }
    }).then(ret => {
        //console.log(`ret: ${JSON.stringify(ret)}`)

        var res = ret.ret, err = ret.err
        if (err[0]) {
            //console.log(`throwing err: ${err}`)
            var errInfo = ""
            for (var i = 0; i < err.length; i++)
                errInfo += `no.${i}\nerr url: ${videoApiUrls[i]}\nerror info: ${err[0].info}\n\n<hr>`
            throw new Error(errInfo);
        }
        else res = ret.ret
        console.log(res)

        //console.log(`result: ${JSON.stringify(res[0].result)}`)
        //console.log(`result: ${JSON.stringify(res[1].result)}`)
        //console.log(`result: ${JSON.stringify(res[2].result)}`)
        if (dash)
            if (res[0].result.type == "DASH")
                return res[0].result
            else if (res[1].result.type == "DASH")
                return res[1].result
            else return res[2].result
        else {
            for (i = 0; i < res.length; i++) {
                //console.log(`need qn:${qn},now qn:${res[i].result.quality}`)
                if ((res[i].result.type == "FLV") && (res[i].result.quality == qn))
                    return res[i].result
            }
            for (i = 0; i < res.length - 1; i++) {
                if ((res[i].result.type == "FLV"))
                    return res[i].result
            }
            return res[res.length].result

        }
    })

    //console.log(videoDownloadJson)

    var infoPage = `
        <span style="line-height: 100%;margin: 10px;">
            <div style="margin: 10px;">
                <p>当前页面cid: ${cid}, aid: ${aid}</p>
                <p>当前视频格式: ${videoJson.type}${videoJson.type == "FLV" ? `(bilibili已对当前下载格式进行速度限制)` : `当前格式会出现音视频分离现象，请谨慎下载`}</p>
                <details>
                    <summary>当前使用api</summary>
                    <p>dash: https://api.bilibili.com/pgc/player/web/playurl/?avid=${aid}&cid=${cid}&fnval=16&fnver=0</p>
                    <p>flv: https://api.bilibili.com/pgc/player/web/playurl/?avid=${aid}&cid=${cid}&fnval=0&fnver=0&qn=${qn}</p>
                </details>
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
                        <td><a href="/download?type=1&cid=${cid}&aid=${aid}&dash=0&qn=${SupportFormat.quality}"><b>${SupportFormat.new_description}<b></a></td>
                        <td>${SupportFormat.need_login == true ? "是" : "否"}</td>
                        <td>${SupportFormat.need_vip == true ? "是" : "否"}</td>
                    </tr>`
        else if (videoJson.type != "DASH") VideoSupportFormatsPage += `
        <tr>
            <td><a href="/download?type=1&cid=${cid}&aid=${aid}&dash=0&qn=${SupportFormat.quality}">${SupportFormat.new_description}</a></td>
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
