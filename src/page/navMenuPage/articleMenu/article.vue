<template>
  <section>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="栏目列表" prop="columnIds">
        <el-checkbox-group v-model="form.columnIds" @change='test'>
          <el-checkbox v-for="(item,index) in newInitArr" :label="item.id" v-bind:key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-input v-model="form.tags" placeholder="请填写标签，有助于获得精准、快速的曝光"></el-input>
        <span>每个标签限8个字，最多9个标签，多个标签用逗号隔开</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNews('form')">发布</el-button>
        <el-button type="primary" @click="dialogFormVisibleTime = true">定时发布</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="定时发布" :visible.sync="dialogFormVisibleTime">
      <div class="block">
        <span class="demonstration">设置发布时间</span>
        <el-date-picker v-model="publishTime" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
        </el-date-picker>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleTime = false">取 消</el-button>
        <el-button type="primary" @click="timeAddNews">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑器 -->
    <vue-editor v-model="content"></vue-editor>
  </section>
</template>

<script>
  import E from "wangeditor";
  import {
    VueEditor
  } from "vue2-editor";
  export default {
    components: {
      VueEditor
    },
    data() {
      return {
        publishTime: "",
        dialogFormVisibleTime: false,
        content: "",
        newInitArr: [{
            "id": 10000,
            "name": "推荐",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/04/18/newsimg_9d8f18b98ac24a6689319b7fbf8520ae.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1524043236000,
            "special": 0
          },
          {
            "id": 20001,
            "name": "热点",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_44f8a97afe4d42f49745cc969ed4ab57.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525887952000,
            "special": 0
          },
          {
            "id": 20002,
            "name": "娱乐",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_cdcb21c3c8334ab0a96adff48888d302.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889545000,
            "special": 0
          },
          {
            "id": 20003,
            "name": "健康",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_81ca63d0cc904a4dab8bb4e9b383dd99.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889556000,
            "special": 0
          },
          {
            "id": 20005,
            "name": "搞笑",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_70a2de95dea347539cb22e3abd5322ae.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889624000,
            "special": 0
          },
          {
            "id": 20006,
            "name": "科技",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_3bebe214e1914815bea80b0fc03468bb.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889635000,
            "special": 0
          },
          {
            "id": 20007,
            "name": "财经",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_4883afa12393493785f9742462fcbbfe.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889648000,
            "special": 0
          },
          {
            "id": 20008,
            "name": "情感",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_29db53e0a1bd4f6fa4158b82848604c1.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889660000,
            "special": 0
          },
          {
            "id": 20009,
            "name": "星座",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_a7b227219a14403dab6f30f9823fee8b.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889727000,
            "special": 0
          },
          {
            "id": 20010,
            "name": "美食",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_019bf0d2cda54b958aaa841c5014da64.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889739000,
            "special": 0
          },
          {
            "id": 20011,
            "name": "历史",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_42f4a981b23442589f333fa01dfb91a7.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889754000,
            "special": 0
          },
          {
            "id": 20012,
            "name": "军事",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_b1222bf034ce4e4082a59849531785f3.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889831000,
            "special": 0
          },
          {
            "id": 20014,
            "name": "奇闻",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_e98f5b6f2c5e4bc3a4994d1e1ef40f09.jpeg?x-oss-process=image/format,webp",
            "create_time": 1522805730000,
            "update_time": 1525889855000,
            "special": 0
          },
          {
            "id": 20016,
            "name": "体育",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_27da2dfa91c2433b89e17f0b2342bcba.jpeg?x-oss-process=image/format,webp",
            "create_time": 1524135011000,
            "update_time": 1525889904000,
            "special": 0
          },
          {
            "id": 20018,
            "name": "汽车",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_3a86596d773048e8867fc783c082fa1b.jpeg?x-oss-process=image/format,webp",
            "create_time": 1524214995000,
            "update_time": 1525889917000,
            "special": 0
          },
          {
            "id": 20019,
            "name": "游戏",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_ed33fb955f4044d98df90d8ecc2049c6.jpeg?x-oss-process=image/format,webp",
            "create_time": 1524215426000,
            "update_time": 1525889934000,
            "special": 0
          },
          {
            "id": 20020,
            "name": "旅游",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_9a75f1e06c174e76bb051cecda0d919d.jpeg?x-oss-process=image/format,webp",
            "create_time": 1524219682000,
            "update_time": 1525889953000,
            "special": 0
          },
          {
            "id": 20021,
            "name": "时尚",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/05/10/newsimg_35e61e5178314e9ca0558248ecd30d6d.jpeg?x-oss-process=image/format,webp",
            "create_time": 1524219766000,
            "update_time": 1525889968000,
            "special": 0
          },
          {
            "id": 20023,
            "name": "视频",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/04/20/newsimg_4f76fac0faaa4c8a93136ea6fe1744fc.jpeg?x-oss-process=image/format,webp",
            "create_time": 1524221599000,
            "update_time": 1524221599000,
            "special": 0
          },
          {
            "id": 20024,
            "name": "图片",
            "icon": "http://newimg.ifjing.cn/ttnews/img/2018/04/20/newsimg_b43589580cfc43fcac9addf7e3e33368.jpeg?x-oss-process=image/format,webp",
            "create_time": 1524221809000,
            "update_time": 1524221809000,
            "special": 0
          },
          {
            "id": 20028,
            "name": "心理",
            "icon": "http://newimg.ifjing.cn/mztt/newsManage/img/2018/05/28/newsimg_feae8717d0a4462f8426c412e25cc639.jpeg?x-oss-process=image/format,webp",
            "create_time": 1527486891000,
            "update_time": 1527486891000,
            "special": 0
          },
          {
            "id": 20029,
            "name": "世界杯",
            "icon": "http://newimg.ifjing.cn/mztt/newsManage/img/2018/06/11/newsimg_7e2df984bacb43c5aeb82f0de03d3b91.jpeg?x-oss-process=image/format,webp",
            "create_time": 1528708601000,
            "update_time": 1528708759000,
            "special": 0
          }
        ],
        form: {
          title: "",
          columnIds: [],
          tags: "",
          publishTime: ""
        },
        rules: {
          title: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }, ],
          columnIds: [{
            type: 'array',
            required: true,
            message: '请至少选择一个栏目列表',
            trigger: 'change'
          }],
          tags: [{
            required: true,
            message: '请输入至少一个标签',
            trigger: 'blur'
          }, ],
        }
      };
    },
    methods: {
      tesiId(data) {
        console.log('data')

        console.log(data)
        console.log(this.form.newInitType)
      },
      timeAddNews() {
        this.form.publishTime = this.publishTime;
        this.dialogFormVisibleTime = false
      }, //添加新闻
      addNews() {
        this.$refs[formName].validate(valid => {
          console.log("valid");
          console.log(valid);
          if (valid) {
            if (this.content) {
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
                    } else {
                      this.$message.error(data.msg);
                    }
                  },
                  err => {}
                );
            }

          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      test(data) {
        console.log(data)
      }
    },
    created() {
      this.$http.get("/wemedia/api/news/init").then(
        res => {
          let data = res.body;
          console.log(data);
          if (data.success == true) {
            this.newInitArr = data.data.columns;

          } else {
            this.$message.error(data.msg);
          }
        },
        err => {}
      )
    }
  };

</script>

<style scoped>


</style>
