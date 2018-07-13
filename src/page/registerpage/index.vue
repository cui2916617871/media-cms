<template>
    <div class="activePublic ">
      <el-steps :active="step" class="step" align-center>
        <el-step title="选择主体类型" description=""></el-step>
        <el-step title="注册账号" description=""></el-step>
        <el-step title="填写企鹅号信息" description=""></el-step>
        <el-step title="填写运营者信息" description=""></el-step>
      </el-steps>

      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>

      <div class="but-group">
        <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
      </div>
    </div>
</template>

  <script>
    export default {
    data: function () {
      return {
        isRouter: false,
        preview: true,
        preStep: false,
        nextStep: true,
        publish: false,
        step: 0
      }
    },
    methods: {
      handleNextStep: function () {
          this.$router.push('/activePublic/step'+(this.step+1));
          var _this = this;
          setTimeout(function () {
              if(_this.isRouter){
                  _this.step++;
                  _this.goStep(_this.step);
              }
          })
        // $('html,body').animate({scrollTop:0},500);
      },
      goStep: function (n) {
        switch (n) {
          case 1 :
            this.preview = true;this.preStep = false;this.nextStep = true;this.publish = false;
            break;
          case 2 :
            this.preview = false;this.preStep = true;this.nextStep = true;this.publish = false;
            break;
          case 3 :
            this.preview = false;this.preStep = true;this.nextStep = true;this.publish = false;
            break;
          case 4 :
            this.preview = false;this.preStep = true;this.nextStep = false;this.publish = true;
            break;
        }
      }
    },
    watch:{
        '$route': function (to,from) {
            this.isRouter = true;
        }
    }
  }

</script>
<style>
 .activePublic .router-link{color:#fff;}
 .activePublic .but-group .el-button{margin-right: 20px;}
</style>
