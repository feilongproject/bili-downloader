export function GetDashPage(dashs: dash) {
    
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


    //console.log(JSON.stringify(dashs))
    const dashVideo = dashs.video
    const dashAudio = dashs.audio
    //console.log(JSON.stringify(dashVideo))

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
    }

    return page
}

function GetQN(QN: number): string {


    if (QN.toString().startsWith("302"))
        var QNN = parseInt(QN.toString().substr(3))
    else QNN = QN

    console.log(`QN: ${QN}  QNN: ${QNN}`)
    switch (QNN) {
        case 6: return "240P 极速"
        case 16: return "360P 流畅"
        case 32: return "480P 清晰"
        case 64: return "720P 高清"
        case 74: return "720P60 高帧率"
        case 80: return "1080P 高清"
        case 112: return "1080P+ 高码率"
        case 116: return "1080P60 高帧率"
        case 120: return "4K 超清"
        case 125: return "HDR 真彩色"
        default: return "UNknown"
    }
}
