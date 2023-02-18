<template>
    <div>
        <!-- 添加项目跳转按钮 -->
        <el-button type="primary" @click="showAddProject" size="medium">添加项目</el-button>

        <!-- 项目信息表格 -->
        <el-table :data="projectInfo" style="width: 100%" border stripe> 
            <el-table-column prop="programId" label="项目编号" width="150" align="center">
            </el-table-column>
            <el-table-column prop="programName" label="项目名称" width="auto" align="center">
            </el-table-column>
            <el-table-column label="项目类型" width="auto" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.programTypeId | ProjectType}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="programAuthor" label="项目负责人" width="150" align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'ProjectInfo',
        data() {
            return {
                //项目信息来源，类型：数组
                projectInfo: []
            }
        },
        methods: {
            //获取当前用户项目信息
            async getUserProjectInfo(){
                const {data: userProjectInfo} = await this.$http.get("personal/query/program")
                this.projectInfo = userProjectInfo.data
            },
            //点击添加按钮跳转至添加项目页面
            showAddProject(){
                this.$router.push('/projectInfo/addProject')
            }
        },
        mounted() {
            this.getUserProjectInfo()
        },
    }
</script>

<style scoped>
    .el-table {
        margin-top: 10px;
    }
</style>