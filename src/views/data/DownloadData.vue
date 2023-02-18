<template>
  <el-card shadow="never" style="height: 98%; overflow-y: scroll">
    <div slot="header" class="cardHeader">
      <el-page-header @back="$router.back()" content="数据下载" />
    </div>
    <div class="downloadData">
      <span class="title"
        >您已申请的数据中包含的文件如下,点击表格每列最右侧下载文件按钮即可下载</span
      >
      <el-table
        :data="
          myFileList.filter(
            (data) =>
              !search ||
              data.originalName.toLowerCase().includes(search.toLowerCase())
          )
        "
        :border="true"
        :stripe="true"
        :highlight-current-row="true"
        fit
        lazy
        style="width: 100%; margin-top: 10px"
        empty-text="暂无数据"
      >
        <el-table-column
          label="文件名"
          align="center"
          prop="originalName"
          width="auto"
        />

        <el-table-column label="大小" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.size }} kb</span>
          </template>
        </el-table-column>

        <el-table-column label="文件类型" align="center" width="200">
          <template slot-scope="scope">
            <el-tag>
              <span>{{ scope.row.format }}文件</span>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="200"
        />

        <el-table-column align="center" width="300">
          <template slot="header">
            <el-input
              v-model="search"
              clearable
              placeholder="输入文件名称搜索"
              size="mini"
              class="searchInput"
            />
          </template>

          <template slot-scope="scope">
            <el-tooltip effect="light" content="点击下载" placement="right">
              <el-link
                icon="el-icon-download"
                type="primary"
                :href="scope.row.path"
                >下载文件</el-link
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
</template>

<script>
export default {
  name: "download-data",
  data() {
    return {
      myFileList: [],
      search: "",
      //分页对象
      page: {
        pageNumber: 1,
        pageSize: 8,
        total: 0,
      },
    };
  },
  methods: {
    async getMyFileList() {
      const userId = window.sessionStorage.getItem("userId");
      const { data: myFileListRes } = await this.$axios.post(
        "apply/file/list/" + userId
      );
      this.myFileList = myFileListRes.data.fileList;
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
    this.getMyFileList();
  },
};
</script>

<style scoped lang="less">
.downloadData {
  .title {
    font-family: 楷体;
    font-size: large;
    font-weight: bold;
  }
}
</style>
