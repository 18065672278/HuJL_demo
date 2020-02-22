var menulist = {
    "menulist": [
        
        // { "MID": "M001","name":'home', "MName": "首页", "icon":"fa fa-home", "Url": "../html/index.html", "menulist": "" },
        {
            "MID": "1",
            "name": 'notice',
            "MName": "喷漆线",
            "icon": "iconfont icon-ico1",
            "tipName": "喷漆线",
            "Url": "",
            "menulist": [{
                    "MID": "11",
                    "MName": "良率预测模型",
                    "tipName": "",
                    "Url": "../html/lacquer/prediction_model.html",
                    "menulist": ""
                },
                {
                    "MID": "12",
                    "MName": "影响因素监测模型",
                    "Url": "../html/lacquer/monitor_model.html",
                    "tipName": "",
                    "menulist": ""
                },
                {
                    "MID": "13",
                    "MName": "历史良率分析模型",
                    "Url": "../html/lacquer/history_rate.html",
                    "tipName": "",
                    "menulist": ""
                }
            ]
        },
        {
            "MID": "2",
            "name": 'project',
            "MName": "系统管理",
            "icon": "iconfont icon-xitongguanli",
            "tipName": "系统管理",
            "Url": "",
            "menulist": [{
                    "MID": "21",
                    "MName": "账号管理",
                    "tipName": "",
                    "Url": "../html/setting/system_manage.html",
                    "menulist": ""
                },
                {
                    "MID": "22",
                    "MName": "添加账号",
                    "Url": "../html/setting/add_acount.html",
                    "tipName": "",
                    "menulist": ""
                },
                {
                    "MID": "23",
                    "MName": "组别管理",
                    "Url": "../html/setting/group_manager.html",
                    "tipName": "",
                    "menulist": ""
                },
                {
                    "MID": "24",
                    "MName": "设置参数配置管理",
                    "Url": "../html/setting/device_manager.html",
                    "tipName": "",
                    "menulist": ""
                },
                {
                    "MID": "25",
                    "MName": "修改密码",
                    "Url": "../html/setting/change_password.html",
                    "tipName": "",
                    "menulist": ""
                }
            ]
        }
    ]
};
/* 
 * showall(menu_list,parent)
 * menu_list:json数组，parent：当前插入对象
 * 递归循环结构
 * 2018-10-30
 */
function showall(menu_list, parent) {
    for (var menu in menu_list) {
        // 如果有子节点
        if (menu_list[menu].menulist.length > 0) {
            var li = $('<li class="left-nav-item "></li>');
            $(li).append('<a class="link" href="javascript:;" lay-tips="' + menu_list[menu].tipName + '" data-index="' + menu_list[menu].MID + '" data-url="' + menu_list[menu].Url + '"><i class="left-icon ' +
                menu_list[menu].icon + ' "></i><cite>' +
                menu_list[menu].MName + '</cite><span class="left-nav-more"></span></a>');
            $(li).append('<dl class="left-nav-child"></dl>').appendTo(parent);
            // 将ul选中回调
            showall(menu_list[menu].menulist, $(li).children().eq(1));

        } else {
            // 没有子节点
            $('<li class="left-nav-item "></li>').append('<a class="link" href="javascript:;" lay-tips="' + menu_list[menu].tipName + '" data-index="' + menu_list[menu].MID + '" data-url="' + menu_list[menu].Url +
                '"><i class="left-icon ' +
                menu_list[menu].icon + ' "></i><cite>' + menu_list[menu].MName + '</cite></a>').appendTo(
                parent);
        }
    }
}
showall(menulist.menulist, $(".left-nav-tree"))

/* 
 * 左侧菜单点击下拉
 * 标识unfolded
 * 当前元素以及同级元素添加移除标识
 * 2018-10-30
 */
