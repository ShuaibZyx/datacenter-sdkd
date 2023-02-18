<template>
  <el-card shadow="never" style="height: 98%; overflow-y: scroll">
    <div slot="header" class="cardHeader">
      <el-page-header @back="$router.back()" content="申请数据" />
      <el-link icon="el-icon-close" @click="$router.back()"></el-link>
    </div>
    <div>
      <!-- 页标题 -->
      <div class="applyData">
        <!-- 提示 -->
        <div id="top-tip">
          <i class="el-icon-warning"></i>
          <span style="margin-left: 5px">重要说明：请您如实填写以下信息。</span>
          <ul>
            <li class="tip">
              这些信息将用于申请的审核评判，详细准确的信息能使你更改快通过申请，获取数据。
            </li>
            <li>
              请您如实填写数据用途，包括事务用途（项目、论文、教学等）和确切用途（具体的研究方向及数据在研究中的作用）两方面，完整的数据用途信息将有助于您的申请快速审核通过。
            </li>
            <li>
              用途信息中请切勿出现“<span style="color: red"
                ><b>秘密、保密、机密、绝密、军工、百人、千人</b></span
              >”等敏感词汇，否则将导致审核邮件无法发出。
            </li>
            <li>
              三峡站滑坡系列数据要求申请人单位盖章，请盖章后扫描申请表上传。
            </li>
          </ul>
          <el-divider content-position="center">以下内容需您如实填写</el-divider>
        </div>
        <!-- 输入表单 -->
        <el-form
          :model="applyForm"
          status-icon
          :rules="rules"
          ref="applyForm"
          label-suffix=":"
          label-width="auto"
        >
          <div class="base-info">
            <div class="item">
              <!-- 姓名 -->
              <el-form-item prop="realName" label="真实姓名">
                <el-input
                  v-model="applyForm.realName"
                  autocomplete="off"
                  maxlength="10"
                  :clearable="true"
                />
              </el-form-item>

              <!-- 邮箱 -->
              <el-form-item prop="email" label="电子邮箱">
                <el-input
                  type="email"
                  v-model="applyForm.email"
                  autocomplete="off"
                  :clearable="true"
                />
              </el-form-item>

              <!-- 邮政编码 -->
              <el-form-item prop="postCode" label="邮政编码">
                <el-input
                  type="text"
                  v-model="applyForm.postCode"
                  autocomplete="off"
                />
              </el-form-item>

              <!-- 地址 -->
              <el-form-item prop="userAddr" label="家庭住址">
                <el-input
                  type="text"
                  v-model="applyForm.userAddr"
                  autocomplete="off"
                />
              </el-form-item>
            </div>

            <div class="item">
              <!-- 用户名 -->
              <el-form-item prop="username" label="用户名">
                <el-input
                  v-model="applyForm.username"
                  autocomplete="off"
                  maxlength="10"
                  :clearable="true"
                />
              </el-form-item>

              <!-- 联系方式 -->
              <el-form-item prop="phone" label="联系方式">
                <el-input
                  type="text"
                  v-model="applyForm.phone"
                  autocomplete="off"
                />
              </el-form-item>

              <!-- 工作单位 -->
              <el-form-item prop="company" label="工作单位">
                <el-input
                  type="text"
                  v-model="applyForm.company"
                  autocomplete="off"
                  maxlength="100"
                />
              </el-form-item>
            </div>
          </div>
          <!-- 申请原因 -->
          <el-form-item prop="applyReason" label="申请原因:">
            <div id="other">
              <el-input
                v-model="applyForm.applyReason"
                type="textarea"
                autocomplete="off"
                :autosize="{ minRows: 4, maxRows: 100 }"
                maxlength="2000"
                :show-word-limit="true"
                placeholder="请填写申请原因"
              />
            </div>
          </el-form-item>

          <!-- 申请数据列表 -->
          <el-form-item label="您将申请数据列表:">
            <br />
            <el-table
              :data="applyDatas"
              :border="true"
              :stripe="true"
              fit
              lazy
              :highlight-current-row="true"
              empty-text="暂无数据"
            >
              <el-table-column
                type="index"
                width="50"
                label="序号"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="title"
                header-align="center"
                label="数据集名称"
              />
              <el-table-column label="共享方式" align="center" width="200">
                <template slot-scope="scope">
                  {{ scope.row.uploadType | originalDataShareWay }}
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked"
              >我同意数据共享协议，并将按照要求进行规范引用，注明数据来源，维护数据作者权益</el-checkbox
            >
            <el-link type="success" style="vertical-align: baseline"
              >(数据共享协议)</el-link
            >
          </el-form-item>
        </el-form>
        <div class="applyBtn">
          <el-button type="primary" size="small" @click="apply"
            >确认申请</el-button
          >
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "apply-data",
  data() {
    return {
      applyForm: {
        userId: "",
        postCode: "",
        userAddr: "",
        email: "",
        username: "",
        realName: "",
        company: "",
        phone: "",
        applyReason: "",
        dataId: [],
      },
      rules: {
        realName: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9-\u4e00-\u9fa5]{1,10}$/,
            message: "长度在 1 到 10 个数字,中文或者字母",
            trigger: ["blur", "change"],
          },
        ],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9-\u4e00-\u9fa5]{1,10}$/,
            message: "长度在 1 到 10 个数字,中文或者字母",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        phone: [
          {
            pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
            message: "手机号码格式不符",
            trigger: "blur",
          },
          { required: true, message: "联系方式不能为空", trigger: "blur" },
        ],
        company: [{ required: true, message: "单位不能为空", trigger: "blur" }],
        userAddr: [
          { required: true, message: "地址不能为空", trigger: "blur" },
        ],
        postCode: [
          { required: true, message: "邮编不能为空", trigger: "blur" },
          {
            pattern: /^[0-9]{6}$/,
            message: "邮政编码格式不符",
            trigger: "blur",
          },
        ],
        userAddr: [
          { required: true, message: "地址不能为空", trigger: "blur" },
        ],
        applyReason: [
          { required: true, message: "申请原因不能为空", trigger: "blur" },
        ],
      },
      checked: true,
    };
  },
  computed: {
    applyDatas() {
      return this.$store.state.applyDatas;
    },
  },
  methods: {
    apply() {
      this.$refs.applyForm.validate(async (valid) => {
        if (!valid) return;
        if (!this.checked) {
          this.$message({
            message: "请先阅读并同意数据共享协议",
            type: "warning",
            center: true,
            showClose: true,
            duration: 1500,
          });
          return;
        }
        this.applyDatas.forEach((data) => {
          this.applyForm.dataId.push(data.dataId);
        });
        this.applyForm.userId = window.sessionStorage.getItem("userId");
        const { data: applyDataRes } = await this.$axios.post("apply", {
          ...this.applyForm,
        });
        this.$message({
          message:
            applyDataRes.code === 200 ? "申请数据成功!" : "申请数据失败!",
          type: applyDataRes.code === 200 ? "success" : "error",
          center: true,
          showClose: true,
          duration: 1500,
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
.applyData {
  .applyBtn {
    display: flex;
    justify-content: center;
  }
}
</style>
