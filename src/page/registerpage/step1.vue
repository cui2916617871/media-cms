<template>
  <el-row>
    <h3 class="register-title" style="margin:20px auto">选择账户主体</h3>

    <el-radio-group v-model="pageData.radioType">
      <el-radio-button :label="0">个人</el-radio-button>
      <el-radio-button :label="1">企业</el-radio-button>
      <el-radio-button :label="2">媒体</el-radio-button>
    </el-radio-group>
    <div class="but-group">
      <el-button @click="submitNextStep" type="primary">下一步</el-button>
    </div>
  </el-row>
</template>

<script>
import Bus from "../../components/Bus.vue";
export default {
  data() {
    return {
      pageData: {
        radioType: ""
      }
    };
  },
  methods: {
    submitNextStep() {
      console.log("tijiao ");
      console.log(this.pageData.radioType);
      console.log(this.pageData.radioType== "");
      if (this.pageData.radioType != 0 &&this.pageData.radioType == "") {
        this.$message.error("请选择账户类型");
      } else {
        this.$router.push({ path: "/register/step2" });
        Bus.$emit("inceptMessage_1", this.pageData);
      }
    }
  }
};
</script>
<style scoped>
.register-title {
  margin: 0 auto;
  font-size: 26px;
}
.but-group {
  margin: 50px auto;
}
</style>
