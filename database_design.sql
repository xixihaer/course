-- 课外课程管理系统数据库设计
-- 创建数据库
CREATE DATABASE IF NOT EXISTS course_management DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE course_management;

-- 用户表
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    real_name VARCHAR(100) NOT NULL COMMENT '真实姓名',
    phone VARCHAR(20) COMMENT '手机号',
    email VARCHAR(100) COMMENT '邮箱',
    avatar VARCHAR(255) COMMENT '头像URL',
    user_type ENUM('STUDENT', 'TEACHER', 'ADMIN', 'INSTITUTION_ADMIN') NOT NULL COMMENT '用户类型',
    status TINYINT DEFAULT 1 COMMENT '状态: 1-正常, 0-禁用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_phone (phone)
) COMMENT '用户表';

-- 学生表
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    student_number VARCHAR(50) COMMENT '学号',
    grade VARCHAR(50) COMMENT '年级',
    school VARCHAR(100) COMMENT '学校',
    parent_name VARCHAR(100) COMMENT '家长姓名',
    parent_phone VARCHAR(20) COMMENT '家长电话',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_id (user_id)
) COMMENT '学生表';

-- 教育机构表
CREATE TABLE institutions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL COMMENT '机构名称',
    description TEXT COMMENT '机构描述',
    address VARCHAR(500) COMMENT '机构地址',
    phone VARCHAR(20) COMMENT '联系电话',
    email VARCHAR(100) COMMENT '邮箱',
    license_number VARCHAR(100) COMMENT '营业执照号',
    website VARCHAR(255) COMMENT '官网',
    logo VARCHAR(255) COMMENT '机构LOGO',
    status TINYINT DEFAULT 1 COMMENT '状态: 1-正常, 0-禁用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
) COMMENT '教育机构表';

-- 机构管理员关联表
CREATE TABLE institution_admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    institution_id BIGINT NOT NULL COMMENT '机构ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    role VARCHAR(50) DEFAULT 'ADMIN' COMMENT '角色',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_institution_user (institution_id, user_id)
) COMMENT '机构管理员关联表';

-- 教师表
CREATE TABLE teachers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    teacher_number VARCHAR(50) COMMENT '教师编号',
    institution_id BIGINT COMMENT '所属机构ID',
    subjects JSON COMMENT '教授科目',
    experience_years INT COMMENT '教学经验年数',
    qualification VARCHAR(255) COMMENT '教学资质',
    introduction TEXT COMMENT '个人简介',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE SET NULL,
    UNIQUE KEY uk_user_id (user_id)
) COMMENT '教师表';

-- 课程表
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL COMMENT '课程名称',
    subject VARCHAR(100) NOT NULL COMMENT '学科',
    description TEXT COMMENT '课程描述',
    teacher_id BIGINT NOT NULL COMMENT '授课教师ID',
    institution_id BIGINT NOT NULL COMMENT '机构ID',
    course_type ENUM('ONE_ON_ONE', 'SMALL_CLASS', 'LARGE_CLASS') NOT NULL COMMENT '课程类型',
    max_students INT DEFAULT 1 COMMENT '最大学生数',
    price DECIMAL(10,2) COMMENT '课程价格',
    duration_minutes INT NOT NULL COMMENT '课程时长(分钟)',
    difficulty_level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') COMMENT '难度等级',
    status TINYINT DEFAULT 1 COMMENT '状态: 1-启用, 0-禁用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    INDEX idx_subject (subject),
    INDEX idx_teacher (teacher_id),
    INDEX idx_institution (institution_id)
) COMMENT '课程表';

-- 上课地点表
CREATE TABLE course_locations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL COMMENT '地点名称',
    address VARCHAR(500) NOT NULL COMMENT '详细地址',
    institution_id BIGINT NOT NULL COMMENT '所属机构ID',
    room_number VARCHAR(50) COMMENT '房间号',
    capacity INT COMMENT '容纳人数',
    facilities JSON COMMENT '设施信息',
    contact_person VARCHAR(100) COMMENT '联系人',
    contact_phone VARCHAR(20) COMMENT '联系电话',
    latitude DECIMAL(10, 6) COMMENT '纬度',
    longitude DECIMAL(10, 6) COMMENT '经度',
    status TINYINT DEFAULT 1 COMMENT '状态: 1-可用, 0-不可用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id),
    INDEX idx_institution (institution_id)
) COMMENT '上课地点表';

-- 课程时间安排表
CREATE TABLE course_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL COMMENT '课程ID',
    location_id BIGINT NOT NULL COMMENT '上课地点ID',
    start_time DATETIME NOT NULL COMMENT '开始时间',
    end_time DATETIME NOT NULL COMMENT '结束时间',
    recurring_type ENUM('ONCE', 'WEEKLY', 'MONTHLY') DEFAULT 'ONCE' COMMENT '重复类型',
    recurring_end_date DATE COMMENT '重复结束日期',
    max_students INT COMMENT '本次课最大学生数',
    current_students INT DEFAULT 0 COMMENT '当前报名学生数',
    status ENUM('SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED') DEFAULT 'SCHEDULED' COMMENT '状态',
    notes TEXT COMMENT '备注',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES course_locations(id),
    INDEX idx_course (course_id),
    INDEX idx_start_time (start_time),
    INDEX idx_status (status)
) COMMENT '课程时间安排表';

