<template>
  <el-card shadow="never" style="height: 98%; overflow-y: scroll;">
    <div slot="header" class="cardHeader"> 
      <el-page-header @back="$router.back()" content="我的数据申请" />
    </div>
    <div>
      <el-button-group class="myDataApplyBtnGroup">
        <el-button
          type="primary"
          plain
          size="medium"
          @click="activeName = 'all'"
          >{{ "全部申请(" + allApply.length + ")" }}</el-button
        >
        <el-button
          type="primary"
          plain
          size="medium"
          @click="activeName = 'success'"
          >{{ "已通过(" + successApply.length + ")" }}</el-button
        >
        <el-button
          type="primary"
          plain
          size="medium"
          @click="activeName = 'wait'"
          >{{ "未审核(" + waitApply.length + ")" }}</el-button
        >
        <el-button
          type="primary"
          plain
          size="medium"
          @click="activeName = 'failure'"
          >{{ "未通过(" + failureApply.length + ")" }}</el-button
        >
      </el-button-group>
      <el-table
        :data="
          activeName === 'all'
            ? allApply.filter(
                (data) =>
                  !searchSuccess ||
                  data.title.toLowerCase().includes(searchApply.toLowerCase())
              )
            : activeName === 'success'
            ? successApply.filter(
                (data) =>
                  !searchAll ||
                  data.title.toLowerCase().includes(searchApply.toLowerCase())
              )
            : activeName === 'wait'
            ? waitApply.filter(
                (data) =>
                  !searchWait ||
                  data.title.toLowerCase().includes(searchApply.toLowerCase())
              )
            : activeName === 'failure'
            ? failureApply.filter(
                (data) =>
                  !searchFailure ||
                  data.title.toLowerCase().includes(searchApply.toLowerCase())
              )
            : []
        "
        :border="true"
        :stripe="true"
        fit
        :highlight-current-row="true"
        empty-text="暂无数据"
        style="width: 98%"
      >
        <!-- 数据集名称 -->
        <el-table-column
          prop="title"
          label="数据集名称"
          header-align="center"
        />

        <!-- 申请状态 -->
        <el-table-column label="申请状态" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.status | originalDataState }}
          </template>
        </el-table-column>

        <!-- 申请时间 -->
        <el-table-column
          prop="createTime"
          label="申请时间"
          align="center"
          width="200"
        />

        <!-- 操作按钮 -->
        <el-table-column align="center" width="300">
          <template slot="header">
            <el-input
              v-model="searchApply"
              placeholder="输入数据集名称搜索"
              size="mini"
              clearable
              class="searchInput"
            />
          </template>

          <template slot-scope="scope">
            <el-tooltip effect="light" content="删除该申请" placement="right">
              <el-popconfirm
                title="确定删除?"
                style="margin-left: 5px"
                @confirm="deleteApply(scope.row.applyId)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="medium"
                  circle
                  slot="reference"
                />
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "apply-data",
  data() {
    return {
      //当前激活的tab标签
      activeName: "all",
      //所有申请
      allApply: [],
      //所有待审核的申请
      waitApply: [],
      //所有已通过的申请
      successApply: [],
      //所有审核未通过的申请
      failureApply: [],
      //搜索条件
      searchApply: "",
    };
  },
  methods: {
    //获取该用户所有申请的数据
    async getMyApplyDatas() {
      this.waitApply = [];
      this.successApply = [];
      this.failureApply = [];
      const userId = window.sessionStorage.getItem("userId");
      const { data: myApplyDatasRes } = await this.$axios.post(
        "apply/" + userId
      );
      if (myApplyDatasRes.code !== 200) {
        this.$message.error("获取数据失败!请稍后重试");
        return;
      }
      this.allApply = myApplyDatasRes.data.list;
      this.allApply.forEach((item) => {
        if (item.status === 0) {
          this.waitApply.push(item);
        } else if (item.status === 1) {
          this.successApply.push(item);
        } else {
          this.failureApply.push(item);
        }
      });
    },

    //删除该申请或取消申请方法
    async deleteApply(applyId) {
      this.allApply = [];
      const { data: deleteApplyRes } = await this.$axios.post(
        "apply/del/" + applyId
      );
      this.$message({
        message: deleteApplyRes.code === 200 ? "删除成功" : "删除失败",
        type: deleteApplyRes.code === 200 ? "success" : "error",
        center: true,
        showClose: true,
        duration: 1500,
      });
      this.getMyApplyDatas();
    },
  },

  mounted() {
    this.getMyApplyDatas();
  },
};
</script>

<style lang="less" scoped>
.myDataApplyBtnGroup {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
