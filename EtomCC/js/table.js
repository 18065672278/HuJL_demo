function jumpPage(pageNo) {
	$("#pageNo").val(pageNo);
	$("#mainForm").submit();
}

function sort(orderBy, defaultOrder) {
	if ($("#orderBy").val() == orderBy) {
		if ($("#order").val() == "") {
			$("#order").val(defaultOrder);
		}
		else if ($("#order").val() == "desc") {
			$("#order").val("asc");
		}
		else if ($("#order").val() == "asc") {
			$("#order").val("desc");
		}
	}
	else {
		$("#orderBy").val(orderBy);
		$("#order").val(defaultOrder);
	}

	$("#mainForm").submit();
}

function searchKeyword(){
	if(event.keyCode==13){
        doSearch() ;
    }
}
function doSearch(){
	$("#h_keyWord").val($("#keyWord").val());
	$("#h_orderStr").val("");
	$("#h_orderType").val("");
	$("#pageNo").val(1);
	$("#h_isSer").val(1);
	$("#mainForm").submit();
}

function search() {
	$("#order").val("");
	$("#orderBy").val("");
	$("#pageNo").val("1");
	$("#mainForm").submit();
}

function addNew(url) {
	window.location.href=url;
}

function reload(){
	$("#mainForm").submit();
}

function flushPage(){
	$("#mainForm").submit();
}

function gotoPage() {
 	var str = document.all.jumppage.value;
    try{
		str = parseInt(str);
    }catch(e){
    	top.layer.alert("请您输入正确的页号");
        return false;
    }
    if(isNaN(str) || str <=0){
    	top.layer.alert("页号必须为大于0的整数");
        return false;
    }
	var lastpage = parseInt(document.all.lastpage.value);
	if( str > lastpage ) {
		str = lastpage ;
	}
	$("#pageNo").val(str);
	$("#mainForm").submit();
}

function exportExcel(url) {
	window.location.href=url;
}

function confirmDel() {
	if(confirm("请确定是否删除?")) { 
		return true;
	} else {
		return false;
	} 
}

function bringback(id, name) {
	window.parent.callbackProcess(id,name);
}

$(function(){
	$('#keyWord').keydown(function(e){
		if(e.keyCode==13){
	        doSearch();
	    }
	});
	//初始化排序列表样式
	var  h_orderStr = $("#h_orderStr").val();
	var  h_order = $("#h_order").val();
	$(".set_order").each(function(){
		if($(this).attr("orderStr") == h_orderStr){
			if(h_order == 'asc'){
				$(this).append('<span class="triangle_border_up"></span>');
			} else{
				$(this).append('<span class="triangle_border_down"></span>');
			}
		}
	});

	//点击表头排序
	$(".set_order").click(function(){
		var order = $("#h_order").val();
		if(order == 'desc'){
			$("#h_order").val('asc');
		}else{
			$("#h_order").val('desc');
		}
		$("#h_orderStr").val($(this).attr("orderStr"));
		$("#pageNo").val(1);
		$("#mainForm").submit();
	});
	
	//查找按钮
	$("#serBtn").click(function(){
		$("#h_keyWord").val($("#keyWord").val());
		$("#h_orderStr").val("");
		$("#h_orderType").val("");
		$("#pageNo").val(1);
		$("#h_isSer").val(1);
		$("#mainForm").submit();
	});

	//全选按钮
	$(".t_ck").click(function(){
		if($(this).is(":checked")){
			$(".e_ck").prop("checked", true);  	
		}else{
			$(".e_ck").prop("checked", false);  	
		}
	});
	
	/*var window_h = $("body").height() - 96;
	var rightContentHeight = $(".right-content").outerHeight();
	if(window_h < rightContentHeight){
		$(".left_menu,.sideright").css("min-height",rightContentHeight);
	}
	*/
	
	$(".handle").click(function(){
		var id = $(this).parents("tr").attr("rel");
		var url = $(this).attr("ref") + "?id=" + id;
		addNew(url);
	});
	
}); 
