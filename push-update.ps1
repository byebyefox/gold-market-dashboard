$env:PATH = "C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;" + $env:PATH
Set-Location "D:\iflow\gold-market-publish"
git add index.html
git commit -m "inline Chart.js for mobile compatibility"
git push
Write-Host "DONE"
