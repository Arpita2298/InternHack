# 🚀 Internship & Hackathon Portal

A modern platform connecting students with internship opportunities and hackathon events. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

![Project Screenshot]("https://ik.imagekit.io/soldpe96d/Internhub.png?updatedAt=1756811264805")

## ✨ Features

### For Students
- 🔍 Browse and search internships/hackathons
- 📝 Apply to opportunities with resume upload
- 📊 Track application status
- 💼 Create and manage profile
- 🔔 Get notifications for new opportunities

### For Recruiters/Companies
- 🏢 Create and manage company profile
- 📢 Post new internship/hackathon opportunities
- 👥 Manage applications
- 📈 Track engagement metrics
- ✅ Verify student applications

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Nodemailer for email notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/internship-hackathon-portal.git
   cd internship-hackathon-portal
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the `backend` directory:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     CLIENT_URL=http://localhost:3000
     ```

4. **Run the application**
   ```bash
   # Start backend server
   cd backend
   npm run dev
   
   # In a new terminal, start frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📂 Project Structure

```
internship-hackathon-portal/
├── backend/             # Backend code
│   ├── config/          # Database and other configurations
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Express server
│
├── frontend/            # Frontend code
│   ├── public/          # Static files
│   └── src/             # React source code
│       ├── assets/      # Images, fonts, etc.
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       └── App.jsx      # Main App component
│
└── README.md            # This file
```

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Icons](https://react-icons.github.io/react-icons/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/)

---
