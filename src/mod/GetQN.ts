export function GetQN(QN: number): string {
    //console.log(`QN: ${QN}`)
    switch (QN) {
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
        case 30216: return "64K"
        case 30232: return "132K"
        case 30280: return "192K"
        default: return "UNknown"
    }
}
