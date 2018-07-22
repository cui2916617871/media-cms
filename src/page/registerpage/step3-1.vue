<template>
  <el-row class="dataForm">
    <h3 class="register-title">填写运营者信息</h3>
    <el-form ref="pageData" :model="pageData" :rules="rules" label-width="100px">
      <el-form-item label="身份证姓名" prop="idcardName">
        <el-col :span=14>
          <el-input v-model="pageData.idcardName"></el-input>
          <span>注册成功后身份不可修改，名字中如果包含分隔号“.”，请完整输入</span>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idcardNo">
        <el-col :span=14>
          <el-input v-model="pageData.idcardNo"></el-input>
          <span>一个身份证最多可注册2个企鹅号</span>
        </el-col>
      </el-form-item>
      <el-form-item label="自拍照" prop="selfPhoto">
        <el-col :span=14>
          <el-upload class="avatar-uploader" action="http://47.100.199.241:8185/wemedia/api/upload/img" :show-file-list="false" name="file"
            :data="imgData" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证正面照" prop="idcardPhoto">
        <el-col :span=14>
          <el-upload class="avatar-uploader" action="http://47.100.199.241:8185/wemedia/api/upload/img" :show-file-list="false" name="file"
            :data="imgData" :on-success="handleIDAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageIDUrl" :src="imageIDUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="联系人电话" prop="linkPhone">
        <el-col :span=14>
          <el-input v-model="pageData.linkPhone"></el-input>
          <span>一个手机号只能成为2个账号的联系电话</span>
        </el-col>
      </el-form-item>
      <el-button @click="submitNextStep('pageData')" type="primary">提交</el-button>
    </el-form>
  </el-row>
</template>

<script>
  import Bus from "../../components/Bus.vue";

  export default {
    data() {
      return {
        rules: {
          idcardName: [{
            required: true,
            message: "请输入身份证姓名",
            trigger: "blur"
          }],
          idcardNo: [{
            required: true,
            message: "请选择身份证号码",
            trigger: "blur"
          }],
          selfPhoto: [{
            required: true,
            message: "清上传自拍照",
            trigger: "change"
          }],
          idcardPhoto: [{
            required: true,
            message: "请上传身份证正面照",
            trigger: "blur"
          }],
          linkPhone: [{
            required: true,
            message: "请填写联系人电话",
            trigger: "blur"
          }]
        },
        imgData: {
          type: 3
        },
        imageUrl: "",
        imageIDUrl: "",

        pageData: {
          idcardName: "",
          idcardNo: "",
          selfPhoto: "",
          idcardPhoto: "",
          linkPhone: ""
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        //图片上传成功
        console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
        let data = file.response;
        if (data.success == true) {
          this.pageData.selfPhoto = data.data.relativePath;
          console.log(this.pageData.selfPhoto);
        }
      },
      handleIDAvatarSuccess(res, file) {
        //身份证上传成功
        console.log(file);
        this.imageIDUrl = URL.createObjectURL(file.raw);
        let data = file.response;
        if (data.success == true) {
          this.pageData.idcardPhoto = data.data.relativePath;
          console.log(this.pageData.idcardPhoto);
        }
      },
      beforeAvatarUpload(file) {
        //图片上传之前钩子
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
      submitNextStep(formName) {
        this.$refs[formName].validate(valid => {
          console.log("valid");
          console.log(valid);
          if (valid) {
            Bus.$emit("inceptMessage_3", this.pageData);
            console.log(this.pageData);
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
  .dataForm {
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 900px;
    padding: 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .register-title {
    margin: 30px auto;
    font-size: 26px;
  }

  .but-group {
    margin: 50px auto;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
