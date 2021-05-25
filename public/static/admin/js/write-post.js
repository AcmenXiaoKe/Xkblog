$(function () {
    var editor = editormd("write_post_main_content", {
        watch: false,
        // width  : "100%",
        // height : "100%",
        path: "/static/public/editor.md-master/lib/",
        width: "100%",
        height: '400px',
        // theme: "dark",
        // previewTheme: "dark",
        // editorTheme: "pastel-on-dark",
        markdown: "",
        codeFold: true,
        //syncScrolling : false,
        saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
        searchReplace: true,
        //watch : false,                // 关闭实时预览
        htmlDecode: "style,script|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
        // toolbar: false,             //关闭工具栏
        //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
        emoji: true,
        taskList: true,
        tocm: true,         // Using [TOCM]
        tex: true,                   // 开启科学公式TeX语言支持，默认关闭
        flowChart: true,             // 开启流程图支持，默认关闭
        sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
        toolbarIcons: function () {
            // Or return editormd.toolbarModes[name]; // full, simple, mini
            // Using "||" set icons align right.
            return  ["undo", "redo", "|", "bold","del" ,"quote" ,"hr",'image', "|", "h1","h2","h3","h4","h5","h6" ,"|" , "list-ul" ,"list-ol" ,"|","code","datetime" ,"clear","xk_link","bilibili",'download',"|","watch" ]
        },
        toolbarIconsClass : {
            xk_link : "fa-link",  // 如果没有图标，则可以这样直接插入内容，可以是字符串或HTML标签
            bilibili: 'fa-video-camera',
            download:'fa-download'

        },
        // 自定义工具栏按钮的事件处理
        toolbarHandlers : {
            /**
             * @param {Object}      cm         CodeMirror对象
             * @param {Object}      icon       图标按钮jQuery元素对象
             * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
             * @param {String}      selection  编辑器选中的文本
             */
            xk_link : function(cm, icon, cursor, selection) {
                let sel  = selection || '显示的文字'
                cm.replaceSelection( "<a href='链接' target='_blank'>"+ sel  +"</a>");
            },
            bilibili: function(cm, icon, cursor, selection) {
                let sel  = selection || '哔哩哔哩的Bvid'
                cm.replaceSelection( `<iframe class="bilibili_play" src='//player.bilibili.com/player.html?bvid=${sel}'></iframe>`);
            },
            download: function(cm, icon, cursor, selection) {
                let sel  = selection || '下载地址'
                cm.replaceSelection( `<div class="download" data-src="${sel}" data-title="标题" data-source="来源"></div>`);
            },
        },

        lang : {
            toolbar : {
                xk_link : "链接",
                bilibili:"哔哩哔哩视频",
                download:'下载按钮'

            }
        },
        // saveHTMLToTextarea : true,
        imageUpload    : true,
        imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL : "/admin/Upload/index",
    });
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
    var upload = layui.upload;
    var uploadInst = upload.render({
        elem: '#upload' //绑定元素
        , url: '/upload/' //上传接口
        , done: function (res) {
            //上传完毕回调
        }
        , error: function () {
            //请求异常回调
        }
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
