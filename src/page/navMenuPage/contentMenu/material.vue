<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="图片素材" name=0>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :span="4" v-for="(item,index) in picMaterial.content" :key="index" style="margin:0 15px 30px 15px">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img :src="item.absolutePath" class="image">
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" icon="el-icon-edit" circle>修改</el-button>
                  <el-button type="text" icon="el-icon-search" circle @click="deleteMaterial(item.id)">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="text-align: center;margin-top: 10px">
          <el-col :span="24">
            <el-pagination background layout="prev, pager, next" :page-size="picMaterial.pageSize" :total="picMaterial.totalRows" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="视频素材" name=1>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :span="4" v-for="(item,index) in videoMaterial.content" :key="index" style="margin:0 15px 30px 15px">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img :src="item.absolutePath" class="image">
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" icon="el-icon-edit" circle>修改</el-button>
                  <el-button type="text" icon="el-icon-search" circle @click="deleteMaterial(item.id)">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="text-align: center;margin-top: 10px">
          <el-col :span="24">
            <el-pagination background layout="prev, pager, next" :page-size="picMaterial.pageSize" :total="picMaterial.totalRows" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加图片素材弹框 -->
    <el-dialog title="添加图片素材" :visible.sync="picDialogVisible">
      <el-form :model="picForm">
        <el-form-item prop="introd" label="素材名称">
          <el-input v-model="picForm.name"></el-input>
        </el-form-item>
        <el-form-item label="选取素材">
          <el-upload class="avatar-uploader" action="http://47.100.199.241:8185/wemedia/api/upload/img" :show-file-list="false" name="file" :data="picForm.imgData" :on-success="handleAvatarSuccessPic" :before-upload="beforeAvatarUploadPic">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加视频素材弹框 -->
    <el-dialog title="添加视频素材" :visible.sync="videoDialogVisible">
      <el-form :model="picForm">
        <el-form-item prop="introd" label="素材名称">
          <el-input v-model="picForm.name"></el-input>
        </el-form-item>
        <el-form-item label="选取素材">
          <el-upload class="avatar-uploader" action="http://47.100.199.241:8185/wemedia/api/upload/video" :show-file-list="false" :on-success="handleAvatarSuccessVideo" :before-upload="beforeAvatarUploadVideo">
            <!-- <img v-if="sourceUrl" :src="sourceUrl" class="avatar"> -->
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    data() {
        return {
            picDialogVisible: true,
            videoDialogVisible: false,
            imageUrl: "",
            activeName: 0,
            currentPage: 1,
            picForm: {
                name: "",
                sourceUrl: "",
                imgData: {
                    type: 1
                }
            },
            picMaterial: {
                pageNumber: 1,
                pageSize: 10,
                totalPages: 1,
                totalRows: 2,
                content: [
                    {
                        id: 2,
                        createTime: 1531791489664,
                        updateTime: 1531791971679,
                        name: "测试素材名称2",
                        pid: "20000095",
                        uid: 1,
                        type: 0,
                        absolutePath:
                            "http://newimg.ifjing.cn/wemedia/info/5a3d67bc-8ee6-4072-96f0-a4fb461f2766.jpg",
                        width: 790,
                        height: 720,
                        duration: null,
                        fileSize: 320000,
                        ext: ""
                    }
                ],
                uid: 1,
                type: 0
            },
            videoMaterial: {
                pageNumber: 1,
                pageSize: 10,
                totalPages: 1,
                totalRows: 2,
                content: [
                    {
                        id: 2,
                        createTime: 1531791489664,
                        updateTime: 1531791971679,
                        name: "测试素材名称2",
                        pid: "20000095",
                        uid: 1,
                        type: 1,
                        absolutePath:
                            "http://newimg.ifjing.cn/wemedia/info/5a3d67bc-8ee6-4072-96f0-a4fb461f2766.jpg",
                        width: 790,
                        height: 720,
                        duration: null,
                        fileSize: 320000,
                        ext: ""
                    }
                ],
                uid: 1,
                type: 0
            }
        };
    },
    methods: {
        // 切换tab
        handleClick(tab, event) {
            console.log(this.activeName);
            console.log(tab, event);
            this.getDataEvent();
        },
        handleSizeChange: function(size) {
            //this.pagesize = size;
            console.log("pageSize" + pageSize);
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.getDataEvent();
        },
        // 删除素材
        deleteMaterial(id) {
            console.log("id：" + id);
            this.$http
                .post("/wemedia/api/material/del", {
                    id: id
                })
                .then(
                    res => {
                        let data = res.body;
                        console.log(data);
                        if (data.success == true) {
                            this.$message({
                                message: "删除成功",
                                type: "success"
                            });
                            this.getDataEvent();
                        } else {
                            this.$message.error(data.msg);
                        }
                    },
                    err => {
                        this.$message.error("网络开小差了");
                    }
                );
        },
        getDataEvent: function() {
            this.$http
                .get(
                    "/wemedia/api/material/list?type=" +
                        this.activeName +
                        "&pageNumber=" +
                        this.currentPage
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
        beforeAvatarUploadPic(file) {
            const isJPG =
                file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                this.$message.error("上传图片格式不符合");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 5MB!");
            }
            return isJPG && isLt2M;
        },
        handleAvatarSuccessPic(res, file) {
            //图片上传成功
            console.log(file);
            this.imageUrl = URL.createObjectURL(file.raw);
            let data = file.response;
            if (data.success == true) {
                this.picForm.sourceUrl = data.data.relativePath;
                console.log(this.picForm.sourceUrl);
            }
        },
        beforeAvatarUploadVideo(file) {
            const isLt10M = file.size / 1024 / 1024 < 200;
            if (
                [
                    "video/mp4",
                    "video/mkv",
                    "video/mp3",
                    "video/ogg",
                    "video/flv",
                    "video/aac"
                ].indexOf(file.type) == -1
            ) {
                this.$message.error("请上传正确的视频格式");
                return false;
            }
            if (!isLt10M) {
                this.$message.error("上传视频大小不能超过10MB哦!");
                return false;
            }
        },
        handleAvatarSuccessVideo(res, file) {
            //图片上传成功
            console.log(file);
            this.imageUrl = URL.createObjectURL(file.raw);
            let data = file.response;
            if (data.success == true) {
                this.picForm.sourceUrl = data.data.relativePath;
                console.log(this.picForm.sourceUrl);
            }
        }
    },
    created() {
        this.getDataEvent();
    }
};
</script>
<style scoped>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}

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
