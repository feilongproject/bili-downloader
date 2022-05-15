<template>
  <el-main class="main">
    <el-descriptions
      :title="title"
      :column="3"
      border
      style="width: fit-content"
      :labelStyle="{ background: '#0df', color: '#000' }"
      :contentStyle="{ background: '#0df', color: '#000' }"
    >
      <el-descriptions-item
        label="AV号"
        label-class-name="my-label"
        content-class-name="my-content"
      >
        {{ aid }}
      </el-descriptions-item>
      <el-descriptions-item label="BV号">{{ bvid }}</el-descriptions-item>
      <el-descriptions-item label="视频总长度">{{
        timeLength
      }}</el-descriptions-item>
      <el-descriptions-item label="封面" span="3">
        <a :href="pic" target="_blank">链接</a>
      </el-descriptions-item>
      <el-descriptions-item label="简介" span="3" style="white-sapce: pre-wrap">
        <span v-html="desc"></span>
      </el-descriptions-item>

      <el-descriptions-item label="分P标题">
        <el-switch
          v-model="downloadType"
          active-color="#000"
          inactive-color="#000"
          active-text="flv格式"
          inactive-text="dash格式"
          @change="typeChange"
        >
        </el-switch>
        <hr />
        <div style="display: flex; flex-wrap: wrap">
          <el-badge
            v-for="(item, index) in videoList"
            :key="index"
            type="primary"
            :value="`${item.duration}s`"
          >
            <el-button
              @click="downloadVideo(aid, item.cid)"
              type="primary"
              size="small"
            >
              {{ item.part }}</el-button
            >
          </el-badge>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <hr />
  </el-main>
</template>

<style>
.el-button + .el-button {
  margin-left: unset;
}
.el-button.el-button--primary {
  margin: 2px;
}
</style>

<script lang="ts">
import { jsonp } from "vue-jsonp";
import Vue from "vue";
import { converTimeLength } from "../mod/converTimeLength";
export default Vue.extend({
  data: function () {
    return {
      aid: "Loading...",
      bvid: "Loading...",
      title: "Loading...",
      desc: "Loading...",
      pic: "Loading...",
      timeLength: "Loading...",
      videoList: Array(),
      downloadType: false,
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
        //TODO: 转换part时间
        this.aid = res.data.aid.toString();
        this.bvid = res.data.bvid;
        this.timeLength = `${converTimeLength(res.data.duration)}`;
        this.title = res.data.title;
        this.desc = res.data.desc.replaceAll("\n", "<br>");
        this.pic = res.data.pic;
        this.videoList = res.data.pages;

        break;
      default:
        break;
    }
  },
  methods: {
    typeChange(a: boolean) {
      console.log(a);
    },
    downloadVideo(aid: number, cid: number) {
      console.log(aid, cid);
      if (this.downloadType) {
        location.href = `/download/video?aid=${aid}&cid=${cid}&dash=0`;
      } else {
        location.href = `/download/video?aid=${aid}&cid=${cid}&dash=1`;
      }
    },
  },
});
</script>

