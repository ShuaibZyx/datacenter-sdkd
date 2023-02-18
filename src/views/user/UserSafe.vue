<template>
  <el-card shadow="never" style="height: 98%; overflow-y: scroll">
    <div slot="header" class="cardHeader">
      <el-page-header @back="$router.back()" content="个人信息" />
      <el-link icon="el-icon-close" @click="$router.back()"></el-link>
    </div>
    <div class="userSafe">
      <!-- 消息提示部分 -->
      <el-alert title="修改密码" center type="warning" :closable="false" />
      <!-- 添加项目表单部分 -->
      <el-form
        :model="editPassForm"
        :rules="editPassFormRules"
        status-icon
        ref="editPassFormRef"
        label-width="auto"
        style="margin-top: 20px"
      >
        <el-form-item label="原密码:" prop="originPass">
          <el-input
            v-model="editPassForm.originPass"
            show-password
            clearable
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="新密码:" prop="newPass">
          <el-input
            v-model="editPassForm.newPass"
            show-password
            clearable
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmNewPass">
          <el-input
            v-model="editPassForm.confirmNewPass"
            show-password
            clearable
            autocomplete="off"
          />
        </el-form-item>
      </el-form>

      <!-- 表单下方按钮部分 -->
      <div class="btns">
        <el-button type="primary" @click="editPassword" size="small"
          >保存</el-button
        >
        <el-button type="info" @click="resetFields" size="small"
          >重置</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserSafe",
  data() {
    //两次密码是否一致验证规则
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.editPassForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //修改密码form表单中的值
      editPassForm: {
        originPass: "",
        newPass: "",
        confirmNewPass: "",
      },
      //修改密码form表单中的值的验证规则
      editPassFormRules: {
        originPass: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        newPass: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        confirmNewPass: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: checkPass },
        ],
      },
    };
  },
  methods: {
    //点击保存进行表单的预验证并将用户密码写入数据库
    editPassword() {
      this.$refs.editPassFormRef.validate(async (valid) => {
        // 验证失败返回
        if (!valid) return;
        // 验证通过发起修改密码的请求
        const { data: changePassRes } = await this.$http.post(
          "personal/change/Password",
          {
            userId: JSON.parse(window.sessionStorage.getItem("user")).uid,
            oldPassword: this.editPassForm.originPass,
            newPassword: this.editPassForm.newPass,
            repPassword: this.editPassForm.confirmNewPass,
          }
        );
        //此处添写axios请求
        if (changePassRes.code !== 200) {
          //请求失败
          this.$message.error("修改密码失败");
          return;
        } else {
          //请求成功
          // 显示成功消息
          this.$message.success("修改密码成功");
          //修改成功后置空input
          this.resetFields();
        }
      });
    },

    //重置按钮重置form表单内容
    resetFields() {
      //input置为空
      this.$refs.editPassFormRef.resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.userSafe {
  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>
