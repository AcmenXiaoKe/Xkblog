function template_edit(name) {
    let val =  name.toLowerCase()
    $.ajax({
        type:"post",
        url:"/admin/template_config/edit",
        data:{
            name:val
        },
        success:function (result){
            if(result.meta.status !==200) {
                alert('出现未知错误！')
            }
            window.location.href="/admin/template_config"
        },
        error:function (err){}
    })
}

let From_submit = document.querySelector('.From_submit')
From_submit.addEventListener('click',function (){
    let form_list = document.querySelectorAll('.template_config input')
    let form_str = '';
    let form_list_data = [];
    form_list.forEach(item=>{
        let title = item.getAttribute('data-title')
        let val = item.value
        let name = item.name
        let type = item.getAttribute('data-type')
        let prompt   = item.getAttribute('data-prompt')
        form_str += `'${name}'      =>      [
        'title'         =>      '${title}',
        'prompt'        =>      '${prompt}',
        'val'           =>      '${val}',
        'type'          =>      '${type}',
    ],`
    })
    form_str  = 'return [' + form_str + '];'

    $.ajax({
        type:"post",
        data:{
            str:form_str
        },
        url:"/admin/template_config/config",
        success:function (res){
            if(res.meta.status !==200) {
                alert('保存失败！')
                return
            }
            alert('保存成功！')
        },
        error:function (err ){}
    })
})