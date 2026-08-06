$env:PATH = "C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;" + $env:PATH
gh api repos/byebyefox/gold-market-dashboard/pages -X POST -f "source[branch]=master" -f "source[path]=/"
Write-Host "DONE"
