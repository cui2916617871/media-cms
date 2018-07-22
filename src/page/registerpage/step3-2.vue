<template>
  <el-row class="dataForm">
    <h3 class="register-title">填写主题信息</h3>
    <el-form ref="pageData" :model="pageData" :rules="rules" label-width="80px">
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="pageData.companyName"></el-input>
        <span>请填写企业名称，注册成功后企业名称不可修改</span>
      </el-form-item>
      <el-form-item label="营业执照注册号/统一社会信用代码" prop="companyNo">
        <el-input v-model="pageData.companyNo"></el-input>
        <span>请输入15位营业执照注册号或18位统一社会信用代码，主体号码与营业执照上必须一致，其他号码不予认证。请注意区分字母大小写，一个营业执照注册号最多可注册3个企鹅号</span>
      </el-form-item>
      <el-form-item label="企业营业执照扫描件">
        <el-upload class="avatar-uploader" action="http://47.100.199.241:8185/wemedia/api/upload/img" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <h3 class="register-title">填写运营信息</h3>
    <el-form ref="pageData" :model="pageData" :rules="rules" label-width="80px">
      <el-form-item label="身份证姓名" prop="idcardName">
        <el-input v-model="pageData.idcardName"></el-input>
        <span>注册成功后身份不可修改，名字中如果包含分隔号“.”，请完整输入</span>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idcardNo">
        <el-input v-model="pageData.idcardNo"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话" prop="linkPhone">
        <el-input v-model="pageData.linkPhone"></el-input>
      </el-form-item>
      <el-form-item label="联系人邮箱" prop="linkMail">
        <el-input v-model="pageData.linkMail"></el-input>
      </el-form-item>
    </el-form>
    <div class="but-group">
      <el-button @click="submitNextStep('pageData')" type="primary">提交</el-button>
    </div>
  </el-row>
</template>

<script>
import Bus from "../../components/Bus.vue";
export default {
    data() {
        return {
            imgData: {
                type: 3
            },
            imageUrl: "",
            rules: {
                companyName: [
                    {
                        required: true,
                        message: "请输入身份证姓名",
                        trigger: "blur"
                    }
                ],
                companyNo: [
                    {
                        required: true,
                        message: "请输入身份证姓名",
                        trigger: "blur"
                    }
                ],
                idcardName: [
                    {
                        required: true,
                        message: "请输入身份证姓名",
                        trigger: "blur"
                    }
                ],
                idcardNo: [
                    {
                        required: true,
                        message: "请选择身份证号码",
                        trigger: "blur"
                    }
                ],
                linkPhone: [
                    {
                        required: true,
                        message: "请选择联系人电话",
                        trigger: "blur"
                    }
                ],
                linkMail: [
                    {
                        required: true,
                        message: "请输入邮箱地址",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ]
            },
            pageData: {
                companyName: "",
                companyNo: "",
                companyPhoto: "",
                idcardName: "",
                idcardNo: "",
                linkPhone: "",
                linkMail: ""
            }
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(file);
            this.imageUrl = URL.createObjectURL(file.raw);
            let data = file.response;
            if (data.success == true) {
                this.pageData.companyPhoto = data.data.relativePath;
                console.log(this.pageData.companyPhoto);
            }
        },
        beforeAvatarUpload(file) {
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
            console.log(this.pageData);
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
<style>
.dataForm {
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 1000px;
    padding: 35px 35px 15px;
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

