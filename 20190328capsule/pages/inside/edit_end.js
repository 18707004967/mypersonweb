// pages/inside/edit_end.js
var util = require('../../utils/util.js');
Page({
  data: {
    id:0,
    dataList:util.datalist,
    chooseList:[],
    iptValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const value = wx.getStorageSync('chooseList')
    this.setData({chooseList:value})
    const id = wx.getStorageSync('id')
    this.setData({id:id})
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
  imageSave(){
    var value = this.data.iptValue;
    value = value.split('');
    this.setStorage();
    if(value.length>0){     
      try {

      } catch (e) {
        console.log(e)
      }  
      wx.navigateTo({
        url:'./edit_create_img'
      })
    }else{
      wx.showModal({
      title: '提示',
      content: '请输入您的潮流标签~',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    }
  },
  setStorage(){
    var list = this.data.dataList.drawsList;
    var chooseList = this.data.chooseList;
    console.log(list);
    console.log(chooseList);
    wx.setStorageSync('fillData',{
      text:this.data.iptValue,
      topIcon:'../img/bz.png',
      personData:[list.bg[chooseList[4]],list.body[chooseList[1]],list.leg[chooseList[2]],list.shoe[chooseList[3]],list.head[chooseList[0]]]
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