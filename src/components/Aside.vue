<template>
  <div class="aside">
    <div class="menu" :class="{ menucollapse: iscollapse }">
      <div class="logobox">
        <el-tooltip
          effect="light"
          content="十大孔兑山水林田湖草沙数据数据中心"
          :enterable="false"
        >
          <img src="../assets/images/Logo.png" width="25%" />
        </el-tooltip>
      </div>
      <el-menu
        :default-active="$route.path.split('/')[0]"
        background-color="transparent"
        text-color="black"
        :collapse="iscollapse"
        active-text-color="#409EFF"
        :router="true"
      >
      <!-- 网站首页 -->
        <el-menu-item index="/datatable">
          <i class="el-icon-s-home"></i>
          <template slot="title">
            <span slot="title">控制台首页</span>
          </template>
        </el-menu-item>

        <!-- 数据申请 -->
        <el-submenu index="apply">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span slot="title">数据申请</span>
          </template>
          <el-menu-item index="/cart">
            <i class="el-icon-shopping-cart-1"></i>
            <span slot="title">数据篮</span>
          </el-menu-item>
          <el-menu-item index="/myapply">
            <i class="el-icon-document-copy"></i>
            <span slot="title">我的数据申请</span>
          </el-menu-item>
        </el-submenu>

        <!-- 数据发布 -->
        <el-submenu index="add">
          <template slot="title">
            <i class="el-icon-monitor"></i>
            <span slot="title">数据发布</span>
          </template>
          <el-menu-item index="/metedata">
            <i class="el-icon-document-add"></i>
            <span slot="title">发布数据</span>
          </el-menu-item>
        </el-submenu>

        <!-- 数据存储 -->
        <el-submenu index="save">
          <template slot="title">
            <i class="el-icon-upload"></i>
            <span slot="title">数据存储</span>
          </template>
          <el-menu-item index="/download">
            <i class="el-icon-download"></i>
            <span slot="title">数据下载</span>
          </el-menu-item>
        </el-submenu>

        <!-- 数据收藏 -->
        <el-submenu index="star">
          <template slot="title">
            <i class="el-icon-star-on"></i>
            <span slot="title">数据收藏</span>
          </template>
          <el-menu-item index="/star">
            <i class="el-icon-star-on"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  computed: {
    //是否折叠
    iscollapse() {
      return this.$store.state.iscollapse;
    },
  },
};
</script>

<style lang="less">
.aside {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .menu {
    width: 100%;
    height: auto;
    .el-submenu .el-menu-item {
      min-width: 0px !important;
      padding-left: 42px !important;
    }
    .logobox {
      border-right: 1px solid white;
      background-color: rgb(64, 64, 64);
      height: 5em;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}
.menucollapse {
  width: 64px !important;
}
</style>
