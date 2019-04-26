//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    val: ''
  },
  onLoad: function(options) {
    app.getSkey(skey => {
      this.setData({
        skey
      });
    });
  },
  initVal(e) {
    let val = e.detail.value;
    this.setData({
      val
    });
  },
  search() {
    // console.log(this.data.val);
    let num = this.data.val;
    if (!num) {
      return;
    }
    wx.request({
      url: app.data.URI + 'cipher_open/' + num,
      header: {
        'X-WX-Flag': 1,
        'X-WX-Skey': this.data.skey
      },
      success: res => {
        console.log(res.data);
        if (!res.data.data) {
          wx.showToast({
            title: '无此暗号',
            icon: 'none'
          });
          return;
        }
        let num = res.data.data['_id'];
        wx.navigateTo({
          url: '/pages/article/article?num=' + num
        });
        this.setData({
          val: ''
        });
      },
      fail: error => {
        console.log(error);
      }
    });
  },
  create() {
    wx.navigateTo({
      url: '/pages/create/create'
    });
  },
  toMe() {
    wx.navigateTo({
      url: '/pages/me/me'
    });
  }
});