<template>
  <transition name="form-fade">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="200px" class="loginForm">
          <h3 class="title">自媒体后台系统登录</h3>
      <el-form-item prop="phone" label="手机号">
        <el-input type="tel" placeholder="请输入手机号" v-model="loginForm.phone"></el-input>
      </el-form-item>
      <el-form-item prop="vcode" label="验证码" :inline="true">
        <el-col :span="12">
          <el-input type="tel" placeholder="验证码" v-model="loginForm.vcode"></el-input>
        </el-col>
        <el-button class="validateCode" @click="sendMsg" type="primary" :disabled="isDisabled">{{buttonName}}</el-button>
      </el-form-item>
      <el-form-item style="margin-top:40px">
        <el-button style="width:100%" type="primary" @click="submitForm('loginForm')" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </transition>
</template>

<script>
export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!/^1[3-9]{1}[0-9]{9}$/.test(value)) {
        return callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };
    return {
      buttonName: "发送短信",
      logining: false,
      isDisabled: false,
      time: 30,
      loginForm: {
        phone: "",
        vcode: ""
      },
      rules: {
        phone: [
          {
            validator: validateMobile,
            required: true,
            trigger: "blur"
          }
        ],
        vcode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
      },
      showLogin: true
    };
  },
  directives: {
    focus: {
      inserted: function(el, binding) {
        el.focus();
      }
    }
  },
  methods: {
    sendMsg() {
      let me = this;
      console.log(me.loginForm.phone);
      this.$refs.loginForm.validateField("phone", valid => {
        if (valid !== "") {
          this.rules.phone;
        } else {
          this.$http.get("wemedia/user/sms?mobile=" + me.loginForm.phone).then(
            res => {
              let data = res.body;
              console.log(res);
              if (data.success == true) {
                //18017831586
                me.isDisabled = true;
                let interval = window.setInterval(function() {
                  me.buttonName = me.time + "秒后重新发送";
                  --me.time;
                  if (me.time < 0) {
                    me.buttonName = "重新发送";
                    me.time = 10;
                    me.isDisabled = false;
                    window.clearInterval(interval);
                  }
                }, 1000);
              } else {
                me.$message.error(data.msg);
              }
            },
            err => {
              me.$message.error("网络开小差了，请稍后再试~~");
            }
          );
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log("valid");
        console.log(valid);
        if (valid) {
          this.logining = true;

          this.$http
            .post("/wemedia/api/user/login", {
              mobile: this.loginForm.phone,
              checkCode: this.loginForm.vcode
            })
            .then(
              res => {
                this.logining = false;

                let data = res.body;
                console.log(res);
                if (data.success == true) {
                  this.$message({
                    message: "登录成功",
                    type: "success"
                  });
                  let datainfo = data.data;
                  if (datainfo.status == -1) {
                    //未注册
                    this.$router.push({
                      path: "/register"
                    });
                  } else {
                    this.$router.push({ path: "/index" });
                  }
                } else {
                  this.$message.error(data.msg);
                }
              },
              err => {}
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.loginForm {
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 500px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
