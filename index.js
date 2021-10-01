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
  url = new URL(request.url)
  //console.log(url.href + "\n" + url.pathname+"\n"+stristr(url.pathname, "/video"))
  //return new Response(url.pathname +"   "+ aid)

  if (url.pathname == "/download") {
    if (url.searchParams.get("type") == 1)
      return await DownloadPage_Bangumi(request)
    else return await DownloadPage_Video(request)
  } else if (stristr(url.pathname, "/video"))
    return await GetInfoPage_Video(url.pathname)
  else if (stristr(url.pathname, "/bangumi"))
    return await GetInfoPage_Bangumi(url.pathname)
  else return new Response(await PageHeader(), { headers: htmlHeaders })
}

async function GetInfoPage_Video(url) {
  console.log("function GetInfoPage_Video")
  console.log(stristr(url, "/"))
  for (i = url.split("/").length - 1; i >= 1; i--) {//把videoId彻底分割成avbv格式
    console.log("--" + url.split("/")[i])
    if (stristr(url.split("/")[i], "av") || stristr(url.split("/")[i], "bv"))
      videoId = url.split("/")[i]}
  if (stristr(videoId, "bv")) {
    videoId = "bvid=" + videoId
  } else {
    videoId = "aid=" + videoId.substr(2)
  } console.log(videoId)
  var videoApiUrl = "http://api.bilibili.com/x/web-interface/view?" + videoId
  console.log(videoApiUrl)
  var res = await fetch(videoApiUrl, { headers: cookieHeaders })
  var videoInfoJson = await res.json()
  var data = videoInfoJson.data
  //console.log(data)
  var infoPage = "<span style=\"line-height: 100%;margin: 10px;\"><div style=\"margin: 10px 10px;\">" +
    "<table border=\"1\">" +
    "<tr><th>视频信息</th><th>值</th></tr>" +
    "<tr><td>AV号</td><td>" + data.aid + "</td></tr>" +
    "<tr><td>BV号</td><td>" + data.bvid + "</td></tr>" +
    "<tr><td>标题</td><td>" + data.title + "</td></tr>" +
    "<tr><td>简介</td><td>" + data.desc.replaceAll("\n", "<br>") + "</td></tr>" +
    "<tr><td>分P</td><td>共" + data.pages.length + "P</td></tr>" +
    "<tr><td>封面</td><td><a href=\"" + data.pic + "\">链接</a></td></tr></table>" +
    "<hr>"
  var infoPage = infoPage + "<table border=\"1\">" +
    "<tr><th></th><th>分P标题</th><th>点击下载</th><th>CID</th></tr>"
  for (i = 0; i < data.pages.length; i++) {
    var cid = data.pages[i].cid
    var infoPage = infoPage + "<tr><td>P" + (i + 1) + "</td>" +
      "<td>" + data.pages[i].part + "</td>" +
      "<td style=\"border-radius:10px;color:#00F;background-color: #fff;text-align: center;\" onclick=\"window.location.href = '/download\?type=0&cid=" + cid + "&aid=" + data.aid + "'\">下载</td>" +
      "<td>" + cid + "<br></td></tr>"}
  infoPage = infoPage + "</table></div></span>"
  infoPage = (await PageHeader())
    .replaceAll("<!--INFOPAGE-->", infoPage)
  return new Response(infoPage, { headers: htmlHeaders })
  //return new Response(3, { headers: htmlHeaders })
}




