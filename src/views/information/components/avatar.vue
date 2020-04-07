<template>
  <van-popup :close-on-click-overlay="false" v-model="show">
    <div @click="xuanz">从相册选择</div>
    <input class="file" @change="change" style="display:none" ref="file" type="file" />
    <div>拍照</div>
    <div @click="qx">取消</div>
  </van-popup>
</template>

<script>
import { ImagePreview } from "vant";
import { userPhoto } from "@/api/user";
export default {
  data() {
    return {
      show: false,
      photo: ""
    };
  },
  methods: {
    //   点击相册
    xuanz() {
      this.$refs.file.click();
    },
    // 更换file的值的时候触发
    change() {
      this.photo = this.$refs.file.files[0];
      let url = URL.createObjectURL(this.photo);
      ImagePreview({
        images: [url],
        showIndex: false,
        onClose: () => {
          this.$dialog
            .confirm({
              title: "提示",
              message: "是否更改头像"
            })
            .then(async () => {
              let res = await userPhoto({
                photo: this.photo
              });
              //   window.console.log(res);
              this.$emit("goPhoto", res.data.photo);
              this.show = false;
              this.$toast.success("更改成功!");
            })
            .catch(() => {});
        }
      });
    },
    // 点击取消
    qx() {
      this.show = false;
      window.console.log(this.$root);
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup.van-popup--center {
  width: 80%;
  div {
    border-top: 0.5px solid #ccc;
    text-align: center;
    padding: 10px 0;
  }
}
</style>