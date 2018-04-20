import jsonp from 'common/js/jsonp'

const COMMON_PARAMS = {
  loginUin: 0,
  hostUin: 0,
  format: 'jsonp',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq',
  needNewCode: 0
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  const data = Object.assign({}, COMMON_PARAMS, {
    g_tk: 5381,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  })

  return jsonp(url, data, {
    param: 'jsonpCallback',
    prefix: 'MusicJsonCallbacksinger_track'
  });
}