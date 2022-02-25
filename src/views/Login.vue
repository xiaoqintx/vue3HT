<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form :model="user" :rules="rules" status-icon ref="userForm">
        <div class="title">登录页</div>
        <el-form-item prop="userName">
          <el-input
            type="text"
            :prefix-icon="userIcon"
            v-model="user.userName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input
            type="password"
            :prefix-icon="view"
            v-model="user.userPassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { User, View } from "@element-plus/icons-vue";
export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "",
        userPassword: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userPassword: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 点击按钮返回登录数据
    login() {
      this.$refs.userForm.validate((res) => {
        // console.log(res);
        // 请求
        // let result = await this.$api.login(this.user)
        // console.log(result);
        if(res) {
          this.$api.reqLogin(this.user).then((res) => {
          // console.log(res);
          this.$store.commit('saveUserInfo',res);
          this.$router.push('/welcome');
        });
        }
      });
    },
  },
  mounted() {
    // 第一种请求方式
    // this.$request({
    //   url: '/login',
    //   method: 'get',
    //   data: {
    //     name: 'Jack'
    //   }
    // }).then(res=>{
    //   console.log(res);
    // })
    // 第二种请求方式
    // this.$request.get('/login',{name: 'Jack'},{mock:true}).then(res=>{
    //   console.log(res);
    // })
    // 设置封装好后的localStorage
    // this.$storage.setItem('he00',{age:18,height:180})
    // this.$storage.setItem('he01',{age:16,height:150})
    // console.log(this.$storage.getItem('he00'));
    // this.$storage.clearAll()
  },
  computed: {
    userIcon() {
      return User;
    },
    view() {
      return View;
    },
  },
};
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 35px;
    background: #fff;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 35px;
      line-height: 1.5;
      text-align: center;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>