<template>
  <van-popup v-model="show">
    <van-cell-group v-if="isok">
      <van-cell icon="failure" @click="no_interest" title="不感兴趣" />
      <van-cell icon="info-o" title="反馈垃圾内容" is-link @click="isok=!isok" />
      <van-cell icon="delete" @click="black" title="拉黑作者" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isok=!isok" />
      <van-cell
        @click="report(item.type)"
        v-for="(item, index) in report_list"
        :key="index"
        :title="item.title"
      />
    </van-cell-group>
  </van-popup>
</template>

<script>
import { userDislikes, userReports, userBlacklists } from "@/api/home.js";
export default {
  data() {
    return {
      isok: true,
      // 是否显示more
      show: false,
      // 频道的新闻列表
      list: [],
      // 该文章的用户id
      blacklist_id: "",
      // 该文章的id
      articles_id: "",
      // 举报列表
      report_list: [
        { type: 1, title: "标题夸张" },
        { type: 2, title: "低俗色情" },
        { type: 3, title: "错别字多" },
        { type: 4, title: "旧闻重复" },
        { type: 5, title: "广告软文" },
        { type: 6, title: "内容不实" },
        { type: 7, title: "涉嫌违法犯罪" },
        { type: 8, title: "侵权" },
        { type: 0, title: "其他问题" }
      ]
    };
  },
  methods: {
    // 点击不喜欢
    async no_interest() {
      window.console.log(this.articles);

      for (var i = 0; i < this.list.length; i++) {
        if (this.articles_id == this.list[i].art_id) {
          this.list.splice(i, 1);
          break;
        }
      }
      await userDislikes({
        target: this.articles_id
      });
      this.show = false;
      this.$toast.success("不喜欢成功!");
    },
    // 点击举报
    async report(type) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.articles_id == this.list[i].art_id) {
          this.list.splice(i, 1);
          break;
        }
      }
      await userReports({
        target: this.articles_id,
        type: type
      });
      this.show = false;
      this.isok = true;
      this.$toast.success("举报成功!");
    },
    // 拉黑
    async black() {
      for (var i = 0; i < this.list.length; i++) {
        if (this.articles_id == this.list[i].art_id) {
          this.list.splice(i, 1);
          break;
        }
      }
      let res = await userBlacklists({
        target: this.blacklist_id
      });
      this.show = false;
      this.$toast.success("拉黑成功!");
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup.van-popup--center {
  width: 80%;
  border-radius: 8px;
}
</style>