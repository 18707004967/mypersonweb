// pages/inside/edit.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    dataList:util.datalist,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = this.options.id;    
    try {
      const value = wx.getStorageSync('id')
      if (value) {
        this.setData({id:value})
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  tabChange(ev){
    let index = ev.currentTarget.dataset.index;
    let list;
    if(this.data.dataList.tabChoose==index){
      this.data.dataList.tabChoose = null;
      list = this.data.dataList;
      this.setData({dataList:list});
    }else{
      this.data.dataList.tabChoose = index;
      list = this.data.dataList;
      this.setData({dataList:list});
    }   
  },
  changeClothes(ev){
    let index = ev.currentTarget.dataset.index;
    let list;
    this.data.dataList.chooseList[this.data.dataList.tabChoose] = index;
    list = this.data.dataList;
    this.setData({
      dataList:list
    })
  },
  changePage(){  
    try {
      wx.setStorageSync('chooseList',this.data.dataList.chooseList)  
    } catch (e) {
      console.log(e)
    }
    wx.navigateTo({
      url: '../inside/edit_end?id='+this.data.id
    })
  }
})