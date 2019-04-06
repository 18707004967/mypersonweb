// pages/inside/edit_end.js
var app = getApp();
Page({
  data: {
    id:0,
    dataList:{},
    chooseList:[],
    iptValue:'',
    changeNum:0,
    drawImg:[-1,-1,-1,-1,-1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({dataList:app.globalData});
    const value = wx.getStorageSync('chooseList')
    this.setData({chooseList:value})
    const id = wx.getStorageSync('id')
    this.setData({id:id})
    this.getSystem();
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
  historyBack(){
    wx.navigateBack({
      delta: 1
    })
  },
  getValue(ev){
    this.setData({
      iptValue:ev.detail.value
    });
  },
  getImageInfo(num,key){
    var self = this;
    var ctx = this.data.cans;
    var sw = this.data.windowWidth;
    var sh = this.data.windowHeight;    
    var clsoeArr = this.data.clsoeArr;
    if (!!clsoeArr[num][key]){
      wx.getImageInfo({
        src: 'https:'+this.data.dataList.baseUrl+clsoeArr[num][key],
        success: function (res) {
          console.log(res)
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
            drawImg:arr
          })
        },
        fail(error){
          console.log(error)
        }
      }) 
    }else{
      var arr = self.data.drawImg;
      arr[num] = '';
      self.setData({
        drawImg: arr
      })
    }
  },
  imageSave(){
    var value = this.data.iptValue;
    value = value.split('');
    wx.setStorageSync('chooseList',this.data.chooseList)
    wx.setStorageSync('iptValue',this.data.iptValue)
    var imgd = this.data.dataList.closeData;
    var cho = this.data.chooseList;
    this.setData({clsoeArr:[{bg:imgd.bg[cho[4]]},{leg:imgd.leg[cho[2]]},{body:imgd.body[cho[1]]},{head:imgd.head[cho[0]]},{shoes:imgd.shoes[cho[3]]}]})
    var clsoeArr = this.data.clsoeArr;
    for(var i = 0; i<this.data.chooseList.length; i++){
      for(var key in clsoeArr[i]){
        this.getImageInfo(i,key)        
      }
    }
    var self = this;
    wx.showLoading({
      title: '生成中',
      success(){
        
      }
    })
    var time = setInterval(function () {
      var cNum = 0;
      self.data.drawImg.forEach(function (value, index) {
        if (value == -1) {
          cNum++;
        }
      })
      if (cNum == 0) {
        clearInterval(time)
        wx.hideLoading()
        try {
          wx.setStorageSync('drawImg', self.data.drawImg)
        } catch (e) {
          console.log(e)
        }
        wx.navigateTo({
          url: './edit_create_img'
        })
      }
    },1000/60)        
  },
})