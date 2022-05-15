<template>
  <el-main class="main">
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

    <el-badge
      v-for="(item, index) in support_formats"
      :key="index"
      :value="item.quality"
      class="supportFormats"
      type="primary"
    >
      <el-button type="primary" size="small" :disabled="buttonDis">
        {{ item.new_description }}
      </el-button>
    </el-badge>

    <div>
      <h1>视频流信息</h1>
      <el-table
        v-if="dash == 1"
        :data="playUrlDash.video"
        style="width: 100%"
        :cell-style="theme"
        :header-cell-style="theme"
        border
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="stringQN" label="支持画质"> </el-table-column>
        <el-table-column prop="bandWidth" label="视频带宽"> </el-table-column>
        <!-- <el-table-column prop="mimeType" label="视频格式"> </el-table-column> -->
        <el-table-column prop="codecs" label="编码类型"> </el-table-column>
        <el-table-column label="视频长宽">
          <template slot-scope="scope">
            {{ scope.row.width }} x {{ scope.row.height }}
          </template>
        </el-table-column>
        <el-table-column prop="frameRate" label="视频帧率"> </el-table-column>
        <!-- <el-table-column prop="sar" label="单个像素宽高比"> </el-table-column> -->
        <el-table-column prop="url" label="link">
          <template slot-scope="scope">
            <div v-for="(url, iv) in scope.row.url" :key="iv">
              <el-link type="primary" icon="el-icon-download" :href="url">
                link{{ iv }}
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <h1>音频流信息</h1>
      <el-table
        v-if="dash == 1"
        :data="playUrlDash.audio"
        style="width: 100%"
        :cell-style="theme"
        :header-cell-style="theme"
        border
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="stringQN" label="支持音质"> </el-table-column>
        <el-table-column prop="bandWidth" label="音质码率"> </el-table-column>
        <!-- <el-table-column prop="mimeType" label="视频格式"> </el-table-column> -->
        <el-table-column prop="codecs" label="编码类型"> </el-table-column>
        <el-table-column prop="url" label="link">
          <template slot-scope="scope">
            <div v-for="(url, iv) in scope.row.url" :key="iv">
              <el-link type="primary" icon="el-icon-download" :href="url">
                link{{ iv }}
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-main>
</template>

<script lang="ts">
import Vue from "vue";
import { GetQN } from "../mod/GetQN";
import { converSize } from "../mod/converSize";
import { DownloadVideo } from "../mod/video";

export default Vue.extend({
  data: () => {
    return {
      videoCid: "Loading",
      videoAid: "Loading",
      dashDes: "Loading",
      videoQn: "Loading",
      dash: -1,
      buttonDis: false,
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
    this.buttonDis = dash;
    var videoQn = parseInt(this.$route.query.qn?.toString());
    if (!videoQn) videoQn = 80;

    console.log(`cid:${videoCid},aid:${videoAid}`);

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
        e.backup_url?.forEach((f) => {
          tmp.push(f);
        });
        this.playUrlFlv.push({ order: e.order, url: tmp });
      });
    }
    if (videoPlayInfo.data.dash) {
      videoPlayInfo.data.dash.video.forEach((e) => {
        var _urls = new Array();
        _urls.push(e.baseUrl);
        e.backupUrl?.forEach((f) => {
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
        e.backupUrl?.forEach((f) => {
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

  methods: {
    theme() {
      return "background:#0df;color:#000";
    },
  },
});
</script>
