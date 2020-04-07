<template>
  <div class="xiaozhi">
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div class="center" ref="center">
      <div class="warp" :class="{my:item.isok}" v-for="(item, index) in list" :key="index">
        <img
          class="w_img"
          :src="item.isok? $route.query.avatar :'https://pic.bsbxjn.com/2020/02/45c48cce2e2d7fb-13-240x320.jpg'"
          alt
        />
        <div>{{item.conten}}</div>
      </div>
    </div>
    <van-search
      v-model="msg"
      shape="round"
      show-action
      @keydown.enter.prevent="send"
      left-icon
      background="#ccc"
      placeholder="请输入..."
      :clearable="false"
    >
      <template #action>
        <div @click="send">发送</div>
      </template>
    </van-search>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: null,
      msg: "",
      list: [{ isok: false, conten: "你好,我是小智" }]
    };
  },
  created() {
    this.socket = io(
      "http://ttapi.research.itcast.cn?token=" + this.$store.state.myToken
    );
    this.socket.on("message", data => {
      this.list.push({
        isok: false,
        conten: data.msg
      });
      this.$nextTick(() => {
        this.$refs.center.scrollTop = this.$refs.center.scrollHeight;
      });
    });
  },
  methods: {
    send() {
      if (!this.commen() && this.msg.trim() == "") return;
      // window.console.log(this.msg);
      this.socket.emit("message", {
        msg: this.msg,
        timestamp: Date.now()
      });

      this.list.push({
        isok: true,
        conten: this.msg
      });

      this.$nextTick(() => {
        this.$refs.center.scrollTop = this.$refs.center.scrollHeight;
      });
      this.msg = "";
    }
  }
};
</script>

<style lang="less" scoped>
.xiaozhi {
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;
    i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
      color: #fff;
    }
    .van-nav-bar__title.van-ellipsis {
      color: #fff;
    }
  }
  .center {
    position: fixed;
    width: 100%;
    bottom: 55px;
    top: 46px;
    overflow: auto;
    .warp {
      margin-top: 20px;
      display: flex;
      &.my {
        flex-direction: row-reverse;
        div {
          margin-right: 10px;
          background-color: skyblue;
          border-radius: 8px;
        }
      }
      .w_img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      div {
        max-width: 48%;
        margin-left: 10px;
        padding: 10px 10px;
        background-color: #e0effb;
        word-wrap: break-word;
        white-space: normal;
        border-radius: 8px;
      }
    }
  }
  .van-search {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>