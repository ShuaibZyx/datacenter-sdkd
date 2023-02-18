<template>
  <el-card
    shadow="never"
    style="height: 98%; overflow-y: scroll"
    v-if="$route.path === '/cart'"
  >
    <div slot="header" class="cardHeader">
      <el-page-header @back="$router.back()" content="数据篮" />
      <el-button type="primary" size="small" @click="applyData"
        >申请数据</el-button
      >
    </div>
    <div class="DataCart">
      <span class="title"
        >申请数据时请先在在表格左侧勾选表格中的数据后再点击
        <span style="color: #409eff">申请数据按钮</span>
      </span>
      <el-table
        :data="
          passedOriginalData.filter(
            (data) =>
              !search || data.title.toLowerCase().includes(search.toLowerCase())
          )
        "
        :border="true"
        :stripe="true"
        :highlight-current-row="true"
        fit
        lazy
        style="width: 100%; margin-top: 10px"
        empty-text="暂无数据"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column label="数据集名称" header-align="center" width="auto">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>

        <el-table-column label="共享方式" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.uploadType | originalDataShareWay }}
          </template>
        </el-table-column>

        <el-table-column label="添加时间" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>

        <el-table-column align="center" width="300">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              clearable
              class="searchInput"
              placeholder="输入数据集名称进行搜索"
            />
          </template>

          <template slot-scope="scope">
            <el-tooltip effect="light" content="收藏该条数据" placement="right">
              <el-button
                type="warning"
                icon="el-icon-star-off"
                size="small"
                @click="collect(scope.row.dataId)"
                >收藏</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNumber"
          :page-sizes="[8, 12, 18]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>
  </el-card>
  <router-view v-else-if="$route.path === '/apply'" />
</template>

<script>
export default {
  data() {
    return {
      //获得已通过的元数据列表
      passedOriginalData: [],
      //搜索已通过的元数据列表条件
      search: "",
      //已选中的元数据集
      selectedOriginalDatas: [],
      //分页对象
      page: {
        pageNumber: 1,
        pageSize: 8,
        total: 0,
      },
    };
  },
  methods: {
    //获取数据集
    async getPassedOriginalData() {
      const { data: passedOriginalDataRes } = await this.$axios.get(
        "person/true/data"
      );
      this.passedOriginalData = passedOriginalDataRes.data;
    },

    //收藏数据集的方法
    async collect(dataId) {
      const { data: collectDataRes } = await this.$axios.post(
        "data/collection",
        {
          userId: window.sessionStorage.getItem("userId"),
          dataId,
        }
      );
      this.$message({
        message:
          collectDataRes.code === 200
            ? "收藏成功!请到数据收藏中查看"
            : "收藏失败",
        type: collectDataRes.code === 200 ? "success" : "error",
        center: true,
        showClose: true,
        duration: 1500,
      });
    },

    //处理表格最左边的复选框方法
    //参数value代表选中的表格行组成的数组
    handleSelectionChange(value) {
      this.selectedOriginalDatas = value;
    },

    //点击申请数据按钮触发方法
    applyData() {
      if (this.selectedOriginalDatas.length === 0) {
        this.$message({
          message: "请选择需要申请的数据",
          type: "warning",
          center: true,
          showClose: true,
          duration: 1500,
        });
        return;
      }
      //将数据存入vuex用于申请数据页面使用
      this.$store.commit("SetApplyDatas", this.selectedOriginalDatas);
      //跳转至申请数据页面
      this.$router.push("/apply");
    },

    //处理页面大小发生变化的方法
    handleSizeChange(newSize) {
      this.page.pageSize = newSize;
      this.page.pageNumber = parseInt(this.page.total / newSize);
    },

    //处理当前页码发生变化的方法
    handleCurrentChange(newPage) {
      this.page.pageNumber = newPage;
    },
  },
  created() {
    this.getPassedOriginalData();
  },
};
</script>

<style lang="less" scoped>
.DataCart {
  .title {
    color: red;
  }
}
</style>
