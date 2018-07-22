<template>
  <section>
    <ul class="setting_list">
      <li class="setting_item">
        <label class="setting_item_label">登录邮箱</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info"> 1854611121@qq.com </span>
            <div class="setting_item_extra">
              <el-button type="text" style="padding:0" @click="dialogFormVisible = true">修改</el-button>
              <el-popover placement="top-start" title="登录邮箱修改提示" width="200" trigger="hover" content="一个月内只能申请修改一次">
                <i class="icon-question el-icon-question" slot="reference"></i>
              </el-popover>
            </div>
          </div>
        </div>
      </li>
      <li class="setting_item">
        <label class="setting_item_label">登录手机</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info"> 1854611121 </span>
          </div>
        </div>
      </li>
    </ul>
    <el-dialog title="修改登录邮箱" :visible.sync="dialogFormVisible">
      <el-form :model="formData" :rules="rules" ref="formData">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认邮箱" prop="checkEmail">
          <el-input v-model="formData.checkEmail" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

  <script>
export default {
    data() {
        var validateEmail2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入邮箱"));
            } else if (value !== this.formData.email) {
                callback(new Error("两次输入邮箱不一致!"));
            } else {
                callback();
            }
        };
        return {
            formData: {
                email: "",
                checkEmail: ""
            },
            dialogFormVisible: false,
            rules: {
                email: [
                    {
                        required: true,
                        message: "请输入邮箱地址",
                        trigger: "blur"
                    },
                    {
                        required: true,
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ],
                checkEmail: [{ validator: validateEmail2, trigger: "blur" }]
            }
        };
    }
};
</script>
<style scoped>
ul,
li,
ol {
    list-style-type: none;
}
.setting_list {
}
.setting_item .setting_item_label {
    float: left;
    width: 90px;
    margin-right: 1em;
    padding: 20px 0;
    color: #9a9a9a;
}
setting_item:after {
    content: "\200B";
    display: block;
    height: 0;
    clear: both;
}
.setting_item .setting_item_controls {
    display: table-cell;
    width: 1%;
    word-wrap: break-word;
    word-break: break-all;
    padding: 20px 0;
    border-bottom: 1px solid #e4e8eb;
}
.setting_item .setting_item_controls .setting_item_main {
    position: relative;
    padding-right: 40px;
}
.setting_item .setting_item_controls .setting_item_main .setting_item_info {
    display: block;
    font-weight: normal;
}
.setting_item .setting_item_controls .setting_item_main .setting_item_extra {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    text-align: right;
}
.setting_item
    .setting_item_controls
    .setting_item_main
    .setting_item_extra
    .icon-question {
    background-image: url("data:image/svg+xml;charset=utf8, %3Csvg width='18' height='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 1.133c4.338 0 7.867 3.528 7.867 7.865 0 1.06-.208 2.088-.619 3.057a7.864 7.864 0 0 1-1.689 2.503 7.862 7.862 0 0 1-2.502 1.689A7.791 7.791 0 0 1 9 16.866a7.791 7.791 0 0 1-3.057-.619 7.862 7.862 0 0 1-2.502-1.69 7.864 7.864 0 0 1-1.69-2.502 7.794 7.794 0 0 1-.618-3.057c0-4.337 3.53-7.865 7.867-7.865zM9 0C4.038 0 0 4.036 0 8.998c0 4.961 4.038 9.001 9 9.001s9-4.04 9-9.001C18 4.036 13.962 0 9 0zm.601 13.966H8.276v-1.394H9.6v1.394zm2.166-6.264c-.142.296-.442.665-.902 1.106-.46.442-.765.757-.915.943-.15.187-.265.41-.342.67-.078.26-.112.608-.102 1.045H8.303c0-.51.041-.918.123-1.223.082-.305.205-.571.369-.8.164-.227.46-.562.888-1.003.428-.442.704-.763.827-.964.123-.2.184-.498.184-.895 0-.396-.141-.746-.423-1.052-.283-.305-.693-.457-1.23-.457-1.211 0-1.817.72-1.817 2.158H6.022c.018-.655.095-1.154.232-1.496.136-.341.355-.646.656-.915.3-.269.635-.467 1.004-.594a3.55 3.55 0 0 1 1.168-.192c.829 0 1.519.244 2.07.731.55.488.826 1.137.826 1.947 0 .365-.07.695-.211.99z' fill='%239A9A9A' fill-rule='evenodd'/%3E%3C/svg%3E");
    width: 18px;
    height: 18px;
    display: inline-block;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    vertical-align: middle;
}
</style>

