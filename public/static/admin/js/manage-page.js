function Datadel(id) {
    layer.confirm('你确认要删除吗？', {
        btn: ['确认', '取消'] //可以无限个按钮
        ,btn2: function(index, layero){
        }
    }, function(index, layero){
        $.ajax({
            type:'post',
            url:'/admin/write_page/del',
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
                window.location.href="/admin/manage_page"
            },
            error:function (err){}

        })
        // 隐藏
        $('#layui-layer-shade1').hide()
        layero[0].style.display = 'none'
    });

}

$('.xk_checkbox').on('change',function (){
    let state  = this.checked
    let id = this.getAttribute('data-id')
    $.ajax({
        type:"post",
        url:"/admin/manage_page/edit",
        data:{
            state,
            id
        },
        success:function (res){
            if(res.meta.status == 200) {
                console.log('修改成功！')
                return
            }
            console.log('修改失败！')
        }
    })
})