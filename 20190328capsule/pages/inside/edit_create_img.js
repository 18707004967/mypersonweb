// pages/inside/edit_create_img.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    dataList:util.datalist,
    chooseList:[],
    fillImg:'',
    fillData:{},
    time:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options,res) {
    const value = wx.getStorageSync('chooseList')
    const fillData = wx.getStorageSync('fillData');
    this.setData({
      fillData:fillData
    })
    this.setData({chooseList:value})
    const id = wx.getStorageSync('id')
    this.setData({id:id})
    this.getSystem();
    this.setData({
      cans:wx.createCanvasContext('canvas'),
    })
    var ctx = this.data.cans;
    var sw = this.data.windowWidth;
    var sh = this.data.windowHeight;
    ctx.width = sw;
    ctx.height = sh;
    this.drawImage();
    const that = this;
    ctx.draw(true,setTimeout(function(){
      that.export()
    },500));
  },
  getSystem(){
    const that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            windowHeight: res.screenHeight,
            windowWidth: res.screenWidth
          })
        }
      }) 
  },
  export() {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: (res) => {
        that.setData({fillImg:res.tempFilePath})
        console.log('success')
      },
      fail: (err) => {
        console.error(err)
      }
    }, this); 
  },
  drawImage(){
    var sw = this.data.windowWidth;
    var sh = this.data.windowHeight;
    var ctx = this.data.cans;
    var id = this.data.id;
    ctx.fillStyle = (id==0?'#fe0000':(id==1?'#ffdb01':'#2caae4'));
    ctx.fillRect(0,0,sw,sh)
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,sw,90)
    ctx.setFontSize(20)
    ctx.fillStyle = "#000";
    ctx.textAlign = 'center';
    ctx.fillText(this.data.fillData.text,sw/2,60)
    ctx.drawImage(this.data.fillData.topIcon,350,22,34,135)
    var imgd = this.data.fillData.personData;
    for(var i = 0; i<imgd.length;i++){
      ctx.drawImage(imgd[i],0,120,sw,450)
    }   
  },

  longTap(e){
    var src = this.data.fillImg;
    // console.info(src);
    console.log(src);
    console.log(11)
    // console.log(src);
    wx.getSetting({
        success: function (res) {
          console.log('getsettting success');
          var mes = res.authSetting['scope.writePhotosAlbum'];
          // wx.showToast({
          //   title: mes.toString(),
          //   icon: 'error'
          // })
          // console.log(mes);
          if(!mes){
            wx.showActionSheet({
              itemList: ['去授权', '取消'],
              success(res) {
                console.log(res.tapIndex)
                if(res.tapIndex==0){
                  wx.openSetting({
                    success(res){
                      console.log(res)
                    },
                    fail(error){
                      console.log(error)
                    }
                  })
                }                
              }
            })
          }else{
            // wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
            //   url: src,
            //   success: function (res) {
                // 下载成功后再保存到本地
                wx.saveImageToPhotosAlbum({
                  filePath: src,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                  success: function (res) {
                    wx.showToast({
                      title: '成功保存到相册',
                      icon: 'success'
                    })
                  }
                })
            //   },
            //   fail(error){
            //     console.log(error)
            //   }
            // })
          }
        },
        fail: function(){
          console.error('setting fail');
        },
        complete: function(){
          console.log('getsettting complete');
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})