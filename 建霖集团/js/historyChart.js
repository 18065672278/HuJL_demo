// 良率监测
function getanalysis(divId, JsonObject) {
    var myChart = echarts.init(document.getElementById(divId));
    myChart.showLoading(); //ajax请求之前加载圈
    
    //var jo = JSON.parse(JsonObject);
    /*for (var int = 0; int < JsonObject.length; int++) {
		var array_element = JsonObject[int];
		
	}*/
    var numberdatas= new Array();
    var ratedatas=new Array();
    var quantitydatas=new Array();
    var timedatas=new Array();
    /*for (var int = 0; int < JsonObject.length; int++) {
		var array_element = JsonObject[int].批次;
		var array_element1 = JsonObject[int].良率;
		numberdatas.push(array_element);
		ratedatas.push(array_element1);
	}*/
    $.each(JsonObject,function(i,n){
    	var array_element = n.批次;
    	var array_element1 = n.良率;
    	var array_element2 = n.数量;
    	var array_element3 = n.生产时间;
    	numberdatas.push(array_element);
		ratedatas.push(array_element1);
		quantitydatas.push(array_element2);
		timedatas.push(array_element3);
    });
    
    
    
    
    
    var option = {
        color: ["#0394fd", "#e23668", "#fe7101", "#00a030", "#fe0101"],//调色盘颜色列表
        tooltip: {//提示框组件
            trigger: 'axis',//触发类型:坐标轴触发
			formatter: function(params, ticket, callback) {
					 var strr='<h>批次号 : '+numberdatas[params[0].dataIndex]+'</h>'
						+'</br><h>数量 : '+quantitydatas[params[0].dataIndex]+' 良率 :'+ratedatas[params[0].dataIndex]+'% </h>'
						+'</br><h>'+timedatas[params[0].dataIndex]+'</h>';
			return strr;
			}
        },
        grid: {//直角坐标系内绘图网格,,画布
            top: '12%',//grid 组件离容器上侧的距离
            left: 0,//grid 组件离容器左侧的距离。
            right: '8%',//grid 组件离容器右侧的距离。
            bottom: '3%',//grid 组件离容器下侧的距离。
            containLabel: true//grid 区域是否包含坐标轴的刻度标签。
        },
        xAxis: {//x轴
            type: 'category',//坐标轴类型。'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            axisLine: {//坐标轴轴线相关设置。
                lineStyle: {//轴线样式。
                    color: '#3d3d67'
                }
            },
            axisLabel: {//坐标轴刻度标签的相关设置。
                color: '#a4a4ff'
            },
            //类目数据，在类目轴（type: 'category'）中有效。
            //data: ['机位2', '机位3', '机位4', '机位5', '机位6', '机位7', '机位8']
            data: numberdatas
        },
        yAxis: [{//直角坐标系 grid 中的 y 轴
            type: 'value',//坐标轴类型。可选： 'value' 数值轴，适用于连续数据。
            name:'良率',//坐标轴名称
            nameTextStyle:{//坐标轴名称的文字样式。
                color:"#a4a4ff",
                padding:[0,20,0,0]//文字块的内边距。例如
            },
            splitLine: {//坐标轴在 grid 区域中的分隔线。
                //去除网格线
                show: false//是否显示分隔线。
            },
            axisLine: {//坐标轴轴线相关设置
                lineStyle: {
                    color: '#3d3d67'//坐标轴线线的颜色。
                }
            },
            axisLabel: {//坐标轴刻度标签的相关设置。
                color: '#a4a4ff',//刻度标签文字的颜色
                formatter: '{value} %'//刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
            },
            min: 0,//坐标轴刻度最小值。
            max: 100,//坐标轴刻度最大值。
            interval: 20,//强制设置坐标轴分割间隔。
        }, {
            type: 'value',
            name:'温度',
            nameTextStyle:{
                color:"#a4a4ff",
                padding:[0,0,0,20]
            },
            position : 'right',//y 轴的位置。默认 grid 中的第一个 y 轴在 grid 的左侧（'left'），第二个 y 轴视第一个 y 轴的位置放在另一侧。
            splitLine: {
                //去除网格线
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff',
                formatter: '{value} %'
            },
            min: 0,
            max: 100,
            interval: 20,
        }, {
            type: 'value',
            name:'温度2',
            nameTextStyle:{
                color:"#a4a4ff",
                padding:[0,0,0,20]
            },
            position : 'right',
            offset : 60,
            splitLine: {
                //去除网格线
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff',
                formatter: '{value} %'
            },
            min: 0,
            max: 100,
            interval: 20,
        }, {
            type: 'value',
            name:'温度3',
            nameTextStyle:{
                color:"#a4a4ff",
                padding:[0,0,0,20]
            },
            position : 'right',
            offset : 120,
            splitLine: {
                //去除网格线
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#3d3d67'
                }
            },
            axisLabel: {
                color: '#a4a4ff',
                formatter: '{value} %'
            },
            min: 0,
            max: 100,
            interval: 20,
        }],
        series: [{//系列列表。每个系列通过 type 决定自己的图表类型
            type: 'line',
            name:'良率',//系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            data: ratedatas,//系列中的数据内容数组。
        },{
            type: 'line',
            name:'温度',
            data: [20, 40, 50, 80, 70, 10, 50],
        },{
            type: 'line',
            name:'温度2',
            data: [20, 60, 80, 80, 40, 30, 20],
        },{
            type: 'line',
            name:'温度3',
            data: [10, 50, 40, 60, 20, 40, 10],
        }]
    };
    myChart.clear();
    myChart.setOption(option);
    myChart.hideLoading(); //ajax请求之后关闭加载圈

    myChart.on("click", function (params) {
        console.log(params)
    })
    return myChart;
}