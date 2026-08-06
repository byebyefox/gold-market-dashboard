const fs = require('fs');
const path = 'D:/iflow/gold-market-publish/index.html';
const chartPath = 'D:/iflow/chart.umd.min.js';

let html = fs.readFileSync(path, 'utf8');
const chartJs = fs.readFileSync(chartPath, 'utf8');

// Find the first <script src="chart.umd.min.js"...> tag
const scriptStartIdx = html.indexOf('<script src="chart.umd.min.js"');
if (scriptStartIdx === -1) {
  console.log('ERROR: Could not find chart.umd.min.js script tag');
  process.exit(1);
}

// Find the closing </script> for this tag
const closeTag = '</script>';
const closeIdx = html.indexOf(closeTag, scriptStartIdx);
if (closeIdx === -1) {
  console.log('ERROR: Could not find closing tag');
  process.exit(1);
}
const afterFirstScript = closeIdx + closeTag.length;

// Now find and remove the two fallback <script>window.Chart||document.write... tags
let removeEnd = afterFirstScript;
for (let i = 0; i < 2; i++) {
  const nextStart = html.indexOf('<script>window.Chart||document.write', removeEnd);
  if (nextStart === -1) break;
  const nextClose = html.indexOf(closeTag, nextStart);
  if (nextClose === -1) break;
  removeEnd = nextClose + closeTag.length;
}

// Remove any whitespace/newline after the last script
while (removeEnd < html.length && (html[removeEnd] === '\n' || html[removeEnd] === '\r')) {
  removeEnd++;
}

// Build new HTML: replace the 3 script tags with inline Chart.js
const newHtml = html.substring(0, scriptStartIdx) 
  + '<script>' + chartJs + '</script>\n' 
  + html.substring(removeEnd);

fs.writeFileSync(path, newHtml, 'utf8');
console.log('Done. Size:', fs.statSync(path).size, 'bytes');
console.log('Contains chart.umd.min.js ref:', newHtml.includes('chart.umd.min.js'));
console.log('Contains Chart.register:', newHtml.includes('Chart.register'));
console.log('First 200 chars of head:', newHtml.substring(newHtml.indexOf('<head>'), newHtml.indexOf('<head>') + 200));
