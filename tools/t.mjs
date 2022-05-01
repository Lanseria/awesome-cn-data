import gcoord from 'gcoord';

const loc = gcoord.transform(
  [122.06223,30.112168],    // 经纬度坐标
  gcoord.GCJ02,               // 当前坐标系
  gcoord.WGS84                 // 目标坐标系
);

console.log(loc);
