<template>
		<div class="form-upload">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="活动名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="头像上传">
					<el-upload ref="uploadhea1"
					  class="avatar-uploader"
					  action="http://192.168.6.246:9191//file/upload"
					  :show-file-list="true"
					  :auto-upload="true"
					  :on-error="handleAvatarError"
					  :on-change="changeInput1"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="背景图片">
					<el-upload
					  action="https://jsonplaceholder.typicode.com/posts/"
					  list-type="picture-card"
					  :on-preview="handlePictureCardPreview"
					  :on-change="changeInput2"
					  :before-upload="beforeAvatarUpload"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="活动区域" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动时间" required>
					<el-col :span="11">
						<el-form-item prop="date1">
							<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="1" style="text-align:center">-</el-col>
					<el-col :span="11">
						<el-form-item prop="date2">
							<el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="即时配送" prop="delivery">
					<el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
				</el-form-item>
				<el-form-item label="活动性质" prop="type">
					<el-checkbox-group v-model="ruleForm.type">
						<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
						<el-checkbox label="地推活动" name="type"></el-checkbox>
						<el-checkbox label="线下主题活动" name="type"></el-checkbox>
						<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="特殊资源" prop="resource">
					<el-radio-group v-model="ruleForm.resource">
						<el-radio label="线上品牌商赞助"></el-radio>
						<el-radio label="线下场地免费"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="活动形式" prop="desc">
					<el-input type="textarea" v-model="ruleForm.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
				},
				imageUrl: '',
				dialogImageUrl: '',
        		dialogVisible: false,
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
			}
		}
	}
</script>
<style scoped>
	.form-upload{
		margin: 20px;
		max-width: 600px;
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