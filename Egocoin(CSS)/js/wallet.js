/*钱包首页*/
//首次进入页面时加载
var firstmarket = function() {}
firstmarket();
//个人币种钱包信息查询
var market = function(obj) {
	var currency = $(obj).text(); //哪种货币
	console.log(currency);
	$(obj).siblings().attr("class", "");
	$(obj).attr("class", "on");
	$("#currency").val(currency);
	$("title").text(currency + "钱包");
	$(".logo").text(currency + "钱包");
}

/*明细页面*/
var j = 1;
//交易明细首次加载
var firstdetails = function() {
	var firstdate = $("#date").val(); //几月份的记录
	var firstsub = $("#dtype").val(); //哪个类型数据（全部、充值、提现）
	var firstsel = $("#selcurry").val(); //哪个币种（BTC、USDT、BCH、LTC、ETH）
	console.log("时间:" + firstdate, "类型数据:" + firstsub, "币种:" + firstsel);
}
//获取当前年月
var Ym = function() {
	var date = new Date;
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" + month : month);
	var mydate = (year.toString() + "-" + month.toString());
	return mydate;
}
//获取当前时间
$("#date").attr("value", Ym());
//交易明细
var submenu = function(obj) {
	var datetime = $("#date").val(); //几月份的记录
	var selcurry = $("#selcurry").val(); //哪个币种（BTC、USDT、BCH、LTC、ETH）
	var submenu = $(obj).attr("dtype"); //哪个类型数据（全部、充值、提现）
	console.log("时间:" + datetime, "类型数据:" + submenu, "币种:" + selcurry);
	$(obj).siblings().attr("class", "");
	$(obj).attr("class", "on");
	$("#dtype").val(submenu);
	j = 1;
}
//币种选择
var selcurry = function(obj) {
	var datetime = $("#date").val(); //几月份的记录
	var submenu = $("#dtype").val(); //哪个类型数据（全部、充值、提现）
	var selcurry = $(obj).text(); //哪个币种（BTC、USDT、BCH、LTC、ETH）
	console.log("时间:" + datetime, "类型数据:" + submenu, "币种:" + selcurry);
	$(obj).siblings().attr("class", "");
	$(obj).attr("class", "on");
	$("#selcurry").val(selcurry);
	$("title").text("交易明细(" + selcurry + ")");
	$(".logo").text("交易明细(" + selcurry + ")");
	$(".rcode").text(selcurry);
	j = 1; //加载更多pagenum
}
//加载更多
var listmore = function() {
	var datetime = $("#date").val(); //几月份的记录
	var submenu = $("#dtype").val(); //哪个类型数据（全部、充值、提现）
	var selcurry = $("#selcurry").val(); //哪个币种（全部、充值、提现）
	j++;
	console.log("页码:" + j, "时间:" + datetime, "类型数据:" + submenu, "币种:" + selcurry);
}
//日期修改后执行
var update = function(obj) {
	var datetime = obj; //几月份的记录
	var submenu = $("#dtype").val(); //哪个类型数据（全部、充值、提现）
	var selcurry = $("#selcurry").val(); //哪个币种（全部、充值、提现）
	j = 1;
	console.log("时间:" + datetime, "类型数据:" + submenu, "币种:" + selcurry);
}
/*提现*/
//确定提现按钮
var withdraw = function() {
	var withadd = $("#withadd").val();
	var withcount = $("#withcount").val();
	var withfund = $("#withfund").val();
	var reg = /^[0-9]*[1-9][0-9]*$/;
	if(withadd == "" || withadd == null || withadd.length == 0) {
		layer.msg("提现地址不能为空！", {
			time: 2000
		});
	} else if(withcount == "" || withcount == null || withcount.length == 0) {
		layer.msg("提现数量不能为空！", {
			time: 2000
		});
	} else if(!reg.test(withcount)) {
		layer.msg("提现数量要为正整数！", {
			time: 2000
		});
	} else if(withfund == "" || withfund == null || withfund.length == 0) {
		layer.msg("资金密码不能为空！", {
			time: 2000
		});
	} else {
		console.log("提现地址:" + withadd, "提现数量:" + withcount, "资金密码:" + withfund)
	}
}
/*walletaddr*/
//右上角+号
var walletaddr = function() {
	var inderli = $(".addrlist ul").find(".disfx").length;
	if(inderli >= 20) {
		layer.msg("最多生成20个地址", {
			time: 2000
		});
	} else {
		$(".addrlist ul").prepend(
			'<li class="disfx" onclick="oCopy(this)"><div class="alnum">' + (inderli + 1) + '</div>' +
			'<input type="text" class="addr fx1" value="地址" readonly="readonly"/></li>'
		)
	}
}
//点击复制
function oCopy(obj) {
	if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {//区分iPhone设备
		window.getSelection().removeAllRanges();//这段代码必须放在前面否则无效
		var Url2=$(obj);//要复制文字的节点
		var range = document.createRange();
		// 选中需要复制的节点
		range.selectNode(Url2);
		// 执行选中元素
		window.getSelection().addRange(range);
		// 执行 copy 操作
		var successful = document.execCommand('copy');
 
					// 移除选中的元素
		window.getSelection().removeAllRanges();
	}else{
		var Url2=document.getElementById("biao1");//要复制文字的节点
		Url2.select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
	}
}