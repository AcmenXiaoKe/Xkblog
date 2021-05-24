function xk_pop_up(options) {
    let defaults = {
        title: "提示信息",
        width: '500px',
        height: '260px',
        cancelText: "取消",
        confirmText: "提交",
        content: "默认内容",
        showCancelButton: true,
        showConfirmButton: true,
        success: function () { },
        exit: function () { },
    }
    Object.assign(defaults, options)
    // 判断传递过来的内容是否是数组
    if (Array.isArray(defaults.content)) {
        let formHmlt = ''
        defaults.content.forEach(item => {
            let placeholder = item.placeholder || ''
            let type = item.type || 'text'
            let name = item.name || ''
            let value = item.value || ''
            formHmlt = formHmlt + `
            <div class="xk_pop_up_content_form_item">
            <input type="${type}" name="${name}" value="${value}"  placeholder="${placeholder}">
            </div>`
        });

        defaults.content = formHmlt
    }
    let html = `
    <div class="xk_pop_up_shade"></div>
    <div class="xk_pop_up_wrap" style="max-width:${defaults.width};height: ${defaults.height};">
        <div class="xk_pop_up_wrap_header">
            <div class="xk_pop_up_wrap_title">${defaults.title}</div>
            <div class="window">
                <div class="window_item"></div>
                <div class="window_item"></div>
                <div class="window_item"></div>
            </div>
        </div>
        <div class="xk_pop_up_content">
  
            ${defaults.content}
          
        </div>
        <div class="xk_pop_up_content_btn">
            <button class="xk_pop_up_content_btn_cancel xk_pop_up_content_btn_item" style="display: ${defaults.showCancelButton ? 'block' : 'none'};
        ">${defaults.cancelText}</button>
            <button class="xk_pop_up_content_btn_submit xk_pop_up_content_btn_item" style="display: ${defaults.showConfirmButton ? 'block' : 'none'};">${defaults.confirmText}</button>
        </div>

    </div>`
    // 添加生成好的代码到body元素里面的开头
    let body = document.body
    let div = document.createElement('div')
    div.classList = 'xk_pop_up'
    div.innerHTML = html
    body.insertBefore(div, body.children[0])

    // 获取元素
    let xk_pop_up = document.querySelector('.xk_pop_up')
    let xk_pop_up_shade = document.querySelector('.xk_pop_up_shade')
    let xk_pop_up_content_btn_cancel = document.querySelector('.xk_pop_up_content_btn_cancel')
    let xk_pop_up_content_btn_submit = document.querySelector('.xk_pop_up_content_btn_submit')
    let xk_pop_up_wrap = document.querySelector('.xk_pop_up_wrap')
    let xk_pop_up_content_form_list = document.querySelectorAll('.xk_pop_up_content_form_item input')
    // 设置样式
    xk_pop_up_wrap.style.display = 'block';
    xk_pop_up.style.display = 'flex';
    // 取消按钮
    xk_pop_up_content_btn_cancel.addEventListener('click', function () {
        exit_xk_pop_up()
    })
    // 点击背景层退出
    xk_pop_up_shade.addEventListener('click', function () {
        exit_xk_pop_up()
    })
    // 提交
    xk_pop_up_content_btn_submit.addEventListener('click', function () {
        let data = {}
        // 将获取过来的表单值进行字符串的拼接
        let objstr = '';
        xk_pop_up_content_form_list.forEach(item => {
            objstr = objstr + `"${item.name}":"${item.value}",`
        })
        objstr = objstr.substr(0, objstr.length - 1);
        objstr = '{' + objstr + '}'
        // JSON字符串 转 JSON
        data = JSON.parse(objstr)
        if (defaults.success(data)) {
            exit_xk_pop_up()
        }
    })
    // 退出
    function exit_xk_pop_up() {
        xk_pop_up.style.display = 'none';
        xk_pop_up.remove()
    }
}

function xk_pop_up_exit(){
    let xk_pop_up = document.querySelector('.xk_pop_up')
    xk_pop_up.style.display = 'none';
    xk_pop_up.remove()
}
