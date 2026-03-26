# E-Commerce Product Dashboard

A full-stack e-commerce application featuring products, a shopping cart, and user authentication.

## Tech Stack

*   **Frontend:** React, Vite, Apollo Client, Chakra UI
*   **Backend:** Ruby on Rails, GraphQL (`graphql-ruby`), PostgreSQL
*   **Deployment:** Docker Compose

## Quick Start (Docker)

The easiest way to run the entire application is using Docker. This spins up the database, backend API, and frontend automatically.

1.  Make sure you have Docker installed.
2.  Open a terminal in the project root folder.
3.  Run the following command:

```bash
docker compose up --build
```

**Accessing the apps:**
*   Frontend: `http://localhost:5173`
*   Backend API (Health check): `http://localhost:3000/up`
*   Backend API (GraphQL Playground): `http://localhost:3000/graphiql`

To stop the servers, press `Ctrl+C` in the terminal and then run `docker compose down`.

---

## Running Locally (Without Docker)

If you prefer to run the application directly on your machine, follow these steps.

### 1. Database Setup

Ensure you have PostgreSQL installed and running locally. We use the default `postgres` user with peer authentication (no password required on Linux).

### 2. Backend (Rails API)

1.  Open a terminal.
2.  `cd rails-server`
3.  Install dependencies: `bundle install`
4.  Setup database: `rails db:prepare` (creates the database and runs migrations)
5.  *(Optional)* Seed the database with sample data: `rails db:seed`
6.  Start the server: `rails s`

The API will run on `http://localhost:3000/graphql`.

### 3. Frontend (React)

1.  Open a **new** terminal.
2.  `cd react-client`
3.  Install dependencies: `npm install`
4.  Start the development server: `npm run dev`

The frontend will start on an available port, usually `http://localhost:5173`. Make sure the Rails backend is also running!

## Testing

*   **Backend Tests:** Run `bundle exec rspec` inside the `rails-server` directory.
*   **Frontend Tests:** Run `npm test` inside the `react-client` directory.
