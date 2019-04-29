const URI = 'https://api.egooidea.com/ningdian/'
const appId = 'assdfsfds43543sfsfd'

const get = (url, params, cb) => {
  params.token = wx.getStorageSync('token') || ''
  params.appId = appId
  // wx.showToast({
  //   title: '数据加载中...',
  //   icon: 'loading',
  //   duration: 2000
  // })
  console.log('数据加载中...')
  wx.request({
    url: URI + url,
    data: params,
    success: (res) => {
      wx.hideToast()
      const data = res.data
      cb && cb(data)
    }
  })
}
const post = (url, params, cb) => {
  // 
}
const upload = (url, params, cb) => {
  // 
}

export default {
  get: get,
  post: post,
  upload: upload
}

// 模块导出
/**
 * import api from '../../utils/api'
 * api.get('getInfo/', {page: 1}, (res) => {
 *  console.log({res})
 * })
 */
