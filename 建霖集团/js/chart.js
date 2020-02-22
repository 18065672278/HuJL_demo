// 前处理
function getanalysis(divId, JsonObject) {
    var myChart = echarts.init(document.getElementById(divId));
    myChart.showLoading(); //ajax请求之前加载圈
    var option = {
        color: ["#0394fd"],
        title:{
            show:true,
            text:'前处理',
            textStyle:{
                color:'#a4a4ff',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: 60,
            left: '3%',
            right: '0',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff'
            },
            data: ['机位2', '机位3', '机位4', '机位5', '机位6', '机位7', '机位8']
        },
        yAxis: {
            name: '良率（%）',
            nameTextStyle:{
                color:"#a4a4ff"
            },
            splitLine:{
                //去除网格线
                show: false
            },
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff'
            },
            min: 0,
            max: 100,
            interval: 20,
        },
        series: [{
            data: [10, 20, 50, 60, 70, 20, 30],
            type: 'line'
        }]
    };
    myChart.clear();
    myChart.setOption(option);
    myChart.hideLoading(); //ajax请求之后关闭加载圈

    myChart.on("click",function (params) {  
        console.log(params)
    })
    return myChart;
}
/* 喷涂 */
function spray(divId,JsonObject){
    var myChart = echarts.init(document.getElementById(divId));
    myChart.showLoading(); //ajax请求之前加载圈
    var option = {
        color: ["#0394fd"],
        title:{
            show:true,
            text:'喷涂',
            textStyle:{
                color:'#a4a4ff',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: 60,
            left: '3%',
            right: '0',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff'
            },
            data: ['机位2', '机位3', '机位4', '机位5', '机位6', '机位7', '机位8']
        },
        yAxis: {
            name: '良率（%）',
            nameTextStyle:{
                color:"#a4a4ff"
            },
            splitLine:{
                //去除网格线
                show: false
            },
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff'
            },
            min: 0,
            max: 100,
            interval: 20,
        },
        series: [{
            data: [10, 20, 50, 60, 70, 20, 30],
            type: 'line'
        }]
    };

    myChart.clear();
    myChart.setOption(option);
    myChart.hideLoading(); //ajax请求之后关闭加载圈

    myChart.on("click",function (params) {  
        console.log(params)
    })
    return myChart;
}
/* 干燥 */
function dry(divId,JsonObject){
    var myChart = echarts.init(document.getElementById(divId));
    myChart.showLoading(); //ajax请求之前加载圈
    var option = {
        color: ["#0394fd"],
        title:{
            show:true,
            text:'干燥',
            textStyle:{
                color:'#a4a4ff',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: 60,
            left: '3%',
            right: '0',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff'
            },
            data: ['机位2', '机位3', '机位4', '机位5', '机位6', '机位7', '机位8']
        },
        yAxis: {
            name: '良率（%）',
            nameTextStyle:{
                color:"#a4a4ff"
            },
            splitLine:{
                //去除网格线
                show: false
            },
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff'
            },
            min: 0,
            max: 100,
            interval: 20,
        },
        series: [{
            data: [10, 20, 50, 60, 70, 20, 30],
            type: 'line'
        }]
    };
    myChart.clear();
    myChart.setOption(option);
    myChart.hideLoading(); //ajax请求之后关闭加载圈

    myChart.on("click",function (params) {  
        console.log(params)
    })
    return myChart;
}
/* 良率预测 */
function prediction(divId,JsonObject){
    var myChart = echarts.init(document.getElementById(divId));
    myChart.showLoading(); //ajax请求之前加载圈
    var option = {
        color: ["#0394fd"],
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: 40,
            left: '3%',
            right: '0',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff'
            },
            data: ['机位2', '机位3', '机位4', '机位5', '机位6', '机位7', '机位8']
        },
        yAxis: {
            name: '良率（%）',
            nameTextStyle:{
                color:"#a4a4ff"
            },
            splitLine:{
                //去除网格线
                show: false
            },
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff'
            },
            min: 0,
            max: 100,
            interval: 20,
        },
        series: [{
            data: [10, 20, 50, 60, 70, 20, 30],
            type: 'line',
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#5dbbff' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#333351' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            },
        }]
    };


    myChart.clear();
    myChart.setOption(option);
    myChart.hideLoading(); //ajax请求之后关闭加载圈

    return myChart;
}
/* 1.柱状图(隐患情况明细表)
 * @author hujl
 * @time 2018.11.20
 * @method 函数 MarkCategoryO(DivId)
 * @param  DivId为canvas的父级ID,JsonObject为json格式数据
 * 用法  var myChart2_2 = MarkCategoryO('echart2-2',JsonObject);
*/
function MarkCategoryO(DivId,JsonObject){
	var myChart = echarts.init(document.getElementById(DivId));
	console.log(JsonObject)
	window.onresize = myChart.resize;
	myChart.showLoading();
		var option = {
				tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        },
			        formatter:function(params){
                    	var relVal = params[0].name + ':' + params[0].value + '%';
                    	return relVal;
                    },
        		    confine:true
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '10%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: {
			                lineStyle: {
			                    color: '#3d3d67'
			                }
			            },
			            axisLabel: {
			            	color: '#a4a4ff',
		                   	//interval:0,//interval设置成 0 强制显示所有标签
		                   	//rotate:20//刻度标签旋转的角度
		                },
			            data : ['红外温度1','红外温度2','红外温度3','红外温度4','红外温度5','红外温度6']
			        }
			    ],
			    yAxis : [
			        {
			        	name: '良率（%）',
			            nameTextStyle:{
			                color:"#a4a4ff"
			            },
			            type : 'value',
			            max:100,
			            splitLine:{
			            	show:true,
			            	lineStyle: {
			                    color: '#3d3d67'
			                }
			            },
			            axisLine: {
                			lineStyle: {
			                    color: '#3d3d67'
			                }
			            },
			            axisLabel: {
			                color: '#a4a4ff',
			                //formatter: '{value} %'
			            }
			        }
			    ],
			    series : [
			        {
			            name:'良率（%）',
			            type:'bar',
			            barWidth : 30,
			            data:[15,20,25,30,35,40],
			            itemStyle: {
			                normal: {
			                	color:'#0394fd',
			                    //柱形图圆角，初始化效果
			                    barBorderRadius:[5, 5, 0, 0],
			                }
			            }
			        }
			    ]
		    };
	    myChart.clear();
	    myChart.setOption(option);
	    myChart.hideLoading();
    return myChart;
}