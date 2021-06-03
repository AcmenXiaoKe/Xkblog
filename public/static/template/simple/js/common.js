// 打字效果
const banner_title_content = document.querySelector('.banner_title_content')

const banner_title_content_Text = JSON.parse(banner_title_content.getAttribute("data-text"))

let banner_title_content_Text_index = 0;
let banner_title_content_Text_charIndex = 0;
let banner_title_content_Text_delta = 500;

let banner_title_content_Text_start = null;
let banner_title_content_Text_isDeleteing = false;

function type(time) {
    window.requestAnimationFrame(type);
    if (!banner_title_content_Text_start) banner_title_content_Text_start = time;
    let progress = time - banner_title_content_Text_start;
    if (progress > banner_title_content_Text_delta) {
        let text = banner_title_content_Text[banner_title_content_Text_index]
        if (!banner_title_content_Text_isDeleteing) {
            banner_title_content.innerHTML = text.slice(0, ++banner_title_content_Text_charIndex)
            banner_title_content_Text_delta = 500 - Math.random() * 400;
        } else {
            banner_title_content.innerHTML = text.slice(0, banner_title_content_Text_charIndex--)
        }
        banner_title_content_Text_start = time
        if (banner_title_content_Text_charIndex === text.length) {
            banner_title_content_Text_isDeleteing = true
            banner_title_content_Text_delta = 200;
            banner_title_content_Text_start = time + 1200
        }
        if (banner_title_content_Text_charIndex < 0) {
            banner_title_content_Text_isDeleteing = false
            banner_title_content_Text_start = time + 200;
            banner_title_content_Text_index = ++banner_title_content_Text_index % banner_title_content_Text.length;
        }
    }
}
window.requestAnimationFrame(type);

var up = document.querySelector('.up')
// 监控页面滑动
document.addEventListener('scroll', function () {
    if (window.pageYOffset > 600) {
        up.style.transform = 'scale(1)'
    } else {
        up.style.transform = 'scale(0)'
    }
})
// 返回顶部
up.addEventListener('click', function () {
    animate(window, 0)
})

//返回顶部动画
function animate(obj, target, callback) {

    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        var step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (window.pageYOffset == target) {

            clearInterval(obj.timer);

            callback && callback();
        }
        window.scroll(0, window.pageYOffset + step)
    }, 10);
}
// 菜单
let menu = document.querySelector('.menu')
let MobileNav = document.querySelector('.mobile_nav')
let MobileNavMask = document.querySelector('.mobile_nav_mask')
menu.addEventListener('click', function () {
    MobileNav.style.left = '0%';
    MobileNavMask.style.display = 'block';
})
MobileNavMask.addEventListener('click', function () {
    MobileNav.style.left = '-70%';
    MobileNavMask.style.display = 'none';
})


var theme = document.querySelector('.theme')
let sun = document.querySelector('.sun')
let moon = document.querySelector('.moon')
var theme_type = localStorage.getItem("theme_type") || 'default';
// 调用主题切换函数，传递一个当前处于那种主题
SubjectSwitch(theme_type)
theme.addEventListener('click', function () {
    // 主题切换
    if (theme_type == 'default') {
        theme_type = 'darkly';
        SubjectSwitch("darkly")
    } else {
        SubjectSwitch("default")
        theme_type = 'default';
    }
})


function SubjectSwitch(val) {
    if (val == "darkly") {
        localStorage.setItem("theme_type", "darkly")
        document.documentElement.style.setProperty('--html-bg', "#121212")
        document.documentElement.style.setProperty('--Primary-bg', "#232323")
        document.documentElement.style.setProperty('--title-color', "#F2F6FC")
        document.documentElement.style.setProperty('--border-color', "rgba(255,255,255,.1)")
        document.documentElement.style.setProperty('--color', "rgba(255,255,255,.8)")
        moon.style.display = 'none'
        sun.style.display = 'block'
    }
    else {
        moon.style.display = 'block'
        sun.style.display = 'none'
        localStorage.setItem("theme_type", "default")
        document.documentElement.style.setProperty('--html-bg', "#F5F5F5")
        document.documentElement.style.setProperty('--Primary-bg', "#FFF")
        document.documentElement.style.setProperty('--title-color', "#363636")
        document.documentElement.style.setProperty('--border-color', "#e4e7ed")
        document.documentElement.style.setProperty('--color', "rgb(51,51,51)")
    }

}