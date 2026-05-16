<div align="center">

# ⚡ TaskFlow — Team Task Manager

**A full-stack, role-based team task management platform with a stunning dark neon UI**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://your-app.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-AdiJ0007-181717?style=for-the-badge&logo=github)](https://github.com/AdiJ0007/TEAM-TASK-MANAGER)
[![Docker](https://img.shields.io/badge/Docker-yash725-2496ED?style=for-the-badge&logo=docker)](https://hub.docker.com/u/yash725)

</div>

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Email/Password signup and login with **JWT**
- **Google OAuth 2.0** single sign-on
- **Role-Based Access Control (RBAC)** — `Admin` and `Member` roles
- Secure admin registration with a secret key

### 📁 Project Management
- Create, view, and delete projects (Admin only)
- Add team members to projects by email
- Full member list with progress tracking

### ✅ Task Management
- Create tasks with title, description, priority (`Low`/`Medium`/`High`), due date, and assignee
- **Kanban Board** with columns: `Todo` → `In Progress` → `Review` → `Done`
- Task comments with real-time notification triggers
- Overdue task highlighting

### 📊 Dashboard
- Stats overview: Total Projects, Tasks Completed, In Progress, Overdue
- Recent project quick-access cards

### 🔔 Notifications
- In-app notification bell with unread count badge
- Notifications for: task assignment, status updates, comments
- Auto-polls every 30 seconds

### 👥 Team Management
- View all team members (Admin view: all users; Member view: project members)
- Member progress tracker with per-project task stats

### 🎨 UI/UX
- **Forced dark theme** with deep near-black background
- **Neon glassmorphism** — colored border glow per card type (purple, cyan, pink, green)
- **5 varied font families** for different UI elements:
  - `Orbitron` — Brand/Logo
  - `Space Grotesk` — Page & section headings
  - `JetBrains Mono` — Statistics & numbers
  - `Rajdhani` — Badges, labels & buttons
  - `Inter` — Body & description text
- Smooth Framer Motion animations throughout

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, TailwindCSS v3, Redux Toolkit, Framer Motion |
| **Backend** | Node.js, Express.js 5 |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JWT, bcryptjs, Passport.js + Google OAuth 2.0 |
| **Deployment** | Vercel (frontend + serverless API) |
| **Container** | Docker + Docker Compose |

---

## 📦 Project Structure

```
TEAM-TASK-MANAGER/
├── api/
│   └── index.js              # Vercel serverless entry point
├── backend/
│   ├── app.js                # Express app (routes, middleware)
│   ├── server.js             # Node server (listen)
│   ├── config/passport.js    # Google OAuth config
│   ├── controllers/          # Business logic
│   ├── middleware/           # JWT auth middleware
│   ├── models/               # Mongoose schemas
│   └── routes/               # Express route definitions
├── frontend/
│   ├── src/
│   │   ├── components/       # Layout, TaskDrawer, Notifications
│   │   ├── pages/            # Dashboard, Login, Signup, Projects...
│   │   ├── store/            # Redux slices (auth, project, notifications)
│   │   └── index.css         # Design system (dark theme + neon)
│   └── tailwind.config.js
├── Dockerfile                # Multi-stage Docker build
├── docker-compose.yml        # App + MongoDB services
└── vercel.json               # Vercel deployment config
```

---

## 🔑 Environment Variables

Create a `.env` file in the **project root** (or `backend/` for local dev):

```env
# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/taskflow

# JWT signing secret (use a long random string)
JWT_SECRET=your_super_secret_jwt_key

# Server port
PORT=5000

# Node environment
NODE_ENV=production

# Google OAuth (optional — email/password works without this)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Admin registration secret key
ADMIN_SECRET_KEY=TASK_ADMIN_2026
```

> **Admin Key**: Use `TASK_ADMIN_2026` on the Signup page to register as Admin.

---

## 🌐 Deployment — Vercel

### Prerequisites
- [Vercel account](https://vercel.com) + Vercel CLI: `npm i -g vercel`
- [MongoDB Atlas](https://cloud.mongodb.com) free cluster

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/AdiJ0007/TEAM-TASK-MANAGER.git
cd TEAM-TASK-MANAGER

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod
```

### Environment Variables on Vercel
In the Vercel dashboard → Project → Settings → Environment Variables, add:

| Variable | Value |
|---|---|
| `MONGO_URI` | Your MongoDB Atlas URI |
| `JWT_SECRET` | A long random secret |
| `ADMIN_SECRET_KEY` | `TASK_ADMIN_2026` |
| `NODE_ENV` | `production` |
| `GOOGLE_CLIENT_ID` | *(optional)* |
| `GOOGLE_CLIENT_SECRET` | *(optional)* |

---

## 🐳 Docker — Local Development

> Docker user: **yash725**

### Quick Start

```bash
# 1. Clone and enter directory
git clone https://github.com/AdiJ0007/TEAM-TASK-MANAGER.git
cd TEAM-TASK-MANAGER

# 2. Copy env file
cp .env.example .env
# Edit .env and set your MONGO_URI or use the local MongoDB in compose

# 3. Start with Docker Compose
docker compose up --build

# App will be available at http://localhost:5000
```

### Build Image Manually

```bash
# Build
docker build -t yash725/taskflow:latest .

# Run (with external MongoDB)
docker run -p 5000:5000 \
  -e MONGO_URI="mongodb+srv://..." \
  -e JWT_SECRET="your_secret" \
  -e ADMIN_SECRET_KEY="TASK_ADMIN_2026" \
  -e NODE_ENV=production \
  yash725/taskflow:latest
```

### Docker Compose Services

| Service | Port | Description |
|---|---|---|
| `app` | `5000` | Node.js backend + React frontend |
| `mongo` | `27017` | MongoDB 7 database |

---

## 💻 Local Development (No Docker)

```bash
# Clone
git clone https://github.com/AdiJ0007/TEAM-TASK-MANAGER.git
cd TEAM-TASK-MANAGER

# Install all dependencies
npm install
npm install --prefix backend
npm install --prefix frontend

# Create backend .env
cp .env.example backend/.env
# Fill in MONGO_URI and JWT_SECRET

# Run both dev servers concurrently
npm run dev
# Frontend: http://localhost:5173
# Backend:  http://localhost:5000
```

---

## 🔌 API Reference

All endpoints prefixed with `/api/` and protected with `Authorization: Bearer <token>` unless noted.

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user |
| `POST` | `/api/auth/login` | Public | Login, returns JWT |
| `GET` | `/api/auth/me` | Required | Get current user |
| `PUT` | `/api/auth/upgrade` | Required | Upgrade to Admin |
| `DELETE` | `/api/auth/delete` | Required | Delete account |
| `GET` | `/api/auth/google` | Public | Google OAuth |

### Projects
| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/projects` | Any | List my projects |
| `POST` | `/api/projects` | Admin | Create project |
| `GET` | `/api/projects/:id` | Member | Get project details |
| `DELETE` | `/api/projects/:id` | Admin | Delete project |
| `POST` | `/api/projects/:id/members` | Admin | Add member by email |
| `GET` | `/api/projects/:id/members/:memberId/progress` | Member | Member progress stats |

### Tasks
| Method | Endpoint | Role | Description |
|---|---|---|---|
| `POST` | `/api/tasks` | Admin/Creator | Create task |
| `GET` | `/api/tasks/project/:projectId` | Member | List tasks |
| `PUT` | `/api/tasks/:id` | Admin/Assignee/Creator | Update task |
| `DELETE` | `/api/tasks/:id` | Admin | Delete task |
| `POST` | `/api/tasks/:id/comments` | Member | Add comment |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/stats` | Get dashboard statistics |

### Notifications
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/notifications` | Get my notifications |
| `PUT` | `/api/notifications/:id/read` | Mark as read |
| `PUT` | `/api/notifications/read-all` | Mark all as read |

---

## 🛡 Role-Based Access Control

| Action | Admin | Member |
|---|---|---|
| Create project | ✅ | ❌ |
| Delete project | ✅ | ❌ |
| Add project member | ✅ | ❌ |
| Create task | ✅ | ✅ (if project creator) |
| Delete task | ✅ | ❌ |
| Update task status | ✅ | ✅ (if assigned) |
| View all projects | ✅ | ❌ (own projects only) |
| Add comment | ✅ | ✅ (if project member) |

---

## 📸 Screenshots

> Screenshots will be added after live deployment.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with ⚡ by <strong>AdiJ0007</strong> | Docker by <strong>yash725</strong>
</div>
