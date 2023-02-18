<template>
  <el-card
    shadow="never"
    style="height: 98%; overflow-y: scroll"
    v-if="$route.path === '/metedata'"
  >
    <div slot="header" class="cardHeader">
      <el-page-header @back="$router.back()" content="数据发布" />
      <el-popover
        placement="bottom"
        title="元数据发布流程"
        width="auto"
        trigger="hover"
      >
        <el-link slot="reference" :underline="false" type="primary"
          >查看发布流程</el-link
        >
        <img src="../../assets/images/releaseTip.png" alt="" />
      </el-popover>
      <el-button type="primary" size="small" @click="$router.push('/adddata')"
        >添加元数据</el-button
      >
    </div>
    <div class="metedata">
      <div class="tip">
        <img src="../../assets/images/tip.png" height="50%" alt="" />
        <span style="margin-left: 5px">
          数据保存后初始状态为<span style="color: rgb(233, 30, 99)">草稿</span>
          ，投稿并被管理员接收后进入发布流程，以下为您发布的数据:
        </span>
      </div>

      <el-table
        :data="
          myOriginalData.filter(
            (data) =>
              !myOriginalSearch ||
              data.title.toLowerCase().includes(myOriginalSearch.toLowerCase())
          )
        "
        style="width: 100%; margin-top: 5px"
        :border="true"
        :stripe="true"
        :highlight-current-row="true"
        fit
        lazy
        empty-text="暂无数据"
      >
        <el-table-column
          prop="title"
          label="数据集名称"
          header-align="center"
          width="auto"
        >
        </el-table-column>
        <el-table-column label="共享方式" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.uploadType | originalDataShareWay }}
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.dataState | originalDataState }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="300">
          <template slot="header">
            <el-input
              v-model="myOriginalSearch"
              size="mini"
              placeholder="输入数据集名称搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-popconfirm
              title="确定删除该数据?此操作不可逆"
              @confirm="deleteMyOriginalData(scope.row.dataId)"
            >
              <el-button type="danger" size="mini" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
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
  <router-view v-else-if="$route.path === '/adddata'" />
</template>

<script>
export default {
  name: "mete-data",
  data() {
    return {
      //我发布的元数据
      myOriginalData: [],
      //我发布的元数据搜索条件
      myOriginalSearch: "",
      //分页对象
      page: {
        pageNumber: 1,
        pageSize: 8,
        total: 0,
      },
    };
  },
  methods: {
    //获取用户自己发布的元数据
    async getMyOriginalData() {
      const userId = window.sessionStorage.getItem("userId");
      const { data: myOriginalDataRes } = await this.$axios.get(
        "personal/data/" + userId
      );
      this.myOriginalData = myOriginalDataRes.data;
    },

    //删除元数据方法
    async deleteMyOriginalData(dataId) {
      const { data: deleteOriginalDataRes } = await this.$axios.post(
        "data/del/" + dataId
      );
      if (deleteOriginalDataRes.code !== 200) {
        this.$message.error("删除元数据失败 请重试");
        return;
      }
      //刷新我的元数据
      this.getMyOriginalData();
      this.$message.success("删除元数据成功！");
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
    this.getMyOriginalData();
  },
};
</script>

<style scoped lang="less">
.metedata {
  .tip {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 45px;
  }
}
</style>
