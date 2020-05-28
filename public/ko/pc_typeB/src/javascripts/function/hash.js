function hash() {
    var dataHash = [];
    $(".dataHash").each(function() {
        if($(this).attr("id")){
            var ahref = $(this).attr("id");
            dataHash.push("#"+ahref);
        }
    });
    console.log(dataHash)
    var $hashval=0;

    //스크롤 기능
    $(window).scroll(function(){
        //변수 설정
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
        //hash 적용
        for (var i=0; i < dataHash.length; i++) {
            var theID = dataHash[i];
            var divPos = $(theID).offset().top-115;
            var divHeight = $(theID).height();
            if (windowPos >= (divPos) && windowPos < (divPos + divHeight)) {
                if($hashval!=(i+1)){
                    history.replaceState("","",theID);
                    $hashval=i+1;
                }
            } else {
                $("a[href='" + theID + "']").removeClass("active");
            }
        }

    });
}