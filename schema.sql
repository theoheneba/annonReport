-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create an enum for report categories
CREATE TYPE report_category AS ENUM (
  'Corruption',
  'Fraud',
  'Misconduct',
  'Harassment',
  'Discrimination',
  'Environmental',
  'Other'
);

-- Create an enum for report status
CREATE TYPE report_status AS ENUM (
  'pending',
  'investigating',
  'resolved',
  'closed'
);

-- Create an enum for file types
CREATE TYPE file_type AS ENUM (
  'pdf',
  'image',
  'video'
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category report_category NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  date_of_incident DATE NOT NULL,
  date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status report_status DEFAULT 'pending',
  tracking_id VARCHAR(12) UNIQUE NOT NULL
);

-- Evidence/attachments table
CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES reports(id),
  file_name VARCHAR(255) NOT NULL,
  file_type file_type NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);

-- Updates table
CREATE TABLE IF NOT EXISTS updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL,
  status report_status NOT NULL,
  message TEXT,
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_reports_tracking_id ON reports(tracking_id);
CREATE INDEX idx_attachments_report_id ON attachments(report_id);
CREATE INDEX idx_updates_report_id ON updates(report_id);

