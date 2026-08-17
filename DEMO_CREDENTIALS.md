# Kenakata.co — Live & Local Environment Links & Demo Credentials

> **Document Type:** AI Agent & Developer Reference Guide  
> **Updated:** August 2026  
> **Repository:** Kenakata Commerce Monorepo

---

## 🌐 Application Architecture & Access Points

| Service | Local URL | Live Domain | Description |
| :--- | :--- | :--- | :--- |
| **🛍️ Storefront** | [http://localhost:9000](http://localhost:9000) | [https://kenakata.co](https://kenakata.co) | Customer e-commerce shopping experience & checkout |
| **🛡️ Admin Base** | [http://localhost:9001](http://localhost:9001) | [https://base.kenakata.co](https://base.kenakata.co) | Master administrative portal, KYC verification, order ops |
| **🏪 Merchant Shop** | [http://localhost:9002](http://localhost:9002) | [https://shop.kenakata.co](https://shop.kenakata.co) | Multi-vendor seller onboarding, KYC submission & shop hub |
| **⚡ Commerce API** | [http://localhost:4000/api/v1](http://localhost:4000/api/v1) | `https://api.kenakata.co/api/v1` | Core NestJS backend REST API |
| **📚 Swagger API Docs** | [http://localhost:4000/api/docs](http://localhost:4000/api/docs) | — | OpenAPI interactive API documentation & testing |

---

## 🔐 Demo Accounts & Authentication Credentials

### 1. Super Administrator (Admin Portal)
* **Access Link:** [http://localhost:9001](http://localhost:9001) / [https://base.kenakata.co](https://base.kenakata.co)
* **Email:** `admin@kenakata.co`
* **Password:** `Admin@123456`
* **Role:** `SUPER_ADMIN` (Kenakata Master Admin)
* **Scope:** Unrestricted system access (KYC approval, catalog, inventory, warehouses, orders, promotions, user permissions).

---

### 2. Multi-Vendor Merchant Accounts (Shop Portal)
* **Access Link:** [http://localhost:9002](http://localhost:9002) / [https://shop.kenakata.co](https://shop.kenakata.co)

#### Account A: Approved Active Merchant (Dhaka Tech Hub)
* **Email:** `dhaka.electronics@kenakata.co`
* **Password:** `Shop@123456`
* **Phone:** `+8801711223344`
* **Status:** `APPROVED` (Live & Verified)
* **Scenario:** Verified KYC (Trade License, NID, TIN, Bank Cheque Leaf), active catalog listings, sales dashboard.

#### Account B: Pending Review Merchant (Ctg Lifestyle)
* **Email:** `ctg.fashion@kenakata.co`
* **Password:** `Shop@123456`
* **Phone:** `+8801819988776`
* **Status:** `UNDER_REVIEW`
* **Scenario:** Onboarding KYC completed; awaiting compliance verification from Admin Base.

#### Account C: Rejected / Resubmission Required Merchant (Sylhet Tea & Agro)
* **Email:** `sylhet.organic@kenakata.co`
* **Password:** `Shop@123456`
* **Phone:** `+8801915544332`
* **Status:** `REJECTED`
* **Scenario:** Demonstrates rejection alert with reason: *"Trade License expired on December 31, 2025. Please upload a renewed 2026-2027 valid copy."*

---

### 3. Customer Account (Storefront)
* **Access Link:** [http://localhost:9000](http://localhost:9000) / [https://kenakata.co](https://kenakata.co)
* **Name:** Tanvir Hossain
* **Email:** `customer@kenakata.co` / `tanvir@example.com`
* **Phone:** `+8801712345678`
* **Demo OTP / PIN:** `123456`

---

### 4. Live Order Tracking Demo
* **Order Tracking URL:** [http://localhost:9000/track?orderNumber=KK-2026-89412](http://localhost:9000/track?orderNumber=KK-2026-89412)
* **Order Number:** `KK-2026-89412`
* **Customer Phone:** `+8801712345678`
* **Status:** `IN_TRANSIT` (Assigned to Pathao Express Courier: `PTH-892147`)

---

### 5. Promotional Discount Coupons (Checkout)
* `EID2026` — 15% discount (up to ৳1,500) on minimum order ৳2,000
* `KENAKATA100` — Flat ৳100 off on minimum order ৳1,000
* `FREESHIP` — 100% Free Nationwide Shipping on minimum order ৳1,500

---

## 🛠️ Monorepo CLI Commands

```bash
# Start all 4 applications concurrently
pnpm dev

# Start individual workspaces
pnpm --filter @kenakata/storefront dev   # Storefront on port 9000
pnpm --filter @kenakata/admin dev        # Admin Base on port 9001
pnpm --filter @kenakata/shop dev         # Merchant Shop on port 9002
pnpm --filter @kenakata/api dev          # NestJS API on port 4000

# Database Operations
pnpm db:generate                         # Generate Prisma Client
pnpm db:seed                             # Re-seed database with demo users & catalog
```
