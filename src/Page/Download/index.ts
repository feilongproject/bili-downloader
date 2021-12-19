import { PageIndex, htmlHeaders, cookieHeaders } from '../../var'
import { PageDownloadVideo } from './video'
import { PageDownloadBangumi } from './bangumi'


export async function PageDownload(cid: number, aid: number, type: number, dash: boolean): Promise<Response> {


    switch (type) {
        case 0:
            return PageDownloadVideo(cid, aid, dash)
        case 1:
            return PageDownloadBangumi(cid, aid, dash)
        default:
            return new Response(PageIndex, { headers: htmlHeaders })
    }




}
