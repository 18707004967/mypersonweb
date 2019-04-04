//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //获取data
    wx.request({
      url: 'https://api.egooidea.com/caps/cloth', 
      success:res => {
        if(res.data.code == 0){
          this.globalData.baseUrl = res.data.data.baseurl;
          this.globalData.closeData = res.data.data.clothes;          
        }
      },
      fail(error){
        console.log(error)
      }
    })
  },
  globalData: {
    userInfo: null,
    closeData:[],
    chooseList:['',0,0,'',2],
    tabChoose:null,
    tabDrawsChoose:0,
    baseUrl:null,
  }
})