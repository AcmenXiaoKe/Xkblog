var slideshow  = JSON.parse($('.banner').attr('data-json'))
for (let i = 0; i < slideshow.length; i++) {
    let str = `<div class="swiper-slide">
                                        <a href="${slideshow[i][1]}" target="_blank">
                                            <img src="${slideshow[i][0]}"  alt="">
                                        </a>
                                        <div class="swiper-slide_title">${slideshow[i][2]}</div>
      </div>`
    $('.swiper-wrapper').append(str)
}
// 轮播图插件配置
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        dynamicMainBullets: 2
    },
    // autoplay: true,
    autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
});
var main_article_title_tag_item = document.querySelectorAll('.main_article_title_tag_item')
for (var i = 0; i < main_article_title_tag_item.length; i++) {
    main_article_title_tag_item[i].addEventListener('click', function () {
        for (var j = 0; j < main_article_title_tag_item.length; j++) {
            main_article_title_tag_item[j].classList = 'main_article_title_tag_item'
        }
        this.classList = 'main_article_title_tag_item main_article_title_tag_item_selected';
    })
}

var wow = new WOW({
    boxClass: 'article_item',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
});
wow.init();

