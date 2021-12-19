interface durls {
    "size": number,
    "ahead": string,
    "length": number,
    "vhead": string,
    "backup_url": string[],
    "url": string,
    "order": number,
    "md5": string
}

interface dash {
    "duration": number
    "minBufferTime": number
    "min_buffer_time": number
    "video": {
        "start_with_sap": number,
        "bandwidth": number,
        "sar": string
        "backupUrl": [],
        "codecs": string
        "base_url": string
        "backup_url": [],
        "segment_base": {
            "initialization": string
            "index_range": string
        },
        "mimeType": string
        "frame_rate": string
        "SegmentBase": {
            "Initialization": string
            "indexRange": string
        },
        "frameRate": string
        "codecid": number,
        "baseUrl": string
        "size": number
        "mime_type": string
        "width": number
        "startWithSAP": number
        "id": number
        "height": number
        "md5": string
    }[]

    "audio": {
        "start_with_sap": number
        "bandwidth": number
        "sar": string
        "backupUrl": [],
        "codecs": string
        "base_url": string
        "backup_url": [],
        "segment_base": {
            "initialization": string
            "index_range": string
        },
        "mimeType": string
        "frame_rate": string
        "SegmentBase": {
            "Initialization": string
            "indexRange": string
        },
        "frameRate": string
        "codecid": number
        "baseUrl": string
        "size": number
        "mime_type": string
        "width": number
        "startWithSAP": number
        "id": number
        "height": number
        "md5": string
    }[]

    "dolby": {
        "audio": [],
        "type": string
    }

}