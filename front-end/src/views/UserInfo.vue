<template>
  <div class="userinfo-wrap">
    <!-- 搜索框 start -->
    <el-form class="main-search" :inline="true" :model="searchKeywords" ref="searchKeywords" label-position="left" label-width="85px" size="medium">
      <el-row>
        <el-col :span="6">
          <el-form-item label="管理员ID" prop="adminId">
            <el-input type="number" v-model.number="searchKeywords.adminId" placeholder="请输入管理员ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="管理员名称" prop="adminName">
            <el-select v-model="searchKeywords.adminName" placeholder="请选择管理员名称">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="管理员邮箱" prop="adminName">
            <el-input type="text" v-model="searchKeywords.adminName" placeholder="请输入管理员邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="管理员身份" prop="adminName">
            <el-input type="text" v-model="searchKeywords.adminName" placeholder="请输入管理员身份"></el-input>
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
        <el-button type="primary" size="medium" @click="handleAdd">新增管理员</el-button>
      </div>
      <el-table :data="tableData" header-row-class-name="table-header" border style="width: 100%">
        <el-table-column prop="id" label="ID" align="center">
        </el-table-column>
        <el-table-column prop="" label="账号" align="center"></el-table-column>
        <el-table-column prop="" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="" label="身份" align="center"></el-table-column>
        <el-table-column prop="" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="" label="更新时间" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-select size="medium" class="state-select" :class="{'text-danger': scope.row.state==2}" v-model="scope.row.state" placeholder="请选择" @change="updateState(scope.row.id,scope.row.state)">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              plain
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
import Add from '@/components/UserInfo/Add'
import Edit from '@/components/UserInfo/Edit'
export default {
  data () {
    return {
      searchKeywords: {},
      tableData: [
        { 'id': 1, 'state': 1 },
        { 'id': 2, 'state': 2 }
      ],
      showFlag: {
        add: false,
        edit: false
      },
      stateOptions: [{ // 下拉框-状态
        value: 1,
        label: '启用'
      }, {
        value: 2,
        label: '禁用'
      }]
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
    handleEdit (objUserId) {
      this.showFlag.edit = true
      this.$nextTick(() => {
        this.$refs.edit.init(objUserId)
      })
    },
    handleDelete () {
      this.$common.msgBox('confirm', '操作提示', '是否确定删除此管理员？', () => {
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
.userinfo-wrap{
  .el-table{
    .el-select{width: 80px;}
    .el-input__inner{color: inherit;}
  }
}
</style>
