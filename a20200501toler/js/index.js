
function TGDialogS(e){
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
        Dialog.show({
            id:e,
            bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity:70 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}
function closeDialog(){
    // 利用milo库引入dialog组件
    need("biz.dialog",function(Dialog){
        Dialog.hide();
    });
}

function makeSharePic(params) {
    dom2img('#toimg', {
    ondone: function () {
        console.log('Done');
    }
    })
}

new Vue({
    el:"#app",
    data(){
        return {
            persList:[
                {'name':'漩涡鸣人', 'hdImg':'ossweb-img/hd_icon1.png' , 'xjImg':'ossweb-img/xj_img1.png'  },
                {'name':'漩涡鸣人<br> [疾风传]', 'hdImg':'ossweb-img/hd_icon2.png' , 'xjImg':'ossweb-img/xj_img2.png'  },
                {'name':'漩涡鸣人仙人<br>[疾风传]', 'hdImg':'ossweb-img/hd_icon3.png' , 'xjImg':'ossweb-img/xj_img3.png'  },
                {'name':'春野樱', 'hdImg':'ossweb-img/hd_icon4.png' , 'xjImg':'ossweb-img/xj_img4.png'  },
                {'name':'春野樱<br> [百豪]', 'hdImg':'ossweb-img/hd_icon5.png' , 'xjImg':'ossweb-img/xj_img5.png'  },
                {'name':'春野樱<br> [疾风传]', 'hdImg':'ossweb-img/hd_icon6.png' , 'xjImg':'ossweb-img/xj_img6.png'  },
                {'name':'宇智波佐助', 'hdImg':'ossweb-img/hd_icon7.png' , 'xjImg':'ossweb-img/xj_img7.png'  },
                {'name':'宇智波佐助<br> [疾风传]', 'hdImg':'ossweb-img/hd_icon8.png' , 'xjImg':'ossweb-img/xj_img8.png'  },
                {'name':'宇智波佐助<br> [忍界大战]', 'hdImg':'ossweb-img/hd_icon9.png' , 'xjImg':'ossweb-img/xj_img9.png'  },
                {'name':'旗木卡卡西', 'hdImg':'ossweb-img/hd_icon10.png', 'xjImg':'ossweb-img/xj_img10.png'  },
                {'name':'旗木卡卡西<br> [暗部]', 'hdImg':'ossweb-img/hd_icon11.png', 'xjImg':'ossweb-img/xj_img11.png'  },
                {'name':'旗木卡卡西<br> [少年]', 'hdImg':'ossweb-img/hd_icon12.png', 'xjImg':'ossweb-img/xj_img12.png'  },
                {'name':'香磷', 'hdImg':'ossweb-img/hd_icon13.png', 'xjImg':'ossweb-img/xj_img13.png'  },
                {'name':'蝎', 'hdImg':'ossweb-img/hd_icon14.png', 'xjImg':'ossweb-img/xj_img14.png'  },
                {'name':'旋涡玖辛奈<br> [少女]', 'hdImg':'ossweb-img/hd_icon15.png', 'xjImg':'ossweb-img/xj_img15.png'  },
                {'name':'宇智波斑', 'hdImg':'ossweb-img/hd_icon16.png', 'xjImg':'ossweb-img/xj_img16.png'  },
                {'name':'宇智波带土<br> [少年]', 'hdImg':'ossweb-img/hd_icon17.png', 'xjImg':'ossweb-img/xj_img17.png'  },
                {'name':'宇智波鼬', 'hdImg':'ossweb-img/hd_icon18.png', 'xjImg':'ossweb-img/xj_img18.png'  },
                {'name':'宇智波鼬<br> [暗部]', 'hdImg':'ossweb-img/hd_icon19.png', 'xjImg':'ossweb-img/xj_img19.png'  },
                {'name':'猿飞阿斯玛', 'hdImg':'ossweb-img/hd_icon20.png', 'xjImg':'ossweb-img/xj_img20.png'  },
                {'name':'长门<br> [秽土转生]', 'hdImg':'ossweb-img/hd_icon21.png', 'xjImg':'ossweb-img/xj_img21.png'  },
                {'name':'照美冥<br> [五代目水影]', 'hdImg':'ossweb-img/hd_icon22.png', 'xjImg':'ossweb-img/xj_img22.png'  },
                {'name':'自来也', 'hdImg':'ossweb-img/hd_icon23.png', 'xjImg':'ossweb-img/xj_img23.png'  },
                {'name':'佐井', 'hdImg':'ossweb-img/hd_icon24.png', 'xjImg':'ossweb-img/xj_img24.png'  },
                {'name':'阿飞', 'hdImg':'ossweb-img/hd_icon25.png', 'xjImg':'ossweb-img/xj_img25.png'  },
                {'name':'白', 'hdImg':'ossweb-img/hd_icon26.png', 'xjImg':'ossweb-img/xj_img26.png'  },
                {'name':'波风水门', 'hdImg':'ossweb-img/hd_icon27.png', 'xjImg':'ossweb-img/xj_img27.png'  },
                {'name':'大蛇丸', 'hdImg':'ossweb-img/hd_icon28.png', 'xjImg':'ossweb-img/xj_img28.png'  },
                {'name':'大蛇丸<br> [晓]', 'hdImg':'ossweb-img/hd_icon29.png', 'xjImg':'ossweb-img/xj_img29.png'  },
                {'name':'迪达拉', 'hdImg':'ossweb-img/hd_icon30.png', 'xjImg':'ossweb-img/xj_img30.png'  },
                {'name':'飞段', 'hdImg':'ossweb-img/hd_icon31.png', 'xjImg':'ossweb-img/xj_img31.png'  },
                {'name':'干柿鬼鲛', 'hdImg':'ossweb-img/hd_icon32.png', 'xjImg':'ossweb-img/xj_img32.png'  },
                {'name':'角都', 'hdImg':'ossweb-img/hd_icon33.png', 'xjImg':'ossweb-img/xj_img33.png'  },
                {'name':'佩恩<br> [天道]', 'hdImg':'ossweb-img/hd_icon34.png', 'xjImg':'ossweb-img/xj_img34.png'  },
                {'name':'纲手', 'hdImg':'ossweb-img/hd_icon35.png', 'xjImg':'ossweb-img/xj_img35.png'  },
                {'name':'井野', 'hdImg':'ossweb-img/hd_icon36.png', 'xjImg':'ossweb-img/xj_img36.png'  },
                {'name':'旗木卡卡西<br> [万花筒写轮眼]', 'hdImg':'ossweb-img/hd_icon37.png', 'xjImg':'ossweb-img/xj_img37.png'  },
                {'name':'李洛克', 'hdImg':'ossweb-img/hd_icon38.png', 'xjImg':'ossweb-img/xj_img38.png'  },
                {'name':'奈良鹿丸', 'hdImg':'ossweb-img/hd_icon39.png', 'xjImg':'ossweb-img/xj_img39.png'  },
                {'name':'君麻吕', 'hdImg':'ossweb-img/hd_icon40.png', 'xjImg':'ossweb-img/xj_img40.png'  },
                {'name':'日向雏田', 'hdImg':'ossweb-img/hd_icon41.png', 'xjImg':'ossweb-img/xj_img41.png'  },
                {'name':'日向雏田<br> [疾风传]', 'hdImg':'ossweb-img/hd_icon42.png', 'xjImg':'ossweb-img/xj_img42.png'  },
                {'name':'日向花火<br> [和服]', 'hdImg':'ossweb-img/hd_icon43.png', 'xjImg':'ossweb-img/xj_img43.png'  },
                {'name':'日向宁次', 'hdImg':'ossweb-img/hd_icon44.png', 'xjImg':'ossweb-img/xj_img44.png'  },
                {'name':'神秘面具男', 'hdImg':'ossweb-img/hd_icon45.png', 'xjImg':'ossweb-img/xj_img45.png'  },
                {'name':'天天', 'hdImg':'ossweb-img/hd_icon46.png', 'xjImg':'ossweb-img/xj_img46.png'  },
                {'name':'天天<br> [新春风旗袍]', 'hdImg':'ossweb-img/hd_icon47.png', 'xjImg':'ossweb-img/xj_img47.png'  },
                {'name':'我爱罗<br> [疾风传]', 'hdImg':'ossweb-img/hd_icon48.png', 'xjImg':'ossweb-img/xj_img48.png'  },
                {'name':'药师兜', 'hdImg':'ossweb-img/hd_icon49.png', 'xjImg':'ossweb-img/xj_img49.png'  },
                {'name':'波风水门<br> [秽土转生]', 'hdImg':'ossweb-img/hd_icon50.png', 'xjImg':'ossweb-img/xj_img50.png'  },
            ],
            page:0,
            chooseImg:0,
        }
    },
    mounted(){
        var app = new Swiper('#app',{
          direction : 'vertical',
          followFinger: false,
          slidesPerView: 'auto',
        })
    },
    methods:{
        lastPage(){
            this.page--;
            console.log(this.page)
            if(this.page<0){this.page=0};
        },
        nextPage(){
            this.page++;
            var maxPage = Math.floor(this.persList.length/12)
            if(this.page>maxPage){this.page = maxPage};
        },
        chooseHdImg(idx){
            this.chooseImg = idx;
        },
        showJsCard(){
            makeSharePic();
        }
    }
    
})