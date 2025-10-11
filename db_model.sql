-- db_model.sql - PostgreSQL Database Schema for Briefing Generation System

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Define ENUM types for structured data
CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'expired');
CREATE TYPE briefing_status AS ENUM ('draft', 'completed', 'failed');

-- Table for Users
-- Stores user account information, credentials, and role.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'user',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for Subscription Plans
-- Defines the different pricing tiers available.
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    price_monthly NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    price_yearly NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    briefing_credits_per_month INT NOT NULL DEFAULT 5,
    features JSONB, -- e.g., {"support": "standard", "max_length": 500}
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for User Subscriptions
-- Links users to a specific plan and tracks their subscription status.
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    status subscription_status NOT NULL DEFAULT 'active',
    start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    remaining_credits INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for Briefings
-- Stores the inputs and generated content for each briefing.
CREATE TABLE briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    -- Inputs from the user
    -- project_goals TEXT,
    -- target_audience TEXT,
    -- key_message TEXT,
    -- tone_of_voice VARCHAR(100),
    -- Generated output
    generated_content TEXT,
    status briefing_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_briefings_user_id ON briefings(user_id);

-- Trigger to automatically update the `updated_at` timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_briefings_updated_at
BEFORE UPDATE ON briefings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Optional: Insert a default free/basic plan for new users
-- INSERT INTO plans (id, name, price_monthly, briefing_credits_per_month, is_active)
-- VALUES ('00000000-0000-0000-0000-000000000001', 'Free', 0.00, 3, TRUE)
-- ON CONFLICT (id) DO NOTHING;

SELECT * from users;

INSERT INTO users (name, email, password)
VALUES ('Gabriel', 'gabriel@email.com', 'gabriel@123')

SELECT column_name FROM information_schema.columns WHERE table_name = 'users';