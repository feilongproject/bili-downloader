/**
 * 
 * @param size 按比特算
 */
export function converSize(size: number): string {
    var lv = 0;
    var _lv = ["b", "kb", "mb", "gb"]
    while (1) {
        if (size >= 1024) size /= 1024, lv++;
        else return `${size.toFixed(2)}${_lv[lv]}`;
    }
    throw new Error("fail");

}