$(".left-nav-tree .left-nav-item a").click(function () {
    var that = $(this);
    var parentNode = that.parent(".left-nav-item ");
    var parentsNode = that.parents(".admin-container");

    var childrenNode = that.next();

    if (parentsNode.hasClass("admin-side-showMenu")) {
        layer.closeAll("tips"),
            $(".admin-container ").removeClass("admin-side-showMenu")
        $(".left-seraph i").removeClass("layui-icon-spread-left");
        $(".left-seraph").removeClass("js-active");
        if (!parentNode.hasClass("unfolded")) {

            //如果不存在unfolded标识
            if (parentNode.children(".left-nav-child").hasClass("left-nav-child")) {
                parentNode.siblings(".left-nav-item ").children(".left-nav-child").slideUp();
                childrenNode.slideDown(function () {
                    // children下拉，父级添加标识
                    parentNode.addClass("unfolded");
                    parentNode.siblings(".left-nav-item ").removeClass("unfolded");
                });
            } else {
                parentNode.addClass("unfolded");
                parentNode.siblings(".left-nav-item ").removeClass("unfolded");
                parentNode.siblings(".left-nav-item ").children(".left-nav-child").slideUp();
            }

        }
    } else {
        if (!parentNode.hasClass("unfolded")) {

            //如果不存在unfolded标识
            if (parentNode.children(".left-nav-child").hasClass("left-nav-child")) {
                parentNode.siblings(".left-nav-item ").children(".left-nav-child").slideUp();
                childrenNode.slideDown(function () {
                    // children下拉，父级添加标识
                    parentNode.addClass("unfolded");
                    parentNode.siblings(".left-nav-item ").removeClass("unfolded");
                });
            } else {
                that.addClass('left-this')
                parentNode.addClass("unfolded");
                parentNode.siblings(".left-nav-item ").removeClass("unfolded");

                parentNode.siblings().children(".link").removeClass('left-this');
                parentNode.siblings().find(".link").removeClass("left-this");
                parentNode.siblings(".left-nav-item ").children(".left-nav-child").slideUp();
            }

        } else {
            childrenNode.slideUp(function () {
                // children上拉，父级移除标识
                parentNode.removeClass("unfolded");
            })
        }
    }
})

// 子级菜单切换展开收起
$(".left-nav-child li").children('.link').click(function () {
    var that = $(this);
    var parentNode = that.parent('li');
    var parentsNode = that.parents('.left-nav-item');
    if (that.next('.left-nav-child').length > 0) {
        if (!parentNode.hasClass('open')) {
            parentNode.parent().siblings('.link').removeClass('left-this');
            // parentNode.siblings().find('.link').removeClass('left-this');
            parentNode.siblings().children('.left-nav-child').slideUp();
            that.next(".left-nav-child").slideDown(function () {
                parentNode.siblings().removeClass('open');
                parentNode.addClass('open');
            });
        } else {
            that.next('.left-nav-child').find('.link').removeClass('left-this');
            that.next(".left-nav-child").slideUp(function () {
                parentNode.removeClass('open');
            });
        }
    } else {
        that.addClass('left-this');
        parentNode.siblings().removeClass('open');
        parentNode.siblings().children('.left-nav-child').slideUp();
        parentNode.siblings().find('.link').removeClass('left-this');
        that.parents(".left-nav-item ").siblings().find(".link").removeClass("left-this");
        that.parents('.open').siblings().find(".link").removeClass('left-this');
        // 获取页面url
        var url = that.attr("data-url");
        changemenu(that, url);
    }
});

// 选择菜单
function changemenu(ele, url) {
    if (url == undefined)
        return;
    $("#poIframe").remove();
    var newIframe = $('<iframe id="poIframe" src="' + url + '" frameborder="0" style="width:100%;height:100%;border:none;outline:none;"></iframe>');
    $(".admin-content").append(newIframe);
    getLoad(".admin-content");
}
function getLoad(parentEle) {
    layer.ready(function() {
        var index = parent.layer.load(1, {shade : [ 0 ]});
        $(parentEle).find("iframe").load(function() {
            layer.close(index);
        })
    });
}