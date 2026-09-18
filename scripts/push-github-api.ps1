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
$root = (Get-Location).Path

function Upload-Blob([byte[]]$bytes) {
  $b64 = [Convert]::ToBase64String($bytes)
  $body = @{ content = $b64; encoding = "base64" } | ConvertTo-Json -Compress
  $blob = Invoke-RestMethod -Method Post -Headers $headers -Uri "$repo/git/blobs" -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
  return $blob.sha
}

$parentCommit = Invoke-RestMethod -Headers $headers -Uri "$repo/commits/main"
$parentSha = $parentCommit.sha
$baseTree = $parentCommit.commit.tree.sha
Write-Host "parent: $parentSha"

$files = git ls-tree -r --name-only HEAD
$treeItems = New-Object System.Collections.Generic.List[object]
foreach ($rel in $files) {
  $full = Join-Path $root ($rel -replace "/", [IO.Path]::DirectorySeparatorChar)
  if (-not (Test-Path $full)) { continue }
  $bytes = [System.IO.File]::ReadAllBytes($full)
  $blobSha = Upload-Blob $bytes
  $treeItems.Add(@{ path = $rel; mode = "100644"; type = "blob"; sha = $blobSha }) | Out-Null
  Write-Host "  $rel"
}

$treeBody = @{ base_tree = $baseTree; tree = $treeItems } | ConvertTo-Json -Depth 6 -Compress
$newTree = Invoke-RestMethod -Method Post -Headers $headers -Uri "$repo/git/trees" -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($treeBody))

$message = (git log -1 --format=%B | Out-String).TrimEnd("`r", "`n")
$commitBody = @{
  message = [string]$message
  parents = @($parentSha)
  tree    = $newTree.sha
} | ConvertTo-Json -Depth 4 -Compress
$newCommit = Invoke-RestMethod -Method Post -Headers $headers -Uri "$repo/git/commits" -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($commitBody))

$refBody = @{ sha = $newCommit.sha; force = $false } | ConvertTo-Json -Compress
Invoke-RestMethod -Method Patch -Headers $headers -Uri "$repo/git/refs/heads/main" -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($refBody)) | Out-Null
Write-Host "OK main -> $($newCommit.sha)"
