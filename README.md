# 📚 School Hub

A comprehensive Learning Management System (LMS) built with Next.js, designed to streamline school administration and enhance educational experiences for students, teachers, and parents.

## 🚀 Features

### Core Functionality
- **Multi-Role Authentication**: Secure login for admins, teachers, students, and parents using Clerk
- **Dashboard Analytics**: Real-time charts and statistics for attendance, performance, and finances
- **CRUD Operations**: Full create, read, update, delete functionality for all entities
- **Dynamic Forms**: Robust form validation using React Hook Form and Zod schemas
- **Responsive Design**: Mobile-first UI built with Tailwind CSS

### User Management
- **Admin Dashboard**: Complete oversight of school operations
- **Teacher Portal**: Manage classes, lessons, assignments, and student progress
- **Student Portal**: Access assignments, results, attendance, and announcements
- **Parent Portal**: Monitor children's academic performance and school activities

### Educational Features
- **Class Management**: Organize students by grades and classes
- **Subject & Lesson Planning**: Schedule and manage curriculum
- **Assignment & Exam System**: Create, distribute, and grade assessments
- **Attendance Tracking**: Automated attendance recording and reporting
- **Event Calendar**: School-wide event management and notifications
- **Announcement System**: Targeted communications to specific classes or all users

### Data Visualization
- **Performance Charts**: Track student results and class averages
- **Attendance Analytics**: Visualize attendance patterns and trends
- **Financial Reports**: Monitor school finances and expenses
- **User Statistics**: Overview of student, teacher, and parent counts

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation

### Backend & Database
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk (Next.js integration)
- **API**: Next.js API Routes
- **Deployment**: Docker containerization

### Libraries & Tools
- **Charts**: Recharts for data visualization
- **Calendar**: React Big Calendar for event scheduling
- **Image Upload**: Next Cloudinary integration
- **Notifications**: React Toastify
- **Date Handling**: Moment.js

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 18 or higher)
- PostgreSQL database
- Docker (optional, for containerized deployment)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Dashboard_UI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` and fill in your configuration:
     ```env
     DATABASE_URL="your-postgresql-connection-string"
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
     CLERK_SECRET_KEY="your-clerk-secret-key"
     NEXT_PUBLIC_CLERK_SIGN_IN_URL="/"
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
     NEXT_PUBLIC_CLOUDINARY_API_KEY="your-cloudinary-api-key"
     ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🐳 Docker Deployment

### Using Docker Compose

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

### Manual Docker Build

1. **Build the Docker image**
   ```bash
   docker build -t school-hub .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 school-hub
   ```

## 📁 Project Structure

```
Dashboard_UI/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seeding script
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── (dashboard)/      # Protected dashboard routes
│   │   ├── api/              # API routes
│   │   └── [[...sign-in]]/   # Clerk authentication
│   ├── components/           # Reusable React components
│   │   ├── forms/            # Form components
│   │   └── ...               # Other UI components
│   ├── lib/                  # Utility functions and configurations
│   └── middleware.ts         # Next.js middleware
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose setup
└── package.json              # Dependencies and scripts
```

## 🔐 Authentication & Authorization

The application uses role-based access control:

- **Admin**: Full access to all features and data
- **Teacher**: Access to assigned classes, students, and teaching materials
- **Student**: Access to personal data, assignments, and results
- **Parent**: Access to children's academic information

Routes are protected using middleware and Clerk authentication.

## 📊 Database Schema

The application uses Prisma ORM with PostgreSQL. Key entities include:

- **Users**: Admin, Teacher, Student, Parent
- **Academic**: Grade, Class, Subject, Lesson
- **Assessments**: Exam, Assignment, Result
- **Tracking**: Attendance, Announcement, Event

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables for Production

Ensure all environment variables are properly set in your production environment, especially:

- Database connection string
- Clerk keys
- Cloudinary credentials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built following the Lama Dev Next.js dashboard tutorial
- UI components inspired by modern dashboard designs
- Icons and assets from various free resources



**Made with ❤️ for educational excellence**
