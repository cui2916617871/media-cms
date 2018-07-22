<template>
  <el-row class="container">
    <!-- header -->
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="10">

      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover" @command="handleCommand">
          <span class="el-dropdown-link userinfo-inner">
            <img :src="userInfo.sysUserAvatar" /> {{userInfo.sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">账号设置</el-dropdown-item>
            <el-dropdown-item command="b">登录设置</el-dropdown-item>
            <el-dropdown-item divided command="c">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <!-- main -->
    <el-col :span="24" class="main">

      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
          unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in navMenu">
            <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
              <template slot="title">
                <i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :key="index" :index="item.children[0].path">
              <i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  import Bus from "../components/Bus.vue";
  export default {
    data() {
      return {
        sysName: "自媒体后台",
        userInfo: {
          sysUserName: "ccc",
          sysUserAvatar: "https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png",

        },
        collapsed: false,
        navMenu: [{
            name: "内容管理",
            iconCls: "el-icon-message", //图标样式class
            children: [{
                path: "/index/my-content",
                name: "我的内容"
              },
              {
                path: "/index/my-material",
                name: "我的素材"
              }
            ]
          },
          {
            name: "文章发布",
            iconCls: "el-icon-message",
            leaf: true,
            children: [{
              path: "/index/article",
              name: "文章发布"
            }]
          },
          {
            name: "设置",
            iconCls: "el-icon-message",
            children: [{
                path: "/index/accountset",
                name: "账号设置"
              },
              {
                path: "/index/loginset",
                name: "登录设置"
              }
            ]
          }
        ]
      };
    },
    methods: {
      handleCommand(command) {
        console.log(command);
        if (command == "a") {
          this.$router.push({
            path: "/index/accountset"
          });
        } else if (command == "b") {
          this.$router.push({
            path: "/index/loginset"
          });
        } else if (command == "c") {
          this.logout();
        }
      },
      onSubmit() {
        console.log("submit!");
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect: function (a, b) {},
      //退出登录
      logout: function () {
        this.$confirm("确认退出吗?", "退出登录", {
            //type: 'warning'
          })
          .then(() => {
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
            this.$router.push("/");
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status) {
        this.$refs.menuCollapsed.getElementsByClassName(
          "submenu-hook-" + i
        )[0].style.display = status ? "block" : "none";
      }
    },
    created() {
      this.$http.get("/wemedia/api/user/info").then(
        res => {
          let data = res.body;
          console.log(data);
          if (data.success == true) {
            this.userInfo = data.data;
            Bus.$emit("userInfoPass", this.userInfo);
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
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .container .header {
    height: 60px;
    line-height: 60px;
    background: #20a0ff;
    color: #fff;
  }

  .container .header .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
  }

  .container .header .userinfo .userinfo-inner {
    cursor: pointer;
    color: #fff;
  }

  .container .header .userinfo .userinfo-inner img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
  }

  .container .header .logo {
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
  }

  .container .header .logo img {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
  }

  .container .header .logo .txt {
    color: #fff;
  }

  .container .header .logo-width {
    width: 230px;
  }

  .container .header .logo-collapse-width {
    width: 60px;
  }

  .container .header .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }

  .container .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
  }

  .container .main aside {
    flex: 0 0 230px;
    width: 230px;
  }

  .container .main aside .el-menu {
    height: 100%;
  }

  .container .main aside .collapsed {
    width: 60px;
  }

  .container .main aside .collapsed .item {
    position: relative;
  }

  .container .main aside .collapsed .submenu {
    position: absolute;
    top: 0px;
    left: 60px;
    z-index: 99999;
    height: auto;
    display: none;
  }

  .container .main .menu-collapsed {
    flex: 0 0 60px;
    width: 60px;
  }

  .container .main .menu-expanded {
    flex: 0 0 230px;
    width: 230px;
  }

  .container .main .content-container {
    flex: 1;
    overflow-y: scroll;
    padding: 20px;
  }

  .container .main .content-container .breadcrumb-container .title {
    width: 200px;
    float: left;
    color: #475669;
  }

  .container .main .content-container .breadcrumb-container .breadcrumb-inner {
    float: right;
  }

  .container .main .content-container .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }

</style>
