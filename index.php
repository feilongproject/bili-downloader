<?php 

/* video type:
    0->no
    1->avideo
    2->bvideo
    3->ssanime
    4->epanime
    5->media
    https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/video/videostream_url.md
    https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/bangumi/info.md
*/

function coutInfo(){

    echo "-------------------<br>
    bilibili视频下载助手<br>
    作者 : 飞龙project<br>
    demo link1 : <a href=\"https://www.bilibili.com/video/BV1Ap4y1b7UC\">https://www.bilibili.com/video/BV1Ap4y1b7UC</a><br>
    demo link2 : <a href=\"/https://www.bilibili.com/video/BV1Ap4y1b7UC\">http://bili.gq/https://www.bilibili.com/video/BV1Ap4y1b7UC</a><br>
    -------------------<br>
    使用方法：<br>
    方法1. 直接在网页将 \" bilibili.com \" 替换为\" bili.gq\"<br>
    方法2. 在\" bili.gq\" 后添加 \"av、bv号\"<br>
    方法3. 在\" bili.gq\" 后添加 \"bilibili链接\"<br>
    方法4. 在下方输入bv av号/av bv链接进行跳转<br>" .

    "<input type=\"text\" id=\"www\" >
    <button onclick=\"tiaozhuan()\">跳转</button><br>
    <script type=\"text/javascript\">
        var tiaozhuan = function(){
            document.location.href ='/' + document.getElementById(\"www\").value;
        }
    </script>
    <br>
    TODO : <br>
    添加番剧下载<br>
    添加剧集下载<br>
    美化界面(没css真难看)<br>
    添加cookie，使能下载更高画质视频<br>
    
    
    
    
    -------------------<br>";


}

function coutVideoInfo($videoIdInfo){
    $str = "-------------------<br>" . 
    "video type: ";

    if( $videoIdInfo["type"] == 0 )
        $str = $str . "no<br>";
    elseif( $videoIdInfo["type"] == 1 )
        $str = $str . "avideo<br>";
    elseif( $videoIdInfo["type"] == 2 )
        $str = $str . "bvideo<br>";
    elseif( $videoIdInfo["type"] == 3 )
        $str = $str . "ssanime<br>";
    elseif( $videoIdInfo["type"] == 4 )
        $str = $str . "epanime<br>";
    elseif( $videoIdInfo["type"] == 5 )
        $str = $str . "media<br>";
    $str = $str . "id: " . $videoIdInfo["id"] . "<br>";
    $str = $str . "-------------------<br>";

    echo $str;

}

function ShowError($errcode){
    echo "-------------------<br>" .
    "发生了一些错误：<br>" .
    $errcode . "<br>" .
    "uri: " . $_SERVER['HTTP_HOST'] . "<br>" .
    "url: " . $_SERVER['REQUEST_URI'] ."<br>" .
    "-------------------<br>";//输出完整的url
}

function GetIdAccUrl($show=1){
    $videoIdInfo["type"] = 0;
    
    if( stristr($_SERVER['REQUEST_URI'],"download.php?") ){//如果是下载链接
        $videoId = stristr($_SERVER['REQUEST_URI'],"bvid=");
        $videoId = stristr($videoId,"&",1);
        $videoId = stristr($videoId,"=");
        $videoId = stristr($videoId,"bv");
    }
    elseif(stristr($_SERVER['REQUEST_URI'],"?"))//如果有尾去尾
        $videoId = stristr($_SERVER['REQUEST_URI'],"?",1);
    else 
        $videoId = $_SERVER['REQUEST_URI'];

    /*if($show)
        echo "video id: " . $videoId . "<br>";*/

    
    
    if( stristr($videoId,"av") ){//检测是否是av类视频
        $videoIdInfo["type"] = 1;
        $videoIdInfo["id"] = stristr($videoId,"av");
    }
    elseif( stristr($videoId,"bv") ){//检测是否是bv类视频
        $videoIdInfo["type"] = 2;
        $videoIdInfo["id"] = stristr($videoId,"bv");
    }
    elseif( stristr($videoId,"ss") ){//检测是否是ss类视频
        $videoIdInfo["type"] = 3;
        $videoIdInfo["id"] = stristr($videoId,"ss");
    }
    elseif( stristr($videoId,"ep") ){//检测是否是ep类视频
        $videoIdInfo["type"] = 4;
        $videoIdInfo["id"] = stristr($videoId,"ep");
    }
    elseif( stristr($videoId,"md") ){//检测是否是md类视频
        $videoIdInfo["type"] = 5;
        $videoIdInfo["id"] = stristr($videoId,"md");
    }
    else{//若都不是则输出错误
        ShowError("1");
        exit();
    }

    return $videoIdInfo;


}

function DownloadVideo($VideoData){

    $url = stristr($_SERVER['REQUEST_URI'],"url=");
    $url = stristr($url,"http");
    //$url = stristr(stristr($_SERVER['REQUEST_URI'],"url="),"http");

    $p = stristr($_SERVER['REQUEST_URI'],"p=");
    $p = stristr($p,"&",1);
    $p = substr($p,2);

    $tittle = $VideoData["data"]["title"];

    
    
    header('Content-Description: File Transfer');
    header('Content-Type: application/vnd.android.package-archive');
    header('Content-Disposition: attachment; filename=哔哩哔哩.p'. $p . ".". $tittle . ".flv");
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    set_time_limit(0);
    ini_set('max_execution_time', '0');
    
    $UserAgent = 'Mozilla/5.0 (Windows NT 6.1; rv:49.0) Gecko/20100101 Firefox/49.0';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
    curl_setopt($ch, CURLOPT_REFERER, "https://api.bilibili.com/");
    curl_setopt($ch, CURLOPT_USERAGENT, $UserAgent);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
    curl_setopt($ch, CURLOPT_TIMEOUT, 0);
    curl_setopt($ch, CURLOPT_BUFFERSIZE, 20971520);
    $flag=0;
    curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch ,$str) use (&$flag){
        $len = strlen($str);
        $flag++;
        echo $str;

        return $len;
    });
    $output = curl_exec($ch);
    /*
    header('Content-Description: File Transfer');
    header('Content-Type: application/vnd.android.package-archive');
    header('Content-Disposition: attachment; filename=' . "hello.flv");
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    set_time_limit(0);
    ini_set('max_execution_time', '0');

    $curl=curl_init();
    curl_setopt($curl, CURLOPT_URL, $LinkStr);//设置抓取的url
    curl_setopt($curl, CURLOPT_REFERER, "https://api.bilibili.com/");
    curl_setopt($curl, CURLOPT_USERAGENT, $UserAgent);
    curl_setopt($curl, CURLOPT_HEADER, 0);//设置头文件的信息作为数据流输出

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 0);
    //curl_setopt($curl, CURLOPT_ENCODING, 'gzip,deflate');  //gzip压缩内容
    curl_setopt($curl, CURLOPT_WRITEFUNCTION, function ($curl, $buffer) {
        echo $buffer;
        return strlen($buffer);
    });
    curl_exec($curl);//执行命令


    //echo curl_getinfo($curl,CURLINFO_HTTP_CODE) . "<br><br>"; //输出请求状态码

    curl_close($curl);//关闭URL请求

    return ;*/

}