async function GetInfoPage_Bangumi(url) {
  for (i = url.split("/").length - 1; i >= 1; i--) {
    if (stristr(url.split("/")[i], "ep") || stristr(url.split("/")[i], "ss"))
      videoId = url.split("/")[i]}
  if (stristr(videoId, "ep"))
    videoId = "ep_id=" + videoId.substr(2)
  else
    videoId = "season_id=" + videoId.substr(2)
  var videoApiUrl = "http://api.bilibili.com/pgc/view/web/season?" + videoId
  console.log(videoApiUrl)
  var res = await fetch(videoApiUrl, { headers: cookieHeaders })
  var videoInfoJson = await res.json()
  var data = videoInfoJson.result
  console.log(data)

  var infoPage = "<span style=\"line-height: 100%;margin: 10px;\"><div style=\"margin: 10px 10px;\">" +
    "<table border=\"1\">" +
    "<tr><th>视频信息</th><th>值</th></tr>" +
    "<tr><td>标题</td><td>" + data.title + "</td></tr>" +
    "<tr><td>简介</td><td>" + data.evaluate.replaceAll("\n", "<br>") + "</td></tr>" +
    "<tr><td>分P</td><td>目前" + data.episodes.length + "/" + data.total + "P</td></tr>" +
    "<tr><td>简介URL</td><td><a href=\"" + data.link + "\">" + data.link + "</a></td></tr>" +
    "<tr><td>封面</td><td><a href=\"" + data.cover + "\">链接</a></td></tr></table>" +
    "<hr>"



  var infoPage = infoPage + "<table border=\"1\">" +
    "<tr><th></th><th>分P标题</th><th>点击下载</th><th>CID</th></tr>"
  for (i = 0; i < data.episodes.length; i++) {
    var cid = data.episodes[i].cid
    var infoPage = infoPage +
      "<tr><td>P" + (i + 1) + "</td>" +
      "<td>" + data.episodes[i].long_title + "</td>" +
      "<td style=\"border-radius:10px;color:#00F;background-color: #fff;text-align: center;\" onclick=\"window.location.href = '/download\?type=1&cid=" + cid + "&aid=" + data.episodes[i].aid + "'\">下载</td>" +
      "<td>" + cid + "<br></td></tr>"
  }
  infoPage = infoPage + "</table></div></span>"

  infoPage = (await PageHeader())
    .replaceAll("<!--INFOPAGE-->", infoPage)
  return new Response(infoPage, { headers: htmlHeaders })
  //return new Response(3, { headers: htmlHeaders })

}


async function DownloadPage_Video() {
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

async function DownloadPage_Bangumi() {
  //console.log(url)
  var downloadApi = "https://cn.ellpew.xyz/pgc/player/web/playurl?"
  var cid = url.searchParams.get('cid')
  var aid = url.searchParams.get('aid')
  console.log("cid: " + cid)
  console.log("aid: " + aid)
  var res = await fetch(downloadApi + "avid=" + aid + "&cid=" + cid, { headers: cookieHeaders })
  var videoDownloadJson = await res.json()

  //console.log(videoDownloadJson)
  videoDownloadJson = videoDownloadJson.result
  //console.log(videoDownloadJson)
  var infoPage = ""
  infoPage = infoPage +
    "<span style=\"line-height: 100%;margin: 10px;\">" +
    "<div style=\"margin: 10px;\">" +
    "<a style=\"line-height: 130%;background-color: #FFF;color: #F00;\">注：由于跨域原因，番剧页面暂不支持直接下载，请复制链接后使用wget等工具下载，详情见：</p><a href=\"https:\\\"></a>" +
    "<p>当前页面cid: " + cid + "</p>" +
    "<p>视频允许最高画质: " + videoDownloadJson.accept_description[0] + "</p>"
  /*for(i=0;i<videoDownloadJson.data.accept_description.length;i++){
    infoPage+=videoDownloadJson.data.accept_description[i]+"<br>"
  }*/



  for (i = 0; i < videoDownloadJson.durl.length; i++) {
    //onsole.log(i + "  " + videoDownloadJson.durl.length + "  " + videoDownloadJson.durl[i])
    infoPage +=
      "<p><a href=" + videoDownloadJson.durl[i].url + ">画质:"
      + videoDownloadJson.format +
      "</a></p>"
  }
  infoPage = infoPage + "</div></span>"

  infoPage = (await PageHeader())
    .replaceAll("<!--DOWNLOADPAGE-->", infoPage)



  //console.log(infoPage)
  return new Response(infoPage, { headers: htmlHeaders })
}


async function PageHeader() {
  page = await fetch("https://raw.githubusercontent.com/feilongproject/bili-downloader/master/index.html")
  return await page.text()
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
  event.respondWith(Main(event.request))
})
