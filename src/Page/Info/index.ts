import { PageIndex, htmlHeaders } from '../../var'
import { PageInfoVideo } from './video'
import { PageInfoBangumi } from './bangumi'
/**
 * 
 * @param videoId 传入id（avbv(普通视频)/ssep(番剧视频)）
 * @returns 返回info
 */
export async function PageInfo(videoId: string): Promise<Response> {


    if (videoId.toLowerCase().startsWith("av") || videoId.toLowerCase().startsWith("bv")) {
        return PageInfoVideo(videoId)
    } else if (videoId.toLowerCase().startsWith("ss") || videoId.toLowerCase().startsWith("ep")) {
        return PageInfoBangumi(videoId)
    } else return new Response(PageIndex, { headers: htmlHeaders })


}


