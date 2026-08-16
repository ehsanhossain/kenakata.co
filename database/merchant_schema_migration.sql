-- SQL Migration for Merchant / Shop / KYC / Payouts / Vendor Product Approvals

-- 1. Create Enums
DO $$ BEGIN
  CREATE TYPE "MerchantStatus" AS ENUM ('PENDING_ONBOARDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "BusinessEntityType" AS ENUM ('SOLE_PROPRIETORSHIP', 'PARTNERSHIP', 'PRIVATE_LIMITED', 'INDIVIDUAL');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "KycDocumentType" AS ENUM ('TRADE_LICENSE', 'NID_FRONT', 'NID_BACK', 'TIN_CERTIFICATE', 'BIN_CERTIFICATE', 'BANK_CHEQUE', 'UTILITY_BILL', 'AUTHORIZATION_LETTER');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "KycStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'RESUBMISSION_REQUESTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ProductApprovalStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "PayoutStatus" AS ENUM ('REQUESTED', 'PROCESSING', 'TRANSFERRED', 'FAILED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Create Merchants Table
CREATE TABLE IF NOT EXISTS "merchants" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT UNIQUE NOT NULL,
  "phone" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "password_hash" TEXT NOT NULL,
  "status" "MerchantStatus" NOT NULL DEFAULT 'PENDING_ONBOARDING',
  "commission_rate" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
  "verified_at" TIMESTAMP(3),
  "verified_by" TEXT,
  "rejection_reason" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Shops Table
CREATE TABLE IF NOT EXISTS "shops" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "merchant_id" UUID UNIQUE NOT NULL REFERENCES "merchants"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "description" TEXT,
  "entity_type" "BusinessEntityType" NOT NULL DEFAULT 'SOLE_PROPRIETORSHIP',
  "trade_license_no" TEXT,
  "trade_license_expiry" TIMESTAMP(3),
  "tin_no" TEXT,
  "bin_no" TEXT,
  "nid_no" TEXT,
  "division" TEXT,
  "district" TEXT,
  "upazila" TEXT,
  "full_address" TEXT,
  "pickup_address" TEXT,
  "contact_phone" TEXT,
  "contact_email" TEXT,
  "logo_url" TEXT,
  "banner_url" TEXT,
  "is_verified" BOOLEAN NOT NULL DEFAULT false,
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
  "total_sales_minor" BIGINT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Merchant KYC Documents Table
CREATE TABLE IF NOT EXISTS "merchant_kyc_documents" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "merchant_id" UUID NOT NULL REFERENCES "merchants"("id") ON DELETE CASCADE,
  "shop_id" UUID REFERENCES "shops"("id") ON DELETE SET NULL,
  "document_type" "KycDocumentType" NOT NULL,
  "document_number" TEXT,
  "file_url" TEXT NOT NULL,
  "file_name" TEXT,
  "file_size" INTEGER,
  "mime_type" TEXT,
  "status" "KycStatus" NOT NULL DEFAULT 'PENDING',
  "rejection_reason" TEXT,
  "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "verified_at" TIMESTAMP(3),
  "verified_by" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "idx_merchant_kyc_status" ON "merchant_kyc_documents"("merchant_id", "status");

-- 5. Create Merchant Bank Accounts Table
CREATE TABLE IF NOT EXISTS "merchant_bank_accounts" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "merchant_id" UUID NOT NULL REFERENCES "merchants"("id") ON DELETE CASCADE,
  "shop_id" UUID REFERENCES "shops"("id") ON DELETE SET NULL,
  "account_type" TEXT NOT NULL DEFAULT 'BANK_ACCOUNT',
  "bank_name" TEXT,
  "branch_name" TEXT,
  "routing_number" TEXT,
  "account_holder_name" TEXT,
  "account_number" TEXT,
  "mfs_number" TEXT,
  "is_default" BOOLEAN NOT NULL DEFAULT true,
  "is_verified" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create Merchant Payouts Table
CREATE TABLE IF NOT EXISTS "merchant_payouts" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "merchant_id" UUID NOT NULL REFERENCES "merchants"("id") ON DELETE CASCADE,
  "shop_id" UUID REFERENCES "shops"("id") ON DELETE SET NULL,
  "amount_minor" BIGINT NOT NULL,
  "fee_minor" BIGINT NOT NULL DEFAULT 0,
  "net_amount_minor" BIGINT NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'BDT',
  "status" "PayoutStatus" NOT NULL DEFAULT 'REQUESTED',
  "payment_method" TEXT NOT NULL DEFAULT 'BANK_TRANSFER',
  "destination_info" JSONB,
  "transaction_ref" TEXT,
  "failure_reason" TEXT,
  "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "processed_at" TIMESTAMP(3),
  "processed_by" TEXT
);
CREATE INDEX IF NOT EXISTS "idx_merchant_payouts_status" ON "merchant_payouts"("merchant_id", "status");

-- 7. Add Shop columns to Products table if they do not exist
DO $$ BEGIN
  ALTER TABLE "products" ADD COLUMN "shop_id" UUID REFERENCES "shops"("id") ON DELETE SET NULL;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "products" ADD COLUMN "approval_status" "ProductApprovalStatus" NOT NULL DEFAULT 'APPROVED';
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "products" ADD COLUMN "rejection_reason" TEXT;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "products" ADD COLUMN "approved_at" TIMESTAMP(3);
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "products" ADD COLUMN "approved_by" TEXT;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;
