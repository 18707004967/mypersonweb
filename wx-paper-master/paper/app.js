// https://www.getpostman.com/collections/375359a14caa17e8c1c6
// wx20b608fe3ae25403
// app.js

const URI = 'https://api.egooidea.com/ningdian/';
// const URI = 'https://192.168.1.244:3355/ningdian/';
let uriImg = 'https://niceduang.gitee.io/pages/wx-paper/assets/imgs/';

App({
  data: {
    URI
  },
  onLaunch: function() {
    wx.checkSession({
      success: () => {
        console.log('有效期内,无需再次登录');
        // session_key 未过期，并且在本生命周期一直有效
      },
      fail: () => {
        console.log('有效期外');
        // session_key 已经失效，需要重新执行登录流程
        this.login();
      }
    });
  },
  login() {
    let This = this;
    wx.login({
      success(res) {
        if (res.code) {
          console.log('res.code:', res.code);
          // 发起网络请求
          wx.request({
            url: This.data.URI + 'wxlogin',
            header: {
              'Accept': 'application/json',
              'X-WX-Flag': 1,
              'X-WX-Code': res.code
            },
            method: 'POST',
            success: res => {
              console.log('success', res.data);
              let skey = res.data.data.skey;
              console.log('skey:', skey);
              wx.setStorage({
              // wx.setStorageSync({
                key: "skey",
                data: skey
              });
            },
            fail: error => {
              console.log('error', error);
            }
          });
        } else {
          console.log('登录失败！');
        }
      },
      fail: error => {
        console.log('login-error', error);
      }
    });
  },
  getSkey(cb) {
    wx.getStorage({
      key: 'skey',
      success: res => {
        console.log('skey:', res.data);
        cb && cb(res.data);
      }
    });
  }
});