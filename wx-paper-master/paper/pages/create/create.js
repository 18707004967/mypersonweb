// pages/create/create.js
const app = getApp();
Page({
  data: {
    focus: -1,
    id: '',
    // 1-pic,0-txt,2-video
    cardlist: [{
      status: 0,
      type: -1,
      content: ''
    }]
  },
  onLoad: function(options) {
    app.getSkey(skey => {
      this.setData({
        skey
      }, () => {
        let id = options.id || '';
        // console.log('id:', id);
        if (id.length <= 0) {
          return;
        }
        this.setData({
          id
        });
        wx.request({
          url: app.data.URI + 'cipher/' + id,
          header: {
            'X-WX-Skey': this.data.skey,
            'X-WX-Flag': 1
          },
          success: res => {
            let cardlist = res.data.data.cardlist;
            for (let i = 0; i < cardlist.length; i++) {
              cardlist[i].status = 2;
              delete cardlist[i]['_id'];
            }
            this.setData({
              cardlist
            });
          },
          fail: error => {
            console.log('get id', error);
          }
        });
      });
    });
  },
  showOptions(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    var _status = `cardlist[${index}].status`;
    this.setData({
      [_status]: 1
    });
  },
  queryType(e) {
    let type = e.target.dataset.type;
    if (type == -1) {
      return;
    }
    let index = e.currentTarget.dataset.index;

    let _status = `cardlist[${index}].status`;
    let _type = `cardlist[${index}].type`;
    this.setData({
      [_status]: 2,
      [_type]: type
    });

    switch (type) {
      case '0':
        console.log(index, type, 'txt');
        this.focus(index);
        break;
      case '1':
        console.log(index, type, 'pic');
        this.choseImage(index);
        break;
      case '2':
        console.log(index, type, 'video');
        this.choseVideo(index);
        break;
    }
  },
  change(e) {
    let role = e.target.dataset.role;
    let index = e.currentTarget.dataset.index;
    switch (role) {
      case 'focus':
        this.focus(index);
        break;
      case 'reset':
        this.reset(index);
        break;
      case 'del':
        this.del(index);
        break;
    }
  },
  reset(index) {
    console.log(index, 'reset');
    let type = this.data.cardlist[index].type;
    switch (type) {
      case '1':
        this.choseImage(index);
        break;
      case '2':
        this.choseVideo(index);
        break;
    }
  },
  focus(index) {
    console.log(index, 'focus');
    this.setData({
      focus: index
    });
  },
  del(index) {
    let cardlist = this.data.cardlist;
    if (index == 0 && cardlist.length == 1) {
      cardlist[0] = {
        status: 0,
        type: -1,
        content: ''
      };
      this.setData({
        cardlist: cardlist
      });
      return;
    }
    cardlist.splice(index, 1);
    this.setData({
      cardlist: cardlist
    });
  },
  addCard(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    let cardlist = this.data.cardlist;
    console.log(index, 'addCard');
    this.initOps();
    if (index == 0 && e.currentTarget.dataset.pos == "top") {
      cardlist.unshift({
        status: 1,
        type: -1,
        content: ''
      });
    } else if (index == cardlist.length - 1) {
      cardlist.push({
        status: 1,
        type: -1,
        content: ''
      });
    } else {
      cardlist.splice(index + 1, 0, {
        status: 1,
        type: -1,
        content: ''
      });
    }
    console.log(cardlist);
    this.setData({
      cardlist
    });
  },
  typing(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    let val = e.detail.value;
    let _content = `cardlist[${index}].content`;
    this.setData({
      [_content]: val
    });
  },
  initOps() {
    let cardlist = this.data.cardlist;
    for (let i = 0; i < cardlist.length; i++) {
      if (cardlist[i].status != 2) {
        cardlist.splice(i, 1);
      }
    }
    this.setData({
      cardlist
    });
  },
  choseImage(index) {
    wx.chooseImage({
      count: 1,
      success: res => {
        let tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        this.upload(tempFilePaths[0], url => {
          console.log(url);
          let _content = `cardlist[${index}].content`;
          this.setData({
            [_content]: url
          });
        });
      },
      fail: error => {
        console.log('chooseImage', error);
        this.del(index);
      }
    });
  },
  choseVideo(index) {
    wx.chooseVideo({
      success: res => {
        let tempFilePath = res.tempFilePath;
        this.upload(tempFilePath, url => {
          console.log(url);
          let _content = `cardlist[${index}].content`;
          this.setData({
            [_content]: url
          });
        });
      },
      fail: error => {
        console.log('chose-video', error);
        this.del(index);
      }
    });
  },
  upload(filePath, cb) {
    wx.uploadFile({
      url: app.data.URI + 'upload',
      filePath: filePath,
      name: filePath,
      success: res => {
        console.log(res);
        // console.log(JSON.parse(res.data));
        let url = JSON.parse(res.data).data.url;
        cb && cb(url);
      },
      fail: error => {
        console.log('upload', error);
      }
    });
  },
  created(e) {
    console.log(e);
    let cardlist = this.data.cardlist;
    if (cardlist.length <= 1 && cardlist[0].type == -1) {
      console.log('没东西');
      return;
    }
    let _cardlist = cardlist.filter((item, index, arr) => {
      if (item.status) {
        delete item.status;
      }
      return arr;
    });
    // cardlist = JSON.stringify(_cardlist);
    cardlist = _cardlist;
    console.log('cardlist:', cardlist);
    console.log('制作完成，可以发送');
    let id = this.data.id; // 有 id 携带，则是编辑
    let url = app.data.URI + 'cipher/';
    let method = 'POST';
    if (id) {
      console.log('is editor:', id);
      method = 'PUT';
      url = url + id;
    }
    wx.request({
      url,
      method,
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'X-WX-Flag': 1,
        'X-WX-Skey': this.data.skey
      },
      data: cardlist,
      success: res => {
        console.log(res);
        if (res.data.code != 0) {
          return;
        }
        let num = res.data.data.code;
        wx.showToast({
          title: '制作完成',
          icon: 'success',
          success: () => {
            console.log('num:' + num);
            wx.navigateTo({
              url: '/pages/result/result?num=' + num
            });
          }
        });
      },
      fail: error => {
        console.log('page-create', error);
      }
    });
  }
});