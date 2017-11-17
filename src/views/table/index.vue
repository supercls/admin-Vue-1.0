<template>
	<div class="el-table-div">
			<el-table
			:data="tableData"
			stripe
			style="width: 100%">
			<el-table-column
				prop="date"
				label="日期"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="姓名"
				width="180">
			</el-table-column>
			<el-table-column
				prop="sex"
				label="性别"
				width="100">
			</el-table-column>
			<el-table-column
				prop="address"
				label="地址">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
	        <el-button
	          size="small" @click="handleEdit(scope.$index, scope.row)"
	          >编辑</el-button>
	        <el-button
	          size="small"
	          type="danger" @click="handleDelete(scope.$index, scope.row)"
	          >删除</el-button>
      	</template>
      	
			</el-table-column>
		</el-table>
		<!--编辑-->
  	<el-dialog
			  title="编辑"
			  :visible.sync="dialogVisible"
			  size="small">
			  <el-form :model="EditorForm" label-width="80px" :rules="addFormRules" ref="EditorForm">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="EditorForm.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-radio-group v-model="EditorForm.sex">
							<el-radio class="radio" :label="1">男</el-radio>
							<el-radio class="radio" :label="0">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="年龄">
						<el-input-number v-model="EditorForm.age" :min="0" :max="200"></el-input-number>
					</el-form-item>
					<el-form-item label="生日">
						<el-date-picker type="date" placeholder="选择日期" v-model="EditorForm.date"></el-date-picker>
					</el-form-item>
					<el-form-item label="地址">
						<el-input type="textarea" v-model="EditorForm.address"></el-input>
					</el-form-item>
				</el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎s',
					sex:'男',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					sex:'男',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					sex:'男',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					sex:'男',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				dialogVisible:false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				EditorForm:{
					date:'',
					name:'',
					sex:'',
					age:'',
					address:''

				}
			}
		},
		methods:{
			handleEdit:function(index,rows){
				this.dialogVisible=true;
				this.EditorForm={
					date:rows.date,
					name:rows.name,
					sex:rows.sex,
					age:rows.age,
					address:rows.address
				}
			},
			handleDelete(index, rows) {
        this.tableData.splice(index,1) //删除数据
      }
		}
	}

</script>
<style>
	.el-table-div{
		margin: 20px;
	}
</style>