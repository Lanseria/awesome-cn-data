import gcoord from 'gcoord';

const loc = gcoord.transform(
  [122.154771,30.067237],    // 经纬度坐标
  gcoord.GCJ02,               // 当前坐标系
  gcoord.WGS84                 // 目标坐标系
);

console.log(loc);
