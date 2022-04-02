<template>
  <div class="header">
    <div class="about">
      <a class="help" onclick="HowToUse()">使用方法</a>
      <a class="help" onclick="AboutMe()">关于</a>
      <a class="help" onclick="Todo()">TODO</a>
      <a class="help" onclick="KownBug()">已知问题</a>
    </div>
    <hr noshade="noshade" style="height: 10px" />

    <div class="input">
      <input
        class="goto-input"
        type="text"
        placeholder="输入AV/BV/EP/SS/MD号或视频链接"
        v-model="videoId"
        @input="exe($event)"
      />
      <a class="goto-btn" @click="turn">跳转</a>
    </div>
  </div>
</template>


<script >
import Vue from "vue";
export default Vue.extend({
  data: function () {
    return { videoId: "" };
  },
  methods: {
    exe(e) {
      var videoId = e.currentTarget.value;
      var pattern = /(av)\d{1,}|(bv)\w*|(ss)\d{1,}|(ep)\d{1,}|(md)\d{1,}/i;
      var id = pattern.exec(videoId)?.[0];
      if (id) console.log(id);
    },
    turn() {
      var videoId = this.videoId;
      var pattern = /(av)\d{1,}|(bv)\w*|(ss)\d{1,}|(ep)\d{1,}|(md)\d{1,}/i;
      var id = pattern.exec(videoId)?.[0];
      if (id) console.log(id);
      document.location.href = "/info/?id=" + this.videoId;
    },
  },
});
</script>
