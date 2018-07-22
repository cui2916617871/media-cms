<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" style="text-align:left">
        <el-form-item>
          <el-input v-model="filters.keywods" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataEvent" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form style="text-align:left">
        <el-form-item label="状态：">
          <el-radio-group v-model="filters.status" @change="getDataEvent">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="未发布"></el-radio-button>
            <el-radio-button label="审核中"></el-radio-button>
            <el-radio-button label="审核成功"></el-radio-button>
            <el-radio-button label="审核失败"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="来源：">
          <el-radio-group v-model="filters.source" @change="getDataEvent">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="手动发布"></el-radio-button>
            <el-radio-button label="定时发布"></el-radio-button>
            <el-radio-button label="草稿"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="content" highlight-current-row style="width: 100%;">
      <el-table-column type="index" width="60" label="序号">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="120">
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间" width="100">
      </el-table-column>
      <el-table-column prop="type" label="新闻类型" width="100">
        <template slot-scope="scope">
          {{ scope.row.type == 1 ? "文章":"" }} {{ scope.row.type == 4 ? "视频":"" }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag type="info">
            {{ scope.row.status == 0 ? "未发布":"" }} {{ scope.row.status == 1 ? "审核中":"" }} {{ scope.row.status == 2 ? "审核成功":"" }} {{
            scope.row.status == 3 ? "审核失败":"" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="flag" label="发布设置" width="100">
        <template slot-scope="scope">
          <el-tag type="info">
            {{ scope.row.status == 0 ? "手动发布":"" }} {{ scope.row.status == 1 ? "定时发布":"" }} {{ scope.row.status == 2 ? "草稿":"" }} {{
            scope.row.status == 3 ? "审核失败":"" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button v-if="scope.row.status=='0'" size="small" @click="publishNews(scope.row.id)">发布</el-button>
          <el-button size="small" @click="updateNews(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row style="text-align: center;margin-top: 10px">
      <el-col :span="24">
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalRows" @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>
    </el-row>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        statusIndexArr: ["未发布", "审核中", "审核成功", "审核失败"],
        sourceIndexArr: ["手动发布", "定时发布", "草稿"],
        currentPage: 1,
        pageSize: 10,
        totalRows: 2,
        filters: {
          keywods: "",
          status: "全部",
          source: "全部"
        },
        content: [{
            id: 2,
            type: 1,
            flag: 2,
            status: 0,
            verifyReason: null,
            verifyNum: null,
            createTime: 1531875072767,
            updateTime: null,
            verifyTime: null,
            publishTime: 1531875072767,
            pid: "20000095",
            uid: 1,
            sourceId: 695097,
            listImg: '[{"height":100,"relativePath":"mztt/list/img/2018/05/18/newsimg_6d7bcb6901b1ea934126254788afa601.jpeg","width":150}]',
            tags: "标签1,标签2",
            columnIds: "20001,20002",
            title: "测试文章标题2",
            content: "测试文章内容2",
            weMediaSubVideo: null,
            remark: null
          },
          {
            id: 2,
            type: 1,
            flag: 2,
            status: 1,
            verifyReason: null,
            verifyNum: null,
            createTime: 1531875072767,
            updateTime: null,
            verifyTime: null,
            publishTime: 1531875072767,
            pid: "20000095",
            uid: 1,
            sourceId: 695097,
            listImg: '[{"height":100,"relativePath":"mztt/list/img/2018/05/18/newsimg_6d7bcb6901b1ea934126254788afa601.jpeg","width":150}]',
            tags: "标签1,标签2",
            columnIds: "20001,20002",
            title: "测试文章标题2",
            content: "测试文章内容2",
            weMediaSubVideo: null,
            remark: null
          }
        ]
      };
    },
    methods: {
      getUsers() {
        console.log(1);
      },
      // 发布新闻
      publishNews(id) {
        console.log("id:" + id);
        this.$http
          .post("/wemedia/api/news/publish", {
            id: id
          })
          .then(
            res => {
              let data = res.body;
              console.log(data);
              if (data.success == true) {
                this.$message({
                  message: "发布成功",
                  type: "success"
                });
              } else {
                this.$message.error(data.msg);
              }
            },
            err => {}
          );
      },
      updateNews(id) {
        console.log("id:" + id);
      },
      getDataEvent: function () {
        this.$http
          .get(
            "/wemedia/api/material/list?type=" +
            "" +
            "&keyword=" +
            this.filters.keyword +
            "&status=" +
            this.statusIndexArr.indexOf(this.filters.status) +
            "&flag=" +
            this.sourceIndexArr.indexOf(this.filters.source)
          )
          .then(
            res => {
              let data = res.body;
              console.log(data);
              if (data.success == true) {
                this.$message({
                  message: "获取成功",
                  type: "success"
                });
              } else {
                this.$message.error(data.msg);
              }
            },
            err => {}
          );
      },
      handleSizeChange: function (size) {
        //this.pagesize = size;
        console.log("pageSize" + pageSize);
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.getDataEvent();
      }
    },
    created() {
      this.$http.get("/wemedia/api/news/list").then(
        res => {
          let data = res.body;
          console.log(data);
          if (data.success == true) {
            this.$message({
              message: "获取成功",
              type: "success"
            });
          } else {
            this.$message.error(data.msg);
          }
        },
        err => {}
      );
    }
  };

</script>

<style scoped>


</style>
