# 🏥 Doctor Channeling System

A modern, full-stack healthcare appointment booking system built with React.js, Node.js/Express, and Firebase.

![Doctor Channeling System](https://th.bing.com/th/id/R.6bf0a6b6a524147ed4644a854992ed39?rik=UpoTN5c6l3P3FQ&riu=http%3a%2f%2fwww.sheelahospital.in%2fwp-content%2fuploads%2ffly-images%2f546%2fmedecinegeneral2016.jpg-848x518-c.jpg&ehk=kJLXOxp1ChkH004nyb3%2fJxhlbLyMReBfv5hVFmCFLB8%3d&risl=&pid=ImgRaw&r=0)

## ✨ Features

### For Patients
- 🔍 **Doctor Search & Filtering** - Find doctors by specialty, location, and availability
- 📅 **Easy Appointment Booking** - Book appointments with real-time queue numbers
- 📋 **Appointment Management** - View, reschedule, or cancel appointments
- 📄 **Medical Records Access** - View prescriptions and lab reports
- ⭐ **Doctor Reviews** - Read and write reviews for doctors
- 🔔 **Notifications** - Get reminders for upcoming appointments

### For Doctors
- 📊 **Dashboard Analytics** - View appointment stats and earnings
- 👥 **Patient Management** - Access patient history and records
- 🗓️ **Schedule Management** - Set available time slots
- 💊 **Prescription Management** - Create and manage prescriptions
- 📈 **Queue Management** - Real-time patient queue

### For Administrators
- 👨‍⚕️ **Doctor Verification** - Approve and verify doctor registrations
- 👥 **User Management** - Manage all system users
- 📊 **System Analytics** - View platform-wide statistics
- 🔧 **Content Management** - Manage specialties and settings

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **React Router DOM** - Navigation
- **Firebase** - Authentication & Database
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **CSS3** - Custom design system

### Backend
- **Node.js** with **Express.js**
- **Firebase Admin SDK**
- **Helmet** - Security headers
- **Morgan** - HTTP logging
- **CORS** - Cross-origin support

### Database & Services
- **Firebase Firestore** - NoSQL database
- **Firebase Authentication** - User auth
- **Firebase Storage** - File storage

## 📁 Project Structure

```
Doctor-Channeling-System/
├── frontend/                    # React frontend
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   └── common/          # Common UI components
│   │   ├── config/              # Configuration files
│   │   ├── context/             # React contexts
│   │   ├── layouts/             # Layout components
│   │   ├── pages/               # Page components
│   │   │   ├── auth/            # Authentication pages
│   │   │   ├── patient/         # Patient dashboard pages
│   │   │   ├── doctor/          # Doctor dashboard pages
│   │   │   └── admin/           # Admin dashboard pages
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── .env.example             # Environment variables template
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Node.js backend
│   ├── src/
│   │   ├── config/              # Configuration
│   │   ├── middleware/          # Express middleware
│   │   ├── routes/              # API routes
│   │   └── index.js             # Server entry point
│   ├── .env.example             # Environment variables template
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Firebase project created
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Doctor-Channeling-System.git
cd Doctor-Channeling-System
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password and Google)
4. Enable **Firestore Database**
5. Enable **Storage**
6. Get your web app config from Project Settings
7. Generate a service account key for the backend

### 3. Frontend Setup

```bash
cd frontend

# Create .env file
cp .env.example .env

# Add your Firebase config to .env
# VITE_FIREBASE_API_KEY=your_api_key
# VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... etc

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Backend Setup

```bash
cd backend

# Create .env file
cp .env.example .env

# Add your Firebase Admin config to .env
# Or place serviceAccountKey.json in the backend folder

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Firestore Security Rules

Add these rules to your Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Appointments collection
    match /appointments/{appointmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.patientId == request.auth.uid || 
         resource.data.doctorId == request.auth.uid);
    }
    
    // Schedules collection
    match /schedules/{doctorId} {
      allow read: if true;
      allow write: if request.auth.uid == doctorId;
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
    }
    
    // Contact messages
    match /contact_messages/{messageId} {
      allow create: if true;
      allow read: if request.auth != null;
    }
  }
}
```

## 📱 Pages & Routes

### Public Routes
| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/doctors` | Doctor search & listing |
| `/doctors/:id` | Doctor profile |
| `/about` | About us |
| `/contact` | Contact form |

### Auth Routes
| Route | Description |
|-------|-------------|
| `/login` | User login |
| `/register` | User registration |
| `/forgot-password` | Password reset |

### Patient Dashboard (`/dashboard/*`)
| Route | Description |
|-------|-------------|
| `/dashboard` | Patient dashboard |
| `/dashboard/appointments` | My appointments |
| `/dashboard/medical-records` | Medical records |
| `/dashboard/profile` | Profile settings |

### Doctor Dashboard (`/doctor/*`)
| Route | Description |
|-------|-------------|
| `/doctor` | Doctor dashboard |
| `/doctor/appointments` | Manage appointments |
| `/doctor/schedule` | Manage schedule |
| `/doctor/patients` | Patient list |
| `/doctor/profile` | Profile settings |

### Admin Dashboard (`/admin/*`)
| Route | Description |
|-------|-------------|
| `/admin` | Admin dashboard |
| `/admin/doctors` | Manage doctors |
| `/admin/patients` | Manage patients |
| `/admin/appointments` | View all appointments |

## 🔌 API Endpoints

### Authentication
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update profile
- `POST /api/auth/set-role` - Set user role (Admin)

### Doctors
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `PUT /api/doctors/profile` - Update doctor profile
- `PUT /api/doctors/schedule` - Update schedule

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/my` - Get user's appointments
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id/status` - Update status
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `POST /api/appointments/:id/prescription` - Add prescription

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/doctors` - List all doctors
- `PUT /api/admin/doctors/:id/verify` - Verify doctor
- `GET /api/admin/patients` - List all patients
- `GET /api/admin/appointments` - List all appointments

## 🎨 Design System

The project uses a custom CSS design system with:
- **CSS Variables** for theming
- **Responsive breakpoints** (480px, 640px, 768px, 1024px, 1280px)
- **Utility classes** for common patterns
- **Component styles** for buttons, cards, forms, etc.

### Color Palette
- **Primary**: Medical Blue (#0ea5e9)
- **Secondary**: Purple (#8b5cf6)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutrals**: Slate grays

## 🔒 Security

- Firebase Authentication for secure user management
- Role-based access control (Patient, Doctor, Admin)
- Protected routes on frontend
- Token verification on backend
- Helmet.js for HTTP security headers
- CORS configuration

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist folder
```

### Backend (Railway/Render)
```bash
cd backend
# Set environment variables
# Deploy with Node.js runtime
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Firebase for backend services
- React team for the amazing framework
- All open-source contributors

---

Made with ❤️ for better healthcare access
