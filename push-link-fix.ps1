$env:PATH = "C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;" + $env:PATH
Set-Location "D:\iflow\gold-market-publish"
git add index.html
git commit -m "fix: link to gold-viz.html instead of Chinese filename"
git push
Write-Host "DONE"
