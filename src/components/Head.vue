<template>
  <div class="head">
    <div class="title">
      <span class="info">
        <el-tooltip
          effect="light"
          content="折叠"
          :enterable="false"
          v-if="!$store.state.iscollapse"
        >
          <i
            class="el-icon-s-fold flold"
            style="margin-right: 5px"
            @click="$store.commit('setIscollapse', true)"
          />
        </el-tooltip>
        <el-tooltip effect="light" content="展开" :enterable="false" v-else>
          <i
            class="el-icon-s-unfold flold"
            style="margin-right: 5px"
            @click="$store.commit('setIscollapse', false)"
          />
        </el-tooltip>
        <div class="text">
          <span>十大孔兑山水林田湖草沙数据数据中心控制台</span>
        </div>
      </span>
    </div>
    <div class="operation">
      <div class="admin">
        <el-dropdown>
          <el-avatar size="medium" style="cursor: pointer">
            <el-image :src="require('../assets/icons/women.png')" />
          </el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="$route.path !== '/userInfo'">
              <i class="el-icon-user" @click="$router.push('/userInfo')">
                个人信息</i
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-s-home" @click="$router.push('/index')">
                网站主页</i
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-circle-close" @click="logout"> 退出登录</i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {};
  },
  methods: {
    //退出登录
    logout() {
      window.sessionStorage.removeItem("admin_token");
      this.$cookies.remove("admin_token");
      this.$router.push("/login");
      this.$message({
        message: "已退出登录",
        type: "success",
        center: true,
        showClose: true,
      });
    },
  },
};
</script>

<style lang="less">
.head {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: rgb(64, 64, 64);
  .title {
    width: 40%;
    .info {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .flold {
        color: white;
      }
      .flold:hover {
        cursor: pointer;
        font-size: larger;
      }
      .text {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: white;
      }
    }
  }
  .operation {
    width: 60%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    .admin {
      margin-right: 2%;
      min-width: 20%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
