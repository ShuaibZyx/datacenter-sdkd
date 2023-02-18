<template>
  <div>
    <!-- 消息提示部分 -->
    <el-alert title="添加项目" type="success" :closable="false"/>

    <!-- 添加项目表单部分 -->
    <el-form
      :model="projectInfoForm"
      :rules="projectInfoFormRules"
      status-icon
      ref="projectInfoFormRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 项目类型为select下拉框 -->
      <el-form-item label="项目类型:">
        <el-select
          v-model="projectInfoForm.proType"
          placeholder="请选择项目类型"
        >
          <el-option :label="item.typeName" :value="item.typeId" v-for="(item, index) in proTypeArr" :key="index"/>
        </el-select>
      </el-form-item>
      <el-form-item label="项目编号:" prop="proCode">
        <el-input v-model="projectInfoForm.proCode"/>
      </el-form-item>
      <el-form-item label="项目名称:" prop="proName">
        <el-input v-model="projectInfoForm.proName"/>
      </el-form-item>
      <el-form-item label="项目负责人:" prop="proPrin">
        <el-input v-model="projectInfoForm.proPrin"/>
      </el-form-item>
    </el-form>

    <!-- 添加项目表单信息下方按钮 -->
    <el-button
      type="primary"
      size="medium"
      style="margin-left: 10%"
      @click="addProject"
      >保存</el-button
    >
    <el-button size="medium" style="margin-left: 10px" @click="resetFields"
      >取消</el-button
    >
    <el-button
      size="medium"
      type="info"
      style="margin-left: 60%"
      @click="goProjectInfoPage"
      plain
      >返回</el-button
    >
  </div>
</template>

<script>
export default {
    name: 'AddProject',
    data() {
        return {
            //添加项所用的项目信息
            projectInfoForm: {
                proType: '',
                proCode: '',
                proName: '',
                proPrin: '',
            },
            //添加项所用的项目信息的验证规则
            projectInfoFormRules: {
                proType: [
                    { required: true, message: '请选择项目类型', trigger: 'blur' }
                ],
                proCode: [
                    { required: true, message: '请输入项目编号', trigger: 'blur' }
                ],
                proName: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' }
                ],
                proPrin: [
                    { required: true, message: '请输入项目负责人', trigger: 'blur' }
                ],
            },
            //项目类型数组
            proTypeArr:[]
        }
    },
    methods: {
        //获取项目类型
        async getProType(){
            const {data: proType} = await this.$http.get("personal/query/type")
            //将项目类型数据存入data
            this.proTypeArr = proType.data
            //将项目类型数据存入session，便于过滤器使用
            window.sessionStorage.setItem("proTypeArr", JSON.stringify(proType.data))
        },

        //返回按钮跳转至项目信息界面
        goProjectInfoPage() {
            this.$router.push('/projectInfo')
        },

        //取消按钮重置form表单内容
        resetFields() {
            //input置为空
            this.$refs.projectInfoFormRef.resetFields()
            //select置为空
            this.projectInfoForm.proType = ''
        },

        //填写完项目信息后进行表单的预验证并写入数据库
        addProject() {
            this.$refs.projectInfoFormRef.validate(async (valid) => {
                // 验证失败返回
                if (!valid) return
                // 验证通过发起添加项目的请求
                //此处添写axios请求
                const {data: addProjectRes} = await this.$http.post("personal/update/program", {
                    userId: JSON.parse(window.sessionStorage.getItem("user")).uid,
                    programTypeId: this.projectInfoForm.proType,
                    programName: this.projectInfoForm.proName,
                    programNum: this.projectInfoForm.proCode,
                    programAuthor: this.projectInfoForm.proPrin
                })
                if (addProjectRes.code !== 200) {//请求失败
                    this.$message.error('添加项目失败')
                    return
                } else {//请求成功
                    // 显示成功消息
                    this.$message.success('添加项目成功')
                    //添加成功后跳转至项目信息界面
                    this.$router.push('/projectInfo')
                }
            })
        }
    },
    mounted() {
        this.getProType()
    },
}
</script>

<style scoped>
.demo-ruleForm {
  margin: 20px 0;
}

.el-select {
  width: 99%;
}

.el-input {
  width: 99%;
}
</style>
