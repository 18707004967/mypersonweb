// pages/me/me.js
import {formatTime} from '../../utils/util.js';
const app = getApp();
Page({
  data: {
    list: [
      // {
      //   id: "uPDeQNzMc",
      //   createTime: "2018-09-10T03:42:31.626Z",
      //   summary: "1",
      //   status: 1,
      //   code: "429537"
      // }
    ]
  },
  onLoad: function(options) {
    app.getSkey(skey => {
      this.setData({
        skey
      });
      this.getList(this.data.skey);
    });
  },
  ctrls(e) {
    let index = e.currentTarget.dataset.index;
    let role = e.target.dataset.role;
    switch (role) {
      case 'editor':
        this.edit(index);
        break;
      case 'del':
        this.del(index);
        break;
      case 'eye':
        this.see(index);
        break;
    }
  },
  del(index) {
    console.log('del', index);
    let id = this.data.list[index].id;
    wx.request({
      url: app.data.URI + 'cipher/' + id,
      method: 'DELETE',
      header: {
        'X-WX-Flag': 1,
        'X-WX-Skey': this.data.skey
      },
      success: (res) => {
        console.log('del-success', res.data);
        this.getList(this.data.skey); // 此处也可以不发请求直接删data.list的index
      },
      fail: (error) => {
        console.log('error', error);
      }
    });
  },
  edit(index) {
    let id = this.data.list[index].id;
    console.log('edit', index, id);
    wx.navigateTo({
      url: '/pages/create/create?id=' + id
    });
  },
  see(index) {
    console.log('see', index);
    let num = this.data.list[index].code;
    wx.navigateTo({
      url: '/pages/result/result?num=' + num
    });
  },
  getList(skey) {
    wx.request({
      url: app.data.URI + 'cipher_list',
      method: 'GET',
      header: {
        'X-WX-Skey': skey,
        'X-WX-Flag': 1
      },
      success: (res) => {
        console.log('success', res.data);
        let list = this.initList(res.data.data);
        this.setData({
          list
        });
      },
      fail: (error) => {
        console.log('error', error);
      }
    });
  },
  initList(arr) {
    for (var i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (item.createTime) {
        item.createTime = formatTime(new Date(item.createTime));
      }
    }
    return arr;
  },
  preview(e) {
    let num = e.currentTarget.dataset.id;
    console.log('preview', num);
    wx.navigateTo({
      url: '/pages/article/article?num=' + num
    });
  }
});