

export interface VideoInfo {
    code: number,
    message: string,
    ttl: number,
    data: {
        bvid: string,
        aid: number,
        videos: number,
        tid: number,
        tname: string,
        copyright: number,
        pic: string,
        title: string,
        pubdate: number,
        ctime: number,
        desc: string,
        desc_v2: {
            raw_text: string,
            type: number,
            biz_id: number,
        }[]
        ,
        state: number,
        duration: number,
        rights: {
            bp: number,
            elec: number,
            download: number,
            movie: number,
            pay: number,
            hd5: number,
            no_reprint: number,
            autoplay: number,
            ugc_pay: number,
            is_cooperation: number,
            ugc_pay_preview: number,
            no_background: number,
            clean_mode: number,
            is_stein_gate: number,
            is_360: number,
            no_share: number,
        },
        owner: {
            mid: number,
            name: string,
            face: string,
        },
        stat: {
            aid: number,
            view: number,
            danmaku: number,
            reply: number,
            favorite: number,
            coin: number,
            share: number,
            now_rank: number,
            his_rank: number,
            like: number,
            dislike: number,
            evaluation: string,
            argue_msg: string,
        },
        dynamic: string,
        cid: number,
        dimension: {
            width: number,
            height: number,
            rotate: number,
        },
        no_cache: boolean,
        pages: {
            cid: number,
            page: number,
            from: string,
            part: string,
            duration: number,
            vid: string,
            weblink: string,
            dimension: {
                width: number,
                height: number,
                rotate: number,
            }
        }[],
        subtitle: {
            allow_submit: boolean,
            list: []
        },
        is_season_display: boolean,
        user_garb: {
            url_image_ani_cut: string
        },
        honor_reply: {}
    }
}

export interface VideoPlayInfo {
    code: number,
    message: string,
    ttl: number,
    data: {
        from: string,
        result: string,
        message: string,
        quality: number,
        format: string,
        timelength: number,
        accept_format: string,
        accept_description: string[],
        accept_quality: number[],
        video_codecid: number,
        seek_param: string,
        seek_type: string,
        durl?: Durl[],
        dash?: Dash,
        support_formats: {
            quality: number,
            format: string,
            new_description: string,
            display_desc: string,
            superscript: string,
            codecs: null,
        }[]

    }
}

export interface Durl {
    order: number,
    length: number,
    size: number,
    ahead: string,
    vhead: string,
    url: string,
    backup_url: string[],
}

export interface Dash {
    duration: number,
    minBufferTime: number,
    min_buffer_time: number,
    video: {
        id: number,
        baseUrl: string,
        base_url: string,
        backupUrl: string[],
        backup_url: string[],
        bandwidth: number,
        mimeType: string,
        mime_type: string,
        codecs: string,
        width: number,
        height: number,
        frameRate: string,
        frame_rate: string,
        sar: string,
        startWithSAP: number,
        start_with_sap: number,
        SegmentBase: {
            Initialization: string,
            indexRange: string,
        },
        segment_base: {
            initialization: string,
            index_range: string,
        },
        codecid: number,
    }[]

    audio: {
        id: number,
        baseUrl: string,
        base_url: string,
        backupUrl: string[],
        backup_url: string[],
        bandwidth: number,
        mimeType: string,
        mime_type: string,
        codecs: string,
        sar: string,
        startWithSAP: number,
        start_with_sap: number,
        SegmentBase: {
            Initialization: string,
            indexRange: string,
        },
        segment_base: {
            initialization: string,
            index_range: string,
        },
        codecid: number,
    }[]

    dolby: {
        audio: [],
        type: string
    }
}





