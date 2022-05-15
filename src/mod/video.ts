import { CustomConfig } from '../config'


export async function DownloadVideo(cid: number, aid: number, dash: boolean, qn: number): Promise<VideoPlayInfo> {
    var params;
    if (dash) params = `?avid=${aid}&cid=${cid}&fnval=16&fnver=0&fourk=1`;
    else params = `?avid=${aid}&cid=${cid}&fnval=0&fnver=0&fourk=1&qn=${qn}`;
    var videoApiUrl = `${CustomConfig().ApiProxyUrl}/x/player/playurl${params}`;

    console.log(`fetching url: ${videoApiUrl}`);

    var videoJson = await fetch(videoApiUrl, /* {
        headers: cookieHeaders
    } */).then(res => {
        return res.text();
    }).then(res => {
        //console.log(res)
        var data: VideoPlayInfo = JSON.parse(res);
        if (data.code != 0)
            throw Error(res);
        return data;
    })

    return videoJson;

}
