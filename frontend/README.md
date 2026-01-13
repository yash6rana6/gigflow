# 🚀 GigFlow – Frontend

GigFlow is a **modern SaaS-style freelance marketplace frontend** built with **React**, **Redux Toolkit**, **React Router**, **Framer Motion**, and **Tailwind CSS**.  
The UI is fully polished to production standards with clean layouts, consistent iconography, smooth animations, and real-world auth patterns.

---

## ✨ Key Highlights

- Clean **SaaS / marketplace-grade UI**
- Consistent icon system using **lucide-react**
- Smooth micro-animations with **Framer Motion**
- Real-world authentication & route protection
- Responsive, scalable, and resume-ready frontend

---

## ✨ Features

### 🔐 Authentication
- Login & Register with backend authentication
- Secure session using **HttpOnly cookies**
- Session rehydration via `/api/auth/me`
- Protected routes using `ProtectedRoute`
- Login/Register blocked for logged-in users using `PublicRoute`
- Smooth loading & error states

---

### 🧭 Routing
- **Public Pages**
  - Browse Gigs
  - Gig Details
- **Protected Pages**
  - Dashboard
  - My Gigs
  - My Bids
  - Create Gig

---

## 📊 Dashboard
- Central command center with:
  - Total projects
  - Live (open) gigs
  - Assigned gigs
  - Total bids
- Clean stat cards with icons
- Quick navigation to:
  - My Gigs
  - My Bids
  - Browse Gigs
- Recent activity section

---

## 🧑‍💼 My Gigs
- View and manage all gigs posted by the user
- Gig status:
  - `open`
  - `assigned`
- Assigned gigs visually distinguished
- Direct navigation to manage bids
- Clean card-based layout with status indicators

---

## 🧑‍💻 My Bids
- View all bids placed by the user
- Bid status:
  - `pending`
  - `hired`
  - `rejected`
- Status shown with icons and color-coded badges
- Direct navigation to the related gig
- Empty, loading, and error states handled cleanly

---

## 📄 Gig Details
- Detailed gig overview:
  - Title
  - Description
  - Client info
  - Budget
  - Status
- Role-based UI:
  - Gig owner sees bids list
  - Freelancers see proposal form
- Atomic hire action for owners
- Polished bid cards with animations

---

## 📝 Create Gig
- Modern form UI with icons
- Title, description, and budget fields
- Smooth validation, loading, and error handling
- Professional marketplace-style form design

---

## 🎨 UI & UX
- Consistent **lucide-react icons** across the app
- Soft shadows instead of heavy borders
- Clean typography hierarchy
- Subtle hover & entrance animations
- Fully responsive layouts
- SaaS / Fiverr / Upwork-inspired design

---

## 🛠 Tech Stack

- React
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- lucide-react

---

## 📂 Project Structure

src/
├── components/
│ ├── Navbar.jsx
│ ├── ProtectedRoute.jsx
│ ├── PublicRoute.jsx
│ ├── GigCard.jsx
│ └── BidCard.jsx
│
├── pages/
│ ├── Gigs.jsx
│ ├── GigDetails.jsx
│ ├── Dashboard.jsx
│ ├── MyGigs.jsx
│ ├── MyBids.jsx
│ ├── CreateGig.jsx
│ ├── Login.jsx
│ └── Register.jsx
│
├── features/
│ ├── auth/
│ ├── gigs/
│ └── bids/
│
├── api/
│ └── axios.js
│
├── layouts/
│ └── MainLayout.jsx
│
├── app/
│ └── store.js
│
├── App.jsx
└── main.jsx


---

## 🔑 Authentication Flow

1. App load → `GET /api/auth/me`
2. Backend validates HttpOnly cookie
3. Redux auth state restored
4. Routes unlocked after auth check (`checked` flag)
5. User redirected based on auth state

---

## ▶️ Getting Started

```bash
npm install
npm run dev
```
- Backend must be running with **CORS enabled** and **credentials: true.**

---

## 📌 Notes

- Frontend-only repository
- Backend APIs expected separately
- UI fully polished and production-ready
- Built with scalability and real-world practices in mind