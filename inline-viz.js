const fs = require('fs');

const htmlPath = 'D:/iflow/近一年国内黄金价格可视化.html';
const chartPath = 'D:/iflow/chart.umd.min.js';
const dataPath = 'D:/iflow/gold-chart-data.js';
const outPath = 'D:/iflow/gold-market-publish/gold-viz.html';

let html = fs.readFileSync(htmlPath, 'utf8');
const chartJs = fs.readFileSync(chartPath, 'utf8');
const dataJs = fs.readFileSync(dataPath, 'utf8');

// Replace CDN Chart.js reference
html = html.replace(
  '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>',
  '<script>' + chartJs + '</script>'
);

// Replace gold-chart-data.js reference
html = html.replace(
  '<script src="gold-chart-data.js"></script>',
  '<script>' + dataJs + '</script>'
);

fs.writeFileSync(outPath, html, 'utf8');
console.log('Output size:', fs.statSync(outPath).size, 'bytes');
console.log('Still has CDN ref:', html.includes('cdn.jsdelivr.net'));
console.log('Still has gold-chart-data.js ref:', html.includes('gold-chart-data.js'));
console.log('Has Chart.js inline:', html.includes('Chart.register') || html.includes('chart.umd'));
console.log('Has GOLD data:', html.includes('const GOLD'));
console.log('Title:', html.match(/<title>(.*?)<\/title>/)?.[1]);
