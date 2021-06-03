$(function () {
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#article_date', //指定元素
            format: 'yyyy-MM-dd HH:mm:ss'
        });
    });
})

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
    }
    if(article_date == '') {
        article_date = dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
    }
    let operation = document.querySelector('.write_post_main').getAttribute('date-operation')
    var data = {};
    if(operation == 'update') {
        data = {
            title,
            content,
            release_date:article_date,
            author,
            operation,
            aid:$('#aid').val(),
            type:"page"
        }
    } else  {
        data = {
            title,
            content,
            release_date:article_date,
            author,
            operation,
            type:"page"
        }
    }
    $.ajax({
        type:'post',
        url:"/admin/write_page/handle",
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
