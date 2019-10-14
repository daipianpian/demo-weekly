<template>
  <div class="weekly-wrap">
    <!-- 搜索框 start -->
    <el-form class="main-search" :inline="true" :model="searchKeywords" ref="searchKeywords" label-position="left" label-width="85px" size="medium">
      <el-row>
        <el-col :span="6">
          <el-form-item label="周报ID" prop="adminId">
            <el-input type="number" v-model.number="searchKeywords.adminId" placeholder="请输入周报ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="周报名称" prop="adminName">
            <el-select v-model="searchKeywords.adminName" placeholder="请选择周报名称">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户ID" prop="adminId">
            <el-input type="number" v-model.number="searchKeywords.adminId" placeholder="请输入周报ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开始时间" prop="adminId">
            <el-input type="number" v-model.number="searchKeywords.adminId" placeholder="请输入周报ID"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="adminId">
            <el-input type="number" v-model.number="searchKeywords.adminId" placeholder="请输入周报ID"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="onReset('searchKeywords')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 搜索框 end -->

    <!-- 分割线 start -->
    <div class="hr-10"></div>
    <!-- 分割线 end -->

    <div class="main-content">
      <div class="content-header">
        <el-button type="primary" size="medium" @click="handleAdd">新增周报</el-button>
      </div>
      <el-table :data="tableData" header-row-class-name="table-header" border style="width: 100%">
        <el-table-column prop="id" label="ID" align="center">
        </el-table-column>
        <el-table-column prop="" label="名称" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="goWeeklyDetails(scope.row.id)">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="" label="身份" align="center"></el-table-column>
        <el-table-column prop="" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="" label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增用户 start -->
    <Add v-if="showFlag.add" ref="add" @addCallBack="callBackAdd"/>
    <!-- 新增用户 end -->

    <!-- 编辑用户 start -->
    <Edit v-if="showFlag.edit" ref="edit" @editCallBack="callBackEdit"/>
    <!-- 编辑用户 end -->

  </div>
</template>

<script>
import Add from '@/components/Weekly/Add'
import Edit from '@/components/Weekly/Edit'
export default {
  data () {
    return {
      searchKeywords: {},
      tableData: [
        { 'id': 1, 'title': '第一周' },
        { 'id': 2, 'title': '第二周' }
      ],
      showFlag: {
        add: false,
        edit: false
      }
    }
  },
  components: {
    Add,
    Edit
  },
  methods: {
    onSearch () {},
    onReset (formName) {
      this.$refs[formName].resetFields()
    },
    handleAdd () {
      this.showFlag.add = true
      this.$nextTick(() => {
        this.$refs.add.init()
      })
    },
    goWeeklyDetails (weeklyId) {
      this.$router.push({
        path: '/home/weeklydetails',
        query: {
          weeklyId: weeklyId
        }
      })
    },
    handleEdit (weeklyId) {
      this.showFlag.edit = true
      this.$nextTick(() => {
        this.$refs.edit.init(weeklyId)
      })
    },
    handleDelete () {
      this.$common.msgBox('confirm', '操作提示', '是否确定删除此条周报信息？', () => {
        console.log('确定')
      })
    },
    updateState () {},
    // 新增管理员子组件回调
    callBackAdd () {},
    // 编辑管理员子组件回调
    callBackEdit () {}
  }
}
</script>

<style lang="scss">
.quill-editor { height: 200px;
  .ql-container { height: 70%; }
  .limit { height: 30px; border: 1px solid #ccc; line-height: 30px; text-align: right; }
  .limit span { color: #ee2a7b; }
  .ql-snow .ql-editor img { max-width: 480px; }
  .ql-editor .ql-video { max-width: 480px; }
}

.week-time{
  .title{margin-left: 25px;}
  .line{display: inline-block; width: 26px;}
}
</style>
