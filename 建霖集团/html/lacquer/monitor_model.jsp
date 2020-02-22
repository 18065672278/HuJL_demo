<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 <%@ include file="../../../common/tag.jsp"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>良率关键影响因素监测模型</title>
    <link rel="stylesheet" href="../../css/base.css">
    <link rel="stylesheet" href="../../css/common.css">
    <link rel="stylesheet" href="../../css/lacquer.css">
    <link rel="stylesheet" href="../../css/font/iconfont.css">
    <link rel="stylesheet" type="text/css" href="../../js/select/select.css"/>
    <link rel="stylesheet" type="text/css" href="../../js/mCustomScrollbar/jquery.mCustomScrollbar.css"/>
    <style type="text/css">
    	.selectDiv .selectValue {
    		width:140px;
    	}
    	.table tbody td span {
    		color: #177BD0;
    	}
    	.table-content {
		    position: relative;
		    padding: 0;
		    margin: 0;
		    overflow: hidden;
	        width: 100%;
		}
    </style>
</head>

<body>
    <div class="main-wrapper">
    
        <div class="childrenBody">
            <div class="children-header">
                <h3 class="title">
                    <i class="iconfont icon-moxingguanli"></i> 良率关键影响因素监测模型
                </h3>
                <div class="opaer-box">
                    <div class="form-item">
                        <div class="selectDiv up" id="selectDiv">
                            <input id="beginyear" type="text" class="selectValue" readonly="true" unselectable="on" data-type="" placeholder="产品类别">
                            <div class="selectOption has-selectsearch">
                                <div class="select-search">
                                    <input class="search-input js-search-input" type="text" placeholder="搜索">
                                </div>
                                <div class="select-scroll">
                                    <div class="option"><a href="javascript:void(0);" date-selectid="3">2016</a></div>
                                    <div class="option"><a href="javascript:void(0);" date-selectid="4">2017</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="selectDiv up" id="selectDiv1">
                            <input id="beginyear1" type="text" class="selectValue" readonly="true" unselectable="on" data-type="" placeholder="线别">
                            <div class="selectOption has-selectsearch">
                                <div class="select-search">
                                    <input class="search-input js-search-input" type="text" placeholder="搜索">
                                </div>
                                <div class="select-scroll">
                                    <div class="option"><a href="javascript:void(0);" date-selectid="3">2016</a></div>
                                    <div class="option"><a href="javascript:void(0);" date-selectid="4">2017</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="selectDiv up" id="selectDiv2">
                            <input id="beginyear2" type="text" class="selectValue" readonly="true" unselectable="on" data-type="" placeholder="段位">
                            <div class="selectOption has-selectsearch">
                                <div class="select-search">
                                    <input class="search-input js-search-input" type="text" placeholder="搜索">
                                </div>
                                <div class="select-scroll">
                                    <div class="option"><a href="javascript:void(0);" date-selectid="3">2016</a></div>
                                    <div class="option"><a href="javascript:void(0);" date-selectid="4">2017</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item mb10">
                        <input style="width:170px;" class="form-item-input" id="keyWord" type="text" placeholder="输入因子名称">
                    </div>
                    <a href="javascript:void(0);" id="queryBtn" class="common-btn btn-normal">查询</a>
                    <a href="../setting/add_group.html" id="addBtn" class="common-btn btn-green">导出Excel</a>
					<a href="javascript:void(0);" class="changeicon histogram-change"></a>                    
                </div>
            </div>
            <div class="table-content" id="isTShow">
            	<table class="table fixedTable">
                    <colgroup>
                        <col width="160">
                        <col width="160">
                        <col width="160">
                        <col width="160">
                        <col width="160">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>一级分类</th>
                            <th>二级分类</th>
                            <th>三级分类</th>
                            <th></th>
                            <th>单因素</th>
                            <th>双因素</th>
                        </tr>
                    </thead>
                </table>
                <div class="table-content scrollbar">
	                <table class="table scrollTable">
	                    <colgroup>
	                        <col width="160">
	                        <col width="160">
	                        <col width="160">
	                        <col width="160">
	                        <col width="160">
	                    </colgroup>
	                    <thead>
	                        <tr>
	                            <th>一级分类</th>
	                            <th>二级分类</th>
	                            <th>三级分类</th>
	                            <th></th>
	                            <th>单因素</th>
	                            <th>双因素</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                        <tr>
	                            <td rowspan="11">喷漆线</td>
	                            <td rowspan="4">前处理<span>(0.087)</span></td>
	                            <td>底漆<span>(0.087)</span></td>
	                            <td></td>
	                            <td>漆料混合<span>(0.087)</span></td>
	                            <td></td>
	                        </tr>
	                        <tr>
	                        	<td rowspan="2">1#喷柜<span>(0.087)</span></td>
	                        	<td rowspan="2"></td>
	                        	<td>静电吸附<span>(0.087)</span></td>
	                        	<td></td>
	                        </tr>
	                        <tr>
	                        	<td>静电电压<span>(0.087)</span></td>
	                        	<td></td>
	                        </tr>
	                        <tr>
	                        	<td>流平(流水线)<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>静电吸附<span>(0.087)</span></td>
	                        	<td></td>
	                        </tr>
	                        <tr>
	                        	<td rowspan="4">喷涂<span>(0.087)</span></td>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td rowspan="3">干燥<span>(0.887)</span></td>
	                        	<td>烘箱<span>(0.887)</span></td>
	                        	<td></td>
	                        	<td>漆料的调配<span>(0.887)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>烘箱<span>(0.887)</span></td>
	                        	<td></td>
	                        	<td>漆料的调配<span>(0.887)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>烘箱<span>(0.887)</span></td>
	                        	<td></td>
	                        	<td>漆料的调配<span>(0.887)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                    </tbody>
	                    <tbody>
	                        <tr>
	                            <td rowspan="11">注塑线</td>
	                            <td rowspan="4">前处理<span>(0.087)</span></td>
	                            <td>底漆<span>(0.087)</span></td>
	                            <td></td>
	                            <td>漆料混合<span>(0.087)</span></td>
	                            <td></td>
	                        </tr>
	                        <tr>
	                        	<td rowspan="2">1#喷柜<span>(0.087)</span></td>
	                        	<td rowspan="2"></td>
	                        	<td>静电吸附<span>(0.087)</span></td>
	                        	<td></td>
	                        </tr>
	                        <tr>
	                        	<td>静电电压<span>(0.087)</span></td>
	                        	<td></td>
	                        </tr>
	                        <tr>
	                        	<td>流平(流水线)<span>(0.087)</span></td>
	                        	<td></td>`
	                        	<td>静电吸附<span>(0.087)</span></td>
	                        	<td></td>
	                        </tr>
	                        <tr>
	                        	<td rowspan="4">喷涂<span>(0.087)</span></td>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td rowspan="3">干燥<span>(0.887)</span></td>
	                        	<td>烘箱<span>(0.887)</span></td>
	                        	<td></td>
	                        	<td>漆料的调配<span>(0.887)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>烘箱<span>(0.887)</span></td>
	                        	<td></td>
	                        	<td>漆料的调配<span>(0.887)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>烘箱<span>(0.887)</span></td>
	                        	<td></td>
	                        	<td>漆料的调配<span>(0.887)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                    </tbody>
	                    <tbody>
	                        <tr>
	                            <td rowspan="11">表面处理</td>
	                            <td rowspan="4">前处理<span>(0.087)</span></td>
	                            <td>底漆<span>(0.087)</span></td>
	                            <td></td>
	                            <td>漆料混合<span>(0.087)</span></td>
	                            <td></td>
	                        </tr>
	                        <tr>
	                        	<td rowspan="2">1#喷柜<span>(0.087)</span></td>
	                        	<td rowspan="2"></td>
	                        	<td>静电吸附<span>(0.087)</span></td>
	                        	<td></td>
	                        </tr>
	                        <tr>
	                        	<td>静电电压<span>(0.087)</span></td>
	                        	<td></td>
	                        </tr>
	                        <tr>
	                        	<td>流平(流水线)<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>静电吸附<span>(0.087)</span></td>
	                        	<td></td>
	                        </tr>
	                        <tr>
	                        	<td rowspan="4">喷涂<span>(0.087)</span></td>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>面漆<span>(0.087)</span></td>
	                        	<td></td>
	                        	<td>固化<span>(0.087)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td rowspan="3">干燥<span>(0.887)</span></td>
	                        	<td>烘箱<span>(0.887)</span></td>
	                        	<td></td>
	                        	<td>漆料的调配<span>(0.887)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>烘箱<span>(0.887)</span></td>
	                        	<td></td>
	                        	<td>漆料的调配<span>(0.887)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                        <tr>
	                        	<td>烘箱<span>(0.887)</span></td>
	                        	<td></td>
	                        	<td>漆料的调配<span>(0.887)</span></td>
	                        	<td>A1镀膜机台/下座镀膜机台-温湿度<span>(0.887)</span></td>
	                        </tr>
	                    </tbody>
	                </table>
	            </div>
                <div class="pagination" id="pagination"></div>
            </div>
        	<div class="row mt" id="isShow" style="display: none;">
                <div class="row-col">
                    <section class="panel">
                        <div class="panel-body clearfix">
                        	<div class="echarts" id="chart1"></div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <script src="../../js/jquery-1.11.0.min.js"></script>
    <script src="../../js/layui/layui.all.js"></script>
    <script src="../../js/select/select.js" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/mCustomScrollbar/jquery.mCustomScrollbar.js" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/echarts.min.js"></script>
    <script src="../../js/chart.js" type="text/javascript" charset="utf-8"></script>
    <script>
    	//产品类别
    	$.divselect("#selectDiv", "#beginyear", null, null, null, true);
    	//所属公司
    	$.divselect("#selectDiv1", "#beginyear1", null, null, null, true);
    	//段位
    	$.divselect("#selectDiv2", "#beginyear2", null, null, null, true);
    	$(window).resize(function(){
			thw();
		});
    	//计算表格高度及头部的宽度
    	function thw(){
    		var Twidth = $(".scrollTable").width() + 2;
    		$(".fixedTable").width(Twidth);
    		var Theight = $(window).height() - 90;
    		$(".table-content").height(Theight);
    	};
    	thw();
    	$(function(){
    		$(".scrollbar").mCustomScrollbar({
	        	scrollInertia:0,//滚动延迟
	        	mouseWheelPixels:80 // 滚动距离
	        });
    	});
    	//图表
    	var myChart1 = MarkCategoryO('chart1','');
    	//点击右上角图标切换展示
    	$(".changeicon").on("click",function(){
    		var isChange = $(this).hasClass("histogram-change");
    		if(isChange){
    			$(this).removeClass("histogram-change").addClass("form-change");
    			$("#isShow").show();
    			$("#isTShow").hide();
    			myChart1.resize();
    		}else{
    			$(this).removeClass("form-change").addClass("histogram-change");
    			$("#isShow").hide();
    			$("#isTShow").show();
    		}
    	})
    </script>
</body>

</html>