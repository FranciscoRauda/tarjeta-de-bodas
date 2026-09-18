$ErrorActionPreference = "Stop"
Set-Location "d:\Usuarios\Francisco\Documentos\Invitacion boda"

$cred = @"
protocol=https
host=github.com

"@ | git credential fill
$token = ($cred | Select-String "^password=").ToString().Substring(9)
$headers = @{
  Authorization          = "Bearer $token"
  Accept                 = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
  "User-Agent"           = "cursor-agent"
}
$repo = "https://api.github.com/repos/FranciscoRauda/tarjeta-de-bodas"
$triggerPath = ".vercel-deploy-trigger"
$triggerFile = Join-Path (Get-Location) $triggerPath

$stamp = (Get-Date).ToUniversalTime().ToString("o")
Set-Content -Path $triggerFile -Value $stamp -Encoding utf8NoBOM
$bytes = [System.IO.File]::ReadAllBytes($triggerFile)
$b64 = [Convert]::ToBase64String($bytes)

$uri = "$repo/contents/$triggerPath"
$existing = $null
try {
  $existing = Invoke-RestMethod -Headers $headers -Uri $uri
} catch {
  if ($_.Exception.Response.StatusCode.value__ -ne 404) { throw }
}

$body = @{
  message = "chore: trigger Vercel redeploy"
  content = $b64
}
if ($existing) { $body.sha = $existing.sha }

$json = $body | ConvertTo-Json -Compress
$result = Invoke-RestMethod -Method Put -Headers $headers -Uri $uri -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($json))
Write-Host "OK commit -> $($result.commit.sha)"
