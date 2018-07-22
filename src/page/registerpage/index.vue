<template>
  <el-row>
    <!-- 步骤条 -->
    <!-- <el-steps :active="step" class="step">
        <el-step title="选择主体类型" description=""></el-step>
        <el-step title="注册账号" description=""></el-step>
        <el-step title="填写企鹅号信息" description=""></el-step>
        <el-step title="填写运营者信息" description=""></el-step>
      </el-steps> -->
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </transition>
  </el-row>
</template>

<script>
  import Bus from "../../components/Bus.vue";
  export default {
    data: function () {
      return {
        page_1: {},
        page_2: {},
        page_3: {}
      };
    },
    methods: {},
    created() {
      Bus.$on("inceptMessage_1", target => {
        console.log("第一页");
        this.page_1 = target;
        console.log(this.page_1);
      });
      Bus.$on("inceptMessage_2", target => {
        console.log("第二页");
        this.page_2 = target;
        console.log(this.page_2);
      });
      Bus.$on("inceptMessage_3", target => {
        console.log("第三页");
        this.page_3 = target;
        console.log(this.page_3);
        let objData = Object.assign(this.page_1, this.page_2, this.page_3);
        //填写完毕合成数据
        this.$http.post("/wemedia/user/fullInfo", objData).then(
          res => {
            let data = res.body;
            console.log(data);
            if (data.success == true) {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$router.push({
                path: "/index"
              });

              //18017831586
            } else {
              this.$message.error(data.msg);
            }
          },
          err => {}
        );
      });
    }
  };

</script>
<style scoped>


</style>
