<template>
  <div class="compoment">
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()">
      <van-icon name="weapp-nav" slot="right" />
    </van-nav-bar>
    <div class="b_top">
      <div class="b_title">
        <span>搜索结果</span>
      </div>

      <van-sticky>
        <van-cell class="b_cell">
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <div>
              <img class="b_img" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" alt />
            </div>
            <div class="username">
              <span>用户名</span>
              <span>时间</span>
            </div>
            <van-button type="info">
              <van-icon name="plus" />关注
            </van-button>
          </template>
        </van-cell>
      </van-sticky>

      <div class="b_content">内容</div>

      <div class="like">
        <span>
          <van-icon name="like" />点赞
        </span>
        <span>
          <van-icon name="delete" />不喜欢
        </span>
      </div>

      <van-cell>
        <div class="you_like">猜你喜欢</div>
      </van-cell>

      <div class="commoenList">
        <van-cell>
          <template slot="title">
            <div class="c_top">
              <img
                class="c_img"
                src="https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g2/M00/0B/04/ChMlWl5dvFqIYqBvABUCFxrUNg0AANiXgENDKAAFQIv961.jpg"
                alt
              />
              <div class="username">一支穿云箭</div>
              <div class="icon">
                <van-icon name="like" />
                <span>0</span>
              </div>
            </div>

            <div class="comment_conten">
              <span>6666</span>
            </div>

            <div class="time">
              <span>时间</span>
              <span class="t_span">回复0</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div class="c_top">
              <img
                class="c_img"
                src="https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g2/M00/0B/04/ChMlWl5dvFqIYqBvABUCFxrUNg0AANiXgENDKAAFQIv961.jpg"
                alt
              />
              <div class="username">一支穿云箭</div>
              <div class="icon">
                <van-icon name="like" />
                <span>0</span>
              </div>
            </div>

            <div class="comment_conten">
              <span>6666</span>
            </div>

            <div class="time">
              <span>时间</span>
              <span class="t_span">回复0</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div class="c_top">
              <img
                class="c_img"
                src="https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g2/M00/0B/04/ChMlWl5dvFqIYqBvABUCFxrUNg0AANiXgENDKAAFQIv961.jpg"
                alt
              />
              <div class="username">一支穿云箭</div>
              <div class="icon">
                <van-icon name="like" />
                <span>0</span>
              </div>
            </div>

            <div class="comment_conten">
              <span>6666</span>
            </div>

            <div class="time">
              <span>时间</span>
              <span class="t_span">回复0</span>
            </div>
          </template>
        </van-cell>
      </div>

      <van-tabbar>
        <van-cell-group>
          <van-field v-model="value" placeholder="写评论" />
        </van-cell-group>
        <van-tabbar-item icon="comment-o" info="5"></van-tabbar-item>
        <van-tabbar-item icon="star-o"></van-tabbar-item>
        <van-tabbar-item icon="share"></van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:''
    }
  },
};
</script>

<style lang="less">
.compoment {
  height: 100%;

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
      padding: 20px 0px;
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
      }
    }
    .you_like {
      font-weight: normal;
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 50px;
    }
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