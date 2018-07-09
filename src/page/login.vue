<template>
	  	<transition name="form-fade">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="500px" class="loginForm">
				<el-form-item prop="phone" label="手机号">
					<el-input type="tel" placeholder="请输入手机号" v-model.number="loginForm.phone" ></el-input>
				</el-form-item>
				<el-form-item prop="vcode" label="验证码">
					<el-input type="tel" placeholder="验证码" v-model="loginForm.vcode"></el-input>
                    <el-button class="validateCode" @click="sendMsg" type="primary" :disabled="isDisabled">{{buttonName}}</el-button>
                </el-form-item>
				<el-form-item>
				    <el-button type="primary"  @click="submitForm('loginForm')" >登陆</el-button>
				</el-form-item>
			</el-form>
	  	</transition>
</template>

<script>
export default {
  data() {
      var   validateMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else if (!/^1[3-9]{1}[0-9]{9}$/.test(value)) {
                    return callback(new Error('手机号格式不正确'));
                } else {
                    callback();
                }
            };
    return {
        disabled: true,
        buttonName: "发送短信",
        isDisabled: false,
        time: 30,
        loginForm: {
            phone: "",
            vcode: ""
        },
        rules: {
            phone: [
                {validator: validateMobile, trigger: 'blur' },
            ],
            validateCode: [
                {required: true,message: '验证码不能为空',trigger: 'blur'}
            ]
        },
        showLogin: true,
    };
  },
  methods: {
      sendMsg() {
    this.$refs.loginForm.validateField('phone',valid=>{
        if (valid!=='') {
            this.rules.phone;
        }else {
        let me = this;
        me.isDisabled = true;
        let interval = window.setInterval(function () {
    console.log(me.time)
            me.buttonName = me.time + '秒后重新发送';
            --me.time;
            if (me.time < 0) {
                me.buttonName = "重新发送";
                me.time = 10;
                me.isDisabled = false;
                window.clearInterval(interval);
            }
        }, 1000);
    }
});
 
},
submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

}   
};
</script>

<style scoped>
.loginForm {
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 550px;
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
</style>
