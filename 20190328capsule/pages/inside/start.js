// pages/inside/start.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1,
    jnList:[
      ['../img/start_jn01_top.png','../img/start_jn01_bottom.png'],
      ['../img/start_jn02_top.png','../img/start_jn02_bottom.png',],
      ['../img/start_jn03_top.png','../img/start_jn03_bottom.png']
    ],
    show:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                      console.log('授权成功')
                  }
              })
          }
      }
  })
  },
  startChange(){
    this.setData({
      show:true,
    })
    var self = this;
    setTimeout(function(){
      try {
        wx.setStorageSync('id',2); 
        wx.setStorageSync('show',true); 
      } catch (e) {
        console.log(e)
      }
      wx.redirectTo({
        url:'./edit'
      })
    },300)
    
  }
})