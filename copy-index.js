const fs = require('fs');
const src = 'd:/iflow/黄金市场综合分析.html';
const dst = 'd:/iflow/gold-market-publish/index.html';
fs.copyFileSync(src, dst);
console.log('已复制', src, '->', dst, fs.statSync(dst).size, 'bytes');
