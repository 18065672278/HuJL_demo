function createUpload(dir, sysOrgPersonId, tempPick) {
	setTimeout(function(){
        if (!WebUploader.Uploader.support()) {
            top.layer.alert('附件上传控件不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
            throw new Error(
                'WebUploader does not support the browser you are using.');
        }
        if (!tempPick) {
            tempPick = {
                id: '#uploadImage',
                multiple: false
            };
        } else if (tempPick == '#picker') {
            tempPick = {
                id: '#picker',
                multiple: true
            };
        } else {
            tempPick = {
                id: tempPick,
                multiple: true
            };
        }
        // 初始化Web Uploader
        var uploader = WebUploader.create({
            // 自动上传。
            auto: true,
            formData: {
                'dir': dir,
                'sysOrgPersonId': sysOrgPersonId
            }, // 上传目录,当前用户信息
            // swf文件路径
            swf: ctp + '/js/webuploader/Uploader.swf',
            // 设置头文件不然IE8 无法上传正常的文件只能上传图片
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            chunked: true,//开始分片上传
            chunkSize: 102400,//每一片的大小
            // 文件接收服务端。
            server: ctp + '/sys/file/addFileData.do',
            // server: '/sysFileData/addFileData.do',
            // server: '/sysFileData/addFileData.do',
            // accept:{
            // title: 'Images',
            // extensions: 'gif,jpg,jpeg,bmp,png',
            // mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
            // },
            duplicate: true,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: tempPick,
            compress: false, // 不启用压缩
            resize: false, // 尺寸不改变
        });
        // 添加文件时调用，做上传前的验证，返回false 则不添加进上传队列
    /* uploader.on('beforeFileQueued', function (file) {
            var flag = true;
            $.ajax({
                type: 'POST',
                async: false,
                dataType: 'json',
                url: ctp + '/sys/file/uploadExcelCheck.do',
                data: {
                    filename: file.name,
                    filesize: file.size,
                    filetype: file.type
                }, // {filename:
                // file.name},
                success: function (data) {
                    if (data) {
                        if (!data.success) {
                            // 请求失败，后台返回失败原因
                            if (data.msg != null) {
                                top.layer.alert(file.name + " 异常! " + data.msg, {
                                    shift: 2
                                });
                                flag = false;
                            }
                        }
                    }
                }
            });
            return flag;
        });*/
        var uploadHtml;
        var trIndex;
        var fileslength;
        var progeressPercent;
	    var uploadProgressLayer;

	    $arrExt =['mp4','mov','mkv','m4a','mpeg','avi','wmv','m4v','rmvb','ogv','3gp','flv','swf','ogg', 'mov', 'webm', 'mp3','wav','mid','midi','wma'];
        // 当一批文件添加进来的时候
        uploader.on('filesQueued', function (file) {
            trIndex = $("#uploadtable tbody").find("tr").length;
            fileslength = file.length;
        	uploadHtml = "";
            progeressPercent = 0;
            $("#progressBar").width(progeressPercent);
	    	$('#uploadProgress').show();
	    	$('.uploadProgressLayer').show();
        });

	    uploader.on( 'uploadProgress', function( file, percentage ) {
	    	var loadSize =(progeressPercent+percentage)/fileslength;
	    	var progressWidth = (100*loadSize).toFixed(2) + '%';  	
	    	$("#progressBar").width(progressWidth);
	    	
		});
        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on('uploadSuccess', function (file, fileData) {
        	progeressPercent++;
        	var $item = $('#' + file.id);
       
        	
            var dateTime = new Date();
            var year = dateTime.getFullYear();
            var month = dateTime.getMonth() + 1;
            if(month<10){
                month = "0" + month;
            }
            var day = dateTime.getDate();
            if(day<10){
                day = "0" + day;
            }
            var hour = dateTime.getHours();
            if(hour<10){
                hour = "0" + hour;
            }
            var minute = dateTime.getMinutes();
            if(minute<10){
                minute = "0" + minute;
            }
            var second = dateTime.getSeconds();
            if(second<10){
                second = "0" + second;
            }
            dateTime = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
            var fileName = file.name;
            var fileSize = file.size;
            //获取录音时长
            var url = URL.createObjectURL(file.source.source);
                //经测试，发现audio也可获取视频的时长
            var audioElement = new Audio(url);
            trIndex++;
         
            var duration;
            if($.inArray(file.ext, $arrExt)>0)
            	{
            	   audioElement.addEventListener("loadedmetadata", function (_event) {
                      duration = audioElement.duration;	
                      uploadHtml = '<tr  id="' + file.id + '" class="file-item">'
	                  uploadHtml+='<td>'
	                  uploadHtml+='<input class="checkbox" type="checkbox" id="checkbox'+trIndex+'" name="chk_list" value="">'
	                  uploadHtml+='<label class="checkbox-shape" for="checkbox'+trIndex+'"></label>'
	                  uploadHtml+='</td>'
	                  uploadHtml+='<td>'+trIndex+'</td>'
	                  uploadHtml+='<td class="fileName">'+fileName+'</td>'
	                  uploadHtml+='<td class="duration">'+(duration/60).toFixed(2)+' m</td>'
	                  uploadHtml+='<td class="fileSize">'+(fileSize/1024).toFixed(2)+'kb</td>'
	                  uploadHtml+='<td  class="dateTime">'+dateTime+'</td>'
	                  uploadHtml+='<td>1</td>'
	                  uploadHtml+='<td>未解析</td>'
	                  uploadHtml+='</tr>';
                      $("#uploadtable").find("tbody").append(uploadHtml);
                   });  
            	}   
            else
            	{
	            	 uploadHtml = '<tr  id="' + file.id + '" class="file-item">'
		             uploadHtml+='<td>'
		             uploadHtml+='<input class="checkbox" type="checkbox" id="checkbox'+trIndex+'" name="chk_list" value="">'
		             uploadHtml+='<label class="checkbox-shape" for="checkbox'+trIndex+'"></label>'
		             uploadHtml+='</td>'
		             uploadHtml+='<td>'+trIndex+'</td>'
		             uploadHtml+='<td class="fileName">'+fileName+'</td>'
		             uploadHtml+='<td class="duration">无</td>'	
		             uploadHtml+='<td class="fileSize">'+(fileSize/1024).toFixed(2)+'kb</td>'
		             uploadHtml+='<td  class="dateTime">'+dateTime+'</td>'
		             uploadHtml+='<td>1</td>'
		             uploadHtml+='<td>未解析</td>'
		             uploadHtml+='</tr>'; 
	            	 $("#uploadtable").find("tbody").append(uploadHtml);
            	}   
            if(progeressPercent == fileslength){  
            	  $('#uploadProgress').hide();
    	    	  $('.uploadProgressLayer').hide();
	    	}
          
        });
        
        // 文件上传失败，现实上传出错。
        uploader.on('uploadError', function (file, reason) {
            top.layer.alert('上传失败');
        });      
	 }, 300);
}