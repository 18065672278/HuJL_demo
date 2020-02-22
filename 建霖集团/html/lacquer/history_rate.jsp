<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../../../common/tag.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>l历史良率分析模型</title>
<link rel="stylesheet" href="../../css/base.css">
<link rel="stylesheet" href="../../css/common.css">
<link rel="stylesheet" href="../../css/lacquer.css">
<link rel="stylesheet" href="../../css/font/iconfont.css">
<link rel="stylesheet" href="../../js/select/select.css">
</head>

<body>
	<div class="main-wrapper">
		<div class="childrenBody">
			<div class="children-header ">
				<h3 class="title">
					<i class="iconfont icon-moxingguanli"></i> l历史良率分析模型
				</h3>
			</div>
			<div class="btn-group-content mt">
				<div class="form-item-group ">
					<div class="form-item mb10">
						<div class="selectDiv up" id="selectDiv">
							<input id="beginyear" type="text" class="selectValue"
								readonly="true" unselectable="on" data-type=""
								placeholder="选择产品类别">
							<div class="selectOption has-selectsearch">
								<div class="select-search">
									<input class="search-input js-search-input" type="text"
										placeholder="搜索" />
								</div>
								<div class="select-scroll">
									<c:forEach items="${pcMapList}" var="pc" varStatus="i">
										<div class="option">
											<a href="javascript:void(0);" date-selectid="${pc.产品类别id}">${pc.产品类别}</a>
										</div>
									</c:forEach>
									<!-- <div class="option"><a href="javascript:void(0);" date-selectid="4">2017</a></div> -->
								</div>
							</div>
						</div>
					</div>
					<div class="form-item mb10">
						<input style="width: 170px; cursor: pointer;"
							class="form-item-input date-icon" id="beginDate" type="text"
							readonly="readonly" placeholder="开始日期">
					</div>
					<div class="form-item mb10">
						<input style="width: 170px; cursor: pointer;"
							class="form-item-input date-icon" id="endDate" type="text"
							readonly="readonly" placeholder="结束日期">
					</div>
					<div class="form-item mb10">
						<div class="selectDiv up" id="selectDiv1">
							<input id="beginyear1" type="text" class="selectValue"
								readonly="true" unselectable="on" data-type="" placeholder="线别">
							<div class="selectOption has-selectsearch">
								<div class="select-search">
									<input class="search-input js-search-input" type="text"
										placeholder="搜索" />
								</div>
								<div class="select-scroll">
									<c:forEach items="${plMapList}" var="pl" varStatus="i">
										<div class="option">
											<a href="javascript:void(0);" date-selectid="${pl.产线类别id}">${pl.产线类别}</a>
										</div>
									</c:forEach>
									<!--  <div class="option"><a href="javascript:void(0);" date-selectid="3">2016</a></div>
                                    <div class="option"><a href="javascript:void(0);" date-selectid="4">2017</a></div> -->
								</div>
							</div>
						</div>
					</div>
					<div class="form-item mb10">
						<div class="selectDiv up" id="selectDiv2">
							<input id="beginyear2" type="text" class="selectValue"
								readonly="true" unselectable="on" data-type="" placeholder="段位">
							<div class="selectOption has-selectsearch">
								<div class="select-search">
									<input class="search-input js-search-input" type="text"
										placeholder="搜索" />
								</div>
								<div class="select-scroll">
									<!-- <div class="option">
										<a href="javascript:void(0);" date-selectid="3">2016</a>
									</div>
									<div class="option">
										<a href="javascript:void(0);" date-selectid="4">2017</a>
									</div> -->
								</div>
							</div>
						</div>
					</div>
					<div class="form-item mb10">
						<div class="selectDiv up" id="selectDiv3">
							<input id="beginyear3" type="text" class="selectValue"
								readonly="true" unselectable="on" data-type="" placeholder="机位">
							<div class="selectOption has-selectsearch">
								<div class="select-search">
									<input class="search-input js-search-input" type="text"
										placeholder="搜索" />
								</div>
								<div class="select-scroll">
									<!-- <div class="option">
										<a href="javascript:void(0);" date-selectid="3">2016</a>
									</div>
									<div class="option">
										<a href="javascript:void(0);" date-selectid="4">2017</a>
									</div> -->
								</div>
							</div>
						</div>
					</div>
					<a href="javascript:void(0);" id="queryBtn"
						class="common-btn btn-normal">查询</a>
				</div>
			</div>
			<div class="row mt clearfix">
				<div class="row-col-6 pr10">
					<section class="panel">
						<div class="panel-heading">
							<i class="iconfont icon-shuju"></i> 良率监测
						</div>
						<div class="panel-body">
							<div class=" historyChart" id="historyChart"></div>
						</div>
					</section>
				</div>
				<div class="row-col-6 pl10">
					<section class="panel">
						<div class="panel-heading">
							<i class="iconfont icon-fenzu"></i> 参数状态
							<div class="opaer-box">
								<a href="javascript:void(0);" id="queryBtn"
									class="common-btn btn-green">开始对比</a>
							</div>
						</div>
						<div class="panel-body">
							<div class="type-tabContent scroller" id="scroll">
								<div class="viewport">
									<div class="overview">
										<div class="type-content clearfix" id="check_list">
											<li class="type-item"><input class="checkbox"
												type="checkbox" name="type" id="0001" value="0001">
												<label class="checkbox-txt" for="0001"> 1#除油槽温度<i
													class="red">880°</i>
											</label></li>
											<li class="type-item"><input class="checkbox"
												type="checkbox" name="type" id="0002" value="0002">
												<label class="checkbox-txt" for="0002"> 1#除油槽温度<i
													class="red">880°</i>
											</label></li>
											<li class="type-item"><input class="checkbox"
												type="checkbox" name="type" id="0003" value="0003">
												<label class="checkbox-txt" for="0003"> 1#除油槽温度<i
													class="red">880°</i>
											</label></li>
											<li class="type-item"><input class="checkbox"
												type="checkbox" name="type" id="0004" value="0004">
												<label class="checkbox-txt" for="0004"> 1#除油槽温度<i
													class="red">880°</i>
											</label></li>
											<li class="type-item"><input class="checkbox"
												type="checkbox" name="type" id="0005" value="0005">
												<label class="checkbox-txt" for="0005"> 1#除油槽温度<i
													class="red">880°</i>
											</label></li>
											<li class="type-item"><input class="checkbox"
												type="checkbox" name="type" id="0006" value="0006">
												<label class="checkbox-txt" for="0006"> 1#除油槽温度<i
													class="red">880°</i>
											</label></li>
											<li class="type-item"><input class="checkbox"
												type="checkbox" name="type" id="0007" value="0007">
												<label class="checkbox-txt" for="0007"> 1#除油槽温度<i
													class="red">880°</i>
											</label></li>
											<li class="type-item"><input class="checkbox"
												type="checkbox" name="type" id="0008" value="0008">
												<label class="checkbox-txt" for="0008"> 1#除油槽温度<i
													class="red">880°</i>
											</label></li>
										</div>
									</div>
								</div>
								<div class="scrollbar">
									<div class="track">
										<div class="thumb"></div>
									</div>
								</div>
							</div>
						</div>

					</section>
				</div>
			</div>
			<div class="row">
				<div class="row-col">
					<section class="panel">
						<div class="panel-heading">
							<i class="iconfont icon-talk"></i> 调优建议
						</div>
						<div class="panel-body">
							<div class="suggest-content scroller" id="scroll1">
								<div class="viewport">
									<div class="overview">
										<ul class="sugges-list">
											<li class="suggest-list-item no-suggest">暂无调优建议</li>
											<li class="suggest-list-item">
												<div class="suggest-list-title">最少改变排序</div>
												<div class="suggest-list-sys">良品率=96.0%，属性调整量=9, 主要属性：</div>
												<div class="suggest-list-content">
													18#真空干燥100000°,<span class="normal">红外2温度72°,1#除油槽温度880°,3#水洗温度30°</span>,4#活化温度50°,6#水洗温度34°,7#纯化温度50°,<span
														class="normal">1#喷漆室旋转电机 速度223°</span>,1#喷枪上行下行速度223’,18#真空干燥1真空值22‘,18#真空干燥1槽壁温度220°,除尘台送风机运行频率220°,除尘台过道送风机运行
													频率223’,除尘台旋转电机运行频率223’,1#喷枪静电电压22‘,1#喷枪静电电流220°,1#喷枪供油泵速度220°,1#喷枪旋杯卸杯压力220°,1#喷枪
													旋杯喷幅压力1220°
												</div>
											</li>
											<li class="suggest-list-item">
												<div class="suggest-list-title">最少改变排序</div>
												<div class="suggest-list-sys">良品率=96.0%，属性调整量=9, 主要属性：</div>
												<div class="suggest-list-content">
													18#真空干燥100000°,<span class="normal">红外2温度72°,1#除油槽温度880°,3#水洗温度30°</span>,4#活化温度50°,6#水洗温度34°,7#纯化温度50°,<span
														class="normal">1#喷漆室旋转电机 速度223°</span>,1#喷枪上行下行速度223’,18#真空干燥1真空值22‘,18#真空干燥1槽壁温度220°,除尘台送风机运行频率220°,除尘台过道送风机运行
													频率223’,除尘台旋转电机运行频率223’,1#喷枪静电电压22‘,1#喷枪静电电流220°,1#喷枪供油泵速度220°,1#喷枪旋杯卸杯压力220°,1#喷枪
													旋杯喷幅压力1220°
												</div>
											</li>
											<li class="suggest-list-item">
												<div class="suggest-list-title">最少改变排序</div>
												<div class="suggest-list-sys">良品率=96.0%，属性调整量=9, 主要属性：</div>
												<div class="suggest-list-content">
													18#真空干燥100000°,<span class="normal">红外2温度72°,1#除油槽温度880°,3#水洗温度30°</span>,4#活化温度50°,6#水洗温度34°,7#纯化温度50°,<span
														class="normal">1#喷漆室旋转电机 速度223°</span>,1#喷枪上行下行速度223’,18#真空干燥1真空值22‘,18#真空干燥1槽壁温度220°,除尘台送风机运行频率220°,除尘台过道送风机运行
													频率223’,除尘台旋转电机运行频率223’,1#喷枪静电电压22‘,1#喷枪静电电流220°,1#喷枪供油泵速度220°,1#喷枪旋杯卸杯压力220°,1#喷枪
													旋杯喷幅压力1220°
												</div>
											</li>
											<li class="suggest-list-item">
												<div class="suggest-list-title">最少改变排序</div>
												<div class="suggest-list-sys">良品率=96.0%，属性调整量=9, 主要属性：</div>
												<div class="suggest-list-content">
													18#真空干燥100000°,<span class="normal">红外2温度72°,1#除油槽温度880°,3#水洗温度30°</span>,4#活化温度50°,6#水洗温度34°,7#纯化温度50°,<span
														class="normal">1#喷漆室旋转电机 速度223°</span>,1#喷枪上行下行速度223’,18#真空干燥1真空值22‘,18#真空干燥1槽壁温度220°,除尘台送风机运行频率220°,除尘台过道送风机运行
													频率223’,除尘台旋转电机运行频率223’,1#喷枪静电电压22‘,1#喷枪静电电流220°,1#喷枪供油泵速度220°,1#喷枪旋杯卸杯压力220°,1#喷枪
													旋杯喷幅压力1220°
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div class="scrollbar">
									<div class="track">
										<div class="thumb"></div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
	<script src="../../js/jquery-1.11.0.min.js"></script>
	<script src="../../js/layer/layer.js"></script>
	<script src="../../js/laydate/laydate.js"></script>
	<script src="../../js/select/select.js"></script>
	<script src="../../js/tinyscrollbar/jquery.tinyscrollbar.js"></script>
	<script src="../../js/echarts.min.js"></script>
	<script src="../../js/historyChart.js"></script>
	<script>
		$scroll = $('#scroll');
		$scroll1 = $('#scroll1');
		$scroll.tinyscrollbar({
			axis : 'y'
		});
		$scroll1.tinyscrollbar({
			axis : 'y'
		});
		
		
		
		
		//保证必填项及搜索历史良率
		$(function() {
			$(".btn-normal").click(function() {
				var beginyear = $("#beginyear").val();
				var beginDate = $("#beginDate").val();
				var endDate = $("#endDate").val();
				/* if(beginyear==''||beginDate==''||endDate==''||$.trim(beginyear).length == 0||$.trim(beginDate).length == 0||$.trim(endDate).length == 0 ){
					layer.tips("产品类别、开始日期和结束日期必填", ".btn-normal" );
					return false;
				}; */
				var line= $("#beginyear1").val();
				var segment= $("#beginyear2").val();
				var position= $("#beginyear3").val();
				
				
				$.ajax({
					async : true,
					dataType : "JSON",
					url : "/webapp/html/lacquer/getViewByCondition.json",
					data : {
						'product_category' : beginyear,
						'beginDate' : beginDate,
						'endDate' : endDate,
						'product_line_category' : line,
						'product_line_segment_position' : segment,
						'product_line_machine_position' : position
						/* 'pk_corp':pk_corp */
					},
					success : function(data) {
						//console.log(data);
						//alert(data);
						var len = data.length;
						getEcharts(data);
						/* for (var i = 0, len = data.length; i < len; i++) {
							var option = $('<div class="option"><a href="javascript:void(0);" date-selectid="'
									+ data[i].段位类别id
									+ '">'
									+ data[i].段位类别 + '</a></div>');
							$("#selectDiv2 .select-scroll").append(
									option);
						} */
					}
					
					
				});
				
				
				
			});
		});

		// 产品类别       			

		/*divselect       下拉框容器的id
		 	inputselectid   下拉框input的id，用于值的展示
		  hiddenInputId   隐藏域的id，用于form表单值的传输（可选）
		  callback        回调函数（可选）
		  scrollBox       滚动容器，jquery选择器
		  isSearch        是否搜索，不传值或者为false无搜索  */
		$.divselect("#selectDiv", "#beginyear", null, changeCondition1, null,
				true);
		/* 回调函数 */
		/*  id 是下拉框input的id*/
		/*  (即type)选中选项的属性date-selectid的值
			已经赋值到下拉框input的属性data-type上
		 */
		function changeCondition1(id, type) {

		}

		// 线别
		$.divselect("#selectDiv1", "#beginyear1", null, changeCondition2, null,
				true);
		function changeCondition2(id, type) {
			var segment = $("#beginyear2").val();
			var position = $("#beginyear3").val();
			if (segment != '' || position != '') {

				$("#beginyear2").val('');
				$("#beginyear3").val("");
				$("#selectDiv2 .select-scroll").html("");
				$("#selectDiv3 .select-scroll").html("");
			}
			var productLineId = type;
			$
					.ajax({
						async : true,
						dataType : "JSON",
						url : "/webapp/html/lacquer/getSegmentByLineId.json",
						data : {
							'productLineId' : productLineId,
							'pk_corp' : null
						},
						success : function(data) {
							$("#selectDiv2 .select-scroll").html("");
							if (data && data.length > 0) {
								for (var i = 0, len = data.length; i < len; i++) {
									var option = $('<div class="option"><a href="javascript:void(0);" date-selectid="'
											+ data[i].段位类别id
											+ '">'
											+ data[i].段位类别 + '</a></div>');
									$("#selectDiv2 .select-scroll").append(
											option);
								}
							}
						}
					});
		}
		// 段位
		$.divselect("#selectDiv2", "#beginyear2", null, changeCondition3, null,
				true);
		function changeCondition3(id, type) {
			var position = $("#beginyear3").val();
			if (position != '') {
				$("#beginyear3").val("");
				$("#selectDiv3 .select-scroll").html("");
			}
			var productSegmentId = type;
			$
					.ajax({
						async : true,
						dataType : "JSON",
						url : "/webapp/html/lacquer/getPositionBySegmentId.json",
						data : {
							'productSegmentId' : productSegmentId,
							'pk_corp' : null
						},
						success : function(data) {
							$("#selectDiv3 .select-scroll").html("");
							if (data && data.length > 0) {
									$.each(
									data,
									function(i, n) {
										var option = $('<div class="option"><a href="javascript:void(0);" date-selectid="'
												+ n.机位类别id
												+ '">'
												+ n.机位类别
												+ '</a></div>');
										$(
												"#selectDiv3 .select-scroll")
												.append(option);
									});
							}
						}
					});
		}
		// 机位
		$.divselect("#selectDiv3", "#beginyear3", null, changeCondition4, null,
				true);
		function changeCondition4(id, type) {

		}
		//执行一个laydate实例
		laydate.render({
			elem : '#beginDate', //指定元素
			done : function(value, date, endDate) {
				// value:得到日期生成的值;date:得到日期生成对象;endDate:得到结束的日期对象时间
				checkDate("beginDate", "endDate");
			}
		});
		laydate.render({
			elem : '#endDate', //指定元素
			done : function(value, date, endDate) {
				// value:得到日期生成的值;date:得到日期生成对象;endDate:得到结束的日期对象时间
				checkDate("beginDate", "endDate");
			}
		});
		//检查结束日期是否大于开始日期
		function checkDate(startId, endId) {
			var sTime = $("#" + startId).val();
			var eTime = $("#" + endId).val();
			if (sTime == "" || eTime == "") {
				return;
			}
			sTime = sTime.replace(/-/g, "/");
			eTime = eTime.replace(/-/g, "/");
			var sDate = new Date(sTime);
			var eDate = new Date(eTime);
			if (Date.parse(sDate) > Date.parse(eDate)) {
				layer.tips("开始时间不能大于结束时间", "#" + startId);
				$("#" + endId).val('');
				return false;
			}
			return true;
		}
		function getEcharts(JsonObject){
			var myChart1 = getanalysis('historyChart', JsonObject);
			window.onresize = function() {
				myChart1.resize();
			}
		}
		var myChart1 = getanalysis('historyChart', '');
		window.onresize = function() {
			myChart1.resize();
		}

		/* 参数状态选择 */
		$("#check_list").on("change", ".checkbox", function() {
			var parentNode = $(this).parents(".type-content");
			var inputNum = parentNode.find(".checkbox").length;
			var checkedNum = parentNode.find(".checkbox:checked").length;
			if (checkedNum > 4) {
				layer.msg('最多只能选择4个哦~');
				$(this).prop("checked", false);
			}
		})
	</script>
</body>

</html>