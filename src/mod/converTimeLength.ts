/**
 * 
 * @param size 按秒算
 */
export function converTimeLength(length: number): string {
    var lv = 0;
    var _lv = ["s", "m", "h"]
    while (1) {
        if (length >= 60 && lv <= 2) length /= 60, lv++;
        else return `${length.toFixed(2)}${_lv[lv]}`;
    }
    throw new Error("fail");

}