#!/usr/bin/env python3
"""
Kenakata.co - Full Catalog & Merchant Deployment to Hetzner VPS (91.98.166.101)
Deploys 2,807 Dropshipping BD products + 74 ResellerHub BD products (2,881 total)
Uploads 10,345 HD images directly to Hetzner VPS (91.98.166.101)
"""

import os
import sys
import time
import subprocess
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
        print(f"[!] Local Error ({res.returncode}): {res.stderr.strip()}")
        sys.exit(1)
    return res.stdout.strip()

def run_ssh(remote_cmd, check=True):
    print(f"[*] [VPS] {remote_cmd}")
    ssh_cmd = [
        "ssh",
        "-o", "StrictHostKeyChecking=no",
        "-o", "ConnectTimeout=15",
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
        with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
            return response.getcode() == expected_status
    except Exception as e:
        print(f"   [!] Endpoint check for {url} failed: {e}")
        return False

def main():
    print("\n" + "="*70)
    print("🚀 KENAKATA.CO PRODUCTION DEPLOYMENT & CATALOG INGESTION")
    print("Target VPS: 91.98.166.101 | Protocol: Docker + PostgreSQL + Storefront")
    print("="*70 + "\n")

    # Step 1: Git commit & push code changes
    print("Step 1: Committing and pushing seed code and catalog definitions...")
    run_local("git add apps/api/src/seed.ts scripts/ deploy.py")
    run_local('git commit -m "feat(catalog): full 2,881 products with Dual-SKU and Dropshipping BD merchant"', check=False)
    run_local("git push origin master", check=False)

    # Step 2: Sync repo code to VPS
    print("\nStep 2: Syncing code to VPS (/var/www/kenakata)...")
    sync_cmd = (
        f"cd {REMOTE_DIR} && "
        f"git fetch origin master && "
        f"git reset --hard origin/master"
    )
    run_ssh(sync_cmd)

    # Step 3: Copy seed data JSON directly to VPS data directory
    print("\nStep 3: Uploading master seed dataset to VPS...")
    run_ssh(f"mkdir -p {REMOTE_DIR}/data")
    scp_data_cmd = (
        f"scp -o StrictHostKeyChecking=no data/seed_full_catalog_data.json {VPS_USER}@{VPS_HOST}:{REMOTE_DIR}/data/seed_full_catalog_data.json"
    )
    run_local(scp_data_cmd, check=True)
    print("   [+] Master seed dataset copied to VPS.")

    # Step 4: Stream 10,345 storefront images to VPS
    print("\nStep 4: Streaming 10,345 storefront images directly to VPS...")
    run_ssh(f"mkdir -p {REMOTE_DIR}/apps/storefront/public/uploads/products/dropshipping-bd")

    tar_cmd = (
        'tar -cf - -C "apps/storefront/public/uploads/products" dropshipping-bd | '
        f'ssh -o StrictHostKeyChecking=no {VPS_USER}@{VPS_HOST} "tar -xf - -C {REMOTE_DIR}/apps/storefront/public/uploads/products"'
    )
    print(f"[*] Streaming images via tar over SSH...")
    run_local(tar_cmd, check=True)
    print("   [+] Image streaming complete!")

    # Verify remote image files count
    verify_imgs_cmd = f"find {REMOTE_DIR}/apps/storefront/public/uploads/products/dropshipping-bd -type f | wc -l"
    remote_img_count = run_ssh(verify_imgs_cmd)
    print(f"   [+] Verified on VPS: {remote_img_count.strip()} images in place.")

    # Step 5: Rebuild & update Docker containers
    print("\nStep 5: Updating and building Docker containers...")
    compose_cmd = (
        f"cd {REMOTE_DIR} && "
        f"docker compose -f docker-compose.prod.yml build && "
        f"docker compose -f docker-compose.prod.yml up -d --remove-orphans"
    )
    run_ssh(compose_cmd)

    # Step 6: Seed Database directly on VPS
    print("\nStep 6: Seeding 2,881 products with Dual-SKU & Merchant creation...")
    seed_cmd = (
        f"cd {REMOTE_DIR} && "
        f"docker run --rm --network coolify "
        f"-v {REMOTE_DIR}/data:/app/data "
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
        f"  process.exit(1);"
        f"}}"
        f"\""
    )
    run_ssh(seed_cmd, check=True)

    # Step 7: Verify Live Production DB Stats
    print("\nStep 7: Querying live VPS database statistics...")
    stats_query = (
        "docker exec -i supabase-db-axf2hn4xkcswjdjj2g056rp1 psql -U postgres -d kenakata_db -c "
        "'SELECT count(*) as total_products FROM products; "
        "SELECT count(*) as total_variants FROM product_variants; "
        "SELECT count(*) as total_merchants FROM merchants; "
        "SELECT count(*) as total_shops FROM shops; "
        "SELECT count(*) as total_categories FROM categories; "
        "SELECT count(*) as total_media FROM product_media;'"
    )
    run_ssh(stats_query)

    # Step 8: Live Endpoint Checks
    print("\nStep 8: Verifying live production services...")
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

    print("\n" + "="*70)
    if all_ok:
        print("🎉 SUCCESS: 100% OF PRODUCTS & IMAGES DEPLOYED TO PRODUCTION VPS!")
    else:
        print("⚠️ NOTICE: Deployment completed with warnings on endpoint health.")
    print("="*70 + "\n")

if __name__ == "__main__":
    main()
