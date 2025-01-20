CREATE TABLE reports (
    id VARCHAR(36) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    date_submitted DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'investigating', 'resolved', 'closed') DEFAULT 'pending',
    tracking_id VARCHAR(12) UNIQUE NOT NULL
);

CREATE TABLE updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id VARCHAR(36),
    status ENUM('pending', 'investigating', 'resolved', 'closed'),
    message TEXT,
    date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id)
);

