<template>
  <van-popup
    @closed="out"
    class="popup"
    closeable
    close-icon-position="top-left"
    v-model="show"
    position="left"
    :style="{ width:'85%', height: '100%' }"
  >
    <div class="pd">
      <div class="p_top">
        <span>我的频道</span>
        <van-button round color="#f97979" size="mini" plain @click="isok=!isok">{{isok? '完成':'编辑'}}</van-button>
      </div>
      <div class="P_b">
        <template v-for="(item, index) in list">
          <van-tag type="primary" size="large" v-if="index!=0" :key="index">
            {{item.name}}
            <van-icon @click="remove(item)" v-if="isok" class="ic" name="close" />
          </van-tag>
        </template>
      </div>
    </div>
    <div class="pd">
      <div class="p_top">
        <span>频道推荐</span>
      </div>
      <div class="P_b">
        <van-tag
          type="primary"
          size="large"
          v-for="(item, index) in othter"
          :key="index"
          @click="add(item)"
        >+{{item.name}}</van-tag>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { userAllChannel, userEditChannel, userDelChannel } from "@/api/home.js";
import { setToken } from "@/utils/token";
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      show: false,
      allList: [],
      isok: false
    };
  },
  computed: {
    othter() {
      let ids = this.list.map(item => {
        return item.id;
      });
      return this.allList.filter(item => {
        return !ids.includes(item.id);
      });
    }
  },
  async created() {
    // 获取全部频道
    let res = await userAllChannel();
    // window.console.log(res);
    this.allList = res.data.channels;

    setToken("channelsList", JSON.stringify(this.list));
  },
  methods: {
    // 点击添加频道
    add(item) {
      this.$set(item, "list", []);
      // 是否加载完成
      this.$set(item, "finished", false);
      // 列表的值 默认是fasle
      this.$set(item, "loading", false);

      this.$set(item, "isLoading", false);
      item.pre_date = Date.now();

      this.list.push(item);

      let channels = this.list.slice(1).map((item, index) => {
        return {
          id: item.id,
          seq: index + 1
        };
      });
      if (this.$store.state.myToken) {
        userEditChannel({ channels });
      } else {
        setToken("channelsList", JSON.stringify(this.list));
      }
    },
    // 删除频道
    remove(item) {
      for (var i = 0; i < this.list.length; i++) {
        if (item.id == this.list[i].id) {
          this.list.splice(i, 1);
        }
      }
      if (this.$store.state.myToken) {
        userDelChannel({
          channels: [(item = item.id)]
        });
      } else {
        setToken("channelsList", JSON.stringify(this.list));
      }

      // let channels = this.list.slice(1).map((item, index) => {
      //   return {
      //     id: item.id,
      //     seq: index + 1
      //   };
      // });
      // // window.console.log(channels);
      // if (channels.length != 0) {
      //   userEditChannel({ channels });
      // }
    },
    //   退出弹出层
    out() {
      this.isok = false;
    }
  }
};
</script>

<style lang="less" scoped>
.popup {
  padding-left: 10px;
  padding-right: 10px;

  ::before {
    font-size: 30px;
    cursor: pointer;
    color: #000;
  }
  .pd {
    .p_top {
      display: flex;
      justify-content: space-between;
      margin-top: 60px;
      span {
        font-weight: 400;
      }
    }
    .P_b {
      margin-top: 25px;
      span.van-tag.van-tag--primary {
        margin-right: 10px;
        margin-top: 10px;
        position: relative;
        ::before {
          font-size: 18px;
          color: pink;
          position: absolute;
          top: -22px;
          right: -15px;
        }
      }
    }
  }
}
</style>