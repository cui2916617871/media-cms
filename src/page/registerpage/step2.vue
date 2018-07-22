<template>
  <el-row class="dataForm">
    <h3 class="register-title">填写企鹅号信息</h3>
    <el-form :model="pageData" :rules="rules" ref="pageData" label-width="100px">
      <el-form-item prop="name" label="企鹅号名称">
        <el-col :span=14>
          <el-input v-model="pageData.name" placeholder="请输入企鹅号名称"></el-input>
          <span>长度2-15个汉字，不能含有特殊符号、空格</span>
        </el-col>

      </el-form-item>
      <el-form-item prop="introd" label="企鹅号简介">
        <el-col :span=14>
          <el-input type="textarea" :rows="4" placeholder="请输入企鹅号简介" v-model="pageData.introd"></el-input>
          <span>可填写企鹅号的定位、作者简介、作者身份</span>
        </el-col>

      </el-form-item>
      <el-form-item label="企鹅号头像">
        <el-col :span=14>

          <el-upload class="avatar-uploader" style="text-align:left" action="http://47.100.199.241:8185/wemedia/api/upload/img" :show-file-list="false"
            name="file" :data="imgData" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="所在地" prop="province" style="text-align:left">
        <el-col :span=14>
          <el-cascader size="large" :options="options" v-model="addressType" @change="handleChange">
          </el-cascader>
        </el-col>

      </el-form-item>
      <el-form-item label="领域" prop="domain" style="text-align:left">
        <el-col :span=14>

          <el-select v-model="pageData.domain" placeholder="请选择领域">
            <el-option v-for="item in selectedOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <div class="but-group">
        <el-button @click="submitNextStep('pageData')" type="primary">下一步</el-button>
      </div>
    </el-form>
  </el-row>
</template>

<script>
  import Bus from "../../components/Bus.vue";
  import {
    regionData,
    CodeToText
  } from "element-china-area-data";
  export default {
    data() {
      var validateMobile = (rule, value, callback) => {
        console.log(value);
        if (!value) {
          return callback(new Error("名称不能为空"));
        } else if (value.length < 2 || value.length > 15) {
          return callback(new Error("长度2-15个汉字"));
        } else if (/[^\u4E00-\u9FA5]+$/.test(value)) {
          return callback(new Error("名字只能是汉字"));
        } else {
          this.$http.get("/wemedia/api/user/checkName?name=" + value).then(
            res => {
              let data = res.body;
              console.log(res);
              if (data.success == true) {
                callback();
              } else {
                callback(new Error(data.msg));
              }
            },
            err => {}
          );
        }
      };
      return {
        rules: {
          name: [{
            validator: validateMobile,
            required: true,
            trigger: "blur"
          }],
          introd: [{
              required: true,
              message: "请输入企鹅号简介内容",
              trigger: "blur"
            },
            {
              min: 1,
              max: 100,
              message: "最大字数为100字",
              trigger: "blur"
            }
          ],
          province: [{
            required: true,
            message: "请选择所在地址",
            trigger: "change"
          }],
          icon: [{
            required: true,
            message: "请上传个人头像 ",
            trigger: "change"
          }],
          domain: [{
            type: "number",
            required: true,
            message: "请选择领域",
            trigger: "change"
          }]
        },
        accountType: "",
        options: regionData,
        addressType: [],
        selectedOptions: [{
            value: 0,
            label: "IT"
          },
          {
            value: 1,
            label: "金融"
          },
          {
            value: 2,
            label: "农民工"
          },
          {
            value: 3,
            label: "码农"
          }
        ],
        selectedStatus: "",
        imgData: {
          type: 2
        },
        imageUrl: "",
        pageData: {
          name: "",
          introd: "",
          icon: "",
          province: "",
          city: "",
          area: "",
          domain: ""
        }
      };
    },
    methods: {
      test() {
        console.log(this.pageData.domain);
      },
      handleAvatarSuccess(res, file) {
        //图片上传成功
        console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
        let data = file.response;
        if (data.success == true) {
          this.pageData.icon = data.data.relativePath;
          console.log(this.pageData.icon);
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
      handleChange(value) {
        this.pageData.province = CodeToText[this.addressType[0]];
        this.pageData.city = CodeToText[this.addressType[1]];
        this.pageData.area = CodeToText[this.addressType[2]];
        console.log(this.pageData);
      },
      submitNextStep(formName) {
        console.log("tijiao ");
        this.$refs[formName].validate(valid => {
          console.log("valid");
          console.log(valid);
          if (valid) {
            Bus.$emit("inceptMessage_2", this.pageData);
            if (this.accountType == 0) {
              this.$router.push({
                path: "/register/step3-1"
              });
            } else if (this.accountType == 1) {
              this.$router.push({
                path: "/register/step3-2"
              });
            } else if (this.accountType == 2) {
              this.$router.push({
                path: "/register/step3-3"
              });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    created() {
      Bus.$on("inceptMessage_1", target => {
        this.accountType = target.radioType;
        console.log("this.accountType:");
        console.log(this.accountType);
      });
    }
  };

</script>
<style>
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
