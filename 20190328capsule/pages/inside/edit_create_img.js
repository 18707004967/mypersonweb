// pages/inside/edit_create_img.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    dataList:{},
    chooseList:[],
    fillImg:'',
    time:null,
    topIcon:'../img/label1.png',
    topIcon2:'../img/label2.png',
    clsoeArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options,res) {
    this.setData({dataList:app.globalData})
    const value = wx.getStorageSync('chooseList');
    const value2 = wx.getStorageSync('iptValue');    
    const drawImgValue = wx.getStorageSync('drawImg'); 
    console.log(drawImgValue)   
    this.setData({
      chooseList:value,
      iptValue:value2,
      drawImgValue:drawImgValue
    })
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
    var self = this;                     
    self.drawImage();
    ctx.draw(true,setTimeout(function(){
      self.export()
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
    ctx.fillStyle = (id==0?'#ffdb01':(id==1?'#fe0000':'#2caae4'));
    ctx.fillRect(0,0,sw,sh)
    ctx.setFontSize(24)
    ctx.fillStyle = "#000";
    ctx.textAlign = 'left';
    ctx.fillText(this.data.iptValue,30,75)
    ctx.drawImage(this.data.topIcon,29,20,sw*0.34,sw*0.088)
    ctx.drawImage(this.data.topIcon2,365,20,sw*0.043,sw*0.283)
    var drawImgValue = this.data.drawImgValue; 
    console.log(drawImgValue)
    for(var i = 0; i < drawImgValue.length; i++){
      console.log(drawImgValue[i])
      ctx.drawImage(drawImgValue[i], 0, 100, sw, sw*1.13)                             
    }
     
  },
  historyBack(){
    wx.navigateBack({
      delta: 1
    })
  },
  shareShow(){
    console.log(11)
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  longTap(e){
    var src = this.data.fillImg;
    wx.getSetting({
        success: function (res) {
          console.log('getsettting success');
          var mes = res.authSetting['scope.writePhotosAlbum'];
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
                wx.saveImageToPhotosAlbum({
                  filePath: src,
                  success: function (res) {
                    wx.showToast({
                      title: '成功保存到相册',
                      icon: 'success'
                    })
                  }
                })
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
})