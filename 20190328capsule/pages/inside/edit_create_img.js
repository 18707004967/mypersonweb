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
    var imgd = this.data.dataList.closeData;
    var cho = this.data.chooseList;
    this.setData({clsoeArr:[{bg:imgd.bg[cho[4]]},{leg:imgd.leg[cho[2]]},{body:imgd.body[cho[1]]},{head:imgd.head[cho[0]]},{shoes:imgd.shoes[cho[3]]}]})
    var clsoeArr = this.data.clsoeArr;
    var arr = [];                     
    self.drawImage();
    ctx.draw(true,setTimeout(function(){
      self.export()
    },1000)); 
  },
  getImageInfo(num,key){
    var self = this;
    var ctx = this.data.cans;
    var sw = this.data.windowWidth;
    console.log(sw)
    var sh = this.data.windowHeight;    
    var clsoeArr = this.data.clsoeArr;
    wx.getImageInfo({
      src: 'https:'+this.data.dataList.baseUrl+clsoeArr[num][key],
      success: function (res) {
        var arr = self.data.drawImg;
        if(key=='bg'){
          arr[0] = res.path;
        }else if(key=='leg'){
          arr[1] = res.path;
        }else if(key=='body'){
          arr[2] = res.path;
        }else if(key=='head'){
          arr[3] = res.path;
        }else if(key=='shoes'){
          arr[4] = res.path;
        }
        self.setData({
          drawImg:arr,
        })
        for(var i = 0; i < arr.length; i++){
            console.log(arr[i]) 
            ctx.drawImage(arr[i],0,100,sw,450)                             
        }
      },
      fail(error){
        console.log(error)
      }
    }) 
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
    ctx.drawImage(this.data.topIcon,29,20,130,33)
    ctx.drawImage(this.data.topIcon2,365,20,16,106)
    var drawImgValue = this.data.drawImgValue; 
    console.log(drawImgValue)
    for(var i = 0; i < drawImgValue.length; i++){
      ctx.drawImage(drawImgValue[i],0,100,sw,450)                             
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