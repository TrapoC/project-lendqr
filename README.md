# LendSqr - Admin Dashboard Frontend

This project is a responsive frontend for a fintech admin dashboard, designed to manage users and lending operations. It's built with a modern technology stack including React, TypeScript, Vite, and Shadcn UI.

The application features a mock authentication system, a user data management interface, and a clean, professional UI.

## ✨ Features

- **Authentication**: Mock login and logout functionality using React Context for state management.
- **Responsive Dashboard**: A responsive layout with a collapsible sidebar that works seamlessly on desktop and mobile devices.
- **User Management**:
  - View a list of all users with key information.
  - (Logic implemented) Search for users by name, email, phone number, or organization.
  - (Logic implemented) Filter users by status or organization.
  - Placeholder functionality for viewing user details, blacklisting, and activating users.
- **Component-Based Architecture**: Built with reusable and type-safe components using Shadcn UI and Radix UI primitives.
- **State Management**: Centralized state management for authentication (`AuthContext`) and user data (`UserContext`) using the React Context API.

## 🛠️ Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Form Management**: React Hook Form & Zod
- **Icons**: Lucide React
- **State Management**: React Context API

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v18.x or later recommended)
- npm (or yarn/pnpm)

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone <your-repository-url>
    cd project-lendqr
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Run the development server:**
    The application will start on `http://localhost:5173` by default.

    ```sh
    npm run dev
    ```

4.  **Build for production:**
    This command will create a `dist` folder with the optimized production build.
    ```sh
    npm run build
    ```

## 📂 Project Structure

The project follows a standard React application structure:

```
/src
├── /components     # Reusable components
│   ├── /ui         # Core UI elements from Shadcn (Button, Input, etc.)
│   └── Sidebar.tsx # The main navigation sidebar
├── /context        # React Context providers for state management
│   ├── AuthContext.tsx # Handles authentication state
│   └── UserContext.tsx # Manages user data
├── /data           # Mock data
│   └── mockUsers.ts
├── /lib            # Utility functions
│   └── utils.ts    # Tailwind CSS class merging utility
├── /pages          # (Implicit) Page components would go here
├── /types          # TypeScript type definitions
│   └── user.ts
├── App.tsx         # Main application component with routing
└── index.tsx       # Application entry point
```

## 📝 Code Overview

### State Management

The application's state is managed using React's Context API to avoid prop-drilling.

- **`AuthContext.tsx`**: Manages the currently logged-in user. It simulates a login API call and persists the user session in `localStorage`.
- **`UserContext.tsx`**: Holds the list of all users, sourced from mock data. It provides functions to search, filter, update, and delete users, which can be easily adapted to work with a real API.

### UI and Components

The UI is built on top of **Shadcn UI**, which provides accessible and unstyled component primitives. This allows for full control over the styling using **Tailwind CSS**.

- **`Sidebar.tsx`**: A key component that showcases the navigation structure of the dashboard. It is fully responsive, interactive, and uses `lucide-react` for icons.
- **`/components/ui`**: This directory contains the base components like `Input`, `Button`, `Separator`, etc., which are used throughout the application to maintain a consistent design system.

---
