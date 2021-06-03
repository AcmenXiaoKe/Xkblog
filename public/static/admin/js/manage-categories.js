function Datadel(id) {
    layer.confirm('你确认要删除吗？', {
        btn: ['确认', '取消'] //可以无限个按钮
        ,btn2: function(index, layero){
        }
    }, function(index, layero){
        $.ajax({
            type:'post',
            url:'/admin/category/del',
            data:{
                id
            },
            success:function (result) {
                if(result.meta.status !== 200) {
                    layer.open({
                        title: '提示信息',
                        content: result.meta.msg,
                    });
                    return
                }
                window.location.href="/admin/manage_categories"
            },
            error:function (err){}

        })
        // 隐藏
        $('#layui-layer-shade1').hide()
        layero[0].style.display = 'none'
    });
}