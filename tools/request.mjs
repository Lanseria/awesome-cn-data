import CryptoJS from 'crypto-js';
const a = {
  gisLat: 30.263338,
  gisLng: 120.184563,
  levelName: null,
  orgName: "",
  orgType: 1,
  pageNum: 1,
  pageSize: 30,
  serviceStatus: "",
}
const k = {
  sigBytes: 8,
  words: [1280325193, 1381253720]
}
const T = {
  sigBytes: 8,
  words: [16909060, 84281096]
}
const b = JSON.stringify(a)

const c = CryptoJS.enc.Utf8.parse(b)
console.log(c,k,T);
const d = CryptoJS.DES.encrypt(c, k, { iv: T }).toString()

console.log(d);

// 5oJUvuDrOZTed44untDCblBwgngx + EvO0WiUppPglVX78hIxLimertyoRhCvXVTH3o6uUHvjz / u95J4bjNxF7oKFzWLSEU2qPnzD2NGyvafBu5N7VhXHyzMM62v / bQkdseQcRqu6vTaAha683jerDrUcmPXLbZEK / zQqsBsPsls=
