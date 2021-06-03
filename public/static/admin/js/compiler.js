var editor = editormd("write_post_main_content", {
    watch: false,
    // width  : "100%",
    // height : "100%",
    path: "/static/admin/lib/editor.md-master/lib/",
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
        return  ["undo", "redo", "|", "bold","del" ,"quote" ,"hr",'image', "|", "h1","h2","h3","h4","h5","h6" ,"|" , "list-ul" ,"list-ol" ,"|","code","datetime" ,"clear","xk_link","|","watch" ]
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