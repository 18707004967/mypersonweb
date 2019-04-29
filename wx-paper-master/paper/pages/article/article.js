// pages/article/article.js
const app = getApp();
Page({
  data: {
    cardlist: [{
      type: 0,
      content: "test"
    }]
  },
  onLoad: function(options) {
    let num = options.num || '';
    console.log('暗号：', num);
    app.getSkey(skey => {
      this.setData({
        skey
      });
      wx.request({
        url: app.data.URI + 'cipher/' + num,
        header: {
          'X-WX-Flag': 1,
          'X-WX-Skey': this.data.skey
        },
        success: res => {
          console.log(res.data);
          let cardlist = res.data.data.cardlist;
          console.log(cardlist);
          this.setData({
            cardlist
          });
        },
        fail: error => {
          console.log(error);
        }
      });
    });
  }
});