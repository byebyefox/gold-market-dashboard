$env:PATH = "C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;" + $env:PATH
Copy-Item d:\iflow\黄金市场综合分析.html d:\iflow\gold-market-publish\index.html -Force
node d:\iflow\gold-market-publish\inline-chart.js
Set-Location d:\iflow\gold-market-publish
git add .
git commit -m "daily update: 2026-08-09"
git push origin
