-- Create extensions if they don't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables and types if they exist
DROP TABLE IF EXISTS attachments;
DROP TABLE IF EXISTS reports;
DROP TYPE IF EXISTS report_category;
DROP TYPE IF EXISTS report_status;
DROP TYPE IF EXISTS file_type;

-- Create enums
CREATE TYPE report_category AS ENUM (
  'corruption',
  'fraud',
  'misconduct',
  'harassment',
  'discrimination',
  'environmental',
  'other'
);

CREATE TYPE report_status AS ENUM (
  'pending',
  'investigating',
  'resolved',
  'closed'
);

CREATE TYPE file_type AS ENUM (
  'pdf',
  'image',
  'video'
);

-- Create reports table
CREATE TABLE reports (
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

-- Create attachments table
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_type file_type NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_reports_tracking_id ON reports(tracking_id);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_attachments_report_id ON attachments(report_id);

