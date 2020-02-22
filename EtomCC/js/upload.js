$(function() {
	$('.download').click(function() {
		var pk_file_data = $(this).attr("id");
		window.open(ctp + "/project/download.do?pk_file_data=" + pk_file_data);
	});
});
