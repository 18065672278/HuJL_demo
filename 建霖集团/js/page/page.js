/**
 * Created by Administrator on 2017/6/10.
 */
(function(){
    window.pagination = function(options,callback){
    	var defaults = {
    		id:"pagination",
			totalPages:5,
			maxShowPages:5,
            totalDatas:""
    	};
    	var newOptions = $.extend({}, defaults, options);
    	
        var showPageNumber = newOptions.maxShowPages;
        var totalNum = newOptions.totalPages;
        var totalData = newOptions.totalDatas;
        if(totalNum<showPageNumber){
        	showPageNumber = totalNum;
        }
        init();
        
        //下一页
        $("#nextPage").off("click").on("click",function(){
            if($(this).hasClass("disabled")){
                return;
            }
            var activeNum = $(".pagination-content").find(".active").text();
            var activeIndex = $(".pagination-content").find(".active").attr("data-index");
            activeNum++;
            buildPage(activeIndex,activeNum,showPageNumber);
            callback(activeNum);
        });

        //上一页
        $("#prevPage").off("click").on("click",function(){
            if($(this).hasClass("disabled")){
                return;
            }
            var activeNum = $(".pagination-content").find(".active").text();
            var activeIndex = $(".pagination-content").find(".active").attr("data-index");
            activeNum--;
            buildPage(activeIndex,activeNum,showPageNumber);
            callback(activeNum);
        });

        //跳页
        $("#jumpPage").off("click").on("click",function(){
            var activeIndex = $(".pagination-content").find(".active").attr("data-index");
            var activeNum = $("#jumpNumber").val();
            if(!activeNum || activeNum==0){
            	layer.tips("请输入正确数字！", $("#jumpNumber"));
            	return;
            }
            buildPage(activeIndex,activeNum,showPageNumber);
            callback(activeNum);
        });

        //点击页码
        $(".pageNum").off("click").on("click",function(){
            if($(this).hasClass("active")){
                return;
            }
            var activeNum = $(this).text();
            var activeIndex = $(this).attr("data-index");
            buildPage(activeIndex,activeNum,showPageNumber)
            callback(activeNum);
        });

        //校验数字
        $("#jumpNumber").off("blur").on("blur",function(){
            var totalNum = $(".pageCountNum").text();
            var numberReg = /^([1-9]\d*)$/;
            var value = $(this).val();
            value =+value;
            if(value =="" || value === 0){
                return;
            }
            if(totalNum<value){
                $(this).val("");
                layer.tips("请输入小于总页数的整数", $(this));
                return;
            }
            if(!numberReg.test(value) && value !== ""){
                $(this).val("");
                layer.tips("请输入正整数", $(this));
                return;
            }
            $(this).val(value);
        });

        //渲染分页
        function buildPage(activeIndex,activeNum,showPageNumber){
            var centerNumber = Math.floor(showPageNumber/2);
            if(activeNum<=centerNumber+1){
                activeIndex = activeNum - 1;
            }else if(totalNum - activeNum<centerNumber){
                activeIndex = showPageNumber - (totalNum - activeNum) - 1;
            }else{
                activeIndex = centerNumber;
            }
            if(activeIndex == 0){
                $("#prevPage").addClass("disabled");
                $("#nextPage").removeClass("disabled");
            }else if(activeIndex == showPageNumber-1){
                $("#nextPage").addClass("disabled");
                $("#prevPage").removeClass("disabled");
            }else{
                $("#nextPage").removeClass("disabled");
                $("#prevPage").removeClass("disabled");
            }
            if(totalNum == 1){
            	 $("#prevPage").addClass("disabled");
            	 $("#nextPage").addClass("disabled");
            }
            $(".pagination-content").find(".pageNum").removeClass("active");
            $(".pagination-content").find(".pageNum").each(function(i){
                $(this).text(activeNum-activeIndex+i);
                if(i==activeIndex){
                    $(this).addClass("active");
                }
            });
        }
        
        function init(){
        	var html = "";
        	html += '<div class="pagination-content">';
        	html += '<a class="prevPage disabled" id="prevPage" href="javascript:void(0)">上一页</a> ';
        	for(var i=0;i<showPageNumber;i++){
        		if(i==0){
        			html += '<a class="pageNum active" data-index="'+i+'" href="javascript:void(0)">'+(i+1)+'</a> ';
        		}else{
        			html += '<a class="pageNum" data-index="'+i+'" href="javascript:void(0)">'+(i+1)+'</a> ';
        		}
        	}
            /*<a class="pageNum" data-index="1" href="javascript:void(0)">2</a>
            <a class="pageNum" data-index="2" href="javascript:void(0)">3</a>
            <a class="pageNum" data-index="3" href="javascript:void(0)">4</a>
            <a class="pageNum" data-index="4" href="javascript:void(0)">5</a>*/
        	if(totalNum == 0){
        		 html += '<a class="nextPage disabled" id="nextPage" href="javascript:void(0)">下一页</a> ';
        	}else if(totalNum == 1 ){
        		 html += '<a class="nextPage disabled" id="nextPage" href="javascript:void(0)">下一页</a> ';
        	}else{
        		html += '<a class="nextPage" id="nextPage" href="javascript:void(0)">下一页</a> ';
        	}
            html += '<span class="pageCount">共<label class="pageCountNum">'+totalNum+'</label>页,</span> ';
            html += '<span class="pageCount"><label class="pageCountNum">'+totalData+'</label>条,到第</span> ';
            html += '<input class="jump-number" id="jumpNumber" type="text"/> ';
            html += '<label>页</label> ';
            html += '<a class="common-btn btn-normal" id="jumpPage" href="javascript:void(0)">跳转</a></div>';
            $("#"+newOptions.id).html(html);
        }
    };
})();
