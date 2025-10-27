# 部署指南

## 生产环境部署

### 服务器环境要求

#### 硬件配置（最低要求）
- CPU: 2核
- 内存: 4GB
- 存储: 50GB
- 网络: 5Mbps带宽

#### 软件环境
- 操作系统: Ubuntu 20.04 LTS / CentOS 8
- JDK: OpenJDK 17
- Node.js: 18.x
- MySQL: 8.0
- Redis: 6.0
- Nginx: 1.18

### 1. 数据库部署

#### MySQL安装配置
```bash
# 安装MySQL
sudo apt update
sudo apt install mysql-server

# 安全配置
sudo mysql_secure_installation

# 创建数据库和用户
mysql -u root -p
CREATE DATABASE course_management DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'course_user'@'%' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON course_management.* TO 'course_user'@'%';
FLUSH PRIVILEGES;
```

#### Redis安装配置
```bash
# 安装Redis
sudo apt install redis-server

# 配置Redis
sudo vim /etc/redis/redis.conf
# 修改以下配置
bind 127.0.0.1
requirepass your_redis_password
maxmemory 512mb
maxmemory-policy allkeys-lru

# 重启Redis
sudo systemctl restart redis-server
```

### 2. 后端部署

#### 构建应用
```bash
cd course-management-backend

# 修改生产环境配置
vim src/main/resources/application-prod.yml

# 构建JAR包
mvn clean package -Pprod
```

#### 生产环境配置
```yaml
# application-prod.yml
server:
  port: 8080

spring:
  profiles:
    active: prod
  datasource:
    url: jdbc:mysql://localhost:3306/course_management?useSSL=true&serverTimezone=Asia/Shanghai
    username: course_user
    password: ${DB_PASSWORD}
  redis:
    host: localhost
    port: 6379
    password: ${REDIS_PASSWORD}

logging:
  level:
    root: WARN
    com.coursemanagement: INFO
  file:
    name: /var/log/course-management/application.log

jwt:
  secret: ${JWT_SECRET}
```

#### 创建系统服务
```bash
# 创建服务用户
sudo useradd -r -s /bin/false course-management

# 创建应用目录
sudo mkdir -p /opt/course-management
sudo mkdir -p /var/log/course-management
sudo chown course-management:course-management /var/log/course-management

# 复制JAR包
sudo cp target/course-management-backend-1.0.0.jar /opt/course-management/
sudo chown course-management:course-management /opt/course-management/course-management-backend-1.0.0.jar

# 创建systemd服务文件
sudo vim /etc/systemd/system/course-management.service
```

```ini
[Unit]
Description=Course Management Backend
After=network.target

[Service]
Type=simple
User=course-management
Group=course-management
WorkingDirectory=/opt/course-management
ExecStart=/usr/bin/java -jar -Dspring.profiles.active=prod course-management-backend-1.0.0.jar
Restart=always
RestartSec=10
Environment=DB_PASSWORD=your_db_password
Environment=REDIS_PASSWORD=your_redis_password
Environment=JWT_SECRET=your_jwt_secret

[Install]
WantedBy=multi-user.target
```

```bash
# 启动服务
sudo systemctl daemon-reload
sudo systemctl enable course-management
sudo systemctl start course-management

# 检查状态
sudo systemctl status course-management
```

### 3. 前端部署

#### Web前端构建
```bash
cd course-management-web

# 安装依赖
npm install

# 修改生产环境配置
vim .env.production
VITE_API_URL=https://your-domain.com/api

# 构建生产版本
npm run build
```

