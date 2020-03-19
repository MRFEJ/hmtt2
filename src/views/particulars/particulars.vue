<template>
  <div class="compoment">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()">
      <van-icon name="weapp-nav" slot="right" />
    </van-nav-bar>
    <div class="b_top">
      <div class="b_title">
        <span>{{articleObj.title}}</span>
      </div>

      <van-sticky>
        <van-cell class="b_cell">
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <div>
              <img class="b_img" :src="articleObj.aut_photo" alt />
            </div>
            <div class="username">
              <span>{{articleObj.aut_name}}</span>
              <span>{{articleObj.pubdate|filterData}}</span>
            </div>
            <div>
              <van-button @click="qxgz" v-if="articleObj.is_followed" type="info">已关注</van-button>
              <van-button @click="gz" type="info" v-else>
                <van-icon name="plus" />关注
              </van-button>
            </div>
          </template>
        </van-cell>
      </van-sticky>

      <div class="b_content" v-html="articleObj.content"></div>

      <div class="like">
        <div>
          <span @click="qxdz" class="red" v-if="articleObj.attitude==1">
            <van-icon name="like" />点赞
          </span>
          <span @click="dz" v-else>
            <van-icon name="like" />点赞
          </span>
        </div>
        <div>
          <span @click="xh" class="red" v-if="articleObj.attitude==0">
            <van-icon name="delete" />不喜欢
          </span>
          <span @click="bxh" v-else>
            <van-icon name="delete" />不喜欢
          </span>
        </div>
      </div>

      <van-cell>
        <div class="you_like">猜你喜欢</div>
      </van-cell>

      <!-- 评论列表 -->
      <plList></plList>

      <!-- 评论框 -->
      <write :is_collected="articleObj.is_collected"></write>
    </div>
  </div>
</template>

<script>
import plList from "./components/plList";
import write from "./components/write";

import {
  article,
  articleLikings,
  axLikings,
  articleXh,
  articleBxh
} from "@/api/article";

import { followingUser, qxgzUser } from "@/api/user";
export default {
  components: {
    plList,
    write
  },
  data() {
    return {
      articleObj: {}
    };
  },
  async created() {
    // window.console.log(this.$route.params.key);

    let res = await article(this.$route.params.key);
    this.articleObj = res.data;
    // window.console.log(res);
  },
  methods: {
    // 点击关注
    async gz() {
      if (this.commen()) {
        let res = await followingUser({ target: this.articleObj.aut_id });
        // window.console.log(res);
        this.articleObj.is_followed = true;
        this.$toast.success("关注成功");
      }
    },
    // 取消关注
    async qxgz() {
      let res = await qxgzUser(this.articleObj.aut_id);
      this.articleObj.is_followed = false;
      this.$toast.success("已取消关注");
    },

    // 对文章点赞
    async dz() {
      if (this.commen()) {
        let res = await articleLikings({ target: this.articleObj.art_id });
        this.articleObj.attitude = 1;
        // window.console.log(res);
      }
    },

    // 取消对文章点赞
    async qxdz() {
      let res = await axLikings(this.articleObj.art_id);
      this.articleObj.attitude = -1;
      // window.console.log(res);
    },

    // 取消不喜欢
    async xh() {
      let res = await articleXh(this.articleObj.art_id);
      this.articleObj.attitude = -1;
      // window.console.log(res);
    },

    // 不喜欢
    async bxh() {
      if (this.commen()) {
        let res = await articleBxh({ target: this.articleObj.art_id });
        this.articleObj.attitude = 0;
        // window.console.log(res);
      }
    }
  }
};
</script>

<style lang="less">
.compoment {
  min-height: 100%;
  background-color: #fff;
  // 导航栏
  .van-nav-bar.van-hairline--bottom {
    background-color: #3194ff;
    i.van-icon.van-icon-arrow-left {
      color: #fff;
    }
    .van-nav-bar__title.van-ellipsis {
      color: #fff;
    }
    i.van-icon.van-icon-weapp-nav {
      color: #fff;
    }
  }
  .b_top {
    height: 100%;
    background-color: #fff;
    .b_title {
      padding: 20px 10px;
      font-size: 30px;
      display: flex;
      justify-content: center;
    }
    .van-cell__title {
      display: flex;
      .b_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .username {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        flex: 1;
      }
      button.van-button.van-button--info.van-button--normal {
        font-size: 16px;
      }
    }
    .b_content {
      margin: 30px 16px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .like {
      display: flex;
      justify-content: space-around;
      span {
        width: 80px;
        height: 40px;
        border-radius: 20px;
        border: 1px solid #666;
        display: flex;
        justify-content: center;
        align-items: center;
        &.red {
          border: 1px solid red;
          color: red;
        }
      }
    }
    .you_like {
      font-weight: normal;
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 50px;
    }
    .van-hairline--top-bottom.van-tabbar.van-tabbar--fixed {
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;
      .van-cell.van-field {
        width: 195px;
        height: 34px;
        border: 1px solid #ccc;
        border-radius: 17px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        input.van-field__control {
          font-size: 17px;
        }
      }
      i.van-icon {
        font-size: 26px;
      }
    }
  }
}
</style>