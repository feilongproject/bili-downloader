<template>
  <div class="video-info" style="display: flex">
    <span style="line-height: 100%; margin: 10px 10px">
      <table border="1">
        <tr>
          <th>番剧信息</th>
          <th>值</th>
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
          <th>短标题</th>
          <th>长标题</th>
          <th>CID</th>
          <th>付费信息</th>
          <th>下载方式</th>
        </tr>
        <tr v-for="(item, index) in bangumiList" :key="index">
          <th>{{ item.title }}</th>
          <th>{{ item.long_title }}</th>
          <th>{{ item.cid }}</th>
          <th>{{ item.badge }}</th>
          <td class="download">
            <a
              class="download-flv"
              target="_blank"
              :href="`/download/bangumi?type=0&cid=${item.cid}&aid=${item.aid}&dash=0`"
              >flv</a
            >
            <a
              class="download-dash"
              target="_blank"
              :href="`/download/bangumi?type=0&cid=${item.cid}&aid=${item.aid}&dash=1`"
              >dash</a
            >
          </td>
        </tr>
      </table>
    </span>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { CustomConfig } from "../config";
import { BangumiInfo } from "../type";

export default Vue.extend({
  data: function () {
    return {
      title: "Loading...",
      desc: "Loading...",
      part: "Loading...",
      pic: "Loading...",
      bangumiList: [{}],
    };
  },
  mounted: async function () {
    var bangumiId = this.$route.query.id;
    console.log(bangumiId);

    var idType = bangumiId.toString().toLowerCase().slice(0, 2);
    console.log(idType);
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

        this.title = res.result.title;
        this.desc = res.result.evaluate;
        this.part = res.result.episodes.length.toString();
        this.pic = res.result.cover;
        this.bangumiList = res.result.episodes;

        break;
      default:
        break;
    }
  },
  methods: {},
});
</script>

