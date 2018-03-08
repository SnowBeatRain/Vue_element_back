<template>
  <div id="app">
    <!-- header -->
    <div>
      <el-header>
        <div style="float: left;height: 60px;">
          <img src="../assets/logo.png" style="height:60px;" alt="">
        </div>
        <div style="float: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="jumpTo()">
                  <span style="color: #555;font-size: 14px;">个人信息</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="jumpTo('/user/changepwd')">
                  <span style="color: #555;font-size: 14px;">修改密码</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span @click="aaa()">{{userName}}</span>
        </div>
      <div class="clear"></div>
      </el-header>
    </div>
    <!-- body -->
    <el-container>
      <aside style="background-color: rgb(238, 241, 246);">
        <div style="text-align:center">
          <img src="../assets/logo.png" style="width:30px;height:30px;" alt="" @click="closeNav()">
        </div>
        <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router :unique-opened='true' @select="handleSelect" :collapse='iscloseNav'>
          <template v-for="(item,index) in menuList">
            <el-submenu :index="index+''" :key="index">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="(ll,ii) in item.snippet" :key="ii" :index="'/'+ll.urlf.split('.')[0]">{{ll.title}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <!-- 右侧路由信息 -->
      <el-container>
        <el-main v-if="collapsed">
          <router-view></router-view>
        </el-main>
        <el-main v-else>
          <h2>黄晓明后台管理</h2>
            <h2>友情链接：</h2>
            <ul>
              <li><a href="https://vuejs.org" target="_blank">黄晓明官网</a></li>
              <li><a href="https://forum.vuejs.org" target="_blank">黄晓明影友会微博</a></li>
            </ul>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      defaultActiveIndex: ["0"],
      menuList: [],
      userName: "",
      collapsed: false,
      iscloseNav: false
    };
  },
  mounted() {
    this.userName = getCookie("username");
    var url = window.location.href;
    if (url.split("#")[1] == "/") {
    } else {
      this.collapsed = true;
    }
    var tt = this;
    if (getCookie("token")) {
      this.$http
        .get("/hxmback/api/Menu/GetMenus", {
          params: {
            Token: getCookie("token")
          }
        })
        .then(
          function(response) {
            var status = response.data.Status;
            if (status === 1) {
              this.menuList = response.data.Result;
              localStorage.setItem(
                "menulist",
                JSON.stringify(response.data.Result)
              );
            } else if (status === 40001) {
              this.$message({
                showClose: true,
                type: "warning",
                message: response.data.Result
              });
              setTimeout(() => {
                tt.$router.push({
                  path: "/login"
                });
              }, 1500);
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            this.$notify.error({
              title: "错误",
              message: "错误：请检查网络"
            });
          }.bind(this)
        );
    } else {
      this.$message({
        showClose: true,
        type: "warning",
        message: "请先登陆"
      });
      setTimeout(() => {
        tt.$router.push({
          path: "/login"
        });
      }, 1500);
    }
  },
  methods: {
    // 	index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
    handleSelect(index) {
      this.collapsed = true;
      // this.defaultActiveIndex = [index];
      // console.log(this.$route.path);
    },
    // 个人中心  修改密码
    jumpTo(url) {
      this.defaultActiveIndex = url;
      this.$router.push(url);
    },
    // 退出
    logout() {
      let that = this;
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning"
      })
        .then(() => {
          //确认
          that.loading = true;
          delCookie("token");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    closeNav() {
      this.iscloseNav = !this.iscloseNav;
      if (this.iscloseNav) {
        $(".el-aside").css({ width: "60px" });
      }
    }
  }
};
</script>

<style scoped>
/* @import "../../static/css/index.css"; */
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
