#!/usr/bin/env python3
"""
Kenakata.co Direct VPS Production Deployment Script
Zero Coolify Dependency — Pure Docker + Traefik on Hetzner VPS (91.98.166.101)
"""

import subprocess
import sys
import time
import urllib.request
import urllib.error
import ssl

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

VPS_HOST = "91.98.166.101"
VPS_USER = "root"
REMOTE_DIR = "/var/www/kenakata"

def run_local(cmd, check=True):
    print(f"[*] [Local] {cmd}")
    res = subprocess.run(cmd, shell=True, text=True, capture_output=True, encoding='utf-8', errors='replace')
    if res.returncode != 0 and check:
        print(f"[!] Error ({res.returncode}): {res.stderr.strip()}")
        sys.exit(1)
    return res.stdout.strip()

def run_ssh(remote_cmd, check=True):
    print(f"[*] [VPS] {remote_cmd}")
    ssh_cmd = [
        "ssh",
        "-o", "StrictHostKeyChecking=no",
        "-o", "ConnectTimeout=10",
        f"{VPS_USER}@{VPS_HOST}",
        remote_cmd
    ]
    res = subprocess.run(ssh_cmd, text=True, capture_output=True, encoding='utf-8', errors='replace')
    if res.stdout:
        print(res.stdout)
    if res.returncode != 0 and check:
        print(f"[!] SSH Error ({res.returncode}): {res.stderr.strip()}")
        sys.exit(1)
    return res.stdout.strip()

def check_endpoint(url, expected_status=200):
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "KenakataDeployBot/1.0"}
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            return response.getcode() == expected_status
    except Exception as e:
        print(f"   [!] Endpoint check for {url} failed: {e}")
        return False

def main():
    print("\n" + "="*60)
    print("KENAKATA.CO DIRECT VPS PRODUCTION DEPLOYMENT")
    print("Target VPS: 91.98.166.101 | Protocol: Docker + Traefik")
    print("="*60 + "\n")

    # Step 1: Ensure code is pushed
    print("Step 1: Checking git status & pushing master...")
    status = run_local("git status -s", check=False)
    if status:
        print("   Found unstaged / uncommitted changes, committing...")
        run_local("git add .")
        run_local('git commit -m "deploy: direct VPS deployment update"', check=False)
    
    print("   Pushing to origin master...")
    run_local("git push origin master", check=False)

    # Step 2: Ensure VPS directory exists & fetch code
    print("\nStep 2: Syncing code to VPS (/var/www/kenakata)...")
    sync_cmd = (
        f"if [ ! -d {REMOTE_DIR} ]; then "
        f"git clone https://github.com/ehsanhossain/kenakata.co.git {REMOTE_DIR}; "
        f"fi && cd {REMOTE_DIR} && "
        f"git fetch origin master && "
        f"git reset --hard origin/master"
    )
    run_ssh(sync_cmd)

    # Step 3: Build & deploy containers
    print("\nStep 3: Building & starting production Docker containers...")
    deploy_cmd = (
        f"cd {REMOTE_DIR} && "
        f"docker compose -f docker-compose.prod.yml build && "
        f"docker compose -f docker-compose.prod.yml up -d --remove-orphans"
    )
    run_ssh(deploy_cmd)

    # Step 4: Seed Database
    print("\nStep 4: Seeding production database (ResellerHub BD verified catalog)...")
    seed_cmd = (
        f"cd {REMOTE_DIR} && "
        f"docker run --rm --network coolify "
        f"-e DATABASE_URL='postgresql://postgres:Rf9R1QaaYCjQJ9gWlSSuwUxJjImJY1sw@supabase-db:5432/kenakata_db?schema=public' "
        f"kenakata-admin:latest "
        f"node -e \""
        f"console.log('Seeding DB directly from container...');"
        f"const {{ execSync }} = require('child_process');"
        f"try {{"
        f"  execSync('pnpm prisma db push --schema=database/schema.prisma --accept-data-loss', {{ stdio: 'inherit' }});"
        f"  execSync('pnpm tsx apps/api/src/seed.ts', {{ stdio: 'inherit' }});"
        f"}} catch(e) {{"
        f"  console.error(e.message);"
        f"}}"
        f"\""
    )
    run_ssh(seed_cmd, check=False)

    # Step 5: Verification
    print("\nStep 5: Verifying live production services...")
    time.sleep(3)
    
    endpoints = [
        ("Storefront", "https://kenakata.co"),
        ("Admin Console", "https://base.kenakata.co"),
        ("Merchant Portal", "https://shop.kenakata.co"),
    ]

    all_ok = True
    for name, url in endpoints:
        ok = check_endpoint(url)
        status_symbol = "[OK]" if ok else "[FAIL]"
        print(f"   {status_symbol} {name}: {url}")
        if not ok:
            all_ok = False

    print("\n" + "="*60)
    if all_ok:
        print("SUCCESS: DEPLOYMENT COMPLETED WITH DIRECT VPS SETUP!")
    else:
        print("WARNING: Deployment finished with some warnings (check endpoint logs above).")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()
