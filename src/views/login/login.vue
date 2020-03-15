<template>
  <div class="box">
    <van-nav-bar title="登录" />
    <van-field
      v-model="form.mobile"
      :error-message="vali.mobile"
      placeholder="请输入手机号"
      clearable
      type="tel"
    >
      <template slot="left-icon">
        <i class="iconfont icon-iphone"></i>
      </template>
    </van-field>

    <van-field
      v-model="form.code"
      :error-message="vali.code"
      placeholder="请输入验证码"
      clearable
      type="tel"
    >
      <template slot="left-icon">
        <i class="iconfont icon-lock"></i>
      </template>
      <van-button slot="button" round size="small" type="primary">发送验证码</van-button>
    </van-field>
    <van-button type="info" @click="gologin">登录</van-button>
  </div>
</template>

<script>
import { setToken } from "@/utils/token.js";
import { login } from "@/api/login.js";
export default {
  data() {
    return {
      isok: false,
      form: {
        mobile: "18807789766",
        code: "246810"
      },
      vali: {
        mobile: "",
        code: ""
      }
    };
  },
  methods: {
    async gologin() {
      if (this.ok()) {
        this.isok = true;
        this.$toast.loading({
          message: "登录中...",
          forbidClick: this.isok,
          loadingType: "spinner"
        });
        try {
          let res = await login(this.form);
          // window.console.log(res);
          this.$store.commit("changeMytoken", res.data.token);
          this.$store.commit("changeRestoken", res.data.refresh_token);
          setToken("myToken", JSON.stringify(res.data));
          // setToken("resToken", JSON.stringify(res.data.refresh_token));
          this.$router.push("/home");
          this.$toast.success("登录成功");
        } catch (error) {
          this.$toast.fail("手机号或验证码错误");
        } finally {
          this.isok = false;
        }
      }
    },
    ok() {
      let isok = true;
      if (/0?(13|14|15|18)[0-9]{9}/.test(this.form.mobile)) {
        this.vali.mobile = "";
      } else {
        this.vali.mobile = "手机号格式错误!!";
        isok = false;
      }
      if (this.form.code.length == 6) {
        this.vali.mobile = "";
      } else {
        isok = false;
        this.vali.code = "验证码格式错误!!";
      }
      return isok;
    }
  }
};
</script>

<style scoped lang="less">
.box {
  background-color: #f5f7f9;
}
.van-nav-bar.van-hairline--bottom {
  background-color: #3e9df8;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
}
.van-button--primary {
  color: #666666;
  background-color: #ededed;
  border: 1px solid #ededed;
}
button.van-button.van-button--info.van-button--normal {
  width: 90%;
  display: block;
  margin: 30px auto;
}
</style>