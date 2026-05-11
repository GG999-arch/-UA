# 🏡 СусідUA — Roommate Finder Platform

A full-stack MERN roommate finder platform for Ukraine.

## Tech Stack
- **Frontend**: React 18, React Router v6, Socket.IO Client, Axios
- **Backend**: Node.js, Express, Socket.IO, Multer
- **Database**: MongoDB with Mongoose
- **Auth**: JWT (30-day tokens), bcrypt password hashing

---

## Quick Start

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Configure environment
```bash
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret
```

### 3. Run development servers
```bash
npm run dev
# Client: http://localhost:3000
# Server: http://localhost:5000
```

---

## Project Structure

```
susidua/
├── client/                  # React Frontend
│   ├── public/
│   │   └── index.html
│   │   mainbanner.jpg
│   │   step1.jpg – step5.jpg
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx + .css
│       │   ├── AdCard.jsx + .css
│       │   └── Footer.jsx + .css
│       ├── context/
│       │   └── AuthContext.jsx   # JWT auth state
│       ├── pages/
│       │   ├── HomePage.jsx + .css      # Hero + listings
│       │   ├── AdsPage.jsx + .css       # Listings with sidebar filters
│       │   ├── AdDetailPage.jsx         # Single ad view
│       │   ├── CreateAdPage.jsx + .css  # Post an ad
│       │   ├── HowItWorksPage.jsx + .css
│       │   ├── ChatPage.jsx + .css      # Real-time chat
│       │   ├── AuthPage.jsx + .css      # Login/Register combined
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── ProfilePage.jsx + .css   # User profile
│       │   ├── RoommatesPage.jsx        # Roommate search
│       │   ├── ContactPage.jsx
│       │   ├── CookiePage.jsx
│       │   ├── PrivacyPage.jsx
│       │   ├── SafetyPage.jsx
│       │   ├── TermsPage.jsx
│       │   └── TipsPage.jsx
│       ├── utils/
│       │   └── api.js            # Axios API helpers
│       ├── App.jsx               # Routes
│       └── index.css             # Design system
│   ├── craco.config.js
│   ├── package.json
│   └── package-lock.json
│
├── server/                  # Node.js Backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Ad.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── ads.js
│   │   ├── messages.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js           # JWT protect middleware
│   └── index.js              # Express entry point
│
├── .env
├── .gitignore
├── package.json
└── README.md

```

---

## API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET  | /api/auth/me | Get current user |

### Ads
| Method | Route | Description |
|--------|-------|-------------|
| GET  | /api/ads | List with filters (city, type, maxPrice, page) |
| GET  | /api/ads/:id | Single ad (increments views) |
| POST | /api/ads | Create ad (multipart/form-data) |
| PUT  | /api/ads/:id | Update ad |
| DELETE | /api/ads/:id | Delete ad |
| POST | /api/ads/:id/save | Toggle save/unsave |

### Messages
| Method | Route | Description |
|--------|-------|-------------|
| GET  | /api/messages/conversations | All conversation partners |
| GET  | /api/messages/:userId | Messages with specific user |
| POST | /api/messages | Send message |

### Users
| Method | Route | Description |
|--------|-------|-------------|
| GET  | /api/users/:id | Public profile + ads |
| PUT  | /api/users/me | Update own profile |
| GET  | /api/users/me/saved | Saved ads |

---

## Adding Step Photos

```
client/public/step_1.jpg
client/public/step_2.jpg
client/public/step_3.jpg
client/public/step_4.jpg
client/public/step_5.jpg
```

Hero section images:
```
client/public/mainbanner.jpg  (homepage picture)

```

---

## Socket.IO Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `join` | Client → Server | `userId` |
| `sendMessage` | Client → Server | `{ receiverId, message }` |
| `receiveMessage` | Server → Client | Message object |
| `onlineUsers` | Server → Client | `[userId, ...]` |

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--clr-primary` | `#2D6A4F` | Main green |
| `--clr-primary-lt` | `#52B788` | Light green |
| `--clr-accent` | `#74C69D` | Accent/borders |
| `--clr-blue` | `#6AAFE6` | Info badges |
| `--clr-beige` | `#F4F1EC` | Page background |

---

## Production Deployment

1. Build React: `cd client && npm run build`
2. Serve build from Express: add `app.use(express.static('client/build'))` to `server/index.js`
3. Set `NODE_ENV=production`, `MONGO_URI`, `JWT_SECRET` in environment

---

*Made with ❤️ in Ukraine 🇺🇦*