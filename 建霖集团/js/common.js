$(".power-close").click(function () {
    layer.confirm('是否要退出登录？', {
        btn: ['确定', '取消'], // 按钮
        offset: 'auto',
        move: false
    }, function (index) {
        // 确定登出
        window.location.href = '../html/login.html';
        layer.close(index);
    }, function (index) {
        layer.close(index);
    });
});