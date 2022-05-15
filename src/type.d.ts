export { }

declare global {
    interface VideoInfo {
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

    interface BangumiInfo {
        code: number,
        message: string,
        result: {
            activity: {
                head_bg_url: string,
                id: number,
                title: string,
            },
            alias: string,
            areas: {
                id: number,
                name: string,
            }[],
            bkg_cover: string,
            cover: string,
            episodes: {
                aid: number,
                badge: string,
                badge_info: {
                    bg_color: string,
                    bg_color_night: string,
                    text: string,
                },
                badge_type: number,
                bvid: string,
                cid: number,
                cover: string,
                dimension: {
                    height: number,
                    rotate: number,
                    width: number,
                },
                duration: number,
                from: string,
                id: number,
                is_view_hide: boolean,
                link: string,
                long_title: string,
                pub_time: number,
                pv: number,
                release_date: string,
                rights: {
                    allow_demand: number,
                    allow_dm: number,
                    allow_download: number,
                    area_limit: number,
                },
                share_copy: string,
                share_url: string,
                short_link: string,
                status: number,
                subtitle: string,
                title: string,
                vid: string,
            }[],
            evaluate: string,
            freya: {
                bubble_desc: string,
                bubble_show_cnt: number,
                icon_show: number,
            },
            jp_title: string,
            link: string,
            media_id: number,
            mode: number,
            new_ep: {
                desc: string,
                id: number,
                is_new: number,
                title: string,
            },
            payment: {
                discount: number,
                pay_type: {
                    allow_discount: number,
                    allow_pack: number,
                    allow_ticket: number,
                    allow_time_limit: number,
                    allow_vip_discount: number,
                    forbid_bb: number
                },
                price: number,
                promotion: string,
                tip: string,
                view_start_time: number,
                vip_discount: number,
                vip_first_promotion: string,
                vip_promotion: string,
            },
            positive: {
                id: number,
                title: string,
            },
            publish: {
                is_finish: number,
                is_started: number,
                pub_time: string,
                pub_time_show: string,
                unknow_pub_date: number,
                weekday: number,
            },
            rating: {
                count: number,
                score: number,
            },
            record: string,
            rights: {
                allow_bp: number,
                allow_bp_rank: number,
                allow_download: number,
                allow_review: number,
                area_limit: number,
                ban_area_show: number,
                can_watch: number,
                copyright: string,
                forbid_pre: number,
                freya_white: number,
                is_cover_show: number,
                is_preview: number,
                only_vip_download: number,
                resource: string,
                watch_platform: number
            },
            season_id: number,
            season_title: string,
            seasons: {
                badge: string,
                badge_info: {
                    bg_color: string,
                    bg_color_night: string,
                    text: string,
                },
                badge_type: number,
                cover: string,
                horizontal_cover_1610: string,
                horizontal_cover_169: string,
                media_id: number,
                new_ep: {
                    cover: string,
                    id: number,
                    index_show: string,
                },
                season_id: number,
                season_title: string,
                season_type: number,
                stat: {
                    favorites: number,
                    series_follow: number,
                    views: number,
                }
            }[],
            section: {
                episode_id: number,
                episode_ids: [],
                episodes: {
                    aid: number,
                    badge: string,
                    badge_info: {
                        bg_color: string,
                        bg_color_night: string,
                        text: string
                    },
                    badge_type: number,
                    bvid: string,
                    cid: number,
                    cover: string,
                    dimension: {
                        height: number,
                        rotate: number,
                        width: number,
                    },
                    duration: number,
                    from: string,
                    id: number,
                    is_view_hide: false,
                    link: string,
                    long_title: string,
                    pub_time: number,
                    pv: number,
                    release_date: string,
                    rights: {
                        allow_demand: number,
                        allow_dm: number,
                        allow_download: number,
                        area_limit: number,
                    },
                    share_copy: string,
                    share_url: string,
                    short_link: string,
                    stat: {
                        coin: number,
                        danmakus: number,
                        likes: number,
                        play: number,
                        reply: number,
                    },
                    status: number,
                    subtitle: string,
                    title: string,
                    vid: string,
                }[],
                id: number,
                title: string,
                type: number,
            }[],

            series: {
                series_id: number,
                series_title: string,
            },
            share_copy: string,
            share_sub_title: string,
            share_url: string,
            show: {
                wide_screen: number,
            },
            show_season_type: number,
            square_cover: string,
            stat: {
                coins: number,
                danmakus: number,
                favorite: number,
                favorites: number,
                likes: number,
                reply: number,
                share: number,
                views: number,
            },
            status: number,
            subtitle: string,
            title: string,
            total: number,
            type: number,
            up_info: {
                avatar: string,
                avatar_subscript_url: string,
                follower: number,
                is_follow: number,
                mid: number,
                nickname_color: string,
                pendant: {
                    image: string,
                    name: string,
                    pid: number,
                },
                theme_type: number,
                uname: string,
                verify_type: number,
                vip_label: {
                    bg_color: string,
                    bg_style: number,
                    border_color: string,
                    text: string,
                    text_color: string,
                },
                vip_status: number,
                vip_type: number,
            },
            user_status: {
                area_limit: number,
                ban_area_show: number,
                follow: number,
                follow_status: number,
                login: number,
                pay: number,
                pay_pack_paid: number,
                sponsor: number,
            }
        }
    }

    interface VideoPlayInfo {
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

    interface Durl {
        order: number,
        length: number,
        size: number,
        ahead: string,
        vhead: string,
        url: string,
        backup_url: string[] | null,
    }

    interface Dash {
        duration: number,
        minBufferTime: number,
        min_buffer_time: number,
        video: {
            id: number,
            baseUrl: string,
            base_url: string,
            backupUrl: string[] | null,
            backup_url: string[] | null,
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
            backupUrl: string[] | null,
            backup_url: string[] | null,
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
}




