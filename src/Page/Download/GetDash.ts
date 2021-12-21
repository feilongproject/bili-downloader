import { GetQN } from '../../mods/GetQN'
export function GetDashPage(dashs: dash) {
    //console.log(JSON.stringify(dashs))
    const dashVideo = dashs.video
    const dashAudio = dashs.audio
    //console.log(JSON.stringify(dashVideo))
    var page = `
    <div>
        <h3>视频流信息</h3>
        <table border="1">
            <tr>
                <th>支持画质</th>
                <th>url</th>
                <th>视频所需最低带宽</th>
                <th>视频格式类型</th>
                <th>编码类型</th>
                <th>视频宽度</th>
                <th>视频高度</th>
                <th>视频帧率</th>
                <th>单个像素宽高比</th>
                <!--<th>url对应m4s文件中头部的位置</th>-->
                <!--<th>codecid</th>-->
            </tr>
    `

    for (var i = 0; i < dashVideo.length; i++) {
        var VideoInfo = dashVideo[i]
        //console.log(`${JSON.stringify(VideoInfo)}`)
        page += `
            <tr>
                <td>${GetQN(VideoInfo.id)}</td>
                <td><a href="${VideoInfo.baseUrl}">url</a></td>
                <td>${VideoInfo.bandwidth}</td>
                <td>${VideoInfo.mimeType}</td>
                <td>${VideoInfo.codecs}</td>
                <td>${VideoInfo.width}</td>
                <td>${VideoInfo.height}</td>
                <td>${VideoInfo.frameRate}</td>
                <td>${VideoInfo.sar}</td>
                <!--<td>${VideoInfo.SegmentBase.Initialization}<br><br>${VideoInfo.SegmentBase.indexRange}</td>-->
                <!--<td>${VideoInfo.codecid}</td>-->
            </tr>`
        if (VideoInfo.backupUrl.length > 0)
            for (var j = 0; j < VideoInfo.backupUrl.length; j++) {
                page += `
            <tr>
                <td>备份源</td>
                <td><a href="${VideoInfo.backupUrl[j]}">url</a></td>
            </tr>`
            }
    }
    page += `
        </table>
        <h3>音频流信息</h3>
        <table border="1">
            <tr>
                <th>支持音质</th>
                <th>url</th>
                <th>音频所需最低带宽</th>
                <th>音频格式类型</th>
                <th>编码类型</th>
                <!--<th>url对应m4s文件中头部的位置</th>-->
            </tr>
        `
    for (var i = 0; i < dashAudio.length; i++) {
        var AudioInfo = dashAudio[i]
        //console.log(`${JSON.stringify(VideoInfo)}`)
        page += `
            <tr>
                <td>${GetQN(AudioInfo.id)}</td>
                <td><a href="${AudioInfo.baseUrl}">url</a></td>
                <td>${AudioInfo.bandwidth}</td>
                <td>${AudioInfo.mimeType}</td>
                <td>${AudioInfo.codecs}</td>
                <!--<td>${AudioInfo.SegmentBase.Initialization}<br><br>${AudioInfo.SegmentBase.indexRange}</td>-->
            </tr>`
        if (AudioInfo.backupUrl.length > 0)
            for (var j = 0; j < AudioInfo.backupUrl.length; j++) {
                page += `
            <tr>
                <td>备份源</td>
                <td><a href="${AudioInfo.backupUrl[j]}">url</a></td>
            </tr>`

            }
    }

    page += `
        </table>
        <details>
            <summary>dash json</summary>
            ${JSON.stringify(dashs)}
        </details>`
    return page
}


