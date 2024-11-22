Blog Application Frontend

This is a Next.js project that serves as the frontend for a blogging platform. It was bootstrapped with create-next-app.
Getting Started
Run the development server

To get started with the project, first install the dependencies and then start the development server:

npm install
# or
yarn install
# or
pnpm install

Then, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev

Open http://localhost:3000 in your browser to view the application.


Features:-

    User authentication using JWT (Login functionality).
    Create, view, and manage blogs.
    State management using Redux Toolkit.
    Built with modern web development tools like Next.js and Tailwind CSS.

Environment Variables

Create a .env.local file in the root of your project to set up environment variables:

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
