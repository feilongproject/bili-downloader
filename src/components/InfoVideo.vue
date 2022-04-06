<template>
  <div class="video-info" style="display: flex">
    <span style="line-height: 100%; margin: 10px 10px">
      <table border="1">
        <tr>
          <th>视频信息</th>
          <th>值</th>
        </tr>
        <tr>
          <td>AV号</td>
          <td>{{ aid }}</td>
        </tr>
        <tr>
          <td>BV号</td>
          <td>{{ bvid }}</td>
        </tr>
        <tr>
          <td>标题</td>
          <td>{{ title }}</td>
        </tr>
        <tr>
          <td>简介</td>
          <td>{{ desc }}</td>
        </tr>
        <tr>
          <td>分P</td>
          <td>{{ part }}P</td>
        </tr>
        <tr>
          <td>封面</td>
          <td><a :href="pic">链接</a></td>
        </tr>
      </table>
      <hr />
      <table border="1">
        <tr>
          <th></th>
          <th>分P标题</th>
          <th>下载方式</th>
          <th>CID</th>
        </tr>
        <tr v-for="(item, index) in videoList" :key="index">
          <th>{{ item.page }}</th>
          <th>{{ item.part }}</th>
          <td class="download">
            <a
              class="download-flv"
              target="_blank"
              :href="`/download/video?type=0&cid=${item.cid}&aid=${aid}&dash=0`"
              >flv</a
            >
            <a
              class="download-dash"
              target="_blank"
              :href="`/download/video?type=0&cid=${item.cid}&aid=${aid}&dash=1`"
              >dash</a
            >
          </td>
          <th>{{ item.cid }}</th>
        </tr>
      </table>
    </span>
  </div>
</template>


<script lang="ts">
import { jsonp } from "vue-jsonp";
import Vue from "vue";
import { VideoInfo } from "../type";

export default Vue.extend({
  data: function () {
    return {
      aid: "Loading...",
      bvid: "Loading...",
      title: "Loading...",
      desc: "Loading...",
      part: "Loading...",
      pic: "Loading...",
      videoList: [{}],
    };
  },
  mounted: async function () {
    var videoId = this.$route.query.id;
    console.log(videoId);

    var idType = videoId.toString().toLowerCase().slice(0, 2);
    console.log(idType);
    var reqUrlBase = `https://api.bilibili.com/x/web-interface/view?`;
    var reqUrl: string | undefined;
    switch (idType) {
      case "av":
        reqUrl = `${reqUrlBase}aid=${videoId.toString().substr(2)}`;
      case "bv":
        if (!reqUrl) reqUrl = `${reqUrlBase}bvid=${videoId.toString()}`;

        var res: VideoInfo = await jsonp(reqUrl, {
          jsonp: "jsonp",
          callback: "videoInfo",
        });
        //console.log(res);
        if (res.code != 0) {
          console.log("get failed");
          return;
        }
        this.aid = res.data.aid.toString();
        this.bvid = res.data.bvid;
        this.title = res.data.title;
        this.desc = res.data.desc;
        this.part = res.data.pages.length.toString();
        this.pic = res.data.pic;
        this.videoList = res.data.pages;

        break;
      default:
        break;
    }
  },
  methods: {},
});
</script>

