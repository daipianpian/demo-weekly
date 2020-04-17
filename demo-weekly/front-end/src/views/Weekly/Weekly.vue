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
            <el-select v-model="keywords.userId" filterable remote reserve-keyword placeholder="请选择创建者" :remote-method="queryUserList">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
      <el-table v-loading="!this.reqFlag.search" :data="tableData" header-row-class-name="table-header" border style="width: 100%">
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
  </div>
</template>

<script>
import { userList, weeklyList, weeklyUpdateState } from '@/config/interface'
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
      keywordsParams: {}, // 搜索请求是的搜索入参
      searchRules: {
      },
      reqFlag: { // 防止频繁点击，造成连续多次发请求
        user: true,
        search: true,
        delete: true
      },
      userList: [],
      pageNum: 1, // 请求第几页
      pageSize: this.$store.state.pageSize, // 每页请求多少条
      currentPage: 1, // 初始时在第几页
      totalCount: 0, // 总共多少条数据
      tableData: []
    }
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
    this.init()
  },
  methods: {
    // 初始化
    init () {
      this.queryUserList('')
      this.keywordsParams = JSON.parse(JSON.stringify(this.keywords))
      this.queryWeeklyList()
    },
    queryUserList (userName) {
      const url = userList
      if (this.reqFlag.user) {
        this.reqFlag.user = false
        let params = {
          userType: this.userType,
          searchName: !userName ? null : userName,
          pageNum: 1,
          pageSize: 20
        }
        this.$http(url, params)
        .then(res => {
          if (res.code == 1) {
            let data = res.data
            let list = data.list
            let objList = []
            if (list.length > 0) {
              for (let value of list) {
                let obj = {
                  id: value.id,
                  name: value.name
                }
                objList.push(obj)
              }
            }
            objList.unshift({ 'id': null, 'name': '全部' })
            this.userList = objList
          }
          this.reqFlag.user = true
        })
      }
    },
    queryWeeklyList () {
      const url = weeklyList
      if (this.reqFlag.search) {
        this.reqFlag.search = false
        let params = {
          searchId: this.keywordsParams.id,
          searchTitle: this.keywordsParams.title,
          searchUserId: this.keywordsParams.userId,
          searchStartTime: this.keywordsParams.startTime,
          searchEndTime: this.keywordsParams.endTime,
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
      this.queryWeeklyList()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.queryWeeklyList()
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
      this.pageNum = 1
       this.keywordsParams = JSON.parse(JSON.stringify(this.keywords))
      this.queryWeeklyList()
      this.curPage = 1
    },
    handleAdd () {
      this.$router.push({ path: '/home/weeklyadd' })
    },
    goWeeklyDetails (id) {
      this.$router.push({
        path: '/home/weeklydetail',
        query: {
          id: id
        }
      })
    },
    handleEdit (id) {
      this.$router.push({
        path: '/home/weeklyedit',
        query: {
          id: id
        }
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
              this.queryWeeklyList()
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
      this.queryWeeklyList()
      this.curPage = 1
    },
    // 编辑管理员子组件回调
    callBackEdit () {
      this.queryWeeklyList()
    }
  }
}
</script>

<style lang="scss">
.weekly-main-wrap{ padding: 20px;
  h3{margin: 0;}
  /* 新增+编辑的周报样式 start */
  .el-form{width: 80%; max-width: 1000px; min-width: 825px; margin: 30px auto 0;
    .quill-editor { height: auto; }
    .quill-editor .ql-container{height: 180px;}
  }
  /* 新增+编辑的周报样式 end */
  /* 周报详情样式 start */
  .week-work-box{display: block; height: 180px; padding: 5px 15px; line-height: 1.5; font-size: inherit; box-sizing: border-box; border: 1px solid #E4E7ED; border-radius: 4px; resize: vertical; cursor: not-allowed; background-color: #F5F7FA;}
  .el-input.is-disabled .el-input__inner, .week-work-box{color: #888;}
  /* 周报详情样式 end */
}
</style>
