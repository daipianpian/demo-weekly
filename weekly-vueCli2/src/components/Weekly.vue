<template>
  <div class="weekly">
  	<div class="button-box">
  		<el-button type="primary" @click="addWeekly">创建</el-button>
  	</div>
	
	<div v-cloak class="weekly-info">
		<p v-if="!weeklyList.length"><strong>还没有任何计划</strong></p>
		<el-table
		    :data="weeklyList"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="id"
		      label="序号(ID)" align="center">
		    </el-table-column>
		    <el-table-column
		      prop="adminName"
		      label="创建者" align="center">
		    </el-table-column>
		    <el-table-column
		      prop="startTime"
		      label="开始日期" align="center">
		    </el-table-column>
		    <el-table-column
		      prop="endTime"
		      label="结束日期" align="center">
		    </el-table-column>
		    <el-table-column
		      prop="weekOfYear"
		      label="第几周" align="center">
		    </el-table-column>
		    <el-table-column
		      prop="weeklyDatil"
		      label="周报详情" align="center">
		      <template slot-scope="scope">
		      	<div class="weekly-datil" v-html="scope.row.weeklyDatil" @click="toWeeklyDatil(scope.row.id)"></div>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" align="center">
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
	<div class="pagination-box">
		<el-pagination
		  background
		  @current-change="handleCurrentChange"
	      :current-page.sync="pageNum"
	      :page-size="pageSize"
	      layout="total, prev, pager, next"
	      :total="total">
		</el-pagination>
	</div>
	

  </div>
</template>

<script>
export default {
  data () {
    return {
    	pageNum: 1,
    	pageSize: 3,
    	total: 0,
    	weeklyList: []
    }
  },
  mounted() {
  	this.fetchData(this.pageNum);
  },
  methods: {
  	fetchData(pageNum) {
  		var that = this;
  		var params = {
  			adminId: sessionStorage.getItem('adminId'),
  			pageNum: pageNum,
  			pageSize: that.pageSize
  		};
	    that.$axios.post('/admin/Weekly/getWeekly',params,{
	        headers: {
	          'Content-Type': 'application/json'
	        }
      	})
	    .then(function(res){
		  var data = res.data;
		  that.total = data.data.count;
	      that.weeklyList = data.data.list;
		})
		.catch(function(error){
		  console.log(error)
		});
  	},
  	handleCurrentChange(val) {
    	this.fetchData(val);
  	},
	addWeekly() {
    	return this.$router.replace('add-weekly');
    },
    handleEdit(index, row) {
	    console.log(index, row);
	},
	handleDelete(id) {
	    console.log(id);
	    var that = this;
	    var params = {
	    	id: id,
	    	adminId: sessionStorage.getItem('adminId')
	    };
	    that.$axios.post('/admin/Weekly/deleteWeekly',params,{
	        headers: {
	          'Content-Type': 'application/json'
	        }
      	})
      	.then(function(res){
        	var data = res.data;
        	var status = data.status;
        	if(status){
        		that.fetchData(that.pageNum);
        	}
      	})
      	.catch(function(error){
        	console.log(error)
      	});
	},
	handleEdit(id){
		return this.$router.push(
	    	{path:'edit-weekly',query:{ id:id }}
	    );
	},
	toWeeklyDatil(id){
	    return this.$router.push(
	    	{path:'weekly-datil',query:{ id:id }}
	    );
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weekly-datil{color: #409EFF;cursor: pointer;}
.button-box .el-button{margin-bottom: 20px;}
.pagination-box{margin: 50px auto 0;width: auto;text-align: center;}
</style>
