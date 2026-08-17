# Global Agent Rules

## Strict Deployment & Version Control Rules
**CRITICAL:** Under no circumstances should the agent perform a `git push` or push code to any deployment environment (Dev/Prod) without an explicit, manual command from the user. 
- You may commit code locally using `git commit`.
- You may `git pull` or `git fetch`.
- You MUST NOT run `git push`.
- You MUST NOT run deployment scripts to VPS or Vercel/Netlify unless the user explicitly types a command authorizing it.

## Out-of-Scope Directories — DO NOT TOUCH
**CRITICAL:** The following directories are entirely out of scope for AI agents. Never read, edit, or run code from these paths under any circumstances:
- `c:\Code Projects\tcgworkspace-takahashi\` — This is a separate branch/fork owned by a different team member (Takahashi-san). Any changes there must be made manually by that team member.
- `c:\Code Projects\Attendance System\Backup\` — These are historical backups. Never edit backup files.

When performing grep/search tasks, explicitly exclude these directories.
