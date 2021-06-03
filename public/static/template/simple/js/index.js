var wow = new WOW({
    boxClass: 'article_item',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
});
wow.init();




let search_val = document.querySelector('#search_val')
let search_btn = document.querySelector('.search_btn')

search_btn.addEventListener('click', function () {
    let val = search_val.value
    if (val == '') {
        alert('搜索内容不能为空')
        return
    }
    window.location.href = "/search/" + val
})


search_val.onkeypress = function (event) {
    if (event.which === 13) {
        let val = search_val.value
        if (val == '') {
            alert('搜索内容不能为空')
            return
        }
        window.location.href = "/search/" + val
    }
}