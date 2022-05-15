<template>
  <el-header class="header" height="auto">
    <div class="title">
      <h1 style="padding: 20px">bilibili视频下载助手</h1>
    </div>
    <div>
      <el-menu
        :default-active="'/'"
        class="menu"
        mode="horizontal"
        background-color="#00ddff"
        text-color="#000000"
        active-text-color="#0000ff"
      >
        <el-menu-item index="/"> 主页 </el-menu-item>
        <el-menu-item @click="openDialog('howToUse')"> 使用方法 </el-menu-item>
        <el-menu-item @click="openDialog('about')"> 关于 </el-menu-item>
        <el-menu-item @click="openDialog('TODO')"> TODO </el-menu-item>
        <el-menu-item @click="openDialog('knownError')">
          已知问题
        </el-menu-item>

        <el-menu-item index="github">
          <a
            href="https://github.com/feilongproject/bili-downloader/"
            target="_blank"
          >
            GitHub Link
          </a>
        </el-menu-item>

        <el-menu-item class="searchInput">
          <el-input
            placeholder="输入AV/BV/EP/SS/MD号或视频链接"
            v-model="searchInput"
            @input="change"
            size="mini"
            clearable
          >
          </el-input>

          <el-button size="mini" icon="el-icon-search" @click="search">
          </el-button>
        </el-menu-item>

        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogShow"
          width="30%"
          :before-close="handleClose"
        >
          <span v-html="dialogBody"></span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog()">取消</el-button>
            <el-button type="primary" @click="closeDialog()">确定</el-button>
          </span>
        </el-dialog>
      </el-menu>
    </div>
    <hr noshade="noshade" style="height: 10px" />
  </el-header>
</template>

<style lang='scss'>
.searchInput {
  display: flex;
  height: 100% !important;
  margin-top: 5px !important;
  div {
    display: flex;
    input {
      height: 100% !important;
    }
  }
}

.menu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      searchInput: "",
      dialogTitle: "",
      dialogBody: "",
      activeIndex: "1",
      dialogShow: false,
      turnIndex: {
        index: {
          link: "/",
          disabled: false,
        },
      },
      navItem: {
        howToUse: {
          title: "使用方法",
          body: `<p>方法1. 在输入框中输入bv/av/ss/ep/md号进行跳转</p>`,
        },
        about: {
          title: "关于",
          body: `<p>作者 : 飞龙project</p>
            <p>GitHub开源项目仓库: <a href="https://github.com/feilongproject/bili-downloader">github.com/feilongproject/bili-downloader</a></p>`,
        },
        TODO: {
          title: "TODO",
          body: "暂定",
        },
        knownError: {
          title: "已知问题",
          body: `<p>对于以<code>upos-sz-mirrorcosov.bilivideo.com</code>开头的视频流，无法正常下载（因为加入了referer请求头验证）</p>
                <p>可以使用<a href="https://eternallybored.org/misc/wget/">wget</a>或<a href="https://github.com/aria2/aria2/releases">aira2</a>等工具下载（需加入<code>--referer 'https://www.bilibili.com'</code>请求头）</p>
                <p>下载链接：</p>
                <li>wget: 
                    <a href="https://github.com/feilongproject/bili-downloader/releases/download/tools/aria2-1.36.0-win-64bit-build1.zip">x64</a>
                    <a href="https://github.com/feilongproject/bili-downloader/releases/download/tools/aria2-1.36.0-win-32bit-build1.zip">x32</a>
                </li>
                <li>aria2: 
                    <a href="https://github.com/feilongproject/bili-downloader/releases/download/tools/wget-1.21.2-win32.zip">x64</a>
                    <a href="https://github.com/feilongproject/bili-downloader/releases/download/tools/wget-1.21.2-win64.zip">x32</a>
                </li>
                <p>在有必要的情况下可以在链接头部加入<code>https://ghproxy.com/</code>进行加速下载</p>`,
        },
      },
    };
  },
  mounted() {
    console.log("title loaded");
  },
  methods: {
    handleSelect(key: string, keyPath: string[]) {
      console.log(key, keyPath);
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          //console.log("then");
          this.dialogShow = false;
        })
        .catch((_) => {
          //console.log("catch");
        });
    },
    openDialog(title: string) {
      this.dialogTitle = title;

      var t = this.navItem;
      var key: keyof typeof t;

      for (key in this.navItem) {
        //console.log(key, this.navItem[key]);
        if (key == title) {
          this.navItem[key];
          this.dialogTitle = this.navItem[key].title;
          this.dialogBody = this.navItem[key].body;
        }
      }

      this.dialogShow = true;
    },
    closeDialog() {
      this.dialogShow = false;
      this.dialogTitle = "";
      this.dialogBody = "";
    },
    change(value: string | number) {
      value = value.toString();

      //console.log(videoId);

      var patternVideo = /(av)\d{1,}|(bv)\w*/i;
      var idVideo = patternVideo.exec(value)?.[0];
      var patternBangumi = /(ss)\d{1,}|(ep)\d{1,}/i;
      var idBangumi = patternBangumi.exec(value)?.[0];

      if (idVideo) console.log(idVideo);
      if (idBangumi) console.log(idBangumi);
    },
    search() {
      var videoId = this.searchInput;
      var patternVideo = /(av)\d{1,}|(bv)\w*/i;
      var idVideo = patternVideo.exec(videoId)?.[0];
      var patternBangumi = /(ss)\d{1,}|(ep)\d{1,}/i;
      var idBangumi = patternBangumi.exec(videoId)?.[0];
      //var pattern = /(av)\d{1,}|(bv)\w*|(ss)\d{1,}|(ep)\d{1,}|(md)\d{1,}/i;
      //var id = pattern.exec(videoId)?.[0];
      if (idVideo) {
        console.log("/info/video?id=" + idVideo);
        this.$alert(`是否跳转至视频${idVideo}`, "标题", {
          confirmButtonText: "确定",
          callback: (action) => {
            if (action == "confirm") {
              document.location.href = "/info/video?id=" + idVideo;
            } else if (action == "cancel") {
              this.$message({
                type: "info",
                message: `取消跳转`,
              });
            }
          },
        });
      } else if (idBangumi) {
        console.log("/info/bangumi?id=" + idBangumi);
        this.$alert(`是否跳转至番组${idBangumi}`, "标题名称", {
          confirmButtonText: "确定",
          callback: (action) => {
            if (action == "confirm") {
              document.location.href = "/info/bangumi?id=" + idBangumi;
            } else if (action == "cancel") {
              this.$message({
                type: "info",
                message: `取消跳转`,
              });
            }
          },
        });
      } else {
        this.$message(`无法识别的输入，请检查`);
      }
    },
  },
});
</script>
