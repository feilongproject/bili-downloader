import { PageIndex, htmlHeaders } from '../../var'
import { PageDownloadVideo } from './video'
import { PageDownloadBangumi } from './bangumi'


export async function PageDownload(cid: number, aid: number, type: number, dash: boolean, qn: any): Promise<Response> {


    switch (type) {
        case 0:
            return PageDownloadVideo(cid, aid, dash, qn)
        case 1:
            return PageDownloadBangumi(cid, aid, dash, qn)
        default:
            return new Response(PageIndex, { headers: htmlHeaders })
    }




}
