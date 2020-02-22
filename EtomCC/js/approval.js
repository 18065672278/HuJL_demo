//审批不通过
function approvalNot(order_no) {
	top.layer.open({
		type : 2,
		area : [ 470 + 'px', 340 + 'px' ],
		offset : 'auto',
		scrollbar : false,
		title : false,
		closeBtn : false,
		content : [ ctp + "/project/approval_not.html?pk_project_status=" + pk_project_status + "&order_no=" + order_no, 'no' ]
	});
}
// 审批通过
function approval(order_no) {
	layer.confirm('已认真审核资料文件并同意审核通过', {
		btn : [ '确定', '取消' ], // 按钮
		offset : 'auto',
		move : false
	}, function(index) {
		$.ajax({
			url : ctp + '/project/approve.json',
			type : 'post',
			dataType : 'json',
			data : {
				pk_project_status : pk_project_status,
				order_no : order_no,
				status : 'Y',
				todoId : todoId
			},
			success : function(result) {
				layer.close(index);
				if (result.success) {
					layer.msg(result.msg, {
						time : 1000
					}, function() {
						top.project.document.location.reload();
					});
				} else {
					layer.msg(result.msg, {
						time : 2000
					});
				}
			}
		});
	}, function(index) {
		layer.close(index);
	});
}

// 空值页面下载和删除
function bindcontroll() {
	$('.download').click(function() {
		var pk_file_data = $(this).attr("id");
		window.open(ctp + "/project/download.do?pk_file_data=" + pk_file_data);
	});
	$(".enc-remove").click(function() {
		var pk_file_data = $(this).parent(".form-panel-item").attr("pk_file_data");
		var order_no = $(this).attr("id");
		var index = layer.load(2, {
			shade : [ 0.1, '#fff' ]
		// 0.1透明度的白色背景
		});
		var data = "attrId=" + pk_file_data + "&pk_id=" + pk_project_status + "&order_no=" + order_no;
		$.post(ctp + '/project/delete.json', data, function(item, status) {
			layer.close(index);
			if (status = 'success') {
				top.project.location.reload();
			} else {
				top.layer.alert("删除失败！");
			}
		});
	});
}
// 获取审批日志信息
function getOperLog(pk_project_status) {
	$.ajax({
		url : ctp + '/project/getOperLog.json',
		type : 'post',
		dataType : 'json',
		data : {
			pk_project_status : pk_project_status
		},
		success : function(result) {
			if (result.success) {
				var data = result.datas;
				if (data.length > 0) {
					var htmlcs = "";
					htmlcs = "<i class='pancel-timeline-axis-rol'></i>";
					for ( var key in data) {
						var html = "<ul class='pancel-timeline'><li class='pancel-timeline-item'>";
						html += "<i class='pancel-timeline-axis'></i>";
						html += htmlcs;
						html += "<div class='pancel-timeline-content'>";
						html += "<h3 class='pancel-timeline-title'>" + data[key].oper_info + "</h3>";
						html += "<p>" + data[key].make_time + "</p>";
						html += "</div></li> </ul>";
						htmlcs = "";
						$("#operLog").append(html);
					}
				} else {
					var html = "<div class='panel-body-nodata'>暂无记录</div>";
					$("#operLog").append(html);
				}
			}
		}
	});
}