---
description: Run entire TCG Workspace without interruptions
---
// turbo-all

# TCG Workspace One-Shot Startup 🚀

> [!CAUTION]
> **STRICT RULE**: Do NOT push to any deployment environment (Dev/Prod) and do NOT perform any `git push` without explicit, manual command from the user.


This workflow efficiently stops hanging nodes, brings up the local database, waits for connection readiness, and spins up the backend, frontend, and mobile environments in parallel.

1. Clean Processes and Start Database
```powershell
Get-Process node, npm, python, cmd -ErrorAction SilentlyContinue | Where-Object { $_.Path -notmatch "antigravity|VSCode|cursor|Code|tabnine" } | Stop-Process -Force -ErrorAction SilentlyContinue
docker-compose up -d db
Write-Host "Waiting 8 seconds for Local PostgreSQL Boot Sequence..."
Start-Sleep -Seconds 8
```

2. Start ZK Device Bridge (Port 9052)
```powershell
Start-Process python -ArgumentList "app.py" -WorkingDirectory "bridge" -WindowStyle Minimized
```

3. Start Express Backend (Port 9051)
```powershell
Start-Process node -ArgumentList "index.js" -WorkingDirectory "server" -WindowStyle Normal
```

4. Start Vite Web App (Port 9050)
```powershell
Start-Process cmd -ArgumentList "/k npm run dev" -WorkingDirectory "web" -WindowStyle Normal
```

5. Start Mobile Expo App (Port 8081)
```powershell
Start-Process cmd -ArgumentList "/k npm start" -WorkingDirectory "mobile" -WindowStyle Normal
```
