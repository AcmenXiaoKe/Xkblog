//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
    var side_switch = document.querySelector('.side_switch')
    var layui_side = document.querySelector('.layui-side')
    var side_mask = document.querySelector('.side_mask')
    side_switch.addEventListener('click', function () {
        layui_side.style.left = '0'
        side_mask.style.display = 'block'
    })
    side_mask.addEventListener('click', function () {
        layui_side.style.left = '-100%'
        side_mask.style.display = 'none'
    })
    var theme = document.querySelector('#Subject_switch_btn')
    var theme_type = localStorage.getItem("theme_type") || 'default';
    // 调用主题切换函数，传递一个当前处于那种主题
    // SubjectSwitch(theme_type)
    theme.addEventListener('click', function () {
        // 主题切换
        if (theme_type == 'default') {
            theme_type = 'darkly';
            // SubjectSwitch("darkly")
        } else {
            // SubjectSwitch("default")
            theme_type = 'default';
        }
    })
    // 主题切换函数
    function SubjectSwitch(val) {
        if (val == "darkly") {

            localStorage.setItem("theme_type", "darkly")
            document.documentElement.style.setProperty('--bg-color', "#121212")
            document.documentElement.style.setProperty('--Primary-bg', "#232323")
            document.documentElement.style.setProperty('--Primary-Text', "#F2F6FC")
            document.documentElement.style.setProperty('--input-bg', "#414243")
            document.documentElement.style.setProperty('--border-color', "rgba(255,255,255,0.1)")
        }
        else {

            localStorage.setItem("theme_type", "default")
            document.documentElement.style.setProperty('--bg-color', "#F5F5F5")
            document.documentElement.style.setProperty('--Primary-bg', "#FFF")
            document.documentElement.style.setProperty('--Primary-Text', "#000")
            document.documentElement.style.setProperty('--input-bg', "#EBEEF5")
            document.documentElement.style.setProperty('--border-color', "rgba(0,0,0,0.1)")
        }

    }
    $('.exit').on('click',function (){
        layer.confirm('你确认要退出登陆吗？', {
            btn: ['确认', '取消'] //可以无限个按钮
            ,btn2: function(index, layero){
            }
        }, function(index, layero){
            $.ajax({
                type:"post",
                url:'/admin/login/Userexit',
                success:function (){
                    location.reload();
                },
                error:function (){
                    layer.open({
                        title: '提示信息',
                        content: '退出失败！',
                    });
                }
            })
            // 隐藏
            $('.layui-layer-shade').hide()
            layero[0].style.display = 'none'
        });
    })
});

