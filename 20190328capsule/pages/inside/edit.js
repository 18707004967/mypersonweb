// pages/inside/edit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    dataList:{},
    show:false,
    tabList:[
      [
        '../img/tab_head_p.png',
        '../img/tab_head_nochoose.png',
        '../img/tab_head_choose.png',
      ],
      [
        '../img/tab_body_p.png',
        '../img/tab_body_nochoose.png',
        '../img/tab_body_choose.png',
      ],
      [
        '../img/tab_leg_p.png',
        '../img/tab_leg_nochoose.png',
        '../img/tab_leg_choose.png',
      ],
      [
        '../img/tab_shoe_p.png',
        '../img/tab_shoe_nochoose.png',
        '../img/tab_shoe_choose.png',
      ],
      [
        '../img/tab_bg_p.png',
        '../img/tab_bg_nochoose.png',
        '../img/tab_bg_choose.png',
      ],
    ],
    closeList:[],
    textList:[
      {
        engName:'HAT',
        chiName:'帽子'
      },
      {
        engName:'CLOTHES',
        chiName:'衣服'
      },
      {
        engName:'PANTS',
        chiName:'裤子'
      },
      {
        engName:'SHOES',
        chiName:'帽子'
      },
      {
        engName:'BG',
        chiName:'背景'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.setData({dataList:app.globalData});
    console.log(this.data.dataList.closeData)
    var id = this.options.id;    
    try {
      const value = wx.getStorageSync('id');
      const value2 = wx.getStorageSync('show');
      if (value) {
        this.setData({id:value})
      }
      if (value2) {
        this.setData({show:value2})
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  replacePng(list){
    var str = '';
    var arr = [];
    // console.log(this.data.dataList.closeData[list])
    var arr2 = this.data.dataList.closeData[list]
    arr2.forEach(function(ele,index){
      str = ele;
      str = str.split('.png')[0]+'_s.png';
      arr.push(str);
    });    
    console.log(arr)
    this.setData({closeList:arr})
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
      // console.log(list.tabChoose)
    }
    var self = this;
    if(index == 0){
      this.replacePng('head')
    }else if(index == 1){ 
      this.replacePng('body')
    }else if(index == 2){
      this.replacePng('leg')
    }else if(index == 3){
      this.replacePng('shoes')
    }else if(index == 4){
      this.replacePng('bg')
    }
  },
  changeClothes(ev){
    let index = ev.currentTarget.dataset.index;
    let list;
    this.data.dataList.chooseList[this.data.dataList.tabChoose] = index;
    list = this.data.dataList;
    console.log(list.chooseList)
    this.setData({
      dataList:list
    })
    if(this.data.dataList.tabChoose==4){
      this.setData({
        id:index,
      })     
      try {
        wx.setStorageSync('id',this.data.id); 
      } catch (e) {
        console.log(e)
      }
    }
  },
  changePage(){  
    try {
      wx.setStorageSync('chooseList',this.data.dataList.chooseList)  
    } catch (e) {
      console.log(e)
    }
    wx.navigateTo({
      url: '../inside/edit_end'
    })
  },
  aniEnd(){
    var self = this;
    setTimeout(function(){
      try {
        wx.setStorageSync('show',false); 
      } catch (e) {
        console.log(e)
      }
      self.setData({
        show:false,
      })
    },200)   
  }
})