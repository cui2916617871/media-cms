<template>
  <el-row>
    <h3>填写主题信息</h3>
    <el-form ref="form" :model="pageData" label-width="80px">
      <el-form-item label="组织名称">
        <el-input v-model="pageData.companyName"></el-input>
        <span>请填写组织机构代码中的组织名称，注册成功后组织名称不可修改</span>
      </el-form-item>
      <el-form-item label="组织机构代码证">
        <el-input v-model="pageData.companyNo"></el-input>
        <span>请注意区分字母大小写，同一组织机构代码最多可注册3个企鹅号</span>
      </el-form-item>
      <!-- <el-form-item label="组织机构代码证扫描件">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :http-request="uploadSectionFile" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
    </el-form>
    <h3>填写运营者信息</h3>
    <el-form ref="form" :model="pageData" label-width="80px">
      <el-form-item label="身份证姓名">
        <el-input v-model="pageData.idcardName"></el-input>
        <span>注册成功后身份不可修改，名字中如果包含分隔号“.”，请完整输入</span>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="pageData.idcardNo"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-input v-model="pageData.linkPhone"></el-input>
      </el-form-item>
      <el-form-item label="联系人邮箱">
        <el-input v-model="pageData.linkMail"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="submitNextStep" type="primary">提交</el-button>

  </el-row>
</template>

<script>
import Bus from "../../components/Bus.vue";
export default {
    data() {
        return {
            imageUrl: "",
            pageData: {
                companyName: "",
                companyNo: "",
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
        uploadSectionFile: function(param) {
            //自定义文件上传
            console.log(param.file);
            this.handleAvatarSuccess();
            // var fileObj = param.file;
            // // 接收上传文件的后台地址
            // var FileController = "/file/item/upload";
            // // FormData 对象
            // var form = new FormData();
            // // 文件对象
            // form.append("file", fileObj);
            // // 其他参数
            // form.append("xxx", xxx);
            // // XMLHttpRequest 对象
            // var xhr = new XMLHttpRequest();
            // xhr.open("post", FileController, true);
            // xhr.upload.addEventListener("progress", vm.progressFunction, false); //监听上传进度
            // xhr.onload = function () {
            //     vm.Form.playUrl = xhr.response; //接收上传到阿里云的文件地址
            //     vm.$message({
            //         message: '恭喜你，上传成功!',
            //         type: 'success'
            //     });
            // };
            // xhr.send(form);
        },
        submitNextStep() {
            Bus.$emit("inceptMessage_3", this.pageData);
            console.log(this.pageData);
        }
    }
};
</script>
<style>
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

