# Issue-Tracker-Next.js

## 🚀 Overview
Welcome to the Issue-Tracker-Next.js project! This is a robust issue tracking system built with Next.js and TypeScript. It provides a seamless way to manage and track issues, complete with features like user authentication, issue creation, editing, and deletion. This project is ideal for teams looking to streamline their workflow and improve collaboration.

## ✨ Features
- 🔒 **User Authentication**: Secure login using Google OAuth.
- 📝 **Issue Management**: Create, edit, and delete issues.
- 📊 **Issue Metrics**: Visualize issue statuses and counts.
- 👩🏻‍💻 **Assign Users**: Assign users to the issues.
- 🌐 **Responsive Design**: Works well on both desktop and mobile devices.

## 🛠️ Tech Stack
- **Programming Language**: TypeScript
- **Frameworks**: Next.js, Radix UI
- **Libraries**: Prisma, Zod, React Hook Form
- **Tools**: ESLint, Tailwind CSS, PostCSS
- **Database**: MySQL

## 📦 Installation

### Prerequisites
- Node.js (v14 or later)
- MySQL database

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/dhanarajrk/issue-tracker-next.js.git
   cd issue-tracker-next.js
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```env
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     DATABASE_URL=your_database_url
     ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🎯 Usage

1. **Create an Issue**:
   - Navigate to `/issues/new`.
   - Fill in the issue details and submit the form.

2. **View Issues**:
   - Navigate to `/issues/list`.
   - View a list of all issues and their status.

3. **Edit an Issue**:
   - Navigate to `/issues/list/:id/edit`.
   - Edit the issue details and submit the form.

4. **Delete an Issue**:
   - Navigate to `/issues/list/:id`.
   - Click the "Delete" button to delete the issue.

5. **Issue Metrics**:
   - Navigate to `/` to view issue metrics.


## 📁 Project Structure
```
issue-tracker-next.js/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [..nextauth]/
│   │   │   └── authOptions.ts
│   │   ├── issues/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── users/
│   │       └── route.ts
│   ├── components/
│   │   ├── ErrorMessage.tsx
│   │   ├── IssueChart.tsx
│   │   ├── IssueStatusBadge.tsx
│   │   ├── LatestIssues.tsx
│   │   ├── Pagination.tsx
│   │   ├── Spinner.tsx
│   │   └── UserMenu.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── NavBar.tsx
│   ├── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── providers/
│   │   └── AuthProvider.tsx
│   └── theme-config.css
├── prisma/
│   ├── client.ts
│   ├── migrations/
│   │   ├── 20250908083739_create_issue/
│   │   │   └── migration.sql
│   │   ├── 20250917142459_add_auth_models/
│   │   │   └── migration.sql
│   │   └── 20250919091651_add_issue_assignment/
│   │       └── migration.sql
│   └── schema.prisma
├── public/
│   ├── next.svg
│   └── vercel.svg
├── scripts/
│   └── make-admin.js
├── .env
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 Configuration
- **Environment Variables**: Set up your environment variables in the `.env` file.
- **Database Configuration**: Configure your MySQL database in the `prisma/schema.prisma` file.

## 🤝 Contributing
I welcome contributions! Here's how you can get started:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure they pass all tests.
4. Submit a pull request.

### Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/issue-tracker-next.js.git
   cd issue-tracker-next.js
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```env
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     DATABASE_URL=your_database_url
     ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Pull Request Process
1. Create a new branch for your feature or bug fix.
2. Make your changes and ensure they pass all tests.
3. Submit a pull request with a clear description of your changes.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🐛 Issues & Support
- **Report Issues**: Please report any issues you encounter on the [GitHub Issues page](https://github.com/dhanarajrk/issue-tracker-next.js/issues).
- **Get Help**: Feel free to ask questions on the [GitHub Discussions page](https://github.com/dhanarajrk/issue-tracker-next.js/discussions).


- **Future Improvements**:
  - Add more detailed issue metrics and issue sorting.
  - Improve performance.
  
---
