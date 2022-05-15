<template>
  <el-main class="main">
    <el-descriptions
      :title="title"
      :column="2"
      border
      style="width: fit-content"
      :labelStyle="{ background: '#0df', color: '#000' }"
      :contentStyle="{ background: '#0df', color: '#000' }"
    >
      <el-descriptions-item label="封面" span="2">
        <a :href="pic" target="_blank">链接</a>
      </el-descriptions-item>
      <el-descriptions-item label="简介" span="2" style="white-sapce: pre-wrap">
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
            v-for="(item, index) in bangumiList"
            :key="index"
            :value="item.badge"
          >
            <el-button
              @click="downloadVideo(item.aid, item.cid)"
              type="primary"
            >
              {{ item.title }}:{{ item.long_title }}
            </el-button>
          </el-badge>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-main>
</template>


<script lang="ts">
import Vue from "vue";
import { CustomConfig } from "../config";

export default Vue.extend({
  data: function () {
    return {
      title: "Loading...",
      desc: "Loading...",
      pic: "Loading...",
      bangumiList: Array(),
      downloadType: false,
    };
  },
  mounted: async function () {
    var bangumiId = this.$route.query.id;
    console.log(bangumiId);

    var idType = bangumiId.toString().toLowerCase().slice(0, 2);
    //console.log(idType);
    var reqUrlBase = `${CustomConfig().ApiProxyUrl}/pgc/view/web/season?`;
    var reqUrl: string | undefined;
    switch (idType) {
      case "ss":
        reqUrl = `${reqUrlBase}season_id=${bangumiId.toString().substr(2)}`;
      case "ep":
        if (!reqUrl)
          reqUrl = `${reqUrlBase}ep_id=${bangumiId.toString().substr(2)}`;

        var res = await fetch(reqUrl)
          .then((res) => {
            return res.text();
          })
          .then((text) => {
            var data: BangumiInfo = JSON.parse(text);
            if (data.code != 0) throw Error(text);
            return data;
          });

        console.log(res.result.episodes);
        this.title = res.result.title;
        this.desc = res.result.evaluate.replaceAll("\n", "<br>");
        this.pic = res.result.cover;
        this.bangumiList = res.result.episodes;

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
        location.href = `/download/bangumi?aid=${aid}&cid=${cid}&dash=0`;
      } else {
        location.href = `/download/bangumi?aid=${aid}&cid=${cid}&dash=1`;
      }
    },
  },
});
</script>

