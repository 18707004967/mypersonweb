var ua = window.navigator.userAgent.toLowerCase();
var loginType = '';
var platid = '';
var areaid = '';
var appid = '';
var access_token = '';
var openid = '';
var sData = {};
var urls = window.location.protocol + '//hyrzol.qq.com/cp/a20181209christmas/index.html';
var currGiftNo = '';

milo.ready(function() {
    if (isWeiXin()) openWx(urls,'wxbfb16a632cbdd710');
    need("biz.login", function (LoginManager) {
        LoginManager.checkLogin(
            function (userinfo) {
                if (isWeiXin()) {
                    areaid = loginType = 1;
                    platid = isIOS() ? 0 : 1;
                    appid = 'wxbfb16a632cbdd710';
                    openid = milo.cookie.get('openid');
                    access_token = milo.cookie.get('access_token');
                    loading();
                } else if (isQQ()){
                    areaid = loginType = 2;
                    platid = isIOS() ? 0 : 1;
                    appid = '1106378100';
                    loading();
                } else {
                    areaid = loginType = 2;
                    platid = isIOS() ? 0 : 1;
                    appid = '1106378100';
                    loading();
                }
            },
            function(){
                alert('unlogin');
            }
        );
    });
});

function loading(){
    sData = {
        "access_token" : access_token,
        "accessToken" : access_token,
        "sPlatId" : platid,
        "platid" : platid,
        "sArea": areaid,
        "areaid" : areaid,
        "area" : areaid,
        "appid": appid,
        "openid": openid,
        "sOpenId": openid,
        "loginType": loginType,
        "gid": ""
    };
    //load page
    amsCfg_524126.sData = sData;
    amsSubmit(177393,524126);
}

//load page
amsCfg_524126 = {
    "iActivityId": 177393, //�id    
    "iFlowId":    524126, //����id
    "fFlowSubmitEnd": function(res){
        alert('��������Ϊ:' + res);
        amsInit(177393, 524163);
        
        //��ȡ��ť״̬�¼�
        var gidArr = res.sOutValue1; //gid(1,2,3...)|nickName|headImg|giftName
        amsCfg_524125.sData = sData;
        $(".h_g1").click(function(){
            var o = $(this);
            var gid = o.attr("id").replaceAll("gift");
            if($.inArray(gid,gidArr) >= 0){
                addOrRevertGiftEvt(o);
            }else{
                o.addClass("grey");
            }
        });
        
        return;
    },
    "fFlowSubmitFailed":function(res){
        //ʧ�ܻ��ߵ��������
        //���������㣬ame���ش���0�Ǻ��ߵ�����
        alert(res.sMsg);
    }
};

//��ѯ�Ƿ�󶨵�����
amsCfg_524164={
    type : "query",
    iQueryFlowID:524163,
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����

    },
    failure : function(){
        //δ��ʱ����չ����
    }
};

//�ύ�󶨵�����
amsCfg_524163={
    type : "comit",
    needPopupRole:true,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
    roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
    iQueryFlowID:524164,
    service:"hyrzol",
    success : function(bindedInfo){
        //�Ѱ�ʱ����չ����
    },
    failure : function(){
        //δ��ʱ����չ����
    }
};


// �齱��ȡ�����ܳ�ʼ��
amsCfg_524125 = {
    'iAMSActivityId' : '177393', // AMS���
    'activityId' : '236445', // ģ��ʵ����
    "sData":{},
    '_everyRead' : true,
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
        
        var obj = $("#gift"+currGiftNo)
        obj.removeClass("grey");
        addOrRevertGiftEvt(obj);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        removeGiftEvt($("#gift"+currGiftNo));
        
        if(!callbackObj.sPackageName){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }
        //1��ʵ��
        var str = "��ϲ������� " + callbackObj.sPackageName + " !";
        if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
            /*
             * 0��������Ϸ��Ʒ
             * 1��ʵ����Ʒ����Ҫ��д�����ջ���Ϣ
             * 2��cdkey
             */
            str += "����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����";
            LotteryManager.alert(str);
            return;
        }
        //2��cdkey
        if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
        
            LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey ? callbackObj.sPackageCDkey : callbackObj.sPackageOtherInfo);
            //LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
            return;
        }
        str += "����ע����գ�";
        LotteryManager.alert(str);
        return;
    }
};

function addOrRevertGiftEvt(obj){
    var o = $(obj);
    o.unbind("click");
    o.addClass("grey");
    var gid = o.attr("id").replaceAll("gift");
    amsCfg_524125.sData.gid = gid;
    currGiftNo = gid;
    amsSubmit(177393,524125);
}
function removeGiftEvt(obj){
    var o = $(obj);
    o.unbind("click");
    o.addClass("grey");
    amsCfg_524125.sData.gid = "";
    currGiftNo = "";
}

function openWx(url,appid) {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        var wxcode = (milo.request("wxcode")) ? milo.request("wxcode") : milo.cookie.get("wxcode");
        var code = milo.request("code");
        var myURL = '';
        if (!wxcode && !code) {
            var redirect_url = "https://awp.qq.com/oauth/txyxzs/redirect.html?url=" + encodeURIComponent(url); 
            myURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8b048cb88ea98f1d&redirect_uri=' + encodeURIComponent(redirect_url) + '&response_type=code&scope=snsapi_userinfo&state#wechat_redirect';
            window.location.href = myURL;
        }
        var stateStr = milo.request('state');
        if (code) {
            myURL = window.location.href.replace(/[?#&].*/, '') + "?appid=wx8b048cb88ea98f1d&wxcode=" + code + "&iswxmp=1&sServiceType=txyxzs&acctype=wx&state=" + stateStr;
            window.location.href = myURL;
            clearCookies();
        }
        //milo.cookie.set("lg_source", "wx_txyxzs", 600, "qq.com", "/"); 
        //milo.cookie.set("ams_game_appid", appid, 600, "qq.com", "/"); 
    } else {
        alert('�ǳ���Ǹ����ҳ��ֻ����΢�Ż����´򿪣���ǰ��΢�Ŵ򿪻ҳ�棡');
    }
}

function isWeiXin() {
    return /MicroMessenger/gi.test(navigator.userAgent);
}

function isQQ() {
    return window.navigator.userAgent.toLowerCase().match(/ qq\//i);
}

function isIOS() {
    return /iphone|ipod|ipad/i.test(ua);
}

function isAndroid() {
    return /android/i.test(ua);
}

function isMSDK(){
    return /msdk/i.test(window.navigator.userAgent.toLowerCase());
}

function clearCookies() {
    milo.cookie.clear("wxcode");
    milo.cookie.clear("openid");
    milo.cookie.clear("access_token");
    milo.cookie.clear("acctype");
    milo.cookie.clear("appid");
    milo.cookie.clear("wxcode", ".qq.com", "/");
    milo.cookie.clear("openid", ".qq.com", "/");
    milo.cookie.clear("access_token", ".qq.com", "/");
    milo.cookie.clear("acctype", ".qq.com", "/");
    milo.cookie.clear("appid", ".qq.com", "/");
    milo.cookie.clear("lg_source");
    milo.cookie.clear("ams_game_appid");
    milo.cookie.clear("lg_source", ".qq.com", "/");
    milo.cookie.clear("ams_game_appid", "qq.com", "/");
}