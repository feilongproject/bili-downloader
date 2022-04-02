<template>
  <div class="video-info" style="display: flex">
    <span style="line-height: 130%; margin: 10px 10px">
      <p>当前页面信息: <br />cid: {{ videoCid }}<br />aid: {{ videoAid }}</p>
      <p>{{ dashDes }}</p>
      <details>
        <summary>当前使用api</summary>
        <a
          :href="`https://api.bilibili.com/x/player/playurl?avid=${videoAid}&cid=${videoCid}&fnval=16&fnver=0`"
          >dash</a
        >
        <a
          :href="`https://api.bilibili.com/x/player/playurl?avid=${videoAid}&cid=${videoCid}&fnval=0&fnver=0&qn=${videoQn}`"
          >flv</a
        >
      </details>
      <table border="1">
        <tr>
          <th>支持画质</th>
          <th>qn</th>
        </tr>
        <tr v-for="(item, index) in support_formats" :key="index">
          <th>{{ item.new_description }}</th>
          <th>{{ item.quality }}</th>
        </tr>
      </table>
      <table border="1" v-if="dash == 0">
        <tr>
          <th>序号</th>
          <th>urls</th>
        </tr>
        <tr v-for="(part, index) in playUrlFlv" :key="index">
          <th>{{ part.order }}</th>
          <th v-for="(url, iv) in part.url" :key="iv">
            <a :href="url">{{ iv }}</a>
          </th>
        </tr>
      </table>
      <div v-if="dash == 1">
        <h3>视频流信息</h3>
        <table style="font-size: small" border="1">
          <tr>
            <th>支持画质</th>
            <th>视频所需最低带宽</th>
            <th>视频格式类型</th>
            <th>编码类型</th>
            <th>视频宽度</th>
            <th>视频高度</th>
            <th>视频帧率</th>
            <th>单个像素宽高比</th>
            <th>url</th>
            <!--<th>url对应m4s文件中头部的位置</th>-->
            <!--<th>codecid</th>-->
          </tr>
          <tr v-for="(part, index) in playUrlDash.video" :key="index">
            <th>{{ part.stringQN }}</th>
            <th>{{ part.bandWidth }}</th>
            <th>{{ part.mimeType }}</th>
            <th>{{ part.codecs }}</th>
            <th>{{ part.width }}</th>
            <th>{{ part.height }}</th>
            <th>{{ part.frameRate }}</th>
            <th>{{ part.sar }}</th>
            <th v-for="(url, iv) in part.url" :key="iv">
              <a :href="url">{{ iv }}</a>
            </th>
          </tr>
        </table>
        <table style="font-size: small" border="1">
          <tr>
            <th>支持画质</th>
            <th>视频所需最低带宽</th>
            <th>视频格式类型</th>
            <th>编码类型</th>
            <th>url</th>
            <!--<th>url对应m4s文件中头部的位置</th>-->
            <!--<th>codecid</th>-->
          </tr>
          <tr v-for="(part, index) in playUrlDash.audio" :key="index">
            <th>{{ part.stringQN }}</th>
            <th>{{ part.bandWidth }}</th>
            <th>{{ part.mimeType }}</th>
            <th>{{ part.codecs }}</th>
            <th v-for="(url, iv) in part.url" :key="iv">
              <a :href="url">{{ iv }}</a>
            </th>
          </tr>
        </table>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { GetQN } from "../mod/GetQN";
import { DownloadVideo } from "../mod/video";
import { VideoPlayInfo } from "../type";

export default Vue.extend({
  data: function () {
    return {
      videoCid: "Loading",
      videoAid: "Loading",
      dashDes: "Loading",
      videoQn: "Loading",
      dash: -1,
      support_formats: new Array(),
      playUrlFlv: new Array(),
      playUrlDash: { video: new Array(), audio: new Array() },
    };
  },

  mounted: async function () {
    console.log("download flv video");
    var videoCid = parseInt(this.$route.query.cid.toString());
    var videoAid = parseInt(this.$route.query.aid.toString());
    var dash = this.$route.query.dash == "1" ? true : false;
    var videoQn = parseInt(this.$route.query.qn?.toString());
    if (!videoQn) videoQn = 80;

    console.log(`cid:${videoCid}\naid:${videoAid}`);

    var videoPlayInfo: VideoPlayInfo = await DownloadVideo(
      videoCid,
      videoAid,
      dash,
      videoQn
    );

    this.videoCid = videoCid.toString();
    this.videoAid = videoAid.toString();
    this.dashDes = dash
      ? `当前格式会出现音视频分离现象，请谨慎下载`
      : `${videoPlayInfo.data.format}(bilibili已对当前下载格式进行速度限制)`;
    this.dash = dash ? 1 : 0;
    this.videoQn = videoQn.toString();
    this.support_formats = videoPlayInfo.data.support_formats;

    if (videoPlayInfo.data.durl) {
      videoPlayInfo.data.durl.forEach((e, index) => {
        var tmp = new Array();
        tmp.push(e.url);
        e.backup_url.forEach((f) => {
          tmp.push(f);
        });
        this.playUrlFlv.push({ order: e.order, url: tmp });
      });
    }
    if (videoPlayInfo.data.dash) {
      videoPlayInfo.data.dash.video.forEach((e) => {
        var _urls = new Array();
        _urls.push(e.baseUrl);
        e.backupUrl.forEach((f) => {
          _urls.push(f);
        });
        this.playUrlDash.video.push({
          stringQN: GetQN(e.id),
          bandWidth: e.bandwidth,
          mimeType: e.mimeType,
          codecs: e.codecs,
          width: e.width,
          height: e.height,
          frameRate: e.frameRate,
          sar: e.sar,
          url: _urls,
        });
      });

      videoPlayInfo.data.dash.audio.forEach((e) => {
        var _urls = new Array();
        _urls.push(e.baseUrl);
        e.backupUrl.forEach((f) => {
          _urls.push(f);
        });
        this.playUrlDash.audio.push({
          stringQN: GetQN(e.id),
          bandWidth: e.bandwidth,
          mimeType: e.mimeType,
          codecs: e.codecs,
          url: _urls,
        });
      });
    }
  },

  methods: {},
});
</script>

<style>
</style>