-- 学生课程报名表
CREATE TABLE student_enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL COMMENT '学生ID',
    course_id BIGINT NOT NULL COMMENT '课程ID',
    enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '报名时间',
    status ENUM('ACTIVE', 'COMPLETED', 'DROPPED', 'SUSPENDED') DEFAULT 'ACTIVE' COMMENT '状态',
    payment_status ENUM('UNPAID', 'PARTIAL', 'PAID', 'REFUNDED') DEFAULT 'UNPAID' COMMENT '付费状态',
    total_amount DECIMAL(10,2) COMMENT '总费用',
    paid_amount DECIMAL(10,2) DEFAULT 0 COMMENT '已付费用',
    notes TEXT COMMENT '备注',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY uk_student_course (student_id, course_id),
    INDEX idx_student (student_id),
    INDEX idx_course (course_id)
) COMMENT '学生课程报名表';

-- 课程出勤表
CREATE TABLE course_attendances (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    schedule_id BIGINT NOT NULL COMMENT '课程安排ID',
    student_id BIGINT NOT NULL COMMENT '学生ID',
    attendance_status ENUM('PRESENT', 'ABSENT', 'LATE', 'LEAVE_EARLY') DEFAULT 'PRESENT' COMMENT '出勤状态',
    check_in_time DATETIME COMMENT '签到时间',
    check_out_time DATETIME COMMENT '签退时间',
    notes TEXT COMMENT '备注',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (schedule_id) REFERENCES course_schedules(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY uk_schedule_student (schedule_id, student_id),
    INDEX idx_schedule (schedule_id),
    INDEX idx_student (student_id)
) COMMENT '课程出勤表';

-- 作业表
CREATE TABLE assignments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL COMMENT '课程ID',
    schedule_id BIGINT COMMENT '关联的课程安排ID',
    title VARCHAR(200) NOT NULL COMMENT '作业标题',
    description TEXT COMMENT '作业描述',
    content LONGTEXT COMMENT '作业内容',
    attachments JSON COMMENT '附件列表',
    due_date DATETIME COMMENT '截止日期',
    total_score INT DEFAULT 100 COMMENT '总分',
    assignment_type ENUM('HOMEWORK', 'QUIZ', 'PROJECT', 'EXAM') DEFAULT 'HOMEWORK' COMMENT '作业类型',
    difficulty_level ENUM('EASY', 'MEDIUM', 'HARD') DEFAULT 'MEDIUM' COMMENT '难度等级',
    auto_grade TINYINT DEFAULT 0 COMMENT '是否自动评分',
    status TINYINT DEFAULT 1 COMMENT '状态: 1-发布, 0-草稿',
    created_by BIGINT NOT NULL COMMENT '创建者ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (schedule_id) REFERENCES course_schedules(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_course (course_id),
    INDEX idx_due_date (due_date),
    INDEX idx_status (status)
) COMMENT '作业表';

-- 学生作业提交表
CREATE TABLE assignment_submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    assignment_id BIGINT NOT NULL COMMENT '作业ID',
    student_id BIGINT NOT NULL COMMENT '学生ID',
    content LONGTEXT COMMENT '提交内容',
    attachments JSON COMMENT '提交附件',
    submit_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
    status ENUM('SUBMITTED', 'GRADED', 'RETURNED', 'LATE') DEFAULT 'SUBMITTED' COMMENT '状态',
    score INT COMMENT '得分',
    feedback TEXT COMMENT '教师反馈',
    graded_by BIGINT COMMENT '评分教师ID',
    graded_at DATETIME COMMENT '评分时间',
    version INT DEFAULT 1 COMMENT '提交版本',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (graded_by) REFERENCES users(id),
    UNIQUE KEY uk_assignment_student (assignment_id, student_id),
    INDEX idx_assignment (assignment_id),
    INDEX idx_student (student_id),
    INDEX idx_status (status)
) COMMENT '学生作业提交表';

