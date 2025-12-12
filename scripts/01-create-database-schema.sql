-- Academic Management System Database Schema

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'student',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id VARCHAR(50) UNIQUE NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(20),
  address VARCHAR(255),
  parent_name VARCHAR(100),
  parent_phone VARCHAR(20),
  enrollment_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teachers Table
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  qualification VARCHAR(255),
  specialization VARCHAR(100),
  joining_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  name_am VARCHAR(255),
  name_om VARCHAR(255),
  description_en TEXT,
  description_ar TEXT,
  teacher_id UUID REFERENCES teachers(id),
  duration_weeks INT,
  max_students INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course Enrollments
CREATE TABLE course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  UNIQUE(student_id, course_id)
);

-- Video Lessons
CREATE TABLE video_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id),
  title_en VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255),
  description_en TEXT,
  description_ar TEXT,
  video_url VARCHAR(500),
  duration_minutes INT,
  order_sequence INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance Records
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  attendance_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'present',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exams Table
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id),
  title_en VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255),
  description TEXT,
  exam_date TIMESTAMP NOT NULL,
  duration_minutes INT NOT NULL,
  total_marks INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam Results
CREATE TABLE exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES exams(id),
  student_id UUID NOT NULL REFERENCES students(id),
  marks_obtained INT,
  percentage DECIMAL(5,2),
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(exam_id, student_id)
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  certificate_number VARCHAR(100) UNIQUE,
  issue_date DATE DEFAULT CURRENT_DATE,
  final_marks INT,
  file_path VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'ETB',
  payment_method VARCHAR(50),
  transaction_ref VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily Reports (Teacher to Admin)
CREATE TABLE daily_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  report_date DATE DEFAULT CURRENT_DATE,
  topic_covered TEXT,
  attendance_count INT,
  issues_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning Summaries (ملخصات)
CREATE TABLE learning_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id),
  title_en VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255),
  content_en TEXT,
  content_ar TEXT,
  file_path VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_enrollment_date ON students(enrollment_date);
CREATE INDEX idx_teachers_user_id ON teachers(user_id);
CREATE INDEX idx_courses_teacher_id ON courses(teacher_id);
CREATE INDEX idx_enrollments_student ON course_enrollments(student_id);
CREATE INDEX idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
CREATE INDEX idx_exams_course ON exams(course_id);
CREATE INDEX idx_results_exam ON exam_results(exam_id);
CREATE INDEX idx_results_student ON exam_results(student_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_reports_date ON daily_reports(report_date);
