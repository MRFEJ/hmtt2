<template>
  <div class="search">
    <div class="h_t">
      <van-search
        class="input"
        @input="chage"
        @keydown.enter="searchHistory(value)"
        v-model="value"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <span @click="$router.back()">取消</span>
    </div>

    <!-- 历史记录 -->
    <div class="history" v-if="think.length==0">
      <div class="del">
        <span>历史记录</span>
        <van-icon class="icon" @click="remove" name="delete" />
      </div>
      <van-row>
        <van-col
          @click="$router.push(`/searchResult/${item}`)"
          span="12"
          v-for="(item, index) in history"
          :key="index"
        >
          {{item}}
          <van-icon @click.stop="loca_span(index)" class="my_span" name="cross" />
        </van-col>
      </van-row>
    </div>

    <!-- 联想列表 -->
    <div class="think" v-else>
      <van-cell
        v-for="(item, index) in think"
        :key="index"
        icon="search"
        @click="searchHistory(item.oldItem)"
      >
        <template slot="title">
          <div v-html="item.newItem"></div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { setToken, getToken, removeToken } from "@/utils/token";
import { main } from "@/utils/FD.js";
import { searchSuggestion } from "@/api/search.js";
export default {
  data() {
    return {
      // 搜索框的值
      value: "",
      //   联想的结果
      think: [],
      history: getToken("myHistory") || []
    };
  },
  methods: {
    // 封装路由跳转
    searchHistory(num) {
      // 在数组前面添加元素
      this.history.unshift(num);
      // 去重
      let his = new Set(this.history);
      this.history = [...his];

      // 如果历史记录大于6个   之后的元素都被删除
      if (this.history.length > 6) {
        this.history.splice(6, 1);
      }
      setToken("myHistory", JSON.stringify(this.history));
      this.$router.push(`/searchResult/${num}`);
    },
    //   搜索框联想 用闭包的方法 和函数抖动
    chage() {
      main(async () => {
        if (this.value == "") {
          this.think = [];
          return;
        }
        let res = await searchSuggestion({
          q: this.value
        });
        //   window.console.log(res);
        this.think = res.data.options;

        this.think = this.think.map(item => {
          let nItem = item
            .toLowerCase()
            .replace(
              this.value.toLowerCase(),
              `<span style="color:skyblue">${this.value}</span>`
            );

          return {
            oldItem: item,
            newItem: nItem
          };
        });
      }, 500)();
    },
    // 删除历史记录
    remove() {
      if (this.history.length != 0) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认删除全部历史记录吗?"
          })
          .then(() => {
            this.history = [];
            removeToken("myHistory");
            this.$toast.success("删除成功");
          });
      }
    },

    // 点击删除的那个历史记录
    loca_span(index) {
      this.history.splice(index, 1);
      setToken("myHistory", JSON.stringify(this.history));
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .h_t {
    display: flex;
    align-items: center;
    background-color: #3194ff;
    .input {
      width: 90%;
    }
    span {
      flex: 1;
      color: #fff;
    }
  }
  .history {
    margin-top: 10px;
    background-color: #fff;
    .del {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      .icon {
        font-size: 25px;
      }
    }
    .van-col.van-col--12 {
      width: 187px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 0.5px solid #ccc;
      &:nth-of-type(odd) {
        border-right: 0.5px solid #ccc;
      }
      .my_span {
        margin-left: 10px;
        color: red;
      }
    }
  }
}
</style>