-- 课程反馈表
CREATE TABLE course_feedbacks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL COMMENT '课程ID',
    schedule_id BIGINT COMMENT '具体课程安排ID',
    student_id BIGINT NOT NULL COMMENT '学生ID',
    teacher_id BIGINT NOT NULL COMMENT '教师ID',
    rating INT CHECK (rating >= 1 AND rating <= 5) COMMENT '评分(1-5)',
    content TEXT COMMENT '反馈内容',
    feedback_type ENUM('COURSE_QUALITY', 'TEACHER_PERFORMANCE', 'FACILITY', 'OVERALL', 'SUGGESTION') DEFAULT 'OVERALL' COMMENT '反馈类型',
    tags JSON COMMENT '标签',
    is_anonymous TINYINT DEFAULT 0 COMMENT '是否匿名',
    status ENUM('PENDING', 'REVIEWED', 'REPLIED') DEFAULT 'PENDING' COMMENT '处理状态',
    reply TEXT COMMENT '回复内容',
    replied_by BIGINT COMMENT '回复人ID',
    replied_at DATETIME COMMENT '回复时间',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (schedule_id) REFERENCES course_schedules(id) ON DELETE SET NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (replied_by) REFERENCES users(id),
    INDEX idx_course (course_id),
    INDEX idx_student (student_id),
    INDEX idx_teacher (teacher_id),
    INDEX idx_rating (rating)
) COMMENT '课程反馈表';

-- 系统通知表
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL COMMENT '通知标题',
    content TEXT NOT NULL COMMENT '通知内容',
    notification_type ENUM('SYSTEM', 'COURSE', 'ASSIGNMENT', 'FEEDBACK', 'PAYMENT') NOT NULL COMMENT '通知类型',
    target_type ENUM('ALL', 'ROLE', 'USER', 'COURSE', 'INSTITUTION') NOT NULL COMMENT '目标类型',
    target_id VARCHAR(255) COMMENT '目标ID(用户ID、角色、课程ID等)',
    sender_id BIGINT COMMENT '发送者ID',
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM' COMMENT '优先级',
    scheduled_time DATETIME COMMENT '定时发送时间',
    expires_at DATETIME COMMENT '过期时间',
    attachment_url VARCHAR(255) COMMENT '附件URL',
    action_url VARCHAR(255) COMMENT '操作链接',
    status ENUM('DRAFT', 'SCHEDULED', 'SENT', 'FAILED') DEFAULT 'DRAFT' COMMENT '状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    INDEX idx_target (target_type, target_id),
    INDEX idx_type (notification_type),
    INDEX idx_status (status),
    INDEX idx_scheduled_time (scheduled_time)
) COMMENT '系统通知表';

-- 用户通知状态表
CREATE TABLE user_notification_status (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    notification_id BIGINT NOT NULL COMMENT '通知ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    status ENUM('UNREAD', 'READ', 'DELETED') DEFAULT 'UNREAD' COMMENT '阅读状态',
    read_at DATETIME COMMENT '阅读时间',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (notification_id) REFERENCES notifications(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uk_notification_user (notification_id, user_id),
    INDEX idx_user_status (user_id, status),
    INDEX idx_notification (notification_id)
) COMMENT '用户通知状态表';

-- 系统配置表
CREATE TABLE system_configs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) NOT NULL UNIQUE COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    description VARCHAR(500) COMMENT '配置描述',
    config_type ENUM('STRING', 'NUMBER', 'BOOLEAN', 'JSON') DEFAULT 'STRING' COMMENT '配置类型',
    is_public TINYINT DEFAULT 0 COMMENT '是否公开(前端可访问)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (config_key),
    INDEX idx_public (is_public)
) COMMENT '系统配置表';

-- 操作日志表
CREATE TABLE operation_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT COMMENT '操作用户ID',
    operation_type VARCHAR(50) NOT NULL COMMENT '操作类型',
    target_type VARCHAR(50) COMMENT '操作对象类型',
    target_id VARCHAR(100) COMMENT '操作对象ID',
    operation_desc VARCHAR(500) COMMENT '操作描述',
    request_method VARCHAR(10) COMMENT '请求方法',
    request_url VARCHAR(500) COMMENT '请求URL',
    request_params TEXT COMMENT '请求参数',
    response_result TEXT COMMENT '响应结果',
    ip_address VARCHAR(50) COMMENT 'IP地址',
    user_agent VARCHAR(500) COMMENT '用户代理',
    status ENUM('SUCCESS', 'FAILURE', 'ERROR') DEFAULT 'SUCCESS' COMMENT '操作状态',
    error_message TEXT COMMENT '错误信息',
    execution_time INT COMMENT '执行时间(毫秒)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_type (operation_type),
    INDEX idx_target (target_type, target_id),
    INDEX idx_created_at (created_at)
) COMMENT '操作日志表';

-- 插入初始数据
-- 管理员用户
INSERT INTO users (username, password, real_name, user_type, status) VALUES 
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8ioctKk85jEUsoF8JcKcaOQN.yU5a', '系统管理员', 'ADMIN', 1);

-- 系统配置初始数据
INSERT INTO system_configs (config_key, config_value, description, config_type, is_public) VALUES
('system.name', '课外课程管理系统', '系统名称', 'STRING', 1),
('system.version', '1.0.0', '系统版本', 'STRING', 1),
('course.max_duration', '180', '课程最大时长(分钟)', 'NUMBER', 0),
('notification.email_enabled', 'true', '是否启用邮件通知', 'BOOLEAN', 0),
('notification.sms_enabled', 'true', '是否启用短信通知', 'BOOLEAN', 0);