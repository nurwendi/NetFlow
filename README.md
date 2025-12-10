# NetFlow Pro - MikroTik Billing Management System

A comprehensive PPPoE billing and user management system for MikroTik routers with modern UI and advanced features.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20.x-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)

## ✨ Features

### 📊 Dashboard & Monitoring
- ✅ Real-time Dashboard with Statistics
- ✅ Multi-Router Support
- ✅ CPU & Temperature Monitoring (3-day graphs)
- ✅ Traffic Monitoring (7-day graphs)
- ✅ Real-time PPPoE Connection Notifications
- ✅ Active/Offline User Status Tracking

### 👥 User Management
- ✅ PPPoE User Management
- ✅ Customer Data Management (Name, Address, Phone, Email)
- ✅ Profile Management with Bandwidth Limits
- ✅ Agent/Partner & Technician Assignment
- ✅ Customer Portal Dashboard
- ✅ System User Roles (Admin, Partner, Viewer, Customer)

### 💰 Billing System
- ✅ Auto-Generate Monthly Invoices
- ✅ Payment Recording with Receipt
- ✅ WhatsApp Invoice Delivery
- ✅ Multi-Payment Method Support
- ✅ Auto-Drop Unpaid Users
- ✅ Partner Commission Tracking
- ✅ Advanced Payment Reports

### 🔔 Notifications
- ✅ Real-time PPPoE Connection/Disconnection Logs
- ✅ Strict Filtering (Connected/Disconnected only)
- ✅ 100-Log History Limit
- ✅ Date/Time Separation with Smart Display

### 🎨 User Interface
- ✅ Modern Glassmorphism Design
- ✅ Dark Mode Support
- ✅ Theme Customization (Accent Colors)
- ✅ Mobile-Optimized Bottom Dock Navigation
- ✅ Responsive Design for All Devices
- ✅ Bilingual Support (English/Indonesian)

### 🔧 System Features
- ✅ Automatic Daily Backups
- ✅ Scheduled Tasks (Auto-Drop, Invoice Generation)
- ✅ Role-Based Access Control
- ✅ Logo & Company Branding Customization
- ✅ Invoice PDF Generation

## 📋 System Requirements

| Requirement | Minimum |
|-------------|---------|
| OS | Ubuntu 20.04+ / Debian 11+ / Windows 10+ |
| Node.js | 20.x or higher |
| RAM | 1GB |
| Storage | 10GB |
| Network | Access to MikroTik Router via API |

---

## 🚀 Quick Start

### Installation (Ubuntu/Debian)

#### One-Command Install
```bash
cd /root
curl -fsSL https://raw.githubusercontent.com/nurwendi/NetFlow/main/scripts/install.sh | bash
```

#### Manual Installation

**1. Update System & Install Dependencies**
```bash
apt update && apt upgrade -y
apt install -y curl git
```

**2. Install Node.js 20.x**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node -v  # Verify installation
```

**3. Install PM2**
```bash
npm install -g pm2
```

**4. Clone Repository**
```bash
cd /opt
git clone https://github.com/nurwendi/NetFlow.git billing
cd /opt/billing
```

**5. Install Dependencies & Build**
```bash
npm install
npm run build
```

**6. Start Application**
```bash
pm2 start npm --name "billing" -- start
pm2 save
pm2 startup  # Follow instructions to enable auto-start
```

**7. Access Application**
```
http://YOUR_SERVER_IP:3000
```

**Default Login:**
- Username: `admin`
- Password: `admin`

> ⚠️ **Important**: Change the default password immediately after first login!

---

### Installation (Windows)

**1. Install Node.js**
- Download from: https://nodejs.org/ (LTS version 20.x)
- Install and verify: `node -v`

**2. Clone Repository**
```powershell
cd C:\
git clone https://github.com/nurwendi/NetFlow.git netflow
cd netflow
```

**3. Install Dependencies**
```powershell
npm install
```

**4. Run Development Server**
```powershell
npm run dev
```

**5. Access Application**
```
http://localhost:3000
```

---

## ⚙️ Configuration

### MikroTik Router Setup

Enable API access on your MikroTik:
```
/ip service set api address=YOUR_SERVER_IP enabled=yes port=8728
/user add name=billing password=YOUR_PASSWORD group=full
```

### First-Time Setup

1. Login with default credentials (admin/admin)
2. Go to **Connection Settings**
3. Add your MikroTik router:
   - **Host**: Router IP address
   - **Port**: 8728 (default API port)
   - **Username**: billing
   - **Password**: Your MikroTik password
4. Click **Test Connection** to verify
5. Save configuration

### Application Settings

Navigate to **App Settings** to customize:
- Company Name
- Company Logo
- Invoice Footer
- System Language

---

## 🗂️ Data Files

| File | Description |
|------|-------------|
| `config.json` | MikroTik router connections |
| `app-settings.json` | Company name, logo, language |
| `billing-settings.json` | Invoice settings |
| `customer-data.json` | Customer information |
| `data/users.json` | System users (excluded from git) |
| `data/notifications.json` | Connection logs (excluded from git) |
| `data/traffic-history.json` | 7-day traffic data |
| `backups/` | Automatic daily backups |

> **Note**: Sensitive files (users.json, billing data) are excluded from version control via `.gitignore`

---

## ⏰ Scheduled Tasks

| Task | Schedule | Description |
|------|----------|-------------|
| Daily Backup | 00:00 | Backs up all data |
| Auto-Drop | 01:00 | Disconnects users with overdue payments |
| Auto-Invoice | 1st of Month 07:00 | Generates monthly invoices |
| Traffic Collection | Every minute | Collects bandwidth statistics |
| Usage Sync | Every 5 minutes | Syncs user data usage |

---

## 🔧 Management Commands

### PM2 Process Management (Linux)
```bash
pm2 list              # List all processes
pm2 logs billing      # View application logs
pm2 restart billing   # Restart application
pm2 stop billing      # Stop application
pm2 delete billing    # Remove from PM2
pm2 monit             # Monitor resources
```

### Development (Windows/Linux)
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm start             # Start production server
```

