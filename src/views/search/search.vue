<template>
  <div class="search">
    <div class="h_t">
      <van-search
        class="input"
        @input="chage"
        v-model="value"
        background="#3194ff"
        placeholder="请输入搜索关键词"
      />
      <span @click="$router.back()">取消</span>
    </div>

    <!-- 历史记录 -->
    <div class="history" v-if="isok">
      <div class="del">
        <span>历史记录</span>
        <van-icon class="icon" name="delete" />
      </div>
      <van-row>
        <van-col span="12">span: 8</van-col>
        <van-col span="12">span: 8</van-col>
        <van-col span="12">span: 8</van-col>
      </van-row>
    </div>

    <div class="think" v-else>
      <van-cell v-for="(item, index) in think" :key="index" :title="item" icon="search" />
    </div>
  </div>
</template>

<script>
import { searchSuggestion } from "@/api/search.js";
export default {
  data() {
    return {
      // 搜索框的值
      value: "",
      isok: true,
      //   联想的结果
      think: []
    };
  },
  methods: {
    //   搜索框联想
    async chage() {
        if(this.value==''){
            this.think=[]
            this.isok=true;
            return;
        }
      let res = await searchSuggestion({
        q: this.value
      });
      //   window.console.log(res);
      this.think = res.data.options;
      this.isok=false
    },
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
      align-content: center;
      justify-content: center;
      border-top: 0.5px solid #ccc;
      &:nth-of-type(odd) {
        border-right: 0.5px solid #ccc;
      }
    }
  }
}
</style>