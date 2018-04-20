import originJSONP from 'jsonp'
/**
 * @param {String} url [地址]
 * @param {Object} data [自己传入的参数]
 * @param {Object} option [jsonp里面的参数]
 */
function jsonp(url, data, option) {
  // 将data传入的参数拼接成字符串
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 转换参数
 * @param {object} data [传入的参数]
 * @returns {string} url [解析后的参数]
 */
function param(data) {
  let url = '';
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
export default jsonp