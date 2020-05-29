"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var $window = $(window);
var winSc;
var $html = $("html");
var htmlH;
var _compareBoxW;
var $header = $("#header");
var $alignMonitor = $(".monitor_compare .compare_box, .monitor_compare .lcd_screen .img_wrap");

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    _compareBoxW = $(".monitor_compare .compare_box").width();
    $alignMonitor.css({"background-position-x" :  -(1462 - _compareBoxW) / 2});
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
        _compareBoxW = $(".monitor_compare .compare_box").width();
        $alignMonitor.css({"background-position-x" :  -(1462 - _compareBoxW) / 2});
    });
    $(this).trigger("resize");
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
    });

    main();
    layout();
    scrollEvent();
    hash();
});
function hash() {
    var dataHash = [];
    var $hashval=0;
    $(".dataHash").each(function() {
        if($(this).attr("id")){
            var ahref = $(this).attr("id");
            dataHash.push("#"+ahref);
        }
    });
    // $(".page_btn button").eq(0).css({"visibility" : "hidden"});
    //스크롤 기능
    $(window).scroll(function(){
        //변수 설정
        var windowPos = $(window).scrollTop();
        //header
        if(windowPos > 10){
            TweenMax.to($("header") , 0.3 , {backgroundColor : "#ffffff"});
        }else{
            TweenMax.to($("header") , 0.3 , {backgroundColor : "transparent"});
        }
        //hash 적용
        for (var i=0; i < dataHash.length; i++) {
            var theID = dataHash[i];
            var divPos = $(theID).offset().top-115;
            var divHeight = $(theID).height();
            if (windowPos >= (divPos) && windowPos < (divPos + divHeight)) {
                if($hashval!=(i)){
                    history.replaceState("","",theID);
                    $hashval=i;
                    console.log(dataHash[$hashval]);
                    if(dataHash[$hashval] === "#workInfo"){
                        counter();
                    }
                }
            }
        }

        // count

    });

    // 이동 버튼 클릭
    var pageNum = 0;
    $(".page_btn button").on("click" , function () {
        if($(this).hasClass("prev_con") ){
            pageNum = --$hashval;
            if(pageNum  === -1 ) pageNum = 0 ;
            console.log(pageNum)
        }else{
            pageNum = ++$hashval;
        }
        var headerH = $("header").height()+20;
        var scrollPosition = $(dataHash[pageNum]).offset().top;
        TweenMax.to($("html"), 0.5 , {scrollTop: scrollPosition-headerH});
    })
    // count
    function counter() {
        function numberCounter(target_frame, target_number) {
            this.count = 0;
            this.diff = 0;
            this.target_count = parseInt(target_number);
            this.target_frame = document.getElementById(target_frame);
            this.timer = null;
            this.counter();
        };
        numberCounter.prototype.counter = function () {
            var self = this;
            this.diff = this.target_count - this.count;

            if (this.diff > 0) {
                self.count += Math.ceil(this.diff / 5);
            }

            this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            if (this.count < this.target_count) {
                this.timer = setTimeout(function () {
                    self.counter();
                }, 20);
            } else {
                clearTimeout(this.timer);
            }
        };
        new numberCounter("counter3", 11218676);
        new numberCounter("counter2", 47317);
        new numberCounter("counter1", 74);
    }

}
function layout() {
    var $allNav = $("#allNav");
    var $gnbNav = $allNav.find("nav");
    var $allMenuBtn = $("#allMenuBtn");
    var $navDimmed = $("#navDimmed");

    //nav btn open
    $allMenuBtn.click(function () {
        var _this = $(this);
        if(!$allNav.hasClass("nav_open")){
            $html.addClass("no_scroll");
            $allNav.addClass("nav_open");
            TweenMax.to($navDimmed, .3, {display:"block", opacity:.6});
            TweenMax.to($gnbNav, .3, {x:"0%", ease:esStep});
        } else {
            allNavClose();
        }
    });
    $navDimmed.click(function () {
        allNavClose();
    });
    function allNavClose(){
        $html.removeClass("no_scroll");
        $allNav.removeClass("nav_open");
        TweenMax.to($navDimmed, .3, {display:"none", opacity:0});
        TweenMax.to($gnbNav, .3, {x:"-100%", ease:esStep});
    }
}
function main() {
    var $speed = 800;
    var swiper_visual = new Swiper('.swiper-container.visual_swiper', {
        slidesPerView: "auto",
        speed: $speed,
        pagination: {
            el: '.swiper-pagination',
        },
    });
    //
    var swiper_item = new Swiper('.swiper-container.item_swiper', {
        slidesPerView: "auto",
        navigation: {
            nextEl: '.next_btn.item_btn',
            prevEl: '.prev_btn.item_btn',
        },
        loop : true,
        freeMode: true,
        speed: $speed,
        on:{
            init:function(){
                var $length = $(".item_swiper  .swiper-slide").length;
                $(".control_box .length").text($length/3);
                $(".control_box .counter").text(this.realIndex+1);
            },
            slideChange:function(){
                $(".control_box .counter").text(this.realIndex+1);
            }
        }

    });

    var swiper_activist= new Swiper('.swiper-container.activist_swiper', {
        slidesPerView: "auto",
        loop : true,
        speed: $speed,
        centeredSlides: true,
        centeredSlidesBounds: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    var swiper_campaigns = new Swiper('.swiper-container.campaigns_swiper', {
        slidesPerView: "auto",
        slidesPerGroup: 2,
        speed: $speed,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });


    //


}
function scrollEvent() {
    var $subVisual = $("#subVisual");
    $(window).scroll(function () {
        $(".pall_bg").each(function () {
            var offset = $(this).offset();
            var offsetTop = offset.top;
            var _this_h = $(this).innerHeight();
            var _bg_p = (winSc - offsetTop) / _this_h * 100;
            $(this).css({"background-position-y": -_bg_p.toFixed(2) / 2 + "%"});
        });
        if (winSc < 820) {
            $subVisual.css({"background-position-y": winSc / 3});
        }
        headerFix();
    });

    function headerFix() {
        if (winSc > 0) {
            $header.addClass("fixed");
        } else {
            $header.removeClass("fixed");
        }
    }
    headerFix();

    var _containerTop = null;
    var $discoverBtn = $("#discoverBtn");
    $discoverBtn.click(function () {
        _containerTop = $("#container").offset().top - 70;
        TweenMax.to($("html"), .5, {scrollTop: _containerTop, ease: esStep});
    });

    var $jsScrSec = $(".js-scr-sec");
    var scrInnerStep = [];
    if (!$jsScrSec.length) return false;

    function scrollEvent() {
        $window.scroll(function () {
            scrollMotion(winSc);
        });
        $jsScrSec.each(function () {
            var _this = $(this);
            var secTop = _this.offset().top;
            var secInner = secTop - (winH / 2) - 250;
            scrInnerStep.push([_this, secInner]);
        });

        function scrollMotion(_winSc) {
            $.each(scrInnerStep, function (i, v) {
                if (_winSc >= v[1]) {
                    if (v[0].motion === undefined) {
                        TweenMax.staggerTo(v[0].find(".js-scr-box"), .8, {
                            y: 0, opacity: 1, ease: esStep
                        }, .2);
                        v[0].motion = true;
                    }
                    v[0].addClass("js-motion-end");
                }
            });
        }

        scrollMotion(winSc);
    }
    scrollEvent();
}