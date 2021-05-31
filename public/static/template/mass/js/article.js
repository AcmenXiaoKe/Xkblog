editormd.markdownToHTML("ArticleContent", {
    htmlDecode: "style,script",
    emoji: true,
    taskList: true,
    // tex: true,  // 默认不解析
    flowChart: true,  // 默认不解析
    sequenceDiagram: true,  // 默认不解析,
});
$('.comments_form_btn').on('click',function (){
    let author =  $('#author').val()
    let email =  $('#email').val()
    let Personal_website =  $('#The_user_web_site').val()
    let content =  $('#comments_form_content').val()
    let aid = $('#aid').val();
    if(author == '') {
        layer.open({
            title: '提示信息',
            content: "请输入昵称！",
        });
        return
    }
    if(FilterSensitive(Personal_website)) {
        layer.open({
            title: '提示信息',
            content: "网址存在敏感词！",
        });
        return
    }
    if(FilterSensitive(author)) {
        layer.open({
            title: '提示信息',
            content: "昵称存在敏感词！",
        });
        return
    }

    if(email == '' ) {
        layer.open({
            title: '提示信息',
            content: "请输入邮箱！",
        });
        return
    }
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!email.match(reg)) {
        layer.open({
            title: '提示信息',
            content: "邮箱格式不正确！",
        });
        return
    }
    if (content == '') {
        layer.open({
            title: '提示信息',
            content: "请输入评论内容！",
        });
        return
    }
    if(content.length < 5) {
        layer.open({
            title: '提示信息',
            content: "评论内容最少5个字符！",
        });
        return
    }
    if(FilterSensitive(content)) {
        layer.open({
            title: '提示信息',
            content: "评论内容存在敏感词！",
        });
        return
    }
    if(content.length > 255) {
        layer.open({
            title: '提示信息',
            content: "评论内容最多255个字符！",
        });
        return
    }

    let obj = {
        aid,
        author,
        email,
        Personal_website,
        content,
    }
    $.ajax({
        type:"post",
        url:"/index/Article/comments",
        data:obj,
        success:function (result){
            location.reload();
        },
        error:function (){
            layer.open({
                title: '提示信息',
                content: "出现未知错误！",
            });
            return
        }
    })

})

var praise_I = 0;
$('.praise').on('click',function (){
    let aid = $('#aid').val();
    praise_I++

    if(praise_I > 1){
        return
    }
    $.ajax({
        type:"post",
        data:{
            id:aid
        },
        url:"/index/Article/praise",
        success:function (result){
            if(result.meta.status == 200) {
                layer.open({
                    title: '提示信息',
                    content: "感谢您的点赞！",
                });
                let praise_text = $('.praise .article_operation_item_explain');
                praise_text.text(Number(praise_text.text()) +  1)
                return
            }
            layer.open({
                title: '提示信息',
                content: "点赞失败了！",
            });
            return
        },
        error:function (){

        }
    })
})
$('.article_content img').parent('p').css('text-align','center')
$('.article_content img').css('border-radius','5px')
$('.article_content img').addClass('img_hover')
$('.prettyprint').prepend('<div class="code_icon"><span></span><span></span><span></span></div>')

var viewer = new Viewer(document.querySelector('.article_content'), {
    url: '',
    button:true,
});


// 下载
let download_btn = $('.download')
let dow_src =  download_btn.attr("data-src")
let dow_title=  download_btn.attr("data-title") || '默认标题'
let dow_source=  download_btn.attr("data-source") || '默认来源'
download_btn.prepend(`<div class="download_content"> <div class="download_info"> <div class="download_info_icon"></div> <div class="download_info_describ"> <span class="download_info_title">${dow_title}</span> <span class="download_info_source">来源：${dow_source}</span> </div> </div> <a href="${dow_src}" class="download_src" target="_blank"><button><span class="iconfont icon-xiazai"></span></button></a></div>`)