function GetCurl($LinkStr){
    $curl=curl_init();
    curl_setopt($curl, CURLOPT_URL, $LinkStr);//设置抓取的url
    curl_setopt($curl, CURLOPT_REFERER, "https://api.bilibili.com/");
    //curl_setopt($curl, CURLOPT_HEADER, 1);//设置头文件的信息作为数据流输出
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//设置获取的信息以文件流的形式返回，而不是直接输出。
    $VideoData = curl_exec($curl);//执行命令
    //echo curl_getinfo($curl,CURLINFO_HTTP_CODE) . "<br>"; //输出请求状态码
    curl_close($curl);//关闭URL请求
    $VideoData = json_decode($VideoData,true);
    return $VideoData;

}

function choices(){
    return 1;
}

function GetInfo($videoIdInfo,$show=1){
    $url1="http://api.bilibili.com/x/web-interface/view";
    $url2="http://api.bilibili.com/pgc/view/web/season";
    $url3="http://api.bilibili.com/pgc/review/user";


    if($videoIdInfo["type"]==1){
        $url=$url1.'?'."aid=".substr($videoIdInfo["id"],2);
    }elseif($videoIdInfo["type"]==2){
        $url=$url1.'?'."bvid=".substr($videoIdInfo["id"],2);
    }elseif($videoIdInfo["type"]==3){
        $url=$url2.'?'."aid=".substr($videoIdInfo["id"],2);
    }elseif($videoIdInfo["type"]==4){
        $url=$url2.'?'."aid=".substr($videoIdInfo["id"],2);
    }elseif($videoIdInfo["type"]==5){
        $url=$url3.'?'."aid=".substr($videoIdInfo["id"],2);
    }

    if($show)
        echo "视频详细api：" . $url."<br>";
    
    //print_r($VideoData);//显示获得的数据

    $VideoData=GetCurl($url);

    if($show)
        for($i=0;$i<$VideoData["data"]["videos"];$i++){
            echo "第" . ($i+1) . "个cid : " . $VideoData["data"]["pages"][$i]["cid"] . "<br>";
        }
    return $VideoData;
}

