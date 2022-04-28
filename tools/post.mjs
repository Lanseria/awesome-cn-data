import { promisify } from 'node:util';
import stream from 'node:stream';
import fs from 'node:fs';
import got from 'got';

const pipeline = promisify(stream.pipeline);

await pipeline(
  got.stream('https://nltg.zj12580.cn/client-api/search/getNucleicAcidOrgList', {
    method: 'POST',
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "ali-version": "7.6.15",
      "channel": "H5",
      "content-type": "application/json; charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-resp-encrypt": "1",
      "cookie": "JSESSIONID=1B3995FEAAEB117BC67A57AB79900CC5",
      "Referer": "https://nltg.zj12580.cn/webapp/app-mobile/epidMap?chInfo=ch_share__chsub_CopyLink&apshareid=AD8F05C0-090D-4B8B-AD1A-F96D6A4DF792",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    body: "NnLIi4ktGsb24h/vznUck5F56Qb6/qQsFynrgB5/hoRYY7ZT1pagVJ8/kPcBu7QBY+AsGPyn7Xrn+alrV+M5u2DZ5V2A+H7esK+WLNnDGy8nyoGJ4Ao0RWSeLUwB+XWihvpxhNCbm9VuPlurraGVj48M3ojZly0jKYMbgmNYdkVWThpNhegMsPb4J5Hr02ej",
  }),
  fs.createWriteStream('data.txt')
);
