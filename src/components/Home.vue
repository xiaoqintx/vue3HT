<template>
  <div>
    <div class="basic-layout">
      <!-- 左侧导航栏 -->
      <div :class="['nav-side', isCollapse ? 'fold' : 'unFold']">
        <div class="logo">
          <img src="../assets/logo.png" alt="" />
          <span>Manager</span>
        </div>
        <!-- 菜单栏  
        @open="handleOpen"
        @close="handleClose"
        router	是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转
        collapse	是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
          -->
        <el-menu
          default-active="2"
          class="nav-menu"
          background-color=" #001529"
          text-color="#fff"
          :collapse="isCollapse"
          router
        >
          <tree-menu :userMenu="userMenu"></tree-menu>
        </el-menu>
      </div>
      <!-- 右侧内容 -->
      <div :class="['content-right', isCollapse ? 'fold' : 'unFold']">
        <!-- 头部面包屑+用户信息 -->
        <div class="nav-top">
          <div class="nav-left">
            <fold class="menu-fold" @click="toFold"></fold>
            <div class="bread">面包屑</div>
          </div>
          <!-- 通知区域+用户信息 -->
          <div class="user-info">
            <el-badge
              :is-dot="noticeCount > 0 ? true : false"
              class="user-badge"
              type="danger"
            >
              <el-icon class="el-icon-bell">
                <bell></bell>
              </el-icon>
            </el-badge>
            <!-- 下拉 -->
            <el-dropdown @command="handleLoginOut">
              <span class="user-link">
                {{ userInfo.userName }}
                <el-icon class="el-icon-right">
                  <arrow-down></arrow-down>
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="email"
                    >邮箱:{{ userInfo.userEmail }}</el-dropdown-item
                  >
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <!-- 下方主体内容区 -->
        <div class="wrapper">
          <div class="main-page">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Setting, Fold, Bell, ArrowDown } from "@element-plus/icons-vue";
import TreeMenu from './TreeMenu.vue'
export default {
  name: "home",
  components: {
    // 设置
    setting: Setting,
    // 面包屑菜单栏
    fold: Fold,
    // 通知小铃铛
    bell: Bell,
    ArrowDown: ArrowDown,
    // 递归菜单栏组件
    TreeMenu
  },
  mounted() {
    this.getNoticeCount();
    this.getMenuList();
  },
  data() {
    return {
      // 登录信息
      userInfo: this.$store.state.userInfo,
      // 菜单是否折叠
      isCollapse: false,
      // 是否有审批消息
      noticeCount: 0,
      //菜单列表数据
      userMenu: [],
    };
  },
  methods: {
    // 点击每一个item的事件回调
    handleLoginOut(key) {
      if (key == "email") {
        return;
      }
      this.$store.commit("saveUserInfo", "");
      this.$router.push("/login");
    },
    toFold() {
      this.isCollapse = !this.isCollapse;
    },
    // 请求审批数据，判断是否有消息审批
    async getNoticeCount() {
      // console.log('1');
      let res = await this.$api.reqNoticeCount();
      // console.log(res);

      this.noticeCount = res;
    },
    // 请求菜单列表数据
    async getMenuList() {
      // console.log('1');
      let res = await this.$api.reqMenuList();
      console.log(res);

      this.userMenu = res;
    },
  },
};
</script>

<style scoped lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    // 防止滚动条  取消过渡
    // overflow-y: auto;
    // transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 15px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      // 去除一像素偏差
      border-right: none;
      // 防止滚动条
      height: calc(100vh - 50px);
      .menu-setting {
        width: 20px;
        height: 20px;
        margin-right: 12px;
      }
    }
    &.fold {
      width: 64px;
    }
    &.unFold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        z-index: 10;
        .menu-fold {
          width: 25px;
          height: 25px;
          margin-right: 15px;
        }
      }
      .user-info {
        .user-badge {
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
    }
    .wrapper {
      background-color: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        height: 100%;
        background-color: #fff;
      }
    }
    &.fold {
      margin-left: 64px;
    }
    &.unFold {
      margin-left: 200px;
    }
  }
}
</style>