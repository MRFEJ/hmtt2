<template>
  <div class="s_result">
    <!-- 导航栏 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
    <!-- 列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 表格 -->
      <van-cell class="cell" v-for="(item, index) in list" :key="index">
        <!-- 自定义表格 -->
        <template solt="title">
          <!-- 标题 -->
          <div class="cell_title">
            <div class="title">{{item.title}}</div>
            <van-image class="t_img" v-if="item.cover.type==1" :src="item.cover.images[0]" />
          </div>
          <!-- 宫格 -->
          <van-grid v-if="item.cover.type==3" class="grid" :border="false" :column-num="3">
            <van-grid-item v-for="(it, index) in item.cover.images" :key="index">
              <van-image class="g_img" :src="it" />
            </van-grid-item>
          </van-grid>
          <!-- 作者 -->
          <div class="write">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}评论</span>
            <span>{{ item.pubdate |filterData}}</span>
          </div>
          <!-- 评论 -->
          <div class="comments">
            <div class="c_box" @click="pl(item.ch_id)">
              <van-icon name="comment-o" />
              <span>评论</span>
            </div>
            <div class="c_box" @click="dz">
              <van-icon name="like-o" />
              <span>点赞</span>
            </div>
            <div class="c_box">
              <i class="icon iconfont icon-share"></i>
              <span>分享</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api/search.js";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      pageTotal: 10
    };
  },
  methods: {
    // 点赞
    dz() {
      if (this.commen()) {
        window.console.log("点赞");
      }
    },
    // 评论
    pl(id) {
      if (this.commen()) {
        // window.console.log("评论");
        this.$router.push(`/compoment/${id}`);
      }
    },

    // 评论
    async onLoad() {
      let res = await getSearch({
        page: this.page,
        per_page: this.pageTotal,
        q: this.$route.params.key
      });
      // window.console.log(res.data.results);

      // 求出总页数
      let total_page = Math.ceil(res.data.total_count / res.data.per_page);
      // window.console.log(total_page);

      // 如果要查询的页数大于总页数就让显示没有数据加载了
      if (this.page > total_page) {
        this.finished = true;
        // window.console.log("11");
      } else {
        this.page++;
        this.list.push(...res.data.results);
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less">
.s_result {
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;
    .van-nav-bar__title.van-ellipsis {
      color: #fff;
    }
    i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
      color: #fff;
    }
  }
  .cell {
    margin-bottom: 15px;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    .cell_title {
      display: flex;
      justify-content: space-between;
      .title {
        font-weight: bold;
        font-size: 16px;
        padding-left: 12px;
      }
      .t_img.van-image {
        width: 116px;
        height: 73px;
      }
    }
    .grid {
      .g_img {
        height: 73px;
      }
      .van-grid-item__content.van-grid-item__content--center {
        padding: 8px 4px 5px;
      }
    }
    .write {
      padding-left: 12px;
      span {
        margin-right: 10px;
      }
    }
    .comments {
      display: flex;
      .c_box {
        flex: 1;
        display: flex;
        width: 125px;
        height: 45px;
        font-size: 16px;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #ccc;
        border-right: 1px solid #ccc;
        &:last-child {
          border-right: 0;
          .icon {
            font-size: 18px;
          }
        }
        span {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>