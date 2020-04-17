<template>
  <div class="user-wrap">
    <!-- 搜索框 start -->
    <el-form v-if="userPower" class="main-search" :inline="true" :model="keywords" ref="keywords" :rules="searchRules" label-position="left" label-width="85px" size="medium">
      <el-row>
        <el-col :span="6">
          <el-form-item label="管理员ID" prop="id">
            <el-input type="number" v-model.number="keywords.id" placeholder="请输入管理员ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="管理员名称" prop="name">
            <el-input type="text" v-model="keywords.name" placeholder="请输入管理员名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="管理员邮箱" prop="email">
            <el-input type="text" v-model="keywords.email" placeholder="请输入管理员邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="onReset('keywords')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 搜索框 end -->

    <!-- 分割线 start -->
    <div v-if="userPower" class="hr-10"></div>
    <!-- 分割线 end -->

    <div class="main-content">
      <div v-if="userPower" class="content-header">
        <el-button type="primary" size="medium" @click="handleAdd">新增管理员</el-button>
      </div>
      <el-table v-loading="!this.reqFlag.search" :data="tableData" header-row-class-name="table-header" border>
        <el-table-column prop="id" label="ID" align="center" width="120"></el-table-column>
        <el-table-column prop="name" label="账号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="role" label="身份" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center"></el-table-column>
        <el-table-column v-if="userPower" label="状态" align="center">
          <template slot-scope="scope">
            <el-select size="mini" class="state-select" :class="{'text-danger': scope.row.state==2}" v-model="scope.row.state" :disabled="scope.row.type==1" placeholder="请选择" @change="updateState(scope.row.id,scope.row.state)">
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
            <el-button :disabled="scope.row.type==1" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button v-if="userPower" :disabled="scope.row.type==1" size="mini" type="danger" plain @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totalCount">
      </el-pagination>
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
import { userList, userUpdateState } from '@/config/interface'
import Add from '@/components/User/Add'
import Edit from '@/components/User/Edit'
export default {
  data () {
    return {
      keywords: {
        id: null,
        name: null,
        email: null
      },
      keywordsParams: {}, // 搜索请求是的搜索入参
      searchRules: {
      },
      reqFlag: { // 防止频繁点击，造成连续多次发请求
        search: true,
        state: true,
        delete: true
      },
      pageNum: 1, // 请求第几页
      pageSize: this.$store.state.pageSize, // 每页请求多少条
      currentPage: 1, // 初始时在第几页
      totalCount: 0, // 总共多少条数据
      tableData: [],
      showFlag: {
        add: false,
        edit: false
      },
      stateOptions: [{ // 下拉框-状态
        value: '1',
        label: '启用'
      }, {
        value: '2',
        label: '禁用'
      }]
    }
  },
  components: {
    Add,
    Edit
  },
  computed: {
    userType: function () {
      let userType = this.$store.state.userInfo.type
      return userType
    },
    userPower: function () {
      let userType = this.$store.state.userInfo.type
      return userType == 1
    }
  },
  created () {
    this.keywordsParams = JSON.parse(JSON.stringify(this.keywords))
    this.queryUserList()
  },
  methods: {
    queryUserList () {
      const url = userList
      if (this.reqFlag.search) {
        this.reqFlag.search = false
        let params = {
          searchId: this.keywordsParams.id,
          searchName: this.keywordsParams.name,
          searchEmail: this.keywordsParams.email,
          userType: this.userType,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.$http(url, params)
        .then(res => {
          if (res.code == 1) {
            let data = res.data
            this.tableData = data.list
            this.totalCount = data.totalCount
            this.currentPage = this.pageNum
          }
          this.reqFlag.search = true
        })
      }
    },
    onSearch () {
      this.pageNum = 1
      this.keywordsParams = JSON.parse(JSON.stringify(this.keywords))
      this.queryUserList()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.queryUserList()
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
      this.pageNum = 1
      this.keywordsParams = JSON.parse(JSON.stringify(this.keywords))
      this.queryUserList()
      this.curPage = 1
    },
    handleAdd () {
      this.showFlag.add = true
      this.$nextTick(() => {
        this.$refs.add.init()
      })
    },
    handleEdit (id) {
      this.showFlag.edit = true
      this.$nextTick(() => {
        this.$refs.edit.init(id)
      })
    },
    handleDelete (id) {
      this.$common.msgBox('confirm', '操作提示', '是否确定删除此管理员？', () => {
        const url = userUpdateState
        if (this.reqFlag.delete) {
          this.reqFlag.delete = false
          let params = {
            id: id
          }
          this.$http(url, params)
          .then(res => {
            if (res.code == 1) {
              this.$common.toast('删除成功', 'success', false)
              this.queryUserList()
            }
            this.reqFlag.delete = true
          })
        }
      })
    },
    updateState (id, state) {
      const url = userUpdateState
      if (this.reqFlag.state) {
        this.reqFlag.state = false
        let params = {
          id: id,
          state: !state ? null : state
        }
        this.$http(url, params)
        .then(res => {
          if (res.code == 1) {
            this.$common.toast('修改成功', 'success', false)
            this.queryUserList()
          }
          this.reqFlag.state = true
        })
      }
    },
    // 新增管理员子组件回调
    callBackAdd () {
      this.onReset('keywords')
      this.pageNum = 1
      this.queryUserList()
      this.curPage = 1
    },
    // 编辑管理员子组件回调
    callBackEdit () {
      this.queryUserList()
    }
  }
}
</script>

<style lang="scss">
.user-wrap{/* height: 1800px; background: pink; */
  .el-table{
    .el-select{width: 76px;}
    .el-input__inner{color: inherit;}
  }
}
</style>
