
var mybuy = function(obj){
	var currency = $(obj).text();//哪种货币
	console.log("币种："+currency);
	$("#currency").val(currency);
	$(obj).siblings().attr("class","");
	$(obj).attr("class"," on");
}