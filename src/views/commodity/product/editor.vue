<template>
		<div class="form-upload">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="商品名称" prop="name">
								<el-input v-model="ruleForm.name"  style="max-width: 400px"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="商品分类">
								<span>手机</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="商品图片">
								<el-upload
										action="https://jsonplaceholder.typicode.com/posts/"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-change="changeInput2"
										:before-upload="beforeAvatarUpload"
										:on-success="handleAvatarSuccess"
										:on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog v-model="dialogVisible" size="tiny">
								  <img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
							</el-form-item>
						</el-col>
					</el-row>
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="品牌" prop="region">
							<el-select v-model="ruleForm.region" placeholder="请选择商品品牌">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="设置" prop="">
							<el-checkbox-group
									v-model="checkedCities1"
									:min="1"
									:max="2">
								<el-checkbox v-for="typeshop in typeshops" :label="typeshop" :key="typeshop">{{typeshop}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="是否上架" prop="delivery">
							<el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item>
                    <el-button @click="goback">返回上级菜单</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
				</el-form>
			</div>
</template>
<script>
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					region: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
				},
				imageUrl: '',
				checkedCities1:'',
				dialogImageUrl: '',
        		dialogVisible: false,
				typeshops:['热卖'],
				rules: {
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					region: [
						{ required: true, message: '请选择活动区域', trigger: 'change' }
					],
					date1: [
						{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					],
					date2: [
						{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
					],
					type: [
						{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
					],
					resource: [
						{ required: true, message: '请选择活动资源', trigger: 'change' }
					],
					desc: [
						{ required: true, message: '请填写活动形式', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				var that=this;
				that.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						that.$message({
							type:'error',
							message:'请填写完整'
						})
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleAvatarSuccess(res, file) {
				console.log(res)
       			 this.imageUrl = URL.createObjectURL(file.raw);
      		},
			changeInput1:function(file, fileList){   //文件上传状态
				this.imageUrl=file.url
				if(fileList.length>1){  //限制只能上传一张图片
					fileList.shift()
				}
				console.log(fileList)
			},
			changeInput2:function(file, fileList){   //文件上传状态
				if(fileList.length>4){  //限制只能上传一张图片
					fileList.shift()
					this.$message({
						message:'最多只能上传四张图片',
						type:"error"
					})
				}
				console.log(fileList)
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg'||file.type ==='image/png'; //限制只能上传图片格式
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
				  this.$message.error('上传仅支持jpg以及png格式');
				  this.imageUrl="";
				}
				if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 2MB!');
				  this.imageUrl="";
				}
				return isJPG && isLt2M;
			},
			handleAvatarError:function(err){     //文件上传失败
				this.$message({
					message:'上传失败',
					type:'error'
				})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
            goback:function(){
               this.$router.go(-1)    //返回上一页
               var view=this.$route
               this.$store.dispatch('delVisitedViews', view) //关闭tab，跳转到上一级
            }
		},
		mounted:function(){
		    console.log(this.$route)
		}
	}
</script>
<style scoped>
	.form-upload{
		padding:20px;
		margin-top: 30px;
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>