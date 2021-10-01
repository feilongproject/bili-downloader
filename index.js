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
const cookies = ""//"SESSDATA=123"
var url
var pageStatus

let htmlHeaders = new Headers()
htmlHeaders.set('Content-Type', 'text/html;charset=UTF-8')
let cookieHeaders = new Headers()
cookieHeaders.set('Cookie', cookies)



async function Main(request) {
  {//init
    url = new URL(request.url)
  }
  console.log(url.href)
  //return new Response(url.pathname +"   "+ aid)

  if (!url.search) {
    return new Response(await PageHeader(), { headers: htmlHeaders })
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
    //console.log("videoId->" + videoId)
    //console.log(url)


  }


  if (videoId ?.includes("bilibili.com") ){
    videoId = (new URL(videoId)).pathname//   ||  /video/BV1Ap4y1b7UC  || /video/BV1Ap4y1b7UC

  }


  if (stristr(videoId, "/"))
    videoId = videoId.split("/")[videoId.split("/").length - 1]//把videoId彻底分割成avbv格式
  if (stristr(videoId, "av") || stristr(videoId, "bv")) {//检测是否是av类视频
    //console.log(videoId.split("/"))
    console.log(videoId)
    if (stristr(videoId, "bv")) videoId = "bvid=" + videoId
    else videoId = "aid=" + videoId.substr(2)
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
  var data = videoInfoJson.data
  console.log(data)
  //var videoCid = videoInfoJson.data.cid




  var infoPage = "<span style=\"line-height: 100%;margin: 10px;\"><div style=\"margin: 10px 10px;\">" +
    "<table border=\"1\">" +
    "<tr><th>视频信息</th><th>值</th></tr>" +
    "<tr><td>AV号</td><td>" + data.aid + "</td></tr>" +
    "<tr><td>BV号</td><td>" + data.bvid + "</td></tr>" +
    "<tr><td>标题</td><td>" + data.title + "</td></tr>" +
    "<tr><td>简介</td><td>" + GetDesc(data.desc) + "</td></tr>" +
    "<tr><td>分P</td><td>共" + data.pages.length + "P</td></tr>" +
    "<tr><td>封面</td><td><a href=\"" + data.pic + "\">链接</a></td></tr></table>" +
    "<hr>"


  var infoPage = infoPage + "<table border=\"1\">" +
    "<tr><th></th><th>分P标题</th><th>点击下载</th><th>CID</th></tr>"
  for (i = 0; i < data.pages.length; i++) {
    var cid = data.pages[i].cid
    var infoPage = infoPage + "<tr><td>P" + (i + 1) + "</td>" +
      "<td>" + data.pages[i].part + "</td>" +
      "<td style=\"border-radius:10px;color:#00F;background-color: #fff;text-align: center;\" onclick=\"window.location.href = '/download\?cid=" + cid + "&aid=" + data.aid + "'\">下载</td>" +
      "<td>" + cid + "<br></td></tr>"
    //console.log("cid(" + i + "/" + videoInfoJson.data.pages.length + "): " + cid)
  }
  infoPage = infoPage + "</table></div></span>"

  infoPage = (await PageHeader())
    .replaceAll("<!--INFOPAGE-->", infoPage)
  return new Response(infoPage, { headers: htmlHeaders })
  //return new Response(3, { headers: htmlHeaders })

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
  var infoPage = ""
  infoPage = infoPage +
    "<span style=\"line-height: 100%;margin: 10px;\">" +
    "<div style=\"margin: 10px;\">" +
    "<p>当前页面cid: " + cid + "</p>" +
    "<p>当前最高画质: " + videoDownloadJson.data.format + "</p>"
  /*for(i=0;i<videoDownloadJson.data.accept_description.length;i++){
    infoPage+=videoDownloadJson.data.accept_description[i]+"<br>"
  }*/



  for (i = 0; i < videoDownloadJson.data.durl.length; i++) {
    console.log(i + "  " + videoDownloadJson.data.durl.length + "  " + videoDownloadJson.data.durl[i])
    infoPage +=
      "<p><a href=" + videoDownloadJson.data.durl[i].url + ">画质:"
      + videoDownloadJson.data.format +
      "</a></p>"
  }
  infoPage = infoPage + "</div></span>"


  infoPage = (await PageHeader())
    .replaceAll("<!--DOWNLOADPAGE-->", infoPage)
  return new Response(infoPage, { headers: htmlHeaders })
}


async function PageHeader() {
  page = await fetch("https://raw.githubusercontent.com/feilongproject/bili-downloader/master/index.html")
  return await page.text()
}
function GetDesc(desc) {
  console.log(desc)
  return desc.replaceAll("\n", "<br>")
}

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
