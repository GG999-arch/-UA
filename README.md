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
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx + .css
│       │   ├── AdCard.jsx + .css
│       │   └── Footer.jsx + .css
│       ├── context/
│       │   └── AuthContext.jsx   # JWT auth state
│       ├── pages/
│       │   ├── HomePage.jsx      # Hero + listings + how-it-works teaser
│       │   ├── AdsPage.jsx       # Listings with sidebar filters
│       │   ├── CreateAdPage.jsx  # Post an ad (rent or seek)
│       │   ├── HowItWorksPage.jsx # Step-by-step guide (5 steps with photo slots)
│       │   ├── ChatPage.jsx      # Real-time chat with Socket.IO
│       │   ├── LoginPage.jsx
│       │   └── RegisterPage.jsx
│       ├── utils/
│       │   └── api.js            # Axios API helpers
│       ├── App.jsx               # Routes
│       └── index.css             # Design system (CSS variables, utilities)
│
└── server/                  # Node.js Backend
    ├── models/
    │   ├── User.js           # Profile, bio, preferences
    │   ├── Ad.js             # Rooms/apartments + amenities
    │   └── Message.js        # Chat messages
    ├── routes/
    │   ├── auth.js           # register, login, /me
    │   ├── ads.js            # CRUD + save/unsave
    │   ├── messages.js       # Conversations + send
    │   └── users.js          # Public profiles
    ├── middleware/
    │   └── auth.js           # JWT protect middleware
    ├── uploads/              # User-uploaded photos (gitignored)
    └── index.js              # Express + Socket.IO entry point
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

Place your instructional photos at:
```
client/public/assets/step_1.jpg
client/public/assets/step_2.jpg
client/public/assets/step_3.jpg
client/public/assets/step_4.jpg
client/public/assets/step_5.jpg
```

Hero section images:
```
client/public/assets/hero-1.jpg  (cozy room photo)
client/public/assets/hero-2.jpg  (modern apartment photo)
client/public/assets/hero-3.jpg  (room with plants)
client/public/assets/hero-4.jpg  (roommates discussing)
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