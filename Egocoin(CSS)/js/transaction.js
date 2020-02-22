$(function(){
	$("#buycoin").click(function(){
		$("#coin").val("买币");
		$("#buycoin").siblings().attr("class","fl coin");
		$("#buycoin").attr("class","fl coin on");
		var currency = $("#currency").val();//哪种货币(BTC/USDT/BCH/LTC/ETH)
		market1();
	})
	$("#salecoin").click(function(){
		$("#coin").val("卖币");
		$("#salecoin").siblings().attr("class","fl coin");
		$("#salecoin").attr("class","fl coin on");
		market1();
	})
	$(".search").click(function(){
		location.href = "tsearch.html";
	})
})
//顶部切换（买币/卖币）执行函数
var market1 = function(obj){
	var currency = $("#currency").val();//哪种货币(BTC/USDT/BCH/LTC/ETH)
	var coin = $("#coin").val();//买入还是卖出
	console.log(coin,currency);
	$("#currency").val(currency);
	/*$.ajax({
		type:"post",
		url:"",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		beforeSend: function() {
					
	    },
	    data:{
	    	
	    },
	    success:function(data){
	    	
	    }
	});*/
}
market1();
//获取买入或卖出的当前货币
var market = function(obj){
	var currency = $(obj).text();//哪种货币(BTC/USDT/BCH/LTC/ETH)
	var coin = $("#coin").val();//买入还是卖出
	console.log(coin,currency);
	$("#currency").val(currency);
	$(obj).siblings().attr("class","");
	$(obj).attr("class"," on");
	/*$.ajax({
		type:"post",
		url:"",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		beforeSend: function() {
					
	    },
	    data:{
	    	
	    },
	    success:function(data){
	    	
	    }
	});*/
}
//购买
var buy = function(id){//id为订单ID
	var currency = $("#currency").val();//哪种货币(BTC/USDT/BCH/LTC/ETH)
	console.log(id,currency);
	location.href = "buy.html?id="+id+"currency="+currency;
	/*$.ajax({
		type:"post",
		url:"",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		beforeSend: function() {
					
	    },
	    data:{
	    	
	    },
	    success:function(data){
	    	
	    }
	});*/
}
//卖出
var sale = function(id){//id为订单ID
	var currency = $("#currency").val();//哪种货币(BTC/USDT/BCH/LTC/ETH)
	console.log(id,currency);
	location.href = "sale.html?id="+id+"currency="+currency;
	/*$.ajax({
		type:"post",
		url:"",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		beforeSend: function() {
					
	    },
	    data:{
	    	
	    },
	    success:function(data){
	    	
	    }
	});*/
}