#### Nginx配置
```bash
# 安装Nginx
sudo apt install nginx

# 创建站点配置
sudo vim /etc/nginx/sites-available/course-management
```

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL证书配置
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers on;

    # Web前端
    location / {
        root /var/www/course-management-web;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # 静态文件缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API代理
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
```

```bash
# 复制构建文件
sudo mkdir -p /var/www/course-management-web
sudo cp -r dist/* /var/www/course-management-web/
sudo chown -R www-data:www-data /var/www/course-management-web

# 启用站点
sudo ln -s /etc/nginx/sites-available/course-management /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. 移动端部署

#### App打包发布
```bash
cd course-management-app

# 安装EAS CLI
npm install -g @expo/eas-cli

# 登录Expo账户
eas login

# 配置EAS
eas build:configure

# 构建Android
eas build --platform android --profile production

# 构建iOS
eas build --platform ios --profile production
```

#### 微信小程序发布
1. 使用微信开发者工具打开项目
2. 点击右上角"上传"按钮
3. 填写版本号和项目备注
4. 登录微信公众平台提交审核

### 5. 监控和日志

#### 应用监控
```bash
# 安装监控工具
sudo apt install htop iotop

# 创建监控脚本
vim /opt/course-management/monitor.sh
```

```bash
#!/bin/bash
# 监控脚本
LOGFILE="/var/log/course-management/monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# 检查应用状态
if ! systemctl is-active --quiet course-management; then
    echo "[$DATE] Application is down! Restarting..." >> $LOGFILE
    systemctl restart course-management
fi

# 检查内存使用
MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.2f", $3/$2 * 100.0)}')
if (( $(echo "$MEMORY_USAGE > 80" | bc -l) )); then
    echo "[$DATE] High memory usage: $MEMORY_USAGE%" >> $LOGFILE
fi

# 检查磁盘空间
DISK_USAGE=$(df -h / | awk 'NR==2{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "[$DATE] High disk usage: $DISK_USAGE%" >> $LOGFILE
fi
```

```bash
# 添加到crontab
sudo crontab -e
# 每5分钟执行一次监控
*/5 * * * * /opt/course-management/monitor.sh
```

#### 日志管理
```bash
# 安装logrotate
sudo apt install logrotate

# 配置日志轮转
sudo vim /etc/logrotate.d/course-management
```

```
/var/log/course-management/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 course-management course-management
    postrotate
        systemctl reload course-management
    endscript
}
```

### 6. 备份策略

#### 数据库备份
```bash
# 创建备份脚本
vim /opt/course-management/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/opt/backups/course-management"
DATE=$(date '+%Y%m%d_%H%M%S')
DB_NAME="course_management"
DB_USER="course_user"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 数据库备份
mysqldump -u$DB_USER -p$DB_PASSWORD $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# 压缩备份文件
gzip $BACKUP_DIR/db_backup_$DATE.sql

# 删除7天前的备份
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete

# 上传到云存储（可选）
# aws s3 cp $BACKUP_DIR/db_backup_$DATE.sql.gz s3://your-backup-bucket/
```

```bash
# 添加到定时任务
sudo crontab -e
# 每天凌晨2点执行备份
0 2 * * * /opt/course-management/backup.sh
```

### 7. 安全配置

#### 防火墙设置
```bash
# 安装UFW
sudo apt install ufw

# 配置防火墙规则
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable
```

#### SSL证书配置
```bash
# 使用Let's Encrypt免费证书
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 每月15号检查证书续期
0 3 15 * * certbot renew --quiet
```

### 8. 性能优化

#### JVM优化
```bash
# 修改服务文件
sudo vim /etc/systemd/system/course-management.service

# 在ExecStart中添加JVM参数
ExecStart=/usr/bin/java -Xms1g -Xmx2g -XX:+UseG1GC -XX:+UseStringDeduplication -jar course-management-backend-1.0.0.jar
```

#### 数据库优化
```sql
-- MySQL配置优化
-- 在/etc/mysql/mysql.conf.d/mysqld.cnf中添加
[mysqld]
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
max_connections = 200
query_cache_size = 64M
```

## 故障排除

### 常见问题

1. **应用启动失败**
   ```bash
   # 检查日志
   journalctl -u course-management -f
   ```

2. **数据库连接失败**
   ```bash
   # 检查MySQL状态
   sudo systemctl status mysql
   # 检查网络连接
   telnet localhost 3306
   ```

3. **内存不足**
   ```bash
   # 增加swap空间
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

4. **Nginx配置错误**
   ```bash
   # 测试配置
   sudo nginx -t
   # 重新加载配置
   sudo nginx -s reload
   ```

## 扩展部署

### 集群部署
- 使用负载均衡器（如HAProxy、F5）
- 配置多个应用实例
- 实现数据库读写分离
- 使用Redis集群

### 容器化部署
- Docker容器化
- Kubernetes编排
- 微服务架构迁移

### 云服务部署
- AWS/阿里云/腾讯云
- 使用托管数据库服务
- 配置CDN加速
- 自动扩缩容设置

通过以上部署指南，您可以成功将课外课程管理系统部署到生产环境，并确保系统的稳定性、安全性和高性能运行。