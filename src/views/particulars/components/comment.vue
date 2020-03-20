<template>
  <van-popup
    class="bbox"
    closeable
    close-icon-position="top-left"
    v-model="show"
    position="bottom"
    :style="{ height: '50%' }"
  >
    <div class="title">{{it.reply_count}}条回复</div>
    <div class="List">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index">
          <template slot="title">
            <div class="c_top">
              <img class="c_img" :src="item.aut_photo" alt />
              <div class="username">{{item.aut_name}}</div>
              <div class="icon">
                <van-icon v-if="item.is_liking" color="red" @click="qxdz(item)" name="like" />
                <van-icon v-else @click="dz(item)" color="red" name="like-o" />

                <span>{{item.like_count}}</span>
              </div>
            </div>

            <div class="comment_conten">
              <span>{{item.content}}</span>
            </div>

            <div class="time">
              <span>{{item.pubdate|filterData}}</span>
            </div>
          </template>
        </van-cell>
      </van-list>
    </div>
    <!-- 发送评论 -->
    <van-tabbar>
      <van-cell-group>
        <van-field style="width:300px" @keydown.enter="fpl" v-model="value" placeholder="写评论" />
      </van-cell-group>
      <van-tabbar-item @click="fpl" icon="comment-o" :info="it.reply_count"></van-tabbar-item>
    </van-tabbar>
  </van-popup>
</template>

<script>
import bus from "@/utils/bus";
import { commentsList, plLikings, qxLikings } from "@/api/plList";

import { sendPl } from "@/api/plList";

export default {
  name: "comment",
  data() {
    return {
      value: "",
      show: false,
      it: {},
      list: [],
      finished: false,
      loading: false,
      naxtId: undefined
    };
  },
  created() {
    bus.$on("goitem", data => {
      this.list = [];
      this.loading = false;
      this.finished = false;
      this.naxtId = undefined;

      this.it = data;
      this.show = true;
      //   window.console.log(data);
    });
  },
  methods: {
    // 发送评论
    async fpl() {
      if (this.commen() && this.value.trim() != "") {
        let res = await sendPl({
          art_id: this.$route.params.key,
          target: this.it.com_id.toString(),
          content: this.value
        });
        // window.console.log(res);

        this.list.unshift(res.data.new_obj);
        this.$toast.success("回复成功");
        this.value = "";
        this.it.reply_count++;
      }
    },

    // 点赞
    async dz(item) {
      if (this.commen()) {
        let res = await plLikings({ target: item.com_id });
        // window.console.log(res);
        item.is_liking = true;
        item.like_count++;
      }
    },

    // 取消点赞
    async qxdz(item) {
      let res = await qxLikings(item.com_id);
      // window.console.log(res);
      item.is_liking = false;
      item.like_count--;
    },

    // 页面进来执行
    async onLoad() {
      window.console.log("66663");

      let res = await commentsList({
        type: "c",
        source: this.it.com_id.toString(),
        offset: this.naxtId
      });
      //   window.console.log(res);
      this.list.push(...res.data.results);

      if (res.data.end_id == res.data.last_id) {
        this.finished = true;
      }
      this.loading = false;
      this.naxtId = res.data.last_id;
    }
  }
};
</script>

<style lang="less" scoped>
.bbox {
  /deep/.van-popup__close-icon--top-left {
    top: 50%;
    margin-top: 10px;
    left: 16px;
    z-index: 99;
    color: #000;
    position: fixed;
  }
  .title {
    font-size: 20px;
    text-align: center;
    padding-top: 10px;
    position: fixed;
    width: 100%;
    z-index: 99;
    background-color: #fff;
  }
  .List {
    margin-top: 41px;
    margin-bottom: 51px;
    .van-cell__title {
      flex-direction: column;
    }
    .c_top {
      width: 100%;
      display: flex;
      align-items: center;
      .c_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .username {
        flex: 1;
        margin-left: 10px;
        color: skyblue;
        font-size: 16px;
      }
      .icon {
        font-size: 20px;
        span {
          margin-left: 5px;
        }
      }
    }
    .comment_conten {
      margin-left: 60px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .time {
      margin: 10px 0 10px 60px;
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        &.t_span {
          width: 77px;
          height: 31px;
          border-radius: 16px;
          background-color: #eff7f8;
          margin-left: 10px;
          line-height: 31px;
          text-align: center;
        }
      }
    }
  }
}
</style>