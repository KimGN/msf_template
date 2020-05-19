function main() {
    $("#fullpage").fullpage({
        autoScrolling:true,
        scrollHorizontally: true,
        anchors: ['Page01', 'Page02', 'Page03', 'Page04', 'Page05','Page06','Page07','Page08','footer'],
        menu: '#myMenu'
    });

    var swiper_item = new Swiper('.swiper-container.item_swiper', {
        slidesPerView: 5.2,
        spaceBetween: 10
    });










}