function main() {
    $("#fullpage").fullpage({
        autoScrolling:true,
        scrollHorizontally: true,
        anchors: ['Page01', 'Page02', 'Page03', 'Page04', 'Page05','Page06','Page07','Page08','footer'],
        menu: '#myMenu'
    });


    var $speed = 800;

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
                var $length = $(".item_swiper  .swiper-slide").length;
                console.log(this);
                $(".item_box .length").text($length/3);
                $(".item_box .counter").text(this.realIndex+1);
            },
            slideChange:function(){
                $(".item_box .counter").text(this.realIndex+1);
            }
        }

    });

    var story_btn_target = null;
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
                $(".txt_bg ul li").eq(0).siblings().css({"left" : "-100%"});

                $(".slide_txt div").eq(0).addClass("active");
                $(".slide_txt div").eq(0).siblings().css({"opacity" : "0"});
                $(".txt_title h3").eq(0).addClass("active");
                $(".txt_title h3").eq(0).siblings().css({"opacity" : "0"});
            },
            slideNextTransitionStart:function(){
                nextEffect(this.realIndex);
            },
            slidePrevTransitionStart:function(){
                prevEffect(this.realIndex);
            },
            slideChange:function(){
                textEffect(this.realIndex);
            }

        }
    });
    // console.log(move);
    /* realIndex 받아서 효과 처리하기
     1. swiper aip 버튼 구분을 통해 realIndex로 슬라이드 제어 하기

     2. 택스트 효과 디졸브 realIndex통한 제어
     */
    function nextEffect(realIndex ) {
        // story_box 배경
        var $active= $(".txt_bg ul li");
        $active.eq(realIndex).css({left : "100%"});
        $active.eq(realIndex).addClass("active");
        $active.eq(realIndex).siblings().removeClass("active");
        TweenMax.to($active.eq(realIndex), $speed/1000, {left:"0%" , ease:Power1.easeInOut});
        TweenMax.to($active.eq(realIndex).siblings(), $speed/1000, {left:"-100%" , ease:Power1.easeInOut});
    }
    function prevEffect(realIndex ) {
        // story_box 배경
        var $active= $(".txt_bg ul li");
        $active.eq(realIndex).css({left : "-100%"});
        $active.eq(realIndex).addClass("active");
        $active.eq(realIndex).siblings().removeClass("active");
        TweenMax.to($active.eq(realIndex), $speed/1000, {left:"0%"});
        TweenMax.to($active.eq(realIndex).siblings(), $speed/1000, {left:"100%"});
    }
    function textEffect(realIndex ) {
        // // txt_title
        var $active_title= $(".txt_title h3");
        var $active_txt= $(".slide_txt div");
        $active_title.eq(realIndex).addClass("active");
        $active_title.eq(realIndex).siblings().removeClass("active");
        $active_txt.eq(realIndex).addClass("active");
        $active_txt.eq(realIndex).siblings().removeClass("active");
        TweenMax.to([$active_title.eq(realIndex) , $active_txt.eq(realIndex)], $speed/1000, { opacity:1});
        TweenMax.to([$active_title.eq(realIndex).siblings() ,$active_txt.eq(realIndex).siblings()], $speed/1000, {opacity:0});

    }
}