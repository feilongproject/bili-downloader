/* video type:
    0->no
    1->avideo
    2->bvideo
    3->ssanime
    4->epanime
    5->media
    https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/video/videostream_url.md
    https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/bangumi/info.md
    https://bili.gq/?abid=av170001
    http://bili.gq/download?cid=328118259&aid=972692871

*/
const choices = 1
const cookies = "SESSDATA=123"
var url
var pageStatus

let htmlHeaders = new Headers()
htmlHeaders.set('Content-Type', 'text/html;charset=UTF-8')
let cookieHeaders = new Headers()
cookieHeaders.set('Cookie', 'SESSDATA=13fae253%2C1645449241%2Ca84ed*81')



async function Main(request) {
  {//init
    url = new URL(request.url)
  }
  //console.log(url)
  //return new Response(url.pathname +"   "+ aid)

  if (url.pathname == "/") {
    return new Response(infoPageHeader, { headers: htmlHeaders })
  } else if (url.pathname == "/download") {
    return await DownloadPage(request)
  } else {
    return await InfoPage(request)
  }

}

async function InfoPage(request) {
  //let aid = url.searchParams.get('aid')

  var videoId = url.searchParams.get('abid')
  if (!videoId) {
    videoId = "https:/" + url.pathname
  }

  {
    console.log("videoId->" + videoId)
    console.log(url)

    console.log()
  }


  if (videoId ?.includes("bilibili.com") ){
    videoId = (new URL(videoId)).pathname//   ||  /video/BV1Ap4y1b7UC  || /video/BV1Ap4y1b7UC

  }


  if (stristr(videoId, "/"))
    videoId = videoId.split("/")[videoId.split("/").length - 1]//把videoId彻底分割成avbv格式
  if (stristr(videoId, "av") || stristr(videoId, "bv")) {//检测是否是av类视频
    //console.log(videoId.split("/"))
    console.log(videoId)
    if (stristr(videoId, "av")) videoId = "aid=" + videoId.substr(2)
    else videoId = "bvid=" + videoId
  } else if (stristr(videoId, "ss") || stristr(videoId, "ep")) {//检测是否是ss类视频
  }/*
  else if (stristr($videoId, "md")) {//检测是否是md类视频
    $videoIdInfo["type"] = 5;
    $videoIdInfo["id"] = stristr($videoId, "md");
  }
  else {//若都不是则输出错误
    ShowError("1");
    exit();
  }*/


  //http://api.bilibili.com/x/web-interface/view?bvid=BV1Ap4y1b7UC
  //http://api.bilibili.com/x/web-interface/view?aid=170001
  var videoApiUrl = "http://api.bilibili.com/x/web-interface/view?"
  var res = await fetch(videoApiUrl + videoId)
  //console.log(res)
  var videoInfoJson = await res.json()
  console.log(videoInfoJson)
  //var videoCid = videoInfoJson.data.cid



  for (i = 0; i < videoInfoJson.data.pages.length; i++) {
    var cid = videoInfoJson.data.pages[i].cid
    var infoPage = infoPageHeader
      + "目标cid：" + cid + " (" + (i + 1) + "/" + videoInfoJson.data.pages.length + ")"
      + "<button onclick=\"window.location.href = '/download\?cid=" + cid + "&aid=" + videoInfoJson.data.aid + "'\">跳转到下载详情页</button>"
      + "<br>"
    //console.log("cid(" + i + "/" + videoInfoJson.data.pages.length + "): " + cid)
  }

  return new Response(infoPage, { headers: htmlHeaders })


  return new Response(3, { headers: htmlHeaders })



}


async function DownloadPage() {
  console.log(url)
  var downloadApi = "http://api.bilibili.com/x/player/playurl?"
  var cid = url.searchParams.get('cid')
  var aid = url.searchParams.get('aid')
  console.log(cid)
  console.log(aid)
  var res = await fetch(downloadApi + "avid=" + aid + "&cid=" + cid, { headers: cookieHeaders })
  var videoDownloadJson = await res.json()
  console.log(videoDownloadJson)

  var infoPage = infoPageHeader +
    "当前页面cid: " + cid + "<br>" +
    "当前画质: " + videoDownloadJson.data.format + "<br>"
  /*for(i=0;i<videoDownloadJson.data.accept_description.length;i++){
    infoPage+=videoDownloadJson.data.accept_description[i]+"<br>"
  }*/

  for (i = 0; i < videoDownloadJson.data.durl.length; i++) {
    console.log(i + "  " + videoDownloadJson.data.durl.length + "  " + videoDownloadJson.data.durl[i])
    infoPage +=
      "<a href=" + videoDownloadJson.data.durl[i].url + ">画质:"
      + videoDownloadJson.data.format +
      "</a><br>"
  }




  return new Response(infoPage, { headers: htmlHeaders })
}


/*
async function DownloadVideo() {
  //echo "开始下载<br>";
  //echo stristr($_SERVER['REQUEST_URI'],"http") . "<br>";
  $videoIdInfo = GetIdAccUrl(0);
  //echo $videoIdInfo["type"] . $videoIdInfo["id"];
  DownloadVideo(GetInfo($videoIdInfo, 0))

}
*/


var infoPageHeader = `-------------------<br>
    bilibili视频下载助手<br>
    作者 : 飞龙project<br>
    GitHub开源项目仓库: <a href="https://github.com/feilongproject/bili-downloader">github.com/feilongproject/bili-downloader</a><br>
    demo link1 : <a href="https://www.bilibili.com/video/BV1Ap4y1b7UC">https://www.bilibili.com/video/BV1Ap4y1b7UC</a><br>
    demo link2 : <a href="/https://www.bilibili.com/video/BV1Ap4y1b7UC">http://bili.gq/https://www.bilibili.com/video/BV1Ap4y1b7UC</a><br>
    -------------------<br>
    使用方法：<br>
    方法1. 直接在网页将 " bilibili.com " 替换为" bili.gq"<br>
    方法2. 在" bili.gq" 后添加 "av、bv号"<br>
    方法3. 在" bili.gq" 后添加 "bilibili链接"<br>
    方法4. 在下方输入bv av号/av bv链接进行跳转<br>
    
    <input type="text" id="www" >
    <button onclick="tiaozhuan()">跳转</button><br>
    <script type="text/javascript">
        var tiaozhuan = function(){
            document.location.href ='/?abid=' + document.getElementById("www").value;
        }
    </script>
    -------------------<br>
    TODO : <br>
    添加番剧下载<br>
    添加剧集下载<br>
    美化界面(没css真难看)<br>
    添加cookie，使能下载更高画质视频<br>

    -------------------<br>`







function stristr(haystack, needle, bool) {
  let pos = 0
  haystack += ''
  pos = haystack.toLowerCase()
    .indexOf((needle + '')
      .toLowerCase())
  if (pos === -1) {
    return false
  } else {
    if (bool) {
      return haystack.substr(0, pos)
    } else {
      return haystack.slice(pos)
    }
  }
}

addEventListener("fetch", async event => {
  //clear()
  event.respondWith(Main(event.request))
})