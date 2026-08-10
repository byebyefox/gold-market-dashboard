$env:PATH = "C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;" + $env:PATH
node d:\iflow\gold-market-publish\copy-index.js
node d:\iflow\gold-market-publish\inline-chart.js
Set-Location d:\iflow\gold-market-publish
git add .
git commit -m "daily update: 2026-08-09"
git push origin
