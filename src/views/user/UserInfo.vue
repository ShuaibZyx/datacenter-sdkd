<template>
  <el-card
    shadow="never"
    style="height: 98%; overflow-y: scroll"
    v-if="$route.path === '/userInfo'"
  >
    <div slot="header" class="cardHeader">
      <el-page-header @back="$router.back()" content="个人信息" />
      <el-button type="primary" size="small" @click="$router.push('/userSafe')"
        >账户安全</el-button
      >
    </div>
    <div class="userInfo-box">
      <!-- 消息提示部分 -->
      <el-alert title="个人基本资料" center type="success" :closable="false" />

      <!-- 表单部分 -->
      <el-form
        :model="userInfoForm"
        :rules="userInfoFormRules"
        ref="userInfoFormRef"
        label-width="100px"
        style="margin-top: 20px"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="userInfoForm.username" />
        </el-form-item>
        <el-form-item label="真实姓名:" prop="realName">
          <el-input v-model="userInfoForm.realName" />
        </el-form-item>
        <el-form-item label="电子邮箱:" prop="email">
          <el-input v-model="userInfoForm.email" />
        </el-form-item>
        <el-form-item label="联系方式:" prop="phone">
          <el-input v-model="userInfoForm.phone" />
        </el-form-item>
        <el-form-item label="邮政编码:" prop="postCode">
          <el-input v-model="userInfoForm.postCode" />
        </el-form-item>
        <el-form-item label="工作单位:" prop="company">
          <el-input v-model="userInfoForm.company" />
        </el-form-item>
        <el-form-item label="住址:" prop="userAddr">
          <el-input v-model="userInfoForm.userAddr" />
        </el-form-item>
      </el-form>
      <!-- 表单部分结束 -->

      <!-- 表单下方按钮部分 -->
      <div class="btns">
        <el-button type="primary" size="small" @click="editUserInfo"
          >保存信息</el-button
        >
      </div>
    </div>
  </el-card>
  <router-view v-else-if="$route.path === '/userSafe'" />
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      //展示和修改用户信息所用对象
      userInfoForm: {
        uid: "",
        username: "",
        realName: "",
        email: "",
        phone: "",
        postCode: "",
        company: "",
        userAddr: "",
      },
      //用户信息所用对象的属性的验证规则
      userInfoFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern:
              /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式不符合",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
            message: "手机号码格式不符合",
            trigger: "blur",
          },
        ],
        postCode: [
          { required: true, message: "请输入邮政编码", trigger: "blur" },
        ],

        company: [
          { required: true, message: "请输入工作单位", trigger: "blur" },
        ],

        userAddr: [
          { required: true, message: "请输入家庭住址", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //获得当前用户信息
    async getUserInfo() {
      const { data: userInfo } = await this.$http.post("user/current");
      this.userInfoForm = userInfo.data;
      window.sessionStorage.setItem("user", JSON.stringify(this.userInfoForm));
    },

    //修改完用户信息后进行表单的预验证并写入数据库
    editUserInfo() {
      this.$refs.userInfoFormRef.validate(async (valid) => {
        // 验证失败返回
        if (!valid) return;
        // 验证通过发起修改用户信息的请求
        const { data: editRes } = await this.$http.post("personal/update", {
          userId: this.userInfoForm.uid,
          phone: this.userInfoForm.phone,
          company: this.userInfoForm.company,
          realName: this.userInfoForm.realName,
          username: this.userInfoForm.username,
          email: this.userInfoForm.email,
          userAddr: this.userInfoForm.userAddr,
          postCode: this.userInfoForm.postCode,
        });
        this.$message({
          message:
            editRes.code === 200 ? "个人信息修改成功" : "个人信息修改失败",
          type: editRes.code === 200 ? "success" : "error",
          center: true,
          showClose: true,
          duration: 1500,
        });
        // 重新渲染用户信息
        this.getUserInfo();
      });
    },
  },
  //初始化时获取用户信息
  mounted() {
    this.getUserInfo();
  },
};
</script>

<style scoped lang="less">
.userInfo-box {
  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>
