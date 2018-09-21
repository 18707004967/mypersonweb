// 当前页面js
function fnAll(n){
    switch(n){
        case 3:
        	(function(){
        		//开发请注意，打开弹层时调用该函数
        		newSwip()
        	})()
        break;
        case 1:
        //
        break;
    }
}
(function(){
    var s1 = null;
    function newSwip(){
        if (s1!==null) {s1.destroy()}
        s1 = new Swiper('.hb_wrap',{
            speed:800,
            loop:true,
            pagination: {
                el: '.hb_pag',
                clickable: true,
            },
            navigation: {
              nextEl: '.hb_prev_btn',
              prevEl: '.hb_last_btn',
            },
        })             
        if ($('.hb_wrap').find('.hb_wrap_in').length <= 1) {s1.destroy()}
    }
    window.newSwip = newSwip;
})()