import gcoord from 'gcoord';

const loc = gcoord.transform(
  [121.989156,30.112316],    // 经纬度坐标
  gcoord.GCJ02,               // 当前坐标系
  gcoord.WGS84                 // 目标坐标系
); 

console.log(loc);
