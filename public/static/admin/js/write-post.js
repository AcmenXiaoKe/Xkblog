$(function () {

    var From_submit_write_post = document.querySelector('.From_submit_write_post')
    From_submit_write_post.addEventListener('click',function (){
        // 标题
        let title = $('#title').val()
        // 内容
        let content = editor.getValue()
        // 日期
        let article_date = $('#article_date').val()
        // 作者
        let author = $('#author').val();
        // 分类元素
        let write_post_class = document.querySelectorAll('#write_post_class')
        // 处理好的分类字符串
        let class_list = ''
        // 循环获取选中的分类
        for(var i= 0; i < write_post_class.length; i++) {
            console.log(write_post_class[i].checked)
            if(write_post_class[i].checked) {
                // console.log(write_post_class[i].value)
                    class_list +=  write_post_class[i].value + ','
            }
        }
        class_list = DelLastStr(class_list)
        // 标签
        let tag_item = document.querySelectorAll('.tag_item span')
        let tag_list = ''
        for(var i= 0; i < tag_item.length; i++) {
            tag_list += tag_item[i].innerText + "|"
        }
        if(title === '') {
            layer.open({
                title: '提示信息'
                ,content: '文章没有标题是不行的哦！'
            });
          return
        } else if(content == '') {
            layer.open({
                title: '提示信息'
                ,content: '文章没有内容是不行的哦！'
            });
            return;
        } else if(article_date == '') {
            article_date = dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
        }
        let operation = document.querySelector('.write_post_main').getAttribute('date-operation')
        var write_post_crid = document.querySelectorAll('.write_post_crid')
        var crid;
        for (let i =0; i < write_post_crid.length; i++) {
            if(write_post_crid[i].checked) {
                crid = write_post_crid[i].value
            }
        }
        var data = {};
        if(operation == 'update') {
             data = {
                title,
                content,
                release_date:article_date,
                author,
                catid: class_list,
                label:DelLastStr(tag_list),
                operation,
                aid:$('#aid').val(),
            }
        } else  {
            data = {
                title,
                content,
                release_date:article_date,
                author,
                catid: class_list,
                label:DelLastStr(tag_list),
                operation,
            }
        }
        $.ajax({
            type:'post',
            url:"/admin/write_post/create",
            data,
            success:function (result){
                console.log(result)
                if(result.meta.status !== 200) {
                    layer.open({
                        title: '提示信息',
                        content: result.meta.msg,
                    });
                    return
                }
                window.location.href="/admin/manage_posts"
            },
            error:function (){
                console.log('错误')
            }
        })

    })
});
layui.use('laydate', function(){
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#article_date' , //指定元素
        format: 'yyyy-MM-dd HH:mm:ss'
    });
});
var tag_input = document.querySelector('.tag_input')
var tag_list = document.querySelector('.tag_list')
tag_input.onkeydown = function (e) { // 回车提交表单
    // 兼容FF和IE和Opera
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        let tag_item = document.querySelectorAll('.tag_item span')

        for (let i = 0; i < tag_item.length; i++) {
            if(tag_item[i].innerHTML == tag_input.value) {
                return
            }
        }
        let div = document.createElement('div')
        div.classList = 'tag_item'
        div.innerHTML = `
        <span>${tag_input.value}</span>
        <a class="del">x</a>
        `
        tag_list.appendChild(div)
        tag_input.value = ''
        tag_del()
    }
}
tag_del()
function tag_del() {
    var tag_item_del = document.querySelectorAll('.tag_item .del')
    for (var i = 0; i < tag_item_del.length; i++) {
        tag_item_del[i].addEventListener('click', function () {
            // 删除
            this.parentElement.remove()
        })
    }
}

// 删除最后一个字符
function DelLastStr(dom){
   return  dom.slice(0,dom.length -1);
}
// 日期格式化
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
