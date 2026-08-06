$env:PATH = "C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;" + $env:PATH
Set-Location "D:\iflow\gold-market-publish"
git add index.html
git commit -m "fix: inline Chart.js with proper UTF-8 encoding"
git push
Write-Host "DONE"
