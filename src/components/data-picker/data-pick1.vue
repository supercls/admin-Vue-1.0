<template>
	<div>
		<el-date-picker
				v-model="pickDate"
				type="daterange"
				align="right"
				placeholder="选择日期范围"
				@change="change"
				:picker-options="pickerOptions">
		</el-date-picker>
	</div>
</template>
<script>
export default{
    methods:{
        change: function (value) {
            this.$emit('dataPick1',value)
        }
    },
    data(){
        return {
            pickDate:'',
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
                }, {
                    text: '最近一个月', onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月', onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
}
</script>
<style>

</style>