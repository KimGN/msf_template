function main() {
    $("#fullpage").fullpage({
        autoScrolling:true,
        scrollHorizontally: true,
        anchors: ['Page01', 'Page02', 'Page03', 'Page04', 'Page05','Page06','Page07','Page08','footer'],
        menu: '#myMenu'
    });


    var $speed = 500;

    var swiper_item = new Swiper('.swiper-container.item_swiper', {
        slidesPerView: "auto",
        navigation: {
            nextEl: '.next_btn.item_btn',
            prevEl: '.prev_btn.item_btn',
        },
        loop : true,
        speed: $speed,
        on:{
            init:function(){

            },
            slideChange:function(){
                console.log(this.realIndex);
            }
        }

    });

    var swiper_story = new Swiper('.swiper-container.story_swiper', {
        slidesPerView: "auto",
        navigation: {
            nextEl: '.next_btn.story_btn',
            prevEl: '.prev_btn.story_btn',
        },
        loop : true,
        speed: $speed,
        on:{
            init:function(){

            },
            slideChange:function(){
                console.log(this.realIndex);
            }
        }

    });








}