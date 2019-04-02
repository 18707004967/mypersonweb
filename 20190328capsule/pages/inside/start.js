// pages/inside/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:2,
    jnList:['../img/start_jn02.png','../img/start_jn01.png','../img/start_jn03.png']
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
    try {
      wx.setStorageSync('id',this.data.id)  
    } catch (e) {
      console.log(e)
    }
    wx.navigateTo({
      url:'./edit'
    })
  }
})