<!--菜单管理-->
<template>
	<div class="menu">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<div class="userName">
			  <el-input placeholder="请输入内容" v-model="formInline.user"  class="fillName">
			    <template slot="prepend">菜单名称：</template>
			  </el-input>
			</div>
			
			<div class="userName">
				<el-form-item>
				    <el-button type="primary" @click="onSubmit" style="margin-left:50px">查询</el-button>
				 </el-form-item>
			</div>
			<div style="clear:both"></div>
		</el-form>
		
		<el-button type="primary" class="add" @click="EnterInfo">新增</el-button>
		
		<el-button type="primary" class="refresh" @click="refresh()">刷新</el-button>
		<!--新增-->
		<el-dialog title="新增" :visible.sync="dialogXinzengBox" size="small" class="addNews">
				  <el-form :model="indexFrom" label-width="120px" ref="indexFrom" :rules="roleRules">
				  		
						<el-form-item label="菜单名称" prop="roleName">
							<el-input v-model="indexFrom.roleName" auto-complete="off" ></el-input>
						</el-form-item>
						<el-form-item label="菜单级别" prop="menuGrade" >
							<!--<el-input v-model="EditorForm.menuLevel" auto-complete="off"></el-input>-->
							<el-input v-model="indexFrom.menuGrade" auto-complete="off" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="目录或页面">
							<template>
							  <el-select v-model="value" placeholder="请选择"  @change="change">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
							</template>
						</el-form-item>
						<el-form-item label="菜单图标" prop="icon">
							<el-input v-model="indexFrom.icon" auto-complete="off" placeholder="非必填"></el-input>
						</el-form-item>
						<el-form-item label="菜单链接" prop="roleMenuUrl">
							<el-input v-model="indexFrom.roleMenuUrl" auto-complete="off" ></el-input>
						</el-form-item>
						
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogXinzengBox = false">取 消</el-button>
				    <el-button type="primary" @click="dialogXinzeng ('indexFrom')">确 定</el-button>
				  </span>
		</el-dialog>
		<!--主部分-->
		<div class="el-table-div eldiv" style="margin-top:50px">
			<el-table :data="tableData" border style="width: 100%" height="400">
				<el-table-column  label="序号" width="70"  stripe>
					<template scope="scope">
						{{scope.$index+1}}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="菜单名称"> </el-table-column>
				<el-table-column prop="menuGrade" label="菜单级别" > </el-table-column>	
				<el-table-column prop="path" label="菜单级别" > </el-table-column>	
				<el-table-column prop="updateDate" label="创建时间" > </el-table-column>
				<el-table-column label="操作">
				<template scope="scope">
					<el-button size="small" @click="second(scope.row)">设置</el-button>
			        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
	      	    </template>
	      	
				</el-table-column>
			</el-table>
			<!--编辑-->
		  	<el-dialog title="编辑" :visible.sync="dialogGengxinBox" size="small" class="edit">
				  <el-form :model="EditorForm" label-width="80px"  ref="EditorForm">
				  		
						<el-form-item label="菜单名称" prop="menu">
							<el-input v-model="EditorForm.menu" auto-complete="off" style="width:300px"></el-input>
						</el-form-item>
						<el-form-item label="菜单级别" prop="menuLevel">
							<el-input v-model="EditorForm.menuLevel" auto-complete="off" style="width:300px" :disabled = "true"></el-input>
						</el-form-item>
						<el-form-item label="菜单图标">
							<el-input v-model="EditorForm.icon" auto-complete="off" style="width:300px" placeholder="非必填"></el-input>
						</el-form-item>
						<el-form-item label="菜单链接">
							<el-input v-model="EditorForm.path" auto-complete="off" style="width:300px" placeholder="非必填"></el-input>
						</el-form-item>
						
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogGengxin (false)">取 消</el-button>
				    <el-button type="primary" @click="dialogGengxin (true)">确 定</el-button>
				  </span>
			</el-dialog>
			<!--二级菜单编辑-->
			<el-dialog title="编辑" :visible.sync="dialogSecondGengxinBox" size="small"  class="dialog_width_25">
				  <el-form :model="EditorForm" label-width="80px"  ref="EditorForm">
				  		
						<el-form-item label="菜单名称" prop="menu">
							<el-input v-model="EditorForm.menu" auto-complete="off" style="width:300px"></el-input>
						</el-form-item>
						<el-form-item label="菜单级别" prop="menuLevel">
							<el-input v-model="EditorForm.menuLevel" auto-complete="off" style="width:300px" :disabled = "true"></el-input>
						</el-form-item>
						
						<el-form-item label="菜单链接">
							<el-input v-model="EditorForm.path" auto-complete="off" style="width:300px"></el-input>
						</el-form-item>
						
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogGengxinBox = false">取 消</el-button>
				    <el-button type="primary" @click="dialogSecondGengxin ()">确 定</el-button>
				  </span>
			</el-dialog>
		</div>
		<!--主部分分页-->
	    <div class="block page-div">
	      <el-pagination
	              @size-change="handleSizeChange"
	              @current-change="handleCurrentChange"
	              current-page.sync="listQuery.pageId"
	              :page-sizes="[10, 20, 30, 40]"
	              :page-size="listQuery.pageSize"
	              layout="total, sizes, prev, pager, next, jumper"
	              :total="total">
	      </el-pagination>
	    </div>
	    <!--二级菜单-->
		 <el-dialog :title='tltle' :visible.sync="dialogSecond" size="small">
					 <el-button style="margin-bottom:20px;float:float" @click="addUpdata">新增</el-button>
				    <el-button style="margin-bottom:20px;float:right" @click="refreshSecond">刷新</el-button>
				
				<el-table :data="tableDataData" border style="width: 100%" height="250" >
			    	<el-table-column label="序号" width="65">
				     	<template scope="scope">
							{{scope.$index+1}}
						</template>
			    </el-table-column>
			    <el-table-column  prop="name" label="菜单名称" min-width="180" >
			    </el-table-column>
			    <el-table-column prop="menuGrade" label="菜单级别" min-width="180" >
			    </el-table-column>
			    <el-table-column prop="path" label="菜单链接" min-width="180" >
			    </el-table-column>
			    <el-table-column prop="updateDate" label="创建时间" min-width="180" >
			    </el-table-column>
			    <el-table-column label="操作" min-width="280" fixed="right" >
			      <template scope="scope">
			      		<el-button size="small" @click="addThird(scope.$index,scope.row)" v-if="dirOrPage == '01'">添加</el-button>
			       		<el-button size="small" @click="checkPermission(scope.$index,scope.row)" >按钮</el-button>
				        <el-button size="small" @click="handleEditSecond(scope.$index, scope.row)">编辑</el-button>
				        <el-button size="small" type="danger" @click="handleDeleteData(scope.$index, scope.row)" >删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
				<!--分页-->
				<div class="block page-div">
			      <el-pagination 
			      	  @size-change="SizeChange"
			      	  @current-change="CurrentChange"
		              current-page.sync="listQuery.pageId"
		              :page-sizes="[10, 20, 30, 40]"
		              :page-size="listQuery.pageSize"
		              layout="total, sizes, prev, pager, next, jumper"
		              :total="total1">
			      </el-pagination>
			    </div>
		</el-dialog>
		<!--查看按钮权限-->
		<el-dialog title="按钮列表" :visible.sync="dialogBtn" size="small">
			<el-button style="margin-bottom:20px;" @click="addSecond">新增</el-button>
			<el-table :data="tableDataBtn" border style="width: 100%" height="250">
				<el-table-column  label="序号" width="70" stripe> 
					<template scope="scope">
						{{scope.$index+1}}
					</template>
				</el-table-column>
				<el-table-column prop="btnName" label="按钮名称" min-width="160"> </el-table-column>
				<el-table-column prop="btnPermissions" label="按钮权限" min-width="150"> </el-table-column>	
				<el-table-column prop="updateDate" label="创建时间" min-width="150"> </el-table-column>
				<el-table-column label="操作" min-width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEditUpdata(scope.$index, scope.row)">编辑</el-button>
			        <el-button size="small" type="danger" @click="pressionDelect(scope.$index, scope.row)" >删除</el-button>
	      	    </template>
	      	
				</el-table-column>
			</el-table> 
			<div class="block page-div">
		      <el-pagination
		              @size-change="SizeChangeBtn"
		              @current-change="CurrentChangeBtn"
		              current-page.sync="listQuery.pageId"
		              :page-sizes="[10, 20, 30, 40]"
		              :page-size="listQuery.pageSize"
		              layout="total, sizes, prev, pager, next, jumper"
		              :total="total2">
		      </el-pagination>
		    </div>
		</el-dialog>
		<!--按钮列表编辑-->
		<el-dialog title="按钮编辑" :visible.sync="dialogBtnUpdata" size="small" class="EditBtn">
			<el-form :model="UpdataForm" label-width="80px" ref="UpdataForm">
				<el-form-item label="按钮名称" prop="menu">
					<el-input v-model="UpdataForm.menu" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="按钮权限" prop="menuLevel">
					<el-input v-model="UpdataForm.menuLevel" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				
						
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="BtnUpdata (false)">取 消</el-button>
			<el-button type="primary" @click="BtnUpdata (true)">确 定</el-button>
			</span>
			 
		</el-dialog>
		<!--二级菜单新增-->
		<el-dialog title="新增" :visible.sync="dialogMenuUpdata" size="small" class="addMenuNew">
			<el-form :model="menuFrom" label-width="100px" ref="menuFrom" :rules="roleRules">
		  		
				<el-form-item label="菜单名称" prop="roleName">
					<el-input v-model="menuFrom.roleName" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="菜单级别" prop="menuGrade" >
					<!--<el-input v-model="EditorForm.menuLevel" auto-complete="off"></el-input>-->
					<el-input v-model="menuFrom.menuGrade" auto-complete="off" style="width:300px" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="目录或页面">
					<template>
					  <el-select v-model="value" placeholder="请选择"  @change="change">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</template>
				</el-form-item>
				
				<el-form-item label="菜单链接" prop="roleMenuUrl">
					<el-input v-model="menuFrom.roleMenuUrl" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				
			</el-form>
		    <span slot="footer" class="dialog-footer">
		       <el-button @click="dialogMenuUpdata = false">取 消</el-button>
		       <el-button type="primary" @click="dialogmenuXinzeng ('menuFrom')">确 定</el-button>
		    </span>
			 
		</el-dialog>
		<!--按钮列表新增-->
		<el-dialog :title="title" :visible.sync="dialogBtnUpdata1" size="small" class="addBtnNew">
			<el-form :model="btnFrom" label-width="80px" ref="btnFrom" :rules="roleRules">
		  		<el-form-item label="按钮名称" prop="btnName">
					<el-input v-model="btnFrom.btnName" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="按钮权限" prop="btnPermiss">
					<el-input v-model="btnFrom.btnPermiss" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
			</el-form>
		    <span slot="footer" class="dialog-footer">
		       <el-button @click="dialogBtnUpdata1 = false">取 消</el-button>
		       <el-button type="primary" @click="dialogBtnXinzeng ('btnFrom')">确 定</el-button>
		    </span>
		</el-dialog>
		<!--三级菜单-->
		<el-dialog :title="title" :visible.sync="dialogMenuThird" size="small" >
			 <el-button style="margin-bottom:20px;float:float" @click="addUpdataThird">新增</el-button>
				    <el-button style="margin-bottom:20px;float:right" @click="refreshSecond">刷新</el-button>
				
				<el-table :data="thirdTable" border style="width: 100%" height="250" >
			    <el-table-column label="序号" width="65">
			     	<template scope="scope">
						{{scope.$index+1}}
					</template>
			    </el-table-column>
			    <el-table-column prop="name" label="菜单名称" min-width="180" >
			    </el-table-column>
			    <el-table-column prop="menuGrade" label="菜单级别" min-width="180" >
			    </el-table-column>
			    <el-table-column prop="path" label="菜单链接" min-width="180" >
			    </el-table-column>
			    <el-table-column prop="updateDate" label="创建时间" min-width="180" >
			    </el-table-column>
			    <el-table-column label="操作" min-width="280" fixed = "right" >
			      <template scope="scope">
			      		<el-button size="small" @click="checkPermission(scope.$index,scope.row)" >按钮</el-button>
				        <el-button size="small" @click="handleEditSecond(scope.$index, scope.row)">编辑</el-button>
				        <el-button size="small" type="danger" @click="handleDeletethird(scope.$index, scope.row)" >删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
				<!--分页-->
				<div class="block page-div">
			      <el-pagination
			              @size-change="SizeChangeThird"
			              @current-change="CurrentChangeThird"
			              current-page.sync="listQuery.pageId"
			              :page-sizes="[10, 20, 30, 40]"
			              :page-size="listQuery.pageSize"
			              layout="total, sizes, prev, pager, next, jumper"
			              :total="total3">
			      </el-pagination>
			    </div>
			 
		</el-dialog>
		<!--三级菜单新增-->
		<el-dialog title="新增" :visible.sync="dialogMenuUpdataThird" size="small" class="addMenuNew">
			<el-form :model="menuFromThird" label-width="100px" ref="menuFrom" :rules="roleRules">
		  		
				<el-form-item label="菜单名称" prop="roleName">
					<el-input v-model="menuFromThird.roleName" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="菜单级别" prop="menuGrade" >
					<!--<el-input v-model="EditorForm.menuLevel" auto-complete="off"></el-input>-->
					<el-input v-model="menuFromThird.menuGrade" auto-complete="off" style="width:300px" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="目录或页面">
					<template>
					  <el-select v-model="value" placeholder="请选择"  @change="change">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</template>
				</el-form-item>
				<el-form-item label="菜单链接" prop="roleMenuUrl">
					<el-input v-model="menuFromThird.roleMenuUrl" auto-complete="off" style="width:300px"></el-input>
				</el-form-item>
				
			</el-form>
		    <span slot="footer" class="dialog-footer">
		       <el-button @click="dialogMenuUpdataThird = false">取 消</el-button>
		       <el-button type="primary" @click="dialogmenuThird('menuFrom')">确 定</el-button>
		    </span>
			 
		</el-dialog>
	</div>
	
	

	
</template>
<script>
export default {
    data() {
    	var checkRole = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('菜单名称不能为空'));
        }
        setTimeout(() => {
          if (value.length>40) {
            callback(new Error('菜单链接字符超过'));
          }  else {
            callback();
          }
        }, 1000);
      };
      var checkRoleCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('按钮名称不能为空'));
        }
        setTimeout(() => {
          if (value.length>40) {
            callback(new Error('按钮权限字符超过'));
          }  else {
            callback();
          }
        }, 1000);
      };
      
      return {
      	dirOrPage:'',
        formInline: {
          user: '',
          region: '',
          select:''
        },
        tableData: [],
        total:null,
        title :"",
        tltle :'',
        total1 : null,
        total2:null,
        total3:null,
        loading:true,
        tableDataData:[],
        tableDataBtn:[],
        dialogVisible:false,
        dialogXinzengBox : false,
		dialogGengxinBox:false,
		dialogSecond : false,
		currentPage3 : 1,
		dialogAdd :false,
		dialogBtn:false,
		dialogBtnUpdata:false,
		dialogMenuUpdata:false,
		dialogBtnUpdata1:false,
		showCancelButton:false,
		dialogSecondGengxinBox:false,
		listQuery:{
			pageId:1,
			pageSize:10,
			parentId:'',
			menuId:''
		},
		roleRules: {
			roleName: [
				{ validator: checkRole, trigger: 'blur' }
			],
			roleMenuUrl : [
				{validator: checkRole, trigger: 'blur' }
			],
			btnName : [
				{validator: checkRoleCode, trigger: 'blur' }
			],
			btnPermiss : [
				{ validator: checkRoleCode, trigger: 'blur' }
			],
		},
		EditorForm:{		 
          date: '',
          menu :"",
          menuLevel :""
		},
        indexFrom:{
       	  icon :'',
          roleMenuUrl: '',
          roleName :"",
          menuGrade :"一级菜单"
       },
        menuFrom:{
       	 
          roleMenuUrl: '',
          roleName :"",
          menuGrade :"二级菜单"
       },
        options: [{
          value: '01',
          label: '目录'
        }, {
          value: '02',
          label: '页面'
          
        }],
        value: '',
        freshArray :[],
        addFrom : [],
        id:'',
        UpdataForm:{
			menu:"",
			menuLevel:""
		},
		parseId:'',
		btnFrom:{
			btnName: '',
            btnPermiss :""
		},
		addId:"",
		firstId:"",
		dialogMenuThird:false,
		thirdTable:[],
		third:'',
		dialogMenuUpdataThird:false,
		menuFromThird:{
			roleName:'',
			menuGrade:'三级菜单',
			roleMenuUrl:''			
		},
		dir :'',
		Page:""
      }      
    },
    created() {
	    this.getMenuList();	    
	 },
    methods: {
    	//select选择目录或者页面
    	change(val){
    		if(val == "01"){
    			this.dirOrPage = val
    		}else{
    			this.dirOrPage = val
    		}
    	},
        onSubmit() { //查询
        	    var that = this;
        	    that.service({
	           		url : '/sys/operatemenu/listData',
	           		method:'post',
	           		data:{
	           			pageSize :10,
	           			pageId:1,
	           			nameSearch : that.formInline.user
	           		}
	            }).then(function(response){	           		
				 	that.tableData = response.data.rows;
	            }).catch(function(data){
	         
	            })
        },
//      一级菜单
        handleEdit:function(index,rows){//一级菜单编辑数据        	
        	this.dialogGengxinBox=true;		    
		    this.addId=rows.id;
		    var that = this;
		    that.service({
		    	url:"/sys/operatemenu/update",
		    	method:"post",
		    	data:{
		    		id:rows.id
		    	}
		    }).then(function(response){
		    	that.EditorForm={
					menu:response.data.name,
					menuLevel:"一级菜单",
					path:response.data.path,
					icon:response.data.icon
				}
		    }).catch(function(data){
		    	
		    })
		},
		handleDelete(index, rows) {   //一级菜单删除数据
	        var that = this;
	        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	           that.service({
			   		url:"/sys/operatemenu/delete",
			   		method:'post',
			   		data:{
			   			id:rows.id
			   		}
			   	}).then(function(response){
			   		that.$message({
			            type: 'success',
			            message: '删除成功'
			        }); 
			   		that.tableData.splice(index,1) ;
			   	}).catch(function(data){
			   		
			   	})
	          that.getMenuList();
	        }).catch(() => {
	          that.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
		},
		dialogGengxin : function(index){//一级菜单编辑数据
			if(index == false){
				this.dialogGengxinBox = false
				
			}else{
				this.dialogGengxinBox = false;
				var that = this;
				that.service({
					url:"/sys/operatemenu/updateSave",
					method:"post",
					data:{
						id:that.addId,
						name : that.EditorForm.menu,
						path: that.EditorForm.path
					}
				}).then(function(response){
					that.getMenuList();
					that.$message("修改成功")
				}).catch(function(data){
					
				})
			}
		},
//		二级菜单
		second : function(index){ //进入二级菜单
			this.tltle = index.name + "二级菜单";
			this.id = index.id;
			this.firstId = index.id;
			this.listQuery.parentId = index.id
			this.dialogSecond = true;
			var that = this;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenu/listChildrenData',
			 	method: 'post',
			 	data:that.listQuery
			 }).then(function(response){
			 	that.tableDataData = response.data.rows;
			 	that.total1 = response.data.rowCount;
			 }).catch(function(data){
			 	
			 })
		},
		handleEditSecond:function(index,rows){    //编辑二级菜单数据
		    this.dialogSecondGengxinBox=true;
		    this.title ="编辑"
		    this.addId = rows.id,
		    this.EditorForm={
				date:rows.updateDate,
				menu:rows.name,
				menuLevel:"二级菜单",
				path:rows.path
			}
		    this.service({
		    	url:"/sys/operatemenu/update",
		    	method:"post",
		    	data:{
		    		id:rows.id
		    	}
		    }).then(function(response){
		    }).catch(function(data){
		    })
		},
		dialogSecondGengxin:function(index){//确定编辑二级菜单
				this.dialogSecondGengxinBox = false;
				var that = this;
				that.service({
					url:"/sys/operatemenu/updateSave",
					method:"post",
					data:{
						id:that.addId,
						name : that.EditorForm.menu,
						path: that.EditorForm.path
					}
				}).then(function(response){
					that.getErjiMenuList();
					that.$message("修改成功")
				}).catch(function(data){
				})
		},
		handleDeleteData(index, rows) {//二级菜单删除
			var that = this;
	   		var id = 
	        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	           that.service({
			   		url:"/sys/operatemenu/delete",
			   		method:'post',
			   		data:{
			   			id:rows.id
			   		}
			   	}).then(function(response){
			   		that.$message({
			            type: 'success',
			            message: '删除成功'
			          });
			   		that.listQuery.parentId = that.firstId;										
			    	that.service({                   
						url: '/sys/operatemenu/listChildrenData',
					 	method: 'post',
					 	data:that.listQuery
					 }).then(function(response){
					 	that.tableDataData = response.data.rows;
					 	that.total1 = response.data.rowCount;
					 }).catch(function(data){
					 })			   		
			   	}).catch(function(data){
			   		
			   	})
	        }).catch(() => {
	          that.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	    },
		dialogXinzeng :function(roleName){//新增数据
				var that = this;
				that.title="新增";
				that.$refs[roleName].validate((valid) => {
					if(valid){
				  		that.service({
							url:"/sys/operatemenu/addSave",
							method:"post",
							data:{
								name : that.indexFrom.roleName,
								path : that.indexFrom.roleMenuUrl,
								dir : that.dirOrPage
							}
						}).then(function(response){
							that.dialogXinzengBox = false;
							that.$message({
								message : response.message,
								type:"success"
							})
							that.getMenuList();
						}).catch(function(data){
							that.dialogXinzengBox = true;
						})
				  	}else{
				  		return false;
				  	}
				})	
		},
		EnterInfo(){//进入新增页面
			this.dialogXinzengBox = true;
			var _self = this;
			_self.title="新增"
			_self.service({
				url:"/sys/operatemenu/add",
				method:"post",
				
			}).then(function(response){
				_self.indexFrom={
					menuGrade :"一级菜单"
				};
			}).catch(function(data){
			
			});
		},
		refresh : function(){//刷新数据
			this.getMenuList()
			this.$message("已刷新")
		},
		
		
		handleSizeChange(val) { //条数改变
			this.listQuery.pageSize = val;
			this.getMenuList()
		},
	    handleCurrentChange(val) {    //页数改变
	      this.listQuery.pageId = val;
		  this.getMenuList()
	    },
	    SizeChange(val){
	    	this.listQuery.pageSize = val
	    	this.getErjiMenuList();
	    },
	    CurrentChange(val){
	    	this.listQuery.pageId = val
	    	this.getErjiMenuList();
	    },
	    getMenuList(){//菜单列表
	    	var that = this;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenu/listData',
			 	method: 'post',
			 	data:that.listQuery
			 }).then(function(response){
			 	that.loading = false;			 	
			 	that.tableData = response.data.rows;
			 	that.total = response.data.rowCount;
			 }).catch(function(data){
			 })
	   },
	    getErjiMenuList(){//获取二级菜单数据
	   		var that = this;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenu/listChildrenData',
			 	method: 'post',
			 	data:that.listQuery
			 }).then(function(response){
			 	that.tableDataData = response.data.rows;
			 }).catch(function(data){
			 })
	   },
	   	checkPermission :function(index,rows){//查看按钮列表	   		
	   		var that = this;
	   		that.listQuery.menuId = rows.id
	   		that.dialogBtn = true;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenubtn/listData',
			 	method: 'post',
			 	data :{
			 		pageId :1,
			 		pageSize:10,
			 		menuId : rows.id
			 	}
			 }).then(function(response){
			 	that.loading = false;			 	
			 	that.tableDataBtn = response.data.rows;
			 	that.total2 = response.data.rowCount;
			 	
			 }).catch(function(data){
			 	
			 })
	   },
	  	refreshSecond : function(){//二级刷新
	  		var that = this;
	   		this.listQuery.parentId = that.id;
	    	that.service({                     //不走store,直接写
				url: '/sys/operatemenu/listChildrenData',
			 	method: 'post',
			 	data:that.listQuery	 	
			 }).then(function(response){			 	
			 	that.tableDataData = response.data.rows;
			 	that.$message("已刷新")
			 }).catch(function(data){
			 })
	   },
	    addUpdata(){//进入二级菜单新增
    		this.dialogMenuUpdata = true;
    		var _self = this;
			_self.service({
				url:"/sys/operatemenu/add",
				method:"post",
				data:{
					parentId:_self.addId
				}
			}).then(function(response){
				_self.menuFrom = {
					menuGrade :"二级菜单"
				}
			}).catch(function(data){
			});
		},
    	dialogmenuXinzeng(roleName){//确定二级菜单新增
    		console.log(this.dirOrPage)
    		var that = this;
    		that.$refs[roleName].validate((valid) => {
    			if(valid){
    				that.service({
						url:"/sys/operatemenu/addSave",
						method:"post",
						data:{
							name : that.menuFrom.roleName,
							path : that.menuFrom.roleMenuUrl,
							parentId : that.id,
							dirOrPage : that.dirOrPage,
							
						}
					}).then(function(response){
						that.dialogMenuUpdata = false;
						that.getErjiMenuList(that.id)	
						
						that.$message({
							message:response.message,
							type:'success'
						})
					}).catch(function(data){
						that.dialogMenuUpdata = true
					})
    			}else{
    				return false;
    			}
    		})
		},
	    pressionDelect(index,rows){//按钮列表删除
	    	var that = this;
	        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	         
	           that.service({
			   		url:"/sys/operatemenubtn/delete",
			   		method:'post',
			   		data:{
			   			id:rows.id,
			   			
			   		}
			   	}).then(function(response){
			   		that.$message({
			            type: 'success',
			            message: '删除成功'
			        }); 
		          	that.service({                     //不走store,直接写
						url: '/sys/operatemenubtn/listData',
					 	method: 'post',
					 	data :{
					 		pageSize:10,
					 		pageId :1,
					 		menuId :that.listQuery.menuId
					 	} 
					}).then(function(response){
					 	that.loading = false;	
					 	that.total2 = response.data.rowCount;
					 	that.tableDataBtn = response.data.rows
					}).catch(function(data){
					})		          
			   	}).catch(function(data){
			   	})	           
	        }).catch(() => {
	          that.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	    },
    	addSecond (){//添加按钮列表
    		var that = this;
    		that.dialogBtnUpdata1=true;
    		that.service({
    			url:'/sys/operatemenubtn/add',
    			method:"post",
    			data:{
    				menuId:that.listQuery.menuId
    			}
    		}).then(function(response){
    		}).catch(function(){
    		})
    	},
    	dialogBtnXinzeng(fromBtn){//确定新增按钮
    			var that = this;
    			that.$refs[fromBtn].validate((valid) => {
    				if(valid){
    					that.service({
			    			url:'/sys/operatemenubtn/addSave',
			    			method:"post",
			    			data:{
			    				menuId:that.listQuery.menuId,
			    				btnName:that.btnFrom.btnName,
			    				btnPermissions : that.btnFrom.btnPermiss
			    			}
			    		}).then(function(response){
			    			that.dialogBtnUpdata1 = false;
			    			that.$message({
			    				message : response.message,
			    				type:"success"
			    			});
			    			that.service({                     //不走store,直接写
								url: '/sys/operatemenubtn/listData',
							 	method: 'post',
							 	data :{
							 		menuId:that.listQuery.menuId,
							 		pageId:1,
							 		pageSize:10
							 	}
							}).then(function(response){
								that.loading = false;			 	
							 	that.tableDataBtn = response.data.rows;
							 	that.total2 = response.data.rowCount;
							}).catch(function(data){
							})
			    		}).catch(function(){
			    			that.dialogBtnUpdata1 = true;
			    		})
    				}else{
    					return false;
    				}
    			})
		},
    	handleEditUpdata(index,rows){//进入按钮编辑
    		this.dialogBtnUpdata = true;   		
    		this.id=rows.id;
    		this.UpdataForm = {
    			menu:rows.btnName,
    			menuLevel:rows.btnPermissions
    		}
    		var that = this;
    		that.service({
    			url:"/sys/operatemenubtn/update",
    			method:"post",
    			data:{
    				id:rows.id
    			}
    		}).then(function(response){
    			
    		}).catch(function(data){
    			
    		})
    	},
    	BtnUpdata(Boolean){//确定按钮编辑
    		if(Boolean == false){
    			this.dialogBtnUpdata = false;
    		}else{
    			var that = this;
    			that.dialogBtnUpdata = false;
    			that.service({
    				url:"/sys/operatemenubtn/updateSave",
    				method:"post",
    				data:{
    					id:that.id,
    					btnName:that.UpdataForm.menu,
    					btnPermissions:that.UpdataForm.menuLevel
    				}
    			}).then(function(response){
    				that.service({                     //不走store,直接写
						url: '/sys/operatemenubtn/listData',
					 	method: 'post',
					 	data :that.listQuery
					 }).then(function(response){
					 	that.loading = false;
					 	that.tableDataBtn = response.data.rows
					 	that.$message("编辑成功")					 	
					 }).catch(function(data){
		
					 })
    				
    			}).catch(function(data){
    				console.log(data)
    			})
    		}
    	},
    	SizeChangeBtn(val){//按钮条数改变
    		this.listQuery.pageSize = val;
    		var that = this;
    		that.service({                     //不走store,直接写
				url: '/sys/operatemenubtn/listData',
			 	method: 'post',
			 	data :that.listQuery
			 }).then(function(response){
			 	that.loading = false;
			 	that.tableDataBtn = response.data.rows
			}).catch(function(data){
			 	
			 })
    	},
    	CurrentChangeBtn(val){//按钮页数改变
    		//console.log(this.listQuery)
    		this.listQuery.pageId = val
    		//console.log(val)
    		var that = this;
    		that.service({                     //不走store,直接写
				url: '/sys/operatemenubtn/listData',
			 	method: 'post',
			 	data :that.listQuery
			 }).then(function(response){
			 	that.loading = false;
			 	
			 	
			 	that.tableDataBtn = response.data.rows
			 	//console.log(that.tableDataBtn)
			 	
			 }).catch(function(data){
			 	
			 	//console.log(data)
			 })
    	},
//      三级菜单
	    addThird(index,rows){
	    	var that = this;
	    	that.dialogMenuThird = true;
	    	that.title = rows.name +"三级菜单";
	    	that.third = rows.id;
	    	//this.listQuery.id = rows.id;
	    	that.listQuery.parentId = rows.id;
	    	that.service({
	    		url:"/sys/operatemenu/listChildrenData",
	    		method:"post",
	    		data:that.listQuery
	    	}).then(function(response){
	    		that.total3 = response.data.rowCount
	    		that .thirdTable = response.data.rows;
	    	}).catch(function(data){
	    		
	    	})
	    },
    	handleDeletethird(index,role){//三级菜单删除
    		console.log(role)
    			var that = this;
    			var id = role.id
    			that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	that.service({
		    			url:"/sys/operatemenu/delete",
		    			method:"post",
		    			data:{
		    				id : id
		    			}
		    		}).then(function(response){
		    			that.listQuery.parentId = that.third;
				    	that.service({
				    		url:"/sys/operatemenu/listChildrenData",
				    		method:"post",
				    		data:that.listQuery
				    	}).then(function(response){
				    		that .thirdTable = response.data.rows;
				    		
				    	}).catch(function(data){
				    		
				    	})
		    			that.$message({
				            type: 'success',
				            message: '删除成功!'
				        });
				    }).catch(function(data){
		    			
		    		})
		          
		        }).catch(() => {
		          that.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
    		
    	},
    	SizeChangeThird(val){//三级菜单分条
    		this.listQuery.pageSize = val;
    		var that=this;
    		that.service({
	    		url:"/sys/operatemenu/listChildrenData",
	    		method:"post",
	    		data:that.listQuery
	    	}).then(function(response){
	    		that.total3 = response.data.rowCount
	    		that .thirdTable = response.data.rows;
	    		
	    	}).catch(function(data){
	    		
	    	})
    	},
    	CurrentChangeThird(val){//三级菜单分页
    		this.listQuery.pageId = val;
    		var that=this;
    		that.service({
	    		url:"/sys/operatemenu/listChildrenData",
	    		method:"post",
	    		data:that.listQuery
	    	}).then(function(response){
	    		that.total3 = response.data.rowCount
	    		that .thirdTable = response.data.rows;
	    	}).catch(function(data){
	    		
	    	})
    	},
    	addUpdataThird(){//三级菜单新增
    		
    		var that = this;
    		that.service({
    			url:"/sys/operatemenu/add",
    			method:"post",
    			data:{
    				id : this.third
    			}
    		}).then(function(response){   			
    			that.dialogMenuUpdataThird=true;
    			that.menuFromThird = {
    				menuGrade :"三级菜单"
    			}
    		}).catch(function(data){
    			
    		})
    	},
    	dialogmenuThird(roleName){//确定三级菜单新增
    		if(this.dir != ""){
    			this.Page = ""
    		}else{
    			this.page = this.page;
    		}
    		var that = this;
    		that.$refs[roleName].validate((valid) => {
    			if(valid){
    				that.service({
						url:"/sys/operatemenu/addSave",
						method:"post",
						data:{
							name : that.menuFromThird.roleName,
							path : that.menuFromThird.roleMenuUrl,
							parentId : that.third,
							Page:that.Page,
							dir:that.dir
						}
					}).then(function(response){
						that.dialogMenuUpdataThird = false;
						that.listQuery.parentId = that.third;
				    	that.service({
				    		url:"/sys/operatemenu/listChildrenData",
				    		method:"post",
				    		data:that.listQuery
				    	}).then(function(response){console.log(response.data.rows)
				    		that.total3 = response.data.rowCount;
				    		that .thirdTable = response.data.rows;
				    		//console.log(this.thirdTable)
				    	}).catch(function(data){
				    		
				    	})
						that.$message({
							message:response.message,
							type:'success'
						})
						
					}).catch(function(data){
						that.dialogMenuUpdataThird = true
						
					})
    			}else{
    				return false;
    			}
    		})
    	}
    	
    }
  }
</script>
<style>
	.fillName {
	    width: 240px;
	  }
	.menu{
		padding:20px;
	}
	.userName{
		width:200px;
		float:left;
		margin-right:10px;
	}
	.input_4{
		width:150px;
		float:left;
	}
	.add{
		background:none;
		border:1px solid #ddd;
		float:left;
		color:#989898;
	}
	.refresh{
		background:none;
		border:1px solid #ddd;
		float:right;
		color:#989898;
	}
	
	.el-table th>.cell{
		text-align: center;
	}
	.el-table .cell{
		text-align: center;
	}
	.block {
		padding:20px 0;
		border-bottom: 1px solid #ddd;
	}
	.block .demonstration{
		font-weight: 100;
		color:#666;
		font-size: 14px;
	}
	.dialog_width_25 .el-dialog--small, .edit .el-dialog--small, .addNews .el-dialog--small, .EditBtn .el-dialog--small, .addBtnNew .el-dialog--small, .addMenuNew .el-dialog--small{
		width:33%
	}
	
</style>