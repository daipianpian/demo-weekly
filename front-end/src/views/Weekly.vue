<template>
  <div class="weekly-wrap">
    <!-- 搜索框 start -->
    <el-form class="main-search" :inline="true" :model="keywords" ref="keywords" :rules="searchRules" label-position="left" label-width="85px" size="medium">
      <el-row>
        <el-col :span="6">
          <el-form-item label="周报ID" prop="id">
            <el-input type="number" v-model.number="keywords.id" placeholder="请输入周报ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="周报名称" prop="title">
            <el-input v-model="keywords.title" placeholder="请输入周报名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="userPower" :span="6">
          <el-form-item label="创建者" prop="userId">
            <el-input type="number" v-model.number="keywords.userId" placeholder="请输入周报ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开始时间" prop="startTime">
            <el-input v-model="keywords.startTime" placeholder="请输入创建时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束时间" prop="endTime">
            <el-input v-model="keywords.endTime" placeholder="请输入创建时间"></el-input>
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
    <div class="hr-10"></div>
    <!-- 分割线 end -->

    <div class="main-content">
      <div class="content-header">
        <el-button type="primary" size="medium" @click="handleAdd">新增周报</el-button>
      </div>
      <el-table :data="tableData" header-row-class-name="table-header" border style="width: 100%">
        <el-table-column prop="id" label="ID" align="center" width="120">
        </el-table-column>
        <el-table-column label="周报名称" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="goWeeklyDetails(scope.row.id)">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="周报开始时间" align="center"></el-table-column>
        <el-table-column prop="endTime" label="周报结束时间" align="center"></el-table-column>
        <el-table-column prop="userName" label="创建者" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger" plain
              @click="handleDelete(scope.row.id)">删除</el-button>
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
  import { weeklyList, weeklyUpdateState } from '../config/interface'
import Add from '@/components/Weekly/Add'
import Edit from '@/components/Weekly/Edit'
export default {
  data () {
    return {
      keywords: {
        id: null,
        title: null,
        userId: null,
        startTime: null,
        endTime: null
      },
      searchRules: {
      },
      reqFlag: { // 防止频繁点击，造成连续多次发请求
        search: true,
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
      }
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
    this.onSearch()
  },
  methods: {
    onSearch () {
      const url = weeklyList
      if (this.reqFlag.search) {
        this.reqFlag.search = false
        let params = {
          searchId: this.keywords.id,
          searchTitle: this.keywords.title,
          searchUserId: this.keywords.userId,
          searchStartTime: this.keywords.startTime,
          searchEndTime: this.keywords.endTime,
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
    handleCurrentChange (val) {
      this.pageNum = val
      this.onSearch()
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
      this.pageNum = 1
      this.onSearch()
      this.curPage = 1
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
    handleDelete (id) {
      this.$common.msgBox('confirm', '操作提示', '是否确定删除此条周报信息？', () => {
        const url = weeklyUpdateState
        if (this.reqFlag.delete) {
          this.reqFlag.delete = false
          let params = {
            id: id
          }
          this.$http(url, params)
          .then(res => {
            if (res.code == 1) {
              this.$common.toast('删除成功', 'success', false)
              this.onSearch()
            }
            this.reqFlag.delete = true
          })
        }
      })
    },
    // 新增管理员子组件回调
    callBackAdd () {
      this.onReset('keywords')
      this.pageNum = 1
      this.onSearch()
      this.curPage = 1
    },
    // 编辑管理员子组件回调
    callBackEdit () {
      this.onSearch()
    }
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
