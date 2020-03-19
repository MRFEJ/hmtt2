<template>
  <van-tabbar>
    <van-cell-group>
      <van-field @keydown.enter="fpl" v-model="value" placeholder="写评论" />
    </van-cell-group>
    <van-tabbar-item icon="comment-o" :info="num"></van-tabbar-item>
    <div>
      <van-tabbar-item @click="qxsc" v-if="isok" color="pink" icon="star"></van-tabbar-item>
      <van-tabbar-item @click="sc" v-else color="pink" icon="star-o"></van-tabbar-item>
    </div>

    <van-tabbar-item icon="share"></van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { sendPl } from "@/api/plList";
import { scArticle, qxscArticle } from "@/api/article";
import bus from "@/utils/bus";
export default {
  props: {
    is_collected: {}
  },
  data() {
    return {
      value: "",
      isok: this.is_collected,
      num: null
    };
  },
  created() {
    bus.$on("num", data => {
      this.num = data;
    });
  },
  methods: {
    // 发送评论
    async fpl() {
      if (this.commen() && this.value.trim() != "") {
        let res = await sendPl({
          target: this.$route.params.key,
          content: this.value
        });
        // window.console.log(res);
        bus.$emit("send", res.data.new_obj);
        this.$toast.success("评论成功");
        this.value = "";
      }
    },
    // 点击收藏
    async sc() {
      if (this.commen()) {
        let res = await scArticle({
          target: this.$route.params.key
        });
        this.isok = true;
        this.$toast.success("收藏成功");
      }
    },
    // 点击取消收藏
    async qxsc() {
      let res = await qxscArticle(this.$route.params.key);
      this.isok = false;
      this.$toast.fail("已取消收藏");
    }
  }
};
</script>

<style>
</style>