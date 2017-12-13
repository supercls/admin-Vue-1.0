<template>
    <div class="echats-content">
        <div id="myChart" :style="{width: '100%', height: '350px'}"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name:'charts',
    data (){
        return {

        }
    },
    mounted:function(){
        this.drawLine()
    },
    methods:{
        drawLine:function(){
            let myChart =echarts.init(document.getElementById('myChart'));
            let option = {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['最高','最低']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [
                    {
                        name:'最高',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 10],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'最低',
                        type:'line',
                        data:[1, -2, 2, 5, 3, 2, 0],
                        markPoint: {
                            data: [
                                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    }
                ]
            };
            myChart.setOption(option)
        }
    }
}
</script>
<style scoped>
    .echats-content{
        margin:25px 20px;
    }
</style>
