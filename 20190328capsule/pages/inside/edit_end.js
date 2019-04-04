// pages/inside/edit_end.js
var app = getApp();
Page({
  data: {
    id:0,
    dataList:{},
    chooseList:[],
    iptValue:'',
    changeNum:0,
    drawImg:['','','','','']
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
    console.log(sw)
    var sh = this.data.windowHeight;    
    var clsoeArr = this.data.clsoeArr;
    console.log(clsoeArr)
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
          drawImg:arr
        })
      },
      fail(error){
        console.log(error)
      }
    }) 
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
      title: '加载中',
      success(){
        setTimeout(function () {
          wx.hideLoading()
          try {
            wx.setStorageSync('drawImg',self.data.drawImg)  
          } catch (e) {
            console.log(e)
          }
          wx.navigateTo({
            url:'./edit_create_img'
          })
        },1000)
      }
    })        
  },
})