<template>
  <div class="home">
    <div class="h_t">
      <van-icon class="icon" @click="goPopup" name="wap-nav" />
      <van-search
        @focus="$router.push('/search')"
        class="search"
        v-model="value"
        shape="round"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <van-icon class="icon" name="search" />
    </div>
    <div class="h-b">
      <!-- 内容 -->
      <van-tabs color="#3194ff">
        <!-- 频道 -->
        <van-tab :title="item.name" v-for="(item, index) in channelList" :key="index">
          <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh(item)">
            <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad(item)"
            >
              <!-- 单元格 -->
              <van-cell border v-for="(it, index) in item.list" :key="index">
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                  <div class="title">
                    <span @click="$router.push(`/particulars/${it.art_id}`)">{{it.title}}</span>
                    <van-image v-if="it.cover.type==1" :src="it.cover.images[0]" />
                  </div>
                  <!-- 宫格 -->
                  <van-grid :border="false" :column-num="3" v-if="it.cover.type==3">
                    <van-grid-item v-for="(item, index) in it.cover.images" :key="index">
                      <van-image :src="item" />
                    </van-grid-item>
                  </van-grid>

                  <!-- 时间 -->
                  <div class="write">
                    <div>
                      <span>{{it.aut_name}}</span>
                      <span>{{it.comm_count}}评论</span>
                      <span>{{it.pubdate|filterData}}</span>
                    </div>
                    <van-icon class="icon" @click="goMore(it,item.list)" name="cross" />
                  </div>
                </template>
              </van-cell>
            </van-list>
          </van-pull-refresh>
          <!-- 列表 -->
        </van-tab>
      </van-tabs>
    </div>
    <!-- 弹出框组件 -->
    <popup :list="channelList" ref="popup" />
    <more ref="more" />
  </div>
</template>

<script>
import more from "./components/more";
import { userChannel } from "@/api/user.js";

import { articleList } from "@/api/article.js";

import popup from "./components/popup";
import { getToken, setToken } from "@/utils/token.js";
export default {
  components: {
    popup,
    more
  },
  data() {
    return {
      // 搜索框双向绑定
      value: "",
      // 频道列表
      channelList: []
    };
  },
  async created() {
    // 判断有没有token
    if (this.$store.state.myToken) {
      let res = await userChannel();
      // window.console.log(res);
      this.channelList = res.data.channels;
      for (var i = 0; i < this.channelList.length; i++) {
        let item = this.channelList[i];
        // 新闻列表
        this.$set(item, "list", []);
        // 是否加载完成
        this.$set(item, "finished", false);
        // 列表的值 默认是fasle
        this.$set(item, "loading", false);

        this.$set(item, "isLoading", false);
        item.pre_date = Date.now();
      }
    } else {
      // 判断本地有没有储存频道
      let res = getToken("channelsList");
      if (res) {
        this.channelList = getToken("channelsList");
        window.console.log("222");
        // window.console.log(getToken("channelsList"));

        window.console.log(this.channelList);
      } else {

        let res = await userChannel();
        this.channelList = res.data.channels;
        window.console.log("11111");
        for (var i = 0; i < this.channelList.length; i++) {
          let item = this.channelList[i];
          // 新闻列表
          this.$set(item, "list", []);
          // 是否加载完成
          this.$set(item, "finished", false);
          // 列表的值 默认是fasle
          this.$set(item, "loading", false);

          this.$set(item, "isLoading", false);
          item.pre_date = Date.now();
        }
        setToken("channelsList", JSON.stringify(this.channelList));
      }
    }
  },

  methods: {
    // 点击更多
    goMore(it, item_list) {
      this.$refs.more.show = true;
      this.$refs.more.list = item_list;
      this.$refs.more.articles_id = it.art_id.toString();
      this.$refs.more.blacklist_id = it.aut_id;
    },
    // 点击弹出层
    goPopup() {
      this.$refs.popup.show = true;
    },
    // 只要屏幕铺满 上啦的时候内容是最后一条 并且loading为false才执行的函数
    async onLoad(item) {
      let res = await articleList({
        channel_id: item.id,
        timestamp: item.pre_date,
        with_top: 0
      });
      // window.console.log(res);
      let arr = res.data.results;
      if (arr.length == 0) {
        item.finished = true;
        // window.console.log('11');
      } else {
        // window.console.log('22');

        item.list.push(...arr);
        item.pre_date = res.data.pre_timestamp;
        item.loading = false;
      }
    },

    // 下拉刷新
    async onRefresh(item) {
      (item.finished = false),
        (item.loading = false),
        (item.pre_date = Date.now());

      let res = await articleList({
        channel_id: item.id,
        timestamp: item.pre_date,
        with_top: 0
      });
      item.list = res.data.results;
      item.isLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .h_t {
    display: flex;
    align-items: center;
    background-color: #3194ff;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
    .search {
      flex: 1;
    }
    .icon {
      color: #fff;
      font-size: 20px;
    }
  }
  .h-b {
    // margin-top: 54px;
    margin-bottom: 50px;
    /deep/.van-tabs__wrap.van-hairline--top-bottom {
      position: fixed;
      top: 54px;
      width: 100%;
      z-index: 99;
    }
    /deep/.van-tabs__content {
      padding-top: 94px;
      .van-cell {
        padding-left: 10px;
        padding-right: 10px;
        .title {
          display: flex;
          justify-content: space-between;
          span {
            font-size: 15px;
            font-weight: bold;
            color: #000;
          }
          .van-image {
            width: 116px;
            height: 73px;
          }
        }
        img.van-image__img {
          height: 73px;
        }
        .write {
          display: flex;
          align-items: center;
          justify-content: space-between;
          div {
            margin-top: 16px;
            span {
              margin-right: 8px;
            }
          }
          .icon {
            font-size: 16px;
            width: 23px;
            height: 15px;
            border: 1px solid #edeff3;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>