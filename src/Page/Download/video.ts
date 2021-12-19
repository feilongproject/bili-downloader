import { PageIndex, htmlHeaders, cookieHeaders } from '../../var'


export async function PageDownloadVideo(cid: number, aid: number, dash: boolean): Promise<Response> {

    console.log(`aid: ${aid}\ncid: ${cid}`)
    var videoApiUrl = `https://bilibili.myhosts.ml/x/player/playurl?avid=${aid}&cid=${cid}`
    console.log(`fetching url: ${videoApiUrl}`)

    var videoDownloadJson = await fetch(videoApiUrl, {
        headers: cookieHeaders
    }).then(res => {
        return res.text()
    }).then(res => {
        //console.log(res)
        return JSON.parse(res)
    })

    console.log(videoDownloadJson)
    var infoPage = `
        <span style="line-height: 100%;margin: 10px;">
        <div style="margin: 10px;">
        <p>当前页面cid: ${cid}</p>
        <p>当前最高画质: ${videoDownloadJson.data.format}</p>
        `


    for (var i = 0; i < videoDownloadJson.data.durl.length; i++) {
        console.log(i + "  " + videoDownloadJson.data.durl.length + "  " + videoDownloadJson.data.durl[i])
        infoPage +=
            "<p><a href=" + videoDownloadJson.data.durl[i].url + ">画质:"
            + videoDownloadJson.data.format +
            "</a></p>"
    }
    infoPage = infoPage + "</div></span>"


    infoPage = (PageIndex).replaceAll("<!--DOWNLOADPAGE-->", infoPage)

    return new Response(infoPage, { headers: htmlHeaders })
}
