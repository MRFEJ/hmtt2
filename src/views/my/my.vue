<template>
  <div class="my">
    <div class="top" v-if="$store.state.myToken">
      <div class="avatar">
        <img class="ava_img" :src="data.photo" alt />
        <span>{{data.name}}</span>
      </div>

      <div class="dontai">
        <div>
          <span>0</span>
          <span>动态</span>
        </div>
        <div>
          <span>4</span>
          <span>关注</span>
        </div>
        <div>
          <span>0</span>
          <span>粉丝</span>
        </div>
      </div>

      <div class="today">
        <div>今日阅读</div>
        <div>0分钟</div>
      </div>
    </div>

    <div class="top" v-else>
      <img
        @click="commen()"
        class="phone_img"
        src="http://toutiao.research.itcast.cn/img/wd_weidl.png"
        alt
      />
    </div>

    <div class="center">
      <div>
        <span>
          <van-icon color="#ff4545" name="star-o" />
        </span>
        <span>收藏</span>
      </div>
      <div>
        <span>
          <van-icon color="#ff9e1f" name="clock-o" />
        </span>
        <span>历史</span>
      </div>
      <div>
        <span>
          <van-icon color="#6a93ff" name="records" />
        </span>
        <span>作品</span>
      </div>
    </div>

    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { userProfile } from "@/api/user";
export default {
  data() {
    return {
      data: {}
    };
  },
  async created() {
    let res = await userProfile();
    window.console.log(res);
    this.data=res.data
  }
};
</script>

<style lang="less" scoped>
.my {
  .top {
    height: 200px;
    background-color: #3e9df8;
    color: #fff;
    box-sizing: border-box;
    position: relative;
    text-align: center;
    .phone_img {
      width: 66px;
      height: 66px;
      border-radius: 50%;
      text-align: center;
      margin-top: 40px;
    }
    .avatar {
      padding: 40px 50px 0;
      display: flex;
      .ava_img {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    .dontai {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      div {
        width: 123px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
    }
    .today {
      width: 78px;
      height: 44px;
      color: #fff;
      background-color: #2b6ead;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      border-top-left-radius: 22px;
      border-bottom-left-radius: 22px;
      position: absolute;
      right: 0;
      top: 30%;
    }
  }
  .center {
    height: 110px;
    background-color: #fff;
    padding: 20px 10px;
    display: flex;
    box-sizing: border-box;
    margin-bottom: 10px;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 118px;
      height: 70px;
      font-size: 18px;
      i.van-icon.van-icon {
        font-size: 40px;
      }
    }
    div:not(:last-child) {
      border-right: 1px solid #ccc;
    }
  }
  .van-cell-group.van-hairline--top-bottom {
    span {
      font-size: 16px;
    }
  }
}
</style>