<template>
  <el-card shadow="never" style="height: 98%; overflow-y: scroll;">
    <div slot="header" class="cardHeader">
      <el-page-header @back="$router.back()" content="我的收藏" />
    </div>
    <div>
      <el-table
        :data="
          favouriteData.filter(
            (data) =>
              !searchFavourite ||
              data.title.toLowerCase().includes(searchFavourite.toLowerCase())
          )
        "
        :border="true"
        :stripe="true"
        :highlight-current-row="true"
        fit
        lazy
        style="width: 100%"
        empty-text="暂无数据"
      >
        <el-table-column
          label="数据集名称"
          header-align="center"
          prop="title"
        />

        <el-table-column label="共享方式" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.uploadType | originalDataShareWay }}
          </template>
        </el-table-column>
        <el-table-column label="数据添加时间" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="300">
          <template slot="header">
            <el-input
              v-model="searchFavourite"
              clearable
              placeholder="输入数据集名称搜索"
              size="mini"
              class="searchInput"
            />
          </template>

          <template slot-scope="scope">
            <el-tooltip effect="light" content="取消收藏" placement="right">
              <el-button
                type="warning"
                icon="el-icon-minus"
                circle
                size="small"
                @click="deleteCollect(scope.row.dataId)"
              />
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
  name: "star-data",
  data() {
    return {
      //我的收藏数据集
      favouriteData: [],
      //搜索条件
      searchFavourite: "",
      //分页对象
      page: {
        pageNumber: 1,
        pageSize: 8,
        total: 0,
      },
    };
  },
  methods: {
    async getMyFavouriteData() {
      const userId = window.sessionStorage.getItem("userId");
      const { data: myFavouriteDataRes } = await this.$axios.get(
        "data/collection/list/" + userId
      );
      if (myFavouriteDataRes.code !== 200) {
        this.$message.error("获取收藏数据集失败");
        return;
      }
      this.favouriteData = myFavouriteDataRes.data.list;
    },

    //取消收藏
    async deleteCollect(dataId) {
      const { data: deleteCollectRes } = await this.$axios.post(
        "data/uncollection",
        {
          userId: window.sessionStorage.getItem("userId"),
          dataId,
        }
      );
      if (deleteCollectRes.code !== 200) {
        this.$message.error("操作失败!请重试");
        return;
      }
      this.$message.success("取消收藏成功!");
      this.getMyFavouriteData();
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
    this.getMyFavouriteData();
  },
};
</script>

<style scoped lang="less"></style>
