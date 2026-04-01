# LeetTracker & DSA Analyzer 🚀

A modern, full-stack Data Structures and Algorithms (DSA) progression tracker designed to mimic premium SaaS productivity tools used by top engineers.

## 📸 Dashboard Screenshots
> *(Placeholders - Add actual screenshots here)*
> 
> ![Dashboard Overview](https://via.placeholder.com/1200x600/0f172a/38bdf8?text=Dashboard+Overview+Screenshot)
> ![Topic Analytics](https://via.placeholder.com/1200x600/0f172a/38bdf8?text=Topic+Analytics+Screenshot)

## 🌟 Project Overview
LeetTracker is an immersive analytics platform designed to gamify and track your LeetCode journey. It transforms plain problem-solving into a robust, chart-filled SaaS experience. Ideal for computer science students and software engineers aiming to ace top tech company interviews.

## ✨ Features
- **LeetCode Stats Tracking**: Connects to your LeetCode profile to fetch real-time metrics, total questions solved, and difficulty breakdown (Easy/Medium/Hard).
- **Topic-wise Analysis**: Dive deep into categoric performance (Arrays, Dynamic Programming, Graphs) with dynamic Chart.js visualizations.
- **Streak Tracking**: Stay consistent with a streak counter that motivates daily problem-solving.
- **Dashboard Graphs**: Visualize activity calendars and category distributions through interactive Doughnut and Bar charts.
- **AI-Powered Recommendations**: Provides smart insights and weak-topic suggestions based on your performance metrics.
- **Secure Authentication**: Built-in User Registration and Login using JWT and BCrypt encryption.

## 🛠 Tech Stack
**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Chart.js & react-chartjs-2
- Lucide React Icons

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose ORM
- JSON Web Tokens (JWT) & bcrypt
- Axios (for API polling)

## 🚀 Setup & Installation

### 1. Backend Setup
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
```
Configure your environment variables in `.env` (already templated).
Run the backend server:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate to the `frontend` directory and install dependencies:
```bash
cd frontend
npm install
```
Start the development server:
```bash
npm run dev
```

Your platform should now be live at `http://localhost:5173/`!

## 🔮 Future Improvements
- [ ] Direct LeetCode GraphQL integration.
- [ ] Export progression reports as PDFs.
- [ ] Include detailed problem difficulty tags natively instead of mock distributions.
- [ ] Live multiplayer coding arenas.

---
*Built for tracking excellence and scaling developer potential.*
