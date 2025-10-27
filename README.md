# 课外课程管理系统

## 项目简介

课外课程管理系统是一个专业的课外教育管理平台，支持学生、教师、机构管理员等多角色使用。系统提供完整的课程管理、作业管理、反馈管理等功能，并支持Web端、移动端App、微信小程序和H5多端访问。

## 功能特性

### 核心功能
- 🏫 **机构管理** - 教育机构信息管理
- 👥 **用户管理** - 学生、教师、管理员账户管理
- 📚 **课程管理** - 课程信息、时间安排、地点管理
- 📝 **作业管理** - 作业发布、提交、批改
- 💬 **反馈管理** - 课程反馈、评价系统
- 📊 **数据统计** - 学习进度、教学质量分析
- 🔔 **通知系统** - 课程提醒、作业通知

### 多端支持
- 🖥️ **Web管理端** - React + TypeScript + Ant Design
- 📱 **移动端App** - React Native + Expo
- 🔍 **微信小程序** - 原生开发
- 🌐 **H5响应式** - PWA支持

## 技术架构

### 后端技术栈
- **框架**: Spring Boot 3.2.0
- **数据库**: MySQL 8.0 + Redis
- **ORM**: MyBatis Plus
- **安全**: Spring Security + JWT
- **文档**: Knife4j (Swagger)
- **构建**: Maven

### 前端技术栈
- **Web端**: React 18 + TypeScript + Vite + Ant Design
- **移动端**: React Native + Expo + React Native Paper
- **小程序**: 微信原生小程序
- **状态管理**: Zustand + React Query

## 项目结构

```
course-management/
├── course-management-backend/     # 后端项目
│   ├── src/main/java/
│   │   └── com/coursemanagement/
│   │       ├── entity/           # 实体类
│   │       ├── mapper/           # 数据访问层
│   │       ├── service/          # 业务逻辑层
│   │       ├── controller/       # 控制器
│   │       ├── config/           # 配置类
│   │       ├── common/           # 通用组件
│   │       └── utils/            # 工具类
│   └── src/main/resources/
├── course-management-web/         # Web前端
│   ├── src/
│   │   ├── components/           # 组件
│   │   ├── pages/               # 页面
│   │   ├── services/            # API服务
│   │   ├── stores/              # 状态管理
│   │   └── types/               # 类型定义
├── course-management-app/         # 移动端App
│   ├── src/
│   │   ├── screens/             # 屏幕组件
│   │   ├── navigation/          # 导航配置
│   │   ├── services/            # API服务
│   │   └── stores/              # 状态管理
├── course-management-miniprogram/ # 微信小程序
│   ├── pages/                   # 页面
│   ├── components/              # 组件
│   └── utils/                   # 工具函数
└── database_design.sql           # 数据库设计
```

## 数据库设计

### 核心表结构
- **users** - 用户表
- **students** - 学生信息表
- **teachers** - 教师信息表
- **institutions** - 机构表
- **courses** - 课程表
- **course_schedules** - 课程安排表
- **course_locations** - 上课地点表
- **assignments** - 作业表
- **assignment_submissions** - 作业提交表
- **course_feedbacks** - 课程反馈表
- **notifications** - 通知表

## 快速开始

### 环境要求
- JDK 17+
- Node.js 18+
- MySQL 8.0+
- Redis 6.0+

### 后端启动

1. 创建数据库
```sql
CREATE DATABASE course_management DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 执行数据库脚本
```bash
mysql -u root -p course_management < database_design.sql
```

3. 修改配置文件
```yaml
# application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/course_management
    username: your_username
    password: your_password
```

4. 启动后端服务
```bash
cd course-management-backend
mvn clean install
mvn spring-boot:run
```

### Web前端启动

```bash
cd course-management-web
npm install
npm run dev
```

### 移动端App启动

```bash
cd course-management-app
npm install
npx expo start
```

### 微信小程序

1. 使用微信开发者工具打开 `course-management-miniprogram` 目录
2. 配置AppID和服务器域名
3. 编译运行

## API文档

后端启动后访问: http://localhost:8080/api/doc.html

## 默认账户

- **管理员**: admin / admin123
- **教师**: teacher / teacher123
- **学生**: student / student123

## 功能模块详解

### 用户管理
- 支持多角色用户系统
- 用户信息管理和权限控制
- 密码重置和安全设置

### 课程管理
- 课程基本信息维护
- 上课时间和地点安排
- 课程类型（一对一、小班课、大班课）
- 课程难度等级设置

### 作业管理
- 作业发布和截止日期设置
- 学生作业提交和附件支持
- 教师批改和反馈功能
- 作业成绩统计分析

### 反馈管理
- 课程质量评价
- 教师表现反馈
- 匿名反馈支持
- 反馈回复和处理

## 部署说明

### Docker部署

```bash
# 后端
cd course-management-backend
docker build -t course-management-backend .
docker run -p 8080:8080 course-management-backend

# Web前端
cd course-management-web
docker build -t course-management-web .
docker run -p 3000:3000 course-management-web
```

### 生产环境配置

1. **数据库优化**
   - 配置连接池
   - 设置索引优化
   - 定期备份策略

2. **安全配置**
   - HTTPS证书配置
   - JWT密钥管理
   - 接口防护和限流

3. **性能优化**
   - Redis缓存配置
   - 静态资源CDN
   - 数据库读写分离

## 开发指南

### 代码规范
- 遵循阿里巴巴Java开发手册
- 使用ESLint和Prettier格式化代码
- 组件命名采用PascalCase
- 方法命名采用camelCase

### 提交规范
```
feat: 新功能
fix: Bug修复
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试用例
chore: 构建工具或辅助工具变动
```

## 常见问题

### Q: 如何添加新的用户角色？
A: 在UserType枚举中添加新角色，并更新相关权限配置。

### Q: 如何自定义课程类型？
A: 修改CourseType枚举，添加新的课程类型选项。

### Q: 移动端如何处理图片上传？
A: 使用expo-image-picker选择图片，通过multipart/form-data上传到后端。

## 贡献指南

1. Fork项目到个人仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- 项目地址: https://github.com/your-username/course-management
- 问题反馈: https://github.com/your-username/course-management/issues
- 邮箱: dev@coursemanagement.com

## 更新日志

### v1.0.0 (2024-01-01)
- 完成基础架构搭建
- 实现用户管理功能
- 实现课程管理功能
- 实现作业管理功能
- 完成多端适配