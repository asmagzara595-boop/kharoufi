$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$taskNode = Get-Command node -ErrorAction SilentlyContinue
if ($taskNode) {
    $taskNodePath = $taskNode.Source
} else {
    $taskNodePath = 'C:\Users\asmag\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
}
if (-not (Test-Path -LiteralPath $taskNodePath)) { throw 'Install Node.js 20.9 or later, then run npm install and npm run dev.' }
$env:PATH = (Split-Path -Parent $taskNodePath) + ';' + $env:PATH
$env:NEXT_TELEMETRY_DISABLED = '1'
& $taskNodePath 'node_modules\next\dist\bin\next' dev --hostname 127.0.0.1 --port 3000
