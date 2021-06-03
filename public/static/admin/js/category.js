
    var site_set_From = document.querySelector('.site_set_From')
    site_set_From.onsubmit = function () {
    let catid = $('#catid').val();
    let operation = $('#operation').val();
    let pid = $('#parent').val();
    $.ajax({
    type:"POST",
    url:"/admin/category/handle",
    data:{
    catname:$('#class_name').val(),
    catid,
    pid,
    operation
},
    success:function (result){

    if(result.meta.status !== 200) {
    layer.open({
    title: '提示信息',
    content: result.meta.msg,
});

    return false
}
    window.location.href="/admin/manage_categories"
    return false;
},
    error:function (){
    layer.open({
    title: '提示信息',
    content: '分类已经存在！',
});
    return false;
}

})
    return false;

}
