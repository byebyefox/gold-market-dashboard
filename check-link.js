const https = require('https');
https.get('https://byebyefox.github.io/gold-market-dashboard/', (res) => {
  let d = [];
  res.on('data', c => d.push(c));
  res.on('end', () => {
    const s = Buffer.concat(d).toString('utf8');
    console.log('Status:', res.statusCode);
    console.log('Has gold-viz.html link:', s.includes('href="gold-viz.html"'));
    console.log('Has old Chinese link:', s.includes('近一年国内黄金价格可视化.html'));
  });
});