---

## 🔄 Update Application

```bash
cd /opt/billing
git pull origin main
npm install
npm run build
pm2 restart billing
```

---

## 🗑️ Uninstallation

### Quick Uninstall (Linux)
```bash
curl -fsSL https://raw.githubusercontent.com/nurwendi/NetFlow/main/scripts/uninstall.sh | bash
```

### Manual Uninstall
```bash
# Stop application
pm2 stop billing
pm2 delete billing
pm2 save

# Backup data (optional)
mkdir -p ~/billing-backup
cp -r /opt/billing/data ~/billing-backup/
cp -r /opt/billing/backups ~/billing-backup/

# Remove application
rm -rf /opt/billing
```

---

## 🌐 Nginx Reverse Proxy (Optional)

To run on port 80 with custom domain:

```bash
apt install nginx -y
nano /etc/nginx/sites-available/billing
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/billing /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## 🐛 Troubleshooting

### Connection Issues

**Cannot Connect to MikroTik**
1. Verify API is enabled: `/ip service print`
2. Check firewall rules allow port 8728
3. Verify credentials in Connection Settings
4. Test from terminal: `telnet ROUTER_IP 8728`

**Login Not Working**
- Clear browser cache and cookies
- Ensure using HTTP (not HTTPS) if no SSL configured
- Check console for errors (F12)

### Performance Issues

**High CPU Usage**
```bash
pm2 restart billing
pm2 logs billing --lines 100
```

**Port Already in Use**
```bash
lsof -i :3000
kill -9 <PID>
pm2 restart billing
```

**PM2 Not Starting on Boot**
```bash
pm2 unstartup
pm2 startup
pm2 save
```

### Database Issues

**Reset to Clean State**
```bash
cd /opt/billing
# Backup first!
cp -r data data-backup
# Clear all database files
rm -rf data/*.json
# Restart application
pm2 restart billing
```

---

## 📖 User Guide

### For Administrators
1. **Add Customers**: Users → Add Customer
2. **Create PPPoE Users**: Sync from MikroTik or create manually
3. **Record Payments**: Billing → Record Payment
4. **Generate Invoices**: Auto-generated monthly or manual
5. **Monitor**: Dashboard shows real-time statistics

### For Partners
- View assigned customers
- Record payments
- View commission earnings
- Access reports

### For Customers
- View usage statistics
- Check payment status
- View invoices
- Restart connection (if enabled)

---

## 🔒 Security Best Practices

1. **Change default password** immediately
2. Use **strong passwords** for all accounts
3. Enable **firewall** on server
4. Run behind **Nginx** with SSL/TLS
5. Regular **backups** to external storage
6. Restrict MikroTik API access to specific IPs
7. Keep Node.js and dependencies **updated**

---

## 📞 Support & Contributing

**Issues & Feature Requests:**  
https://github.com/nurwendi/NetFlow/issues

**Repository:**  
https://github.com/nurwendi/NetFlow

**Contributions welcome!** Feel free to submit pull requests.

---

## 📄 License

MIT License - Free to use and modify for your needs.

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icon Library
- [RouterOS API](https://github.com/joshaven/node-routeros) - MikroTik Integration

---

**Made with ❤️ for ISP Administrators**
