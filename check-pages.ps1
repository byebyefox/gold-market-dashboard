$env:PATH = "C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;" + $env:PATH
gh api repos/byebyefox/gold-market-dashboard/pages
Write-Host "---"
gh api repos/byebyefox/gold-market-dashboard/pages/builds --jq ".[0]"
