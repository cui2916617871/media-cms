<template>
  <section>
    <ul class="setting_list">
      <li class="setting_item">
        <label class="setting_item_label">企鹅号名称</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info"> {{userInfo.name}} </span>
            <div class="setting_item_extra">
              <el-button type="text" style="padding:0" @click="reviseName">修改</el-button>
              <el-popover placement="top-start" title="提示" width="200" trigger="hover" content="本年度可修改2次">
                <i class="icon-question el-icon-question" slot="reference"></i>
              </el-popover>
            </div>
          </div>
        </div>
      </li>
      <li class="setting_item">
        <label class="setting_item_label">企鹅号简介</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info"> {{userInfo.introd}} </span>
            <div class="setting_item_extra">
              <el-button type="text" style="padding:0" @click="reviseIntrod">修改</el-button>
              <el-popover placement="top-start" title="提示" width="200" trigger="hover" content="每月只能修改一次">
                <i class="icon-question el-icon-question" slot="reference"></i>
              </el-popover>
            </div>
          </div>
        </div>
      </li>
      <li class="setting_item">
        <label class="setting_item_label">联系人</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info"> {{userInfo.idcardName}} </span>
          </div>
        </div>
      </li>
      <li class="setting_item">
        <label class="setting_item_label">联系电话</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info"> {{userInfo.linkPhone}} </span>
            <div class="setting_item_extra">
              <el-button type="text" style="padding:0" @click="revisePhone">修改</el-button>
              <el-popover placement="top-start" title="提示" width="200" trigger="hover" content="每月只能修改一次">
                <i class="icon-question el-icon-question" slot="reference"></i>
              </el-popover>
            </div>
          </div>
        </div>
      </li>
      <li class="setting_item">
        <label class="setting_item_label">类型</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info"> {{userInfo.type==0?'个人':''}}{{userInfo.type==1?'企业':''}}{{userInfo.type==2?'媒体':''}} </span>
          </div>
        </div>
      </li>
      <li class="setting_item">
        <label class="setting_item_label">所在地</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info"> {{userInfo.province}}{{userInfo.city}}{{userInfo.area}} </span>
          </div>
        </div>
      </li>
      <li class="setting_item">
        <label class="setting_item_label">联系邮箱</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info"> 18102541784@qq.com </span>
            <div class="setting_item_extra">
              <el-button type="text" style="padding:0" @click="reviseMail">修改</el-button>
              <el-popover placement="top-start" title="邮箱修改提示" width="200" trigger="hover" content="每月只能修改一次">
                <i class="icon-question el-icon-question" slot="reference"></i>
              </el-popover>
            </div>
          </div>
        </div>
      </li>
      <li class="setting_item">
        <label class="setting_item_label">主体信息</label>
        <div class="setting_item_controls">
          <div class="setting_item_main">
            <span class="setting_item_info">
              {{userInfo.status == 0?'审核中':''}} {{userInfo.status == 1?'审核通过':''}} {{userInfo.status == 2?'审核不通过':''}} {{userInfo.status
              == 3?'禁用':''}}
            </span>
            <span class="setting_item_info" style="margin:10px 0"> 主题信息：{{userInfo.idcardName}} </span>
            <span class="setting_item_info"> 身份证电话：{{userInfo.idcardNo}} </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import Bus from "../../../components/Bus.vue";
  export default {
    data() {
      return {
        userInfo: {
          "id": 1,
          "sourceId": null,
          "type": 0,
          "idcardName": "张三",
          "idcardNo": "123456789012345678",
          "selfPhoto": "wemedia/info/5a3d67bc-8ee6-4072-96f0-a4fb461f2766.jpg",
          "idcardPhoto": "wemedia/info/5a3d67bc-8ee6-4072-96f0-a4fb461f2766.jpg",
          "linkPhone": "18017831586",
          "linkMail": "zhangxiaolu@felink.com",
          "companyName": null,
          "companyNo": null,
          "companyPhoto": null,
          "status": 0,
          "remark": null,
          "verifyReason": null,
          "verifyNum": 0,
          "createTime": 1531710282603,
          "updateTime": null,
          "verifyTime": null,
          "name": "测试自媒体",
          "introd": "自媒体简介",
          "icon": "wemedia/icon/2a0812db-49d4-49a4-9049-f3c86f0beef7.jpg",
          "province": "上海",
          "city": "上海市",
          "area": "长宁区",
          "domain": "科技",
          "pid": "20000095",
          "uid": 10000
        }
      };
    },
    methods: {

      reviseName() {

        this.$prompt("请输入账号名称", "账号名称修改", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /\S/,
            inputErrorMessage: '名称不能为空'
          })
          .then(({
            value
          }) => {
            this.reviseUserInfo({
              "id": this.userInfo.id,
              "name": value
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入"
            });
          });
      },
      reviseIntrod() {
        this.$prompt("请输入企鹅号简介", "企鹅号简介修改", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /\S/,
            inputErrorMessage: '简介不能为空'
          })
          .then(({
            value
          }) => {
            this.reviseUserInfo({
              "id": this.userInfo.id,
              "introd": value
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入"
            });
          });
      },
      revisePhone() {
        this.$prompt("请输入联系人电话", "修改电话", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^1[3-9]{1}[0-9]{9}$/,
            inputErrorMessage: "手机号格式不正确"
          })
          .then(({
            value
          }) => {
            this.reviseUserInfo({
              "id": this.userInfo.id,
              "linkPhone": value
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入"
            });
          });
      },
      reviseMail() {
        this.$prompt("请输入邮箱", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: "邮箱格式不正确"
          })
          .then(({
            value
          }) => {
            this.reviseUserInfo({
              "id": this.userInfo.id,
              "linkMail": value
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入"
            });
          });
      },
      reviseUserInfo(data) {
        console.log('data')
        console.log(data)
        this.$http
          .post("/wemedia/api/user/updInfo", )
          .then(
            res => {
              this.logining = false;

              let data = res.body;
              console.log(res);
              if (data.success == true) {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
              } else {
                this.$message.error(data.msg);
              }
            },
            err => {}
          );
      }
    },
    created() {
      Bus.$on("userInfoPass", target => {
        this.userInfo = target;
      });
    }
  };

</script>
<style scoped>
  ul,
  li,
  ol {
    list-style-type: none;
  }

  .setting_list {}

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

  .setting_item .setting_item_controls .setting_item_main .setting_item_extra .icon-question {
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
