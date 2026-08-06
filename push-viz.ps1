$env:PATH = "C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;" + $env:PATH
Set-Location "D:\iflow\gold-market-publish"
git add gold-viz.html
git commit -m "add gold price visualization page (inline Chart.js + data)"
git push
Write-Host "DONE"
