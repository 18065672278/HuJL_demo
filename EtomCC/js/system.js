$(function() {
	// 编辑
	$("#edit-btn").on("click", function() {
		if ($(this).hasClass("btn-disabled")) {
			return;
		}
		var hasDisabled = $(".main-wrapper").hasClass("table-disabled");
		if (hasDisabled) {
			$(".main-wrapper").removeClass("table-disabled");
			$(".js-table").find(".table-input").removeAttr("disabled");
			$(this).addClass("btn-disabled");
			$("#save-btn").removeClass("btn-disabled").addClass("btn-normal");
		}
	});
	// 保存

	$("#save-btn").click(function() {
		if ($(".main-wrapper").hasClass("table-disabled")) {
			return;
		}
		$(".main-wrapper").addClass("table-disabled");
		$(".js-table").find(".table-input").attr("disabled", true);
		$(this).addClass("btn-disabled");
		$("#edit-btn").removeClass("btn-disabled").addClass("btn-green");
	});

	// 任务设置表格添加渲染
	var idIndex = $(".js-table tbody").find("tr").length;
	$("#addTr").click(function() {
		var hasDisabled = $(".main-wrapper").hasClass("table-disabled");
		if (hasDisabled) {
			return;
		}
		var trIndex = $(".js-table tbody").find("tr").length;
		idIndex++;
		trIndex++;
		var html = '';
		html += '<tr>';
		html += '<td>';
		html += '<em class="removeTr"></em>';
		html += '</td>';
		html += '<td class="js-orderno">' + trIndex + '</td>';
		html += '<td>';
		html += '<input id="projectName' + trIndex + '" type="text" class="table-input taskName" />';
		html += '</td>';
		html += '</tr>';
		$(".js-table tbody").append(html);
	});
	// 删除行
	$(".js-table").on("click", ".removeTr", function() {
		var that = $(this);
		layer.confirm('确认删除该任务？', {
			btn : [ '确定', '取消' ], // 按钮
			offset : 'auto',
			move : false
		}, function(index) {
			var hasDisabled = $(".main-wrapper").hasClass("table-disabled");
			if (hasDisabled) {
				return;
			}
			that.parents("tr").remove();
			$(".js-orderno").each(function(i) {
				that.text(i + 1);
			});
			layer.close(index);
		}, function(index) {
			layer.close(index);
		});
	});
	var maxheight = $(window).height() - $(".fixed-tab").outerHeight() - $(".tab-content").outerHeight() - 60;
	$(".table-content").outerHeight(maxheight);
	// 滚动时表头固定
	$(".table-content").scroll(function() {
		var scrollTop = $(this).scrollTop();
		$(".fixedTable").css("top", scrollTop);
	});
});