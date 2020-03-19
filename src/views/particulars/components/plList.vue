<template>
  <div class="commoenList">
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
            <span class="t_span">回复{{item.reply_count}}</span>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { commentsList, plLikings, qxLikings } from "@/api/plList";
import bus from "@/utils/bus";

export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      // 保存下一页的id
      naxtId: undefined
    };
  },
  created() {
    // 用bus接收添加的评论
    bus.$on("send", data => {
      this.list.unshift(data);
    });
  },
  watch: {
    list(val) {
      // 发送list的长度
      bus.$emit("num", val.length);
    }
  },
  methods: {
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

    // 首次进入页面会执行一次
    async onLoad() {
      let res = await commentsList({
        type: "a",
        source: this.$route.params.key,
        offset: this.naxtId
      });
      // window.console.log(res);
      this.list = res.data.results;

      if (res.data.end_id == res.data.last_id) {
        this.finished = true;
      }
      this.loading = false;
      this.naxtId = res.data.last_id;
    }
  }
};
</script>

<style lang="less">
.commoenList {
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
</style>