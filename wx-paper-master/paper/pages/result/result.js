// pages/result/result.js
const app = getApp();
Page({
  data: {
    num: 12580
  },
  onLoad: function(options) {
    console.log(options);
    let num = options.num;
    this.setData({
      num
    });
  },
  copy() {
    // console.log(this.data.num);
    wx.setClipboardData({
      data: this.data.num.toString(),
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data); // data
            wx.showToast({
              title: '已复制',
              icon: 'success',
              duration: 2000
            });
          }
        });
      }
    });
  },
  toHome() {
    wx.navigateTo({
      url: '../index/index'
    });
  }
})