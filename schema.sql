-- Drop existing enum and table if they exist
DROP TABLE IF EXISTS reports CASCADE;
DROP TYPE IF EXISTS report_category CASCADE;

-- Create an enum for report categories (lowercase)
CREATE TYPE report_category AS ENUM (
  'corruption',
  'fraud',
  'misconduct',
  'harassment',
  'discrimination',
  'environmental',
  'other'
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

