<template>
  <el-card shadow="never" style="height: 98%; overflow-y: scroll">
    <div slot="header" class="cardHeader">
      <el-page-header @back="$router.back()" content="添加元数据" />
      <el-link icon="el-icon-close" @click="$router.back()"></el-link>
    </div>
    <!-- 页头标题 -->
    <div id="edit">
      <!-- 内容表单 -->
      <el-form
        :model="addForm"
        ref="addForm"
        status-icon
        label-width="auto"
        label-suffix=":"
        :rules="addRules"
      >
        <!-- 选择数据分类 -->
        <el-form-item label="数据分类">
          <el-select
            v-model="addForm.dataSort"
            placeholder="请选择数据分类"
            style="width: 100%"
          >
            <el-option
              v-for="item in datasort"
              :key="item.themeId"
              :label="item.themeName"
              :value="item.themeId"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 填写标题 -->
        <el-form-item label="中文标题" prop="title">
          <el-input v-model="addForm.title" placeholder="请输入中文标题" />
        </el-form-item>

        <!-- 数据摘要 -->
        <el-form-item label="数据摘要">
          <el-input
            type="textarea"
            v-model="addForm.dataSummary"
            style="width: 100%"
            maxlength="2000"
            show-word-limit
            :rows="5"
            placeholder="简要说明数据的生产背景、生产方法，及数据内容（括数据包含要素，时空范围，时空分辨率，命名方法，经度等)，同时可对数据较同类数定的优势或特点、及应用范围加以说明(2000字内)"
          />
        </el-form-item>

        <!-- 数据源描述 -->
        <el-form-item label="数据源描述">
          <el-input
            type="textarea"
            v-model="addForm.dataDescribe"
            style="width: 100%"
            maxlength="200"
            show-word-limit
            placeholder="如果是来自文献、资料等，将数据源列表;如果是镜像、购买、交换、下载数据，要说明出处;如果是试会、观测、调查数据，要说明相关的仪器、设备、方法、过程的基本信息(200宇字内)"
          />
        </el-form-item>

        <!-- 数据加工方法 -->
        <el-form-item label="数据加工方法">
          <el-input
            type="textarea"
            v-model="addForm.processMethod"
            style="width: 100%"
            maxlength="500"
            :rows="3"
            show-word-limit
            placeholder="如果是属性数据、文本数据要写明数字化手段;如果是空间数据要写明数据数字化工具和简单流程;如果是经过数学运算、或模型产生的数据要交符清楚数学运算的算法和模型，并注明算法和模型的出处(500字内)"
          />
        </el-form-item>

        <!-- 数据质量描述 -->
        <el-form-item label="数据质量描述">
          <el-input
            type="textarea"
            v-model="addForm.dataQuality"
            style="width: 100%"
            maxlength="2000"
            :rows="5"
            show-word-limit
            placeholder="加工后数据精度;项目数据产生和汇集过程中的相关质量控制措施，包括完整的数据产生过程、使用的方法(2000字内)"
          />
        </el-form-item>

        <!-- 数据采集时间 -->
        <el-form-item label="数据采集时间">
          <el-date-picker
            v-model="addForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            style="width: 50%"
          >
          </el-date-picker>
        </el-form-item>

        <!-- 数据采集地点 -->
        <el-form-item prop="dataAddress" label="数据采集地点">
          <el-input
            v-model="addForm.dataAddress"
            type="textarea"
            maxlength="500"
            show-word-limit
            placeholder="数据采集地点(500字内)"
          />
        </el-form-item>

        <!-- 数据格式 -->
        <el-form-item prop="dataFormat" label="数据格式">
          <el-input
            v-model="addForm.dataFormat"
            placeholder="请对数据格式的简要说明"
          />
        </el-form-item>

        <p style="color: rgb(0, 80, 179); font-size: 10px; margin-left: 0px">
          仅限于空间数据填写，地理范围经纬度输入为度的浮点格式(xxx.xxx)或度分秒格式(dd°mm'ss").
        </p>

        <el-row>
          <el-col :span="8">
            <!-- 地理范围东 -->
            <el-form-item label="地理范围东">
              <el-input
                v-model="addForm.East"
                oninput="(value = value.replace(/[^0-9.]/g, ''))"
                style="width: 315px; height: 30px"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <!-- 地理范围西 -->
            <el-form-item label="地理范围西">
              <el-input
                v-model="addForm.West"
                oninput="(value = value.replace(/[^0-9.]/g, ''))"
                style="width: 315px; height: 30px"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <!-- 海拔下界 -->
            <el-form-item label="海拔下界">
              <el-input
                v-model="addForm.minLimit"
                oninput="(value = value.replace(/[^0-9.]/g, ''))"
                style="width: 175px; height: 30px"
                placeholder="单位：米"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <!-- 地理范围北 -->
            <el-form-item label="地理范围北">
              <el-input
                v-model="addForm.North"
                oninput="(value = value.replace(/[^0-9.]/g, ''))"
                style="width: 315px; height: 30px"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="地理范围南">
              <el-input
                v-model="addForm.South"
                oninput="(value = value.replace(/[^0-9.]/g, ''))"
                style="width: 315px; height: 30px"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <!-- 海拔上界 -->
            <el-form-item label="海拔上界">
              <el-input
                v-model="addForm.maxLimit"
                oninput="(value = value.replace(/[^0-9.]/g, ''))"
                style="width: 175px; height: 30px"
                placeholder="单位：米"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 空间分辨率 -->
        <el-form-item label="空间分辨率">
          <el-input
            v-model="addForm.spatialResolution"
            placeholder="xx千米, xx米,xx平方公里, xx度..."
          />
        </el-form-item>

        <!-- 时间分辨率 -->
        <el-form-item label="时间分辨率">
          <el-input
            v-model="addForm.timeResolution"
            placeholder="年/月/日/时/分/秒/..."
          />
        </el-form-item>

        <!-- 地理坐标系 -->
        <el-form-item prop="location" label="地理坐标系">
          <el-select
            v-model="addForm.location"
            class="language"
            style="width: 100%"
            placeholder="请选择地理坐标系"
          >
            <el-option
              v-for="(item, index) in datalocation"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 投影方式 -->
        <el-form-item label="投影方式">
          <el-input
            v-model="addForm.projectionMode"
            placeholder="请输入投影方式"
          />
        </el-form-item>

        <!-- 选择添加时间 -->
        <el-form-item label="时间">
          <el-input
            v-model="addForm.time"
            size="small"
            placeholder="填写数据的年份,如: 2012,2013,2014或1990-1998"
            clearable
            prefix-icon="el-icon-date"
          ></el-input>
        </el-form-item>

        <!-- 选择添加地点 -->
        <el-form-item label="地点">
          <el-input
            v-model="addForm.address"
            size="small"
            placeholder="填写数据的地点关键词,如:甘肃省,金昌市，金川区"
            clearable
            prefix-icon="el-icon-position"
          ></el-input>
        </el-form-item>

        <!-- 添加项目支持信息 -->
        <el-form-item label="项目支持信息">
          <el-row>
            <el-button
              type="primary"
              @click="dialogProjectVisible = true"
              size="small"
            >
              添加新的项目支持信息
            </el-button>
          </el-row>
          <el-row>
            <span
              style="color: rgb(0, 80, 179); font-size: 10px; margin-left: 0px"
            >
              本数据由以下项目支持
            </span>
          </el-row>
          <el-table
            :data="addForm.projectSupport"
            :border="true"
            :stripe="true"
            style="width: 100%"
            height="250"
            fit
            lazy
            empty-text="暂无支持项目"
          >
            <el-table-column prop="id" label="项目编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="项目名称" align="center">
            </el-table-column>
            <el-table-column prop="type" label="项目类型" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="deleteData(scope.row.id, 'project')"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <!-- 添加数据贡献者 -->
        <el-form-item label="数据贡献者">
          <el-row>
            <el-button
              type="primary"
              @click="dialogDonateVisible = true"
              size="small"
            >
              添加新的数据贡献者
            </el-button>
          </el-row>

          <el-row>
            <span
              style="color: rgb(0, 80, 179); font-size: 10px; margin-left: 0px"
            >
              数据贡献者列表(按输入提示选择已有贡献者，或点击按钮添加新的数据贡献者)
            </span>
          </el-row>
          <el-table
            :data="addForm.dataContributer"
            height="250"
            fit
            :border="true"
            :stripe="true"
            lazy
            empty-text="暂无数据贡献者"
          >
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="company" label="单位" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" align="center">
            </el-table-column>
            <el-table-column prop="tel" label="电话" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  round
                  size="small"
                  @click="deleteData(scope.row.email, 'contribute')"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <!-- 添加元数据作者 -->
        <el-form-item label="元数据作者">
          <el-row>
            <el-button
              type="primary"
              @click="dialogAuthorVisible = true"
              size="small"
            >
              添加新的元数据作者
            </el-button>
          </el-row>

          <el-row>
            <span
              style="color: rgb(0, 80, 179); font-size: 10px; margin-left: 0px"
            >
              元数据作者列表(按输入提示选择已有数据工作者，或点击按钮添加新的元数据作者)
            </span>
          </el-row>
          <el-table
            :data="addForm.metaDataAuthor"
            :border="true"
            :stripe="true"
            height="250"
            style="width: 100%"
            fit
            lazy
            empty-text="暂无作者"
          >
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="company" label="单位" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" align="center">
            </el-table-column>
            <el-table-column prop="tel" label="电话" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="deleteData(scope.row.email, 'author')"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <!-- 添加数据管理者 -->
        <el-form-item label="数据管理者">
          <el-row>
            <el-button
              type="primary"
              @click="dialogWorkerVisible = true"
              size="small"
            >
              添加数据管理者
            </el-button>
          </el-row>

          <el-row>
            <span
              style="color: rgb(0, 80, 179); font-size: 10px; margin-left: 0px"
            >
              数据管理者列表(按输入提示选择已有数据工作者，或点击按钮添加新的数据管理者)
            </span>
          </el-row>
          <el-table
            :border="true"
            :stripe="true"
            style="width: 100%"
            height="250"
            :data="addForm.dataManagers"
            fit
            empty-text="暂无数据管理者"
            lazy
          >
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="company" label="单位" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" align="center">
            </el-table-column>
            <el-table-column prop="tel" label="电话" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="deleteData(scope.row.email, 'manager')"
                  >移除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <!-- 数据使用说明 -->
        <el-form-item label="数据使用说明">
          <el-input
            type="textarea"
            v-model="addForm.useTip"
            autocomplete="off"
            style="width: 100%"
            maxlength="1000"
            :rows="3"
            show-word-limit
            placeholder="数据使用过程中如需特殊处理或对软硬件环境有特殊要求，请在此处说明"
          />
        </el-form-item>

        <!-- 数据共享方式 -->
        <el-form-item label="数据共享方式">
          <el-select
            v-model="addForm.uploadType"
            filterable
            placeholder="请选择数据共享方式"
            style="width: 100%"
          >
            <el-option
              v-for="item in uploadType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 上传缩略图 -->
        <el-form-item label="上传文件缩略图片">
          <el-upload
            action="axios://43.140.194.25:8081/upload/file"
            :class="{
              hide: coverFileList.length === 1,
            }"
            :data="{
              creator,
            }"
            name="file"
            :on-success="handleCoverFileSuccess"
            :on-change="handleCoverFileChange"
            :accept="uploadFileTypeLimits.image"
            list-type="picture-card"
            :file-list="coverFileList"
            :auto-upload="false"
            ref="uploadCoverFile"
          >
            <i slot="default" class="el-icon-plus" style="font-size: 0.7em"
              >文件缩略图</i
            >
            <div slot="file" slot-scope="{ file }">
              <el-image
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                fit="cover"
              />
              <el-tooltip
                :content="file.name"
                placement="bottom"
                effect="light"
              >
                <span class="el-upload-list__item-actions">
                  <el-tooltip content="预览" placement="top" effect="light">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handleCoverFilePreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                  </el-tooltip>
                  <el-tooltip content="下载" placement="top" effect="light">
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleFileDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                  </el-tooltip>
                  <el-tooltip content="删除" placement="top" effect="light">
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleCoverFileRemove()"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </el-tooltip>
                </span>
              </el-tooltip>
              <!-- 缩略图预览所用dialog -->
              <el-dialog :visible.sync="previewDialogVisible">
                <div slot="title" class="title">
                  <i class="el-icon-picture-outline">{{ file.name }}</i>
                  <span> 缩略图预览</span>
                </div>
                <el-image
                  fit="cover"
                  width="100%"
                  :src="dialogImageUrl"
                  alt=""
                />
              </el-dialog>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="上传资料文件">
          <el-upload
            class="upload-demo"
            action="axios://43.140.194.25:8081/upload/file"
            name="file"
            :data="{
              creator,
            }"
            :on-success="handleFileSuccess"
            :on-remove="handleRemoveFile"
            :on-change="handleChangeFile"
            :limit="1"
            :auto-upload="false"
            ref="uploadFile"
          >
            <el-button v-show="!uploadFileVisiable" size="small" type="primary"
              >点击选择文件</el-button
            >
            <div slot="tip">注意:只能上传一个文件</div>
          </el-upload>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <div class="metaDataSubmit">
            <span class="title">
              请先点击"上传文件"按钮后再点击"保存数据"按钮,否则文件数据将无法保存
            </span>
            <div class="btns">
              <el-button type="primary" size="small" @click="uploadFile"
                >上传文件</el-button
              >
              <el-button type="primary" size="small" @click="submitData"
                >保存数据</el-button
              >
            </div>
          </div>
        </el-form-item>
      </el-form>

      <!-- 添加项目信息弹窗 -->
      <el-dialog
        title="添加项目"
        :visible.sync="dialogProjectVisible"
        width="500px"
        @close="resetProjectForm"
        :append-to-body="true"
      >
        <el-form
          :model="projectForm"
          status-icon
          :rules="projectRules"
          class="demo-ruleForm"
          ref="projectForm"
        >
          <el-form-item label="项目类型" label-width="100px">
            <el-select
              v-model="projectForm.type"
              placeholder="请选项目类型"
              style="width: 300px"
            >
              <el-option
                v-for="item in projectType"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称" label-width="100px" prop="name">
            <el-input
              v-model="projectForm.name"
              style="width: 300px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogProjectVisible = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="addProjectForm"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!-- 添加数据贡献者弹窗 -->
      <el-dialog
        title="添加数据贡献者"
        :visible.sync="dialogDonateVisible"
        width="500px"
        @close="resetDonateForm"
      >
        <el-form :model="donateForm" :rules="donateRules" ref="donateForm">
          <el-form-item label="姓名" label-width="100px">
            <el-input v-model="donateForm.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="英文名" label-width="100px">
            <el-input
              v-model="donateForm.englishName"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位" label-width="100px">
            <el-input
              v-model="donateForm.company"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位英文名称" label-width="100px">
            <el-input
              v-model="donateForm.englishCompany"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px">
            <el-input
              v-model="donateForm.email"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100px">
            <el-input v-model="donateForm.tel" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogDonateVisible = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="addContributerForm"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!-- 添加元数据作者弹窗 -->
      <el-dialog
        title="添加元数据作者"
        :visible.sync="dialogAuthorVisible"
        width="500px"
        @close="resetAuthorForm"
      >
        <el-form :model="authorForm" :rules="donateRules" ref="authorForm">
          <el-form-item label="姓名" label-width="100px" prop="name">
            <el-input v-model="authorForm.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="英文名" label-width="100px">
            <el-input
              v-model="authorForm.englishName"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位" label-width="100px" prop="company">
            <el-input
              v-model="authorForm.company"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位英文名称" label-width="100px">
            <el-input
              v-model="authorForm.englishCompany"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px" prop="email">
            <el-input
              v-model="authorForm.email"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100px" prop="tel">
            <el-input v-model="authorForm.tel" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogAuthorVisible = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="addAuthorForm"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!-- 添加数据管理者弹窗 -->
      <el-dialog
        title="添加项目"
        :visible.sync="dialogWorkerVisible"
        width="500px"
        @close="resetManagerForm"
      >
        <el-form :model="workerForm" :rules="donateRules" ref="workerFormRef">
          <el-form-item label="姓名" label-width="100px" prop="name">
            <el-input v-model="workerForm.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="英文名" label-width="100px">
            <el-input
              v-model="workerForm.englishName"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位" label-width="100px" prop="company">
            <el-input
              v-model="workerForm.company"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位英文名称" label-width="100px">
            <el-input
              v-model="workerForm.englishCompany"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px" prop="email">
            <el-input
              v-model="workerForm.email"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100px" prop="tel">
            <el-input v-model="workerForm.tel" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogWorkerVisible = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="addWorkerForm"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "add-data",
  data() {
    return {
      addForm: {
        dataSort: "", //数据分类
        title: "", //中文标题
        dataSummary: "", //数据摘要
        dataDescribe: "", //数据源描述
        processMethod: "", //数据加工方法
        dataQuality: "", //数据质量描述
        date: "", //数据采集时间
        dataAddress: "", //数据采集地点
        dataFormat: "", //数据格式
        East: "", //地理范围东
        West: "", //地理范围西
        North: "", //地理范围北
        South: "", //地理范围南
        maxLimit: "", //海拔上界
        minLimit: "", //海拔下界
        spatialResolution: "", //空间分辨率
        timeResolution: "", //时间分辨率
        location: "", //地理坐标系
        projectionMode: "", //投影方式
        imgUrl: "", //图片上传后的地址
        dataFile: "", //文件上传后的地址
        time: "", //时间
        address: "", //地点数组
        projectSupport: [], //元数据支持的项目数组
        dataContributer: [], //元数据贡献者
        metaDataAuthor: [], //元数据作者数组
        dataManagers: [], //元数据管理者数组
        uploadType: "", //数据共享方式
        useTip: "", //数据使用说明
        uploadUser: "", //当前用户id
      },
      //预览大图url
      dialogImageUrl: "",

      //控制预览大图Dialog可见
      previewDialogVisible: false,

      dialogProjectVisible: false, //添加项目弹窗可见性
      dialogDonateVisible: false, //添加数据贡献者弹窗可见性
      dialogAuthorVisible: false, //添加元数据作者弹窗可见性
      dialogWorkerVisible: false, //添加数据管理者弹窗可见性

      //添加项目表单
      projectForm: {
        type: "",
        id: "",
        name: "",
      },

      //添加数据贡献者表单
      donateForm: {
        name: "",
        company: "",
        email: "",
        tel: "",
        englishName: "",
        englishCompany: "",
      },

      //添加元数据作者表单
      authorForm: {
        name: "",
        company: "",
        email: "",
        tel: "",
        englishName: "",
        englishCompany: "",
      },

      //添加数据管理者表单
      workerForm: {
        name: "",
        company: "",
        email: "",
        tel: "",
        englishName: "",
        englishCompany: "",
      },

      //添加项目信息表单验证
      projectRules: {
        id: [{ required: true, message: "项目编号不能为空", tigger: "change" }],
        name: [
          { required: true, message: "项目名称不能为空", tigger: "change" },
        ],
      },

      //添加数据贡献者、元数据作者、数据管理者信息表单验证
      donateRules: {
        name: [{ required: true, message: "姓名不能为空", tigger: "change" }],
        company: [
          { required: true, message: "单位不能为空", tigger: "change" },
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入正确的邮箱",
            tigger: "change",
          },
        ],
      },

      //添加元数据表单验证
      addRules: {
        title: [{ required: true, message: "请选择数据分类", tigger: "blur" }],
      },

      //上传的图片地址数组
      imgUrlArr: [],

      datalanguage: [
        {
          value: "中文",
          label: "中文",
        },
        {
          value: "英语",
          label: "英语",
        },
      ],
      //数据主题
      datasort: [],
      //坐标系
      datalocation: [
        {
          value: "无",
          label: "无",
        },
        {
          value: "WGS84",
          label: "WGS84",
        },
        {
          value: "BJZ54",
          label: "BJZ54",
        },
        {
          value: "Xi-An-80",
          label: "Xi-An-80",
        },
        {
          value: "CGCS2000",
          label: "CGCS2000",
        },
        {
          value: "Krasovsky1940",
          label: "Krasovsky1940",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      projectType: [],
      //数据共享方式
      uploadType: [
        {
          value: 0,
          label: "离线共享",
        },
        {
          value: 1,
          label: "在线共享",
        },
      ],
      //上传文件按钮的可见性
      uploadFileVisiable: false,
      //上传的缩略图封面绑定数组
      coverFileList: [],
    };
  },

  computed: {
    //不同类型的可上传文件列表
    uploadFileTypeLimits() {
      return this.$store.state.uploadFileTypeLimits;
    },

    creator() {
      return window.sessionStorage.getItem("userId");
    },
  },

  methods: {
    //获得主题数据分类
    async getThemeDataCategory() {
      const { data: themeRes } = await this.$axios.get("theme/query/all");
      this.datasort = themeRes.data;
    },

    async getProjectType() {
      const { data: projectTypeRes } = await this.$axios.get(
        "personal/query/type"
      );
      this.projectType = projectTypeRes.data;
    },

    //处理文件上传成功后的操作
    handleFileSuccess(response) {
      this.addForm.dataFile = response.data;
      this.$message.success("文件已上传");
    },

    //从文件列表移除文件的方法
    handleRemoveFile(file, fileList) {
      this.$refs.uploadFile.uploadFiles.pop();
      this.uploadFileVisiable = false;
    },

    //添加至文件列表时触发方法
    handleChangeFile(file, fileList) {
      if (fileList.length > 0) this.uploadFileVisiable = true;
    },

    //处理图片上传成功后的操作
    handleCoverFileSuccess(response, file, fileList) {
      this.$message({
        message: "文件已上传",
        center: true,
        type: "success",
        duration: 1500,
        showClose: true,
      });
      this.addForm.imgUrl = response.data;
      this.$refs.uploadCoverFile.uploadFiles.pop();
      this.coverFileList.pop();
    },

    //上传的封面文件数组发生变化时
    handleCoverFileChange(file) {
      const fileType = file.name.substring(file.name.lastIndexOf("."));
      const typeList = this.uploadFileTypeLimits.image.split(",");
      //图片文件小于1M
      const size = file.size / 1024 / 1024 < 2;
      if (!typeList.includes(" " + fileType) || !size) {
        this.$message({
          message: "仅允许上传小于2M的图片类型文件",
          center: true,
          type: "warning",
        });
        this.$refs.uploadCoverFile.uploadFiles.pop();
        return;
      }
      this.coverFileList = this.$refs.uploadCoverFile.uploadFiles;
    },

    //处理图片预览事件
    handleCoverFilePreview(file) {
      this.dialogImageUrl = file.url;
      this.previewDialogVisible = true;
    },

    //处理图片下载
    handleFileDownload(file) {
      let tempa = document.createElement("a");
      tempa.href = file.url;
      tempa.download = file.name;
      document.body.append(tempa);
      tempa.click();
      tempa.remove();
    },

    //处理已经上传的图片删除事件
    handleCoverFileRemove() {
      this.$refs.uploadCoverFile.uploadFiles.pop();
      this.coverFileList.pop();
    },

    //上传文件方法
    uploadFile() {
      this.$refs.uploadCoverFile.submit();
      this.$refs.uploadFile.submit();
    },

    //数据表格移除事件
    deleteData(key, type) {
      if (type === "project") {
        for (let i = 0; i < this.addForm.projectSupport.length; i++) {
          if (this.addForm.projectSupport[i].id === key) {
            this.addForm.projectSupport.splice(i, 1);
            this.$message.success("已移除该项目");
            return;
          }
        }
      } else if (type === "contribute") {
        for (let i = 0; i < this.addForm.dataContributer.length; i++) {
          if (this.addForm.dataContributer[i].email === key) {
            this.addForm.dataContributer.splice(i, 1);
            this.$message.success("已移除该数据贡献者");
            return;
          }
        }
      } else if (type === "author") {
        for (let i = 0; i < this.addForm.metaDataAuthor.length; i++) {
          if (this.addForm.metaDataAuthor[i].email === key) {
            this.addForm.metaDataAuthor.splice(i, 1);
            this.$message.success("已移除该数据作者");
            return;
          }
        }
      } else if (type === "manager") {
        for (let i = 0; i < this.addForm.dataManagers.length; i++) {
          if (this.addForm.dataManagers[i].email === key) {
            this.addForm.dataManagers.splice(i, 1);
            this.$message.success("已移除该数据管理者");
            return;
          }
        }
      } else {
        this.$message.error("参数错误！");
        return;
      }
    },

    //关闭添加项目支持Dialog触发事件，重置验证规则以及表单内容
    resetProjectForm() {
      this.$refs.projectForm.resetFields();
      this.projectForm.type = "";
      this.projectForm.id = "";
      this.projectForm.name = "";
    },

    //关闭添加数据贡献者Dialog触发事件，重置验证规则以及表单内容
    resetDonateForm() {
      this.$refs.donateForm.resetFields();
      this.donateRules.name = "";
      this.donateRules.company = "";
      this.donateRules.email = "";
      this.donateRules.tel = "";
    },

    //关闭添加数据管理者Dialog触发事件，重置验证规则以及表单内容
    resetManagerForm() {
      this.$refs.workerFormRef.resetFields();
      this.workerForm.name = "";
      this.workerForm.company = "";
      this.workerForm.email = "";
      this.workerForm.tel = "";
    },

    //关闭添加原数组作者Dialog触发事件，重置验证规则以及表单内容
    resetAuthorForm() {
      this.$refs.authorForm.resetFields();
      this.authorForm.name = "";
      this.authorForm.company = "";
      this.authorForm.email = "";
      this.authorForm.tel = "";
    },

    //添加数据贡献者方法
    addContributerForm() {
      this.$refs.donateForm.validate((valid) => {
        if (!valid) {
          this.$message.info("请完成必填项");
          return;
        }
        for (let i = 0; i < this.addForm.dataContributer.length; i++) {
          if (this.addForm.dataContributer[i].email === this.donateForm.email) {
            this.$message.info("该数据贡献者已添加");
            return;
          }
        }
        this.addForm.dataContributer.push(Object.assign({}, this.donateForm));
        this.$message.success("添加数据贡献者成功");
        this.dialogDonateVisible = false;
      });
    },

    //添加元数据作者方法
    addAuthorForm() {
      this.$refs.authorForm.validate((valid) => {
        if (!valid) {
          this.$message.info("请完成必填项");
          return;
        }
        for (let i = 0; i < this.addForm.metaDataAuthor.length; i++) {
          if (this.addForm.metaDataAuthor[i].email === this.authorForm.email) {
            this.$message.info("该作者已添加");
            return;
          }
        }
        this.addForm.metaDataAuthor.push(Object.assign({}, this.authorForm));
        this.$message.success("添加元数据作者成功");
        this.dialogAuthorVisible = false;
      });
    },

    //添加项目支持方法
    addProjectForm() {
      this.$refs.projectForm.validate((valid) => {
        if (!valid) {
          this.$message.info("请完成必填项");
          return;
        }
        for (let i = 0; i < this.addForm.projectSupport.length; i++) {
          if (this.addForm.projectSupport[i].id === this.projectForm.id) {
            this.$message.info("该项目已添加");
            return;
          }
        }
        this.projectForm.id = this.guid().slice(0, 15);
        this.addForm.projectSupport.push(Object.assign({}, this.projectForm));
        this.$message.success("添加支持项目成功");
        this.dialogProjectVisible = false;
      });
    },

    //添加数据管理者方法
    addWorkerForm() {
      this.$refs.workerFormRef.validate((valid) => {
        if (!valid) {
          this.$message.info("请完成必填项");
          return;
        }
        for (let i = 0; i < this.addForm.dataManagers.length; i++) {
          if (this.addForm.dataManagers[i].email === this.workerForm.email) {
            this.$message.info("该数据管理者已添加");
            return;
          }
        }
        this.addForm.dataManagers.push(Object.assign({}, this.workerForm));
        this.$message.success("添加数据管理者成功");
        this.dialogWorkerVisible = false;
      });
    },

    //最后点击提交元数据的方法
    submitData() {
      this.$refs.addForm.validate(async (valid) => {
        if (!valid) {
          this.$message.info("您还有必填项未完成 请重新检查");
          return;
        }
        //新建对象并将对应字段填入
        var dataObj = {
          dataSort: this.addForm.dataSort,
          title: this.addForm.title,
          summary: this.addForm.dataSummary,
          dataDescribe: this.addForm.dataDescribe,
          method: this.addForm.processMethod,
          qualityDesc: this.addForm.dataQuality,
          beginTime: this.addForm.date[0],
          endTime: this.addForm.date[1],
          dataCollectionPlace: this.addForm.dataAddress,
          dataFormat: this.addForm.dataFormat,
          locationId: "",
          photo: this.addForm.imgUrl,
          dataFile: this.addForm.dataFile,
          dataTime: this.addForm.time,
          place: this.addForm.address,
          supportMsg: [],
          contributeAuth: [],
          author: [],
          manager: [],
          dataTip: this.addForm.useTip,
          uploadType: this.addForm.uploadType,
          uploadUser: window.sessionStorage.getItem("userId"),
        };
        //判断四个表格数据是否填写
        //元数据贡献者
        if (this.addForm.dataContributer.length > 0) {
          for (let i = 0; i < this.addForm.dataContributer.length; i++) {
            var dataContributerObj = {
              realName: this.addForm.dataContributer[i].name,
              company: this.addForm.dataContributer[i].company,
              mailbox: this.addForm.dataContributer[i].email,
              phone: this.addForm.dataContributer[i].phone,
              englishName: this.addForm.dataContributer[i].englishName,
              englishCompany: this.addForm.dataContributer[i].englishCompany,
            };
            const { data: uploadDataContributerRes } = await this.$axios.post(
              "data/upload/auth",
              dataContributerObj
            );
            dataObj.contributeAuth.push(uploadDataContributerRes.data);
          }
        }

        //元数据作者
        if (this.addForm.metaDataAuthor.length > 0) {
          for (let i = 0; i < this.addForm.metaDataAuthor.length; i++) {
            var metaDataAuthorObj = {
              realName: this.addForm.metaDataAuthor[i].name,
              company: this.addForm.metaDataAuthor[i].company,
              mailbox: this.addForm.metaDataAuthor[i].email,
              phone: this.addForm.metaDataAuthor[i].phone,
              englishName: this.addForm.metaDataAuthor[i].englishName,
              englishCompany: this.addForm.metaDataAuthor[i].englishCompany,
            };
            const { data: uploadMetaDataAuthorRes } = await this.$axios.post(
              "data/upload/auth",
              metaDataAuthorObj
            );
            dataObj.author.push(uploadMetaDataAuthorRes.data);
          }
        }

        //元数据管理者
        if (this.addForm.dataManagers.length > 0) {
          for (let i = 0; i < this.addForm.dataManagers.length; i++) {
            var dataManagerObj = {
              realName: this.addForm.dataManagers[i].name,
              company: this.addForm.dataManagers[i].company,
              mailbox: this.addForm.dataManagers[i].email,
              phone: this.addForm.dataManagers[i].phone,
              englishName: this.addForm.dataManagers[i].englishName,
              englishCompany: this.addForm.dataManagers[i].englishCompany,
            };
            const { data: uploadDataManagersRes } = await this.$axios.post(
              "data/upload/auth",
              dataManagerObj
            );
            dataObj.manager.push(uploadDataManagersRes.data);
          }
        }

        //元数据项目支持
        if (this.addForm.projectSupport.length > 0) {
          for (let i = 0; i < this.addForm.projectSupport.length; i++) {
            var projectSupportObj = {
              programSortId: this.addForm.projectSupport[i].type,
              programId: this.addForm.projectSupport[i].id,
              programName: this.addForm.projectSupport[i].name,
            };
            const { data: supportProjectRes } = await this.$axios.post(
              "data/upload/supportMsg",
              projectSupportObj
            );
            dataObj.supportMsg.push(supportProjectRes.data);
          }
        }
        //地理位置
        //地理位置对象
        var locationObj = {
          east: parseFloat(this.addForm.East),
          west: parseFloat(this.addForm.West),
          south: parseFloat(this.addForm.South),
          north: parseFloat(this.addForm.North),
          up: parseFloat(this.addForm.maxLimit),
          down: parseFloat(this.addForm.minLimit),
          spatialResolution: this.addForm.spatialResolution,
          timeResolution: this.addForm.timeResolution,
          locationSystem: this.addForm.location,
          projectionMode: this.addForm.projectForm,
        };
        const { data: locationRes } = await this.$axios.post(
          "data/upload/location",
          locationObj
        );
        //将获取到的地理位置id存入对象中
        dataObj.locationId = locationRes.data;
        const { data: addRes } = await this.$axios.post(
          "data/personal/upload",
          dataObj
        );
        if (addRes.code !== 200) {
          this.$message.error("元数据保存失败");
          return;
        }
        this.$message.success("元数据保存成功!");
      });
    },

    //获取唯一id的方法
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
  },
  mounted() {
    this.getThemeDataCategory();
    this.getProjectType();
  },
};
</script>

<style scoped lang="less">
.end-button {
  padding: 0 20px;
  color: white;
  background-color: rgb(16, 142, 233);
  height: 38px;
  line-height: 30px;
  border: none;
  border-radius: 4px;
}

.metaDataSubmit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: auto;
}
.metaDataSubmit .title {
  margin: 10px;
  font-size: 1.2em;
  line-height: 1.3em;
  font-family: 楷体;
  color: rgb(76, 76, 76);
  font-weight: bold;
}
.metaDataSubmit .btns {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