function GetPlayLink($VideoData,$videoIdInfo){
    $url1="http://api.bilibili.com/x/player/playurl";
    //$url2="http://api.bilibili.com/pgc/view/web/season";
    //$url3="http://api.bilibili.com/pgc/review/user";

    if($videoIdInfo["type"]==1 || $videoIdInfo["type"]== 2 ){
        $url=$url1."?avid=" . $VideoData["data"]["aid"];
        echo "-------------------<br>
        视频标题：" . $VideoData["data"]["title"] . "<br>
        ----------<br>";

        for($i=0;$i<$VideoData["data"]["videos"];$i++){
            $FinUrl = $url . "&cid=" . $VideoData["data"]["pages"][$i]["cid"];
            $VideoLinkData = GetCurl($FinUrl);

            $VideoLinkUrl = $VideoLinkData["data"]["durl"][0]["url"];
            echo "分P标题：" . $VideoData["data"]["pages"][$i]["part"] . "<br>
            下载：<button
                onclick=\"window.open('/download.php" . 
                "?p=". $i .
                "&bvid=" . $VideoData["data"]["bvid"] .
                "&url=" . $VideoLinkUrl . "')\">
                    第". ($i+1) . "P
            </button>
            <a href=\"/download.php?
                p=". $i .
                "&bvid=" . $VideoData["data"]["bvid"] .
                "&url=" . $VideoLinkUrl . "')\">
                    第". ($i+1) . "P
            </a>
        <br>";

        }

    }

    
}


if(choices()){
    if( stristr($_SERVER['REQUEST_URI'],"download.php?") ){//如果是下载链接
        //echo "开始下载<br>";
        //echo stristr($_SERVER['REQUEST_URI'],"http") . "<br>";
        $videoIdInfo = GetIdAccUrl(0);
        //echo $videoIdInfo["type"] . $videoIdInfo["id"];
        DownloadVideo(GetInfo($videoIdInfo,0));
        
    }else{

        coutInfo();

        /*if( stristr($_SERVER['REQUEST_URI'],"?",1) == 0 ||
            stristr($_SERVER['REQUEST_URI'],"?",1) == "/" ){
            echo "是根目录<br>";
        }
        else
            echo "不是根目录<br>";*/
        

        $videoIdInfo = GetIdAccUrl();
        coutVideoInfo($videoIdInfo);
        $VideoData = GetInfo($videoIdInfo);
        GetPlayLink($VideoData,$videoIdInfo);
    }
}else{
    GetInfo($videoIdInfo);
}


?>