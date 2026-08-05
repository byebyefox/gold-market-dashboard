$env:PATH = "C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;" + $env:PATH
Set-Location "D:\iflow\gold-market-publish"
git config user.email "byebyefox@users.noreply.github.com"
git config user.name "byebyefox"
git add .
git commit -m "gold market dashboard"
gh repo create gold-market-dashboard --public --source=. --push
Write-Host "DONE"
