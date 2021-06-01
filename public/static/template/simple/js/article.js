editormd.markdownToHTML("ArticleContent", {
    htmlDecode: "style,script",
    emoji: true,
    taskList: true,
    // tex: true,  // 默认不解析
    flowChart: true,  // 默认不解析
    sequenceDiagram: true,  // 默认不解析,
});
var viewer = new Viewer(document.querySelector('.article_content'), {
    url: '',
    button: true,
})

let comments_btn = document.querySelector('.comments_btn')
var comments_Form = document.querySelector('.comments_Form')
var comments_list_item_reply = document.querySelectorAll('.comments_list_item_reply')
var pid = 0;
for (let i = 0; i < comments_list_item_reply.length; i++) {
    comments_list_item_reply[i].addEventListener('click', function () {
        let item = $(this.parentNode.parentNode.parentNode)
        item.after(comments_Form)
        if (item.attr('data-pid') == 0) {
            pid = item.attr('data-cid')
        } else {
            pid = item.attr('data-pid')
        }
    })
}

comments_btn.addEventListener('click', function () {
    let author = document.querySelector('#author').value
    let email = document.querySelector('#email').value
    let Personal_website = document.querySelector('#Personal_website').value
    let content = document.querySelector('#content').value
    let aid = document.querySelector('#aid').value
    if (author == '') {
        alert('名字不能为空')
        return
    }
    if (FilterSensitive(author)) {
        alert('作者昵称存在敏感词！')
        return
    }
    let url_reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
    if (Personal_website !== '') {
        if (!Personal_website.match(url_reg)) {
            alert('你的主页网址格式不正确！')
            return
        }
    }

    if (FilterSensitive(Personal_website)) {
        alert('主页存在敏感词！')
        return
    }
    let email_reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (email == '') {
        alert('邮箱不能为空')
        return
    }
    if (!email.match(email_reg)) {
        alert('邮箱格式不正确')
        return
    }
    if (content.length < 3) {
        alert('评论内容最少3个字符！')
        return
    }
    if (content.length > 255) {
        alert('评论内容最多255个字符！')
        return
    }
    if (FilterSensitive(content)) {
        alert('评论内容存在敏感词！')
    }

    let obj = {
        aid,
        author,
        email,
        Personal_website,
        content,
        pid
    }
    $.ajax({
        type: "post",
        url: "/index/Article/comments",
        data: obj,
        success: function (result) {
            location.reload();
        },
        error: function () {
            alert('出现未知错误')
        }
    })

})


