import fs from 'fs'
import CryptoJS from 'crypto-js';
import gcoord from 'gcoord';
// ky.post('https://nltg.zj12580.cn/client-api/search/getNucleicAcidOrgList', {}).json().then(res => {
//   console.log(res);
// }
// );
// const text = await ky.post('https://nltg.zj12580.cn/client-api/search/getNucleicAcidOrgList',{
//   headers: {
//     Host:"nltg.zj12580.cn",
//     Origin:"https://nltg.zj12580.cn",
//     Referer:"https://nltg.zj12580.cn/webapp/app-mobile/epidMap?chInfo=ch_share__chsub_CopyLink&apshareid=AD8F05C0-090D-4B8B-AD1A-F96D6A4DF792",
//     Cookie: "JSESSIONID=20B53C906EA2AB5594F6DC275B3856E1",
//     channel: 'H5'
//   },
//   json: 'NnLIi4ktGsb24h/vznUck5F56Qb6/qQsFynrgB5/hoRYY7ZT1pagVJ8/kPcBu7QBY+AsGPyn7Xrn+alrV+M5u2DZ5V2A+H7esK+WLNnDGy8nyoGJ4Ao0RWSeLUwB+XWihvpxhNCbm9VuPlurraGVj48M3ojZly0jKYMbgmNYdkVWThpNhegMsPb4J5Hr02ej'
// }).json()

// console.log(text);
const data = fs.readFileSync('./data.txt', 'utf8')
// console.log(data);
// const w = {
//   sigBytes: 8,
//   words: [1278560594, 1414415447]
// }
const w = CryptoJS.enc.Utf8.parse("L5IRTNDW")
// console.log(w);
// const T = {
//   sigBytes: 8,
//   words: [16909060, 84281096]
// }
const T = CryptoJS.enc.Hex.parse("0102030405060708")
// console.log(T);
const i = data.replace(/\s+/g, "")
const base64 = CryptoJS.enc.Base64.parse(i)
// console.log(base64);
let res = CryptoJS.DES.decrypt({
  ciphertext: base64
}, w, {
  iv: T,
  padding: CryptoJS.pad.Pkcs7
}).toString(CryptoJS.enc.Utf8)
const r = JSON.parse(res)
// console.log(r);
// 0 拥挤 1 忙碌 2 空闲 3 休息
const textMap = {
  0: '拥挤', 1: '忙碌', 2: '空闲', 3: '休息'
}
const colorMap = {
  0: '#C24740',
  1: '#F3AE1A',
  2: '#50C240',
  3: '#BEBEBE'
}
const features = r.result.t.data.filter(m => !!m.serviceStatus).map(item => {
  const loc = gcoord.transform(
    [+item.gisLng, +item.gisLat],    // 经纬度坐标
    gcoord.GCJ02,               // 当前坐标系
    gcoord.WGS84                 // 目标坐标系
  );
  return {
    type: 'Feature',
    properties: {
      'ID': item.orgId,
      '名称': item.orgName,
      '详情地址': item.address,
      '联系电话': item.phone,
      '状态': textMap[item.serviceStatus],
      '类型': item.levelName,
      '工作时间': item.workTime,
      "marker-color": colorMap[item.serviceStatus],
      "marker-symbol": "cafe"

    },
    geometry: {
      type: 'Point',
      coordinates: loc
    }
  }
})
const geoJson = {
  type: "FeatureCollection",
  features
}
fs.writeFileSync('../hangzhou.geojson', JSON.stringify(geoJson, null, 2))
fs.writeFileSync('./data.json', JSON.stringify(r.result.t.data, null, 2))
