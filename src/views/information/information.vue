<template>
  <div class="information">
    <van-nav-bar
      title="个人信息"
      @click-right="onClickRight"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell-group class="group_one">
      <van-cell @click="$refs.avatar.show=true" title="头像" is-link>
        <template>
          <img class="one_img" :src="user.photo" alt />
        </template>
      </van-cell>
      <van-cell @click="name_popup=true" title="昵称" :value="user.name" is-link />
      <van-cell @click="js_popup=true" title="介绍" :value="user.intro" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell @click="grender_popup=true" title="性别" :value="user.gender? '女':'男'" is-link />
      <van-cell @click="date_popup=true" title="生日" :value="user.birthday" is-link />
    </van-cell-group>

    <!-- 上传头像的弹出层 -->
    <avatar @goPhoto="phone" ref="avatar" />

    <!-- 昵称 -->
    <van-popup v-model="name_popup" position="bottom">
      <van-field v-model="user.name" placeholder="请输入昵称" />
    </van-popup>

    <!-- 介绍 -->
    <van-popup v-model="js_popup" position="bottom">
      <van-field v-model="user.intro" placeholder="请输入介绍" />
    </van-popup>

    <!-- 性别 -->
    <van-popup class="grender_popup" v-model="grender_popup" position="bottom">
      <div @click="gender_xb(0)" class="gender_xb">男</div>
      <div @click="gender_xb(1)" class="gender_xb">女</div>
      <div @click="gender_xb" class="gender_xb">取消</div>
    </van-popup>

    <!-- 日期 -->
    <van-popup v-model="date_popup" position="bottom">
      <van-datetime-picker
        @confirm="sure_date"
        @cancel="qx_date"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { userProfile, user, userEdit } from "@/api/user";
import avatar from "./components/avatar";
import dayjs from "dayjs";
export default {
  components: {
    avatar
  },
  data() {
    return {
      name_popup: false,
      js_popup: false,
      grender_popup: false,
      date_popup: false,
      minDate: new Date("1900-1-1"),
      maxDate: new Date(),
      currentDate: new Date(),
      user: {}
    };
  },
  async created() {
    let res = await user();
    // window.console.log(res);
    this.user = res.data;

    let res2 = await userProfile();
    // window.console.log(res2);
    this.$set(this.user, "gender", res2.data.gender);
    this.$set(this.user, "birthday", res2.data.birthday);
  },
  methods: {
    //   点击保存
    async onClickRight() {
      window.console.log(this.user.birthday);

      let res = await userEdit({
        name: this.user.name,
        intro: this.user.intro,
        gender: this.user.gender,
        birthday: this.user.birthday
      });
      this.$toast.success("保存成功");
    },
    //   点击完成日期按钮
    sure_date() {
      this.user.birthday = dayjs(this.currentDate).format("YYYY-MM-DD");
      this.date_popup = false;
    },

    //   点击取消选择日期
    qx_date() {
      this.date_popup = false;
    },
    //   性别点击
    gender_xb(num) {
      this.user.gender = num;
      this.grender_popup = false;
    },

    //   接收子组件传过来的值赋值给头像的src
    phone(val) {
      this.user.photo = val;
    }
  }
};
</script>

<style lang="less" scoped>
.information {
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;
    .van-nav-bar__title.van-ellipsis {
      color: #fff;
    }
    i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
      color: #fff;
    }
    span.van-nav-bar__text {
      color: #fff;
    }
    .van-nav-bar__text:active {
      background-color: transparent;
    }
  }
  .group_one.van-cell-group.van-hairline--top-bottom {
    margin-bottom: 10px;
    img.one_img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }
  }
  .van-cell.van-cell--clickable {
    span {
      font-size: 16px;
    }
  }
  .grender_popup {
    background-color: #f5f7f9;
    .gender_xb {
      text-align: center;
      padding: 10px 0;
      background-color: #fff;
      &:last-child {
        margin-top: 20px;
      }
      &:nth-child(1) {
        border-bottom: 0.5px solid #ccc;
      }
    }
  }
}
</style>