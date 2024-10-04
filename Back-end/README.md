
# Book Exchange Web Application

This is a web application that allows users from the same neighborhood to exchange their own books. Users can create personal libraries, add books they want to lend, and borrow books from others.

---

## Tech Stack

- **Backend**: Express.js (TypeScript)
- **Database**: PostgreSQL (managed via Prisma ORM)
- **Containerization**: Docker
- **Frontend**: React (not yet implemented)

---

## Project Setup

### Prerequisites

Before running the project, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (LTS version)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [npx (comes with Node.js)](https://www.npmjs.com/package/npx)

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/zoeleca/swap-a-book.git
cd swap-a-book
```

### 2. Create the `.env` File

Create an `.env` file in the project root directory to define environment variables for the database. You can use the  `.env.example` and replace the variable with your own credentials.


### 3. Docker Setup

Ensure that Docker and Docker Compose are running. The Docker configuration is already defined in the `docker-compose.yml` file.

- **To build and run the application**:

```bash
docker-compose up --build
```

This command will:
1. Start a PostgreSQL container.
2. Start the backend (Express + TypeScript) container.
3. Automatically run migrations and seed the database using Prisma.

### 4. Prisma Database Setup

Once the Docker containers are running, you need to set up the database using Prisma.

1. **Run the Prisma migrations**:

```bash
docker-compose exec backend npx prisma migrate dev --name init
```

This command will initialize the database with the necessary tables.

2. **Generate the Prisma Client**:

```bash
docker-compose exec backend npx prisma generate
```

This command will generate the Prisma client for interacting with the database in the project.

### 5. Running the Application

Once the containers are up and the migrations are done, the backend API should be available at:

```
http://localhost:3000
```

You can test the available endpoints like `/books`, `/library`, etc.


## Project Structure

```
/backend
  ├── prisma/                # Prisma schema and migrations
  │   ├── schema.prisma       # Database schema definition
  ├── src/                   # Source code
  │   ├── domain/             # Hexagonal domain features, models, ports
  │   ├── infrastructure/     # Infrastructure layer (Express, Repositories)
  │   ├── Application.ts      # Main application entry point
  └── Dockerfile              # Dockerfile for backend container
  └── docker-compose.yml      # Docker Compose configuration
```

---

## Development Workflow

1. **Add a new migration**:
   If you modify the Prisma schema (`schema.prisma`), run a new migration:

   ```bash
   docker-compose exec backend npx prisma migrate dev --name <migration_name>
   ```

2. **Access PostgreSQL**:
   You can access the PostgreSQL database running inside Docker by using the following command:

   ```bash
   docker-compose exec db psql -U myuser -d book_exchange_db
   ```

   Replace `myuser` and `book_exchange_db` with your credentials.

---

## Troubleshooting

1. **Database Connection Error**:
   If you encounter issues connecting to the database (e.g., error `P1001: Can't reach database server`), ensure:
    - The Docker container for the database is running.
    - The `DATABASE_URL` in the `.env` file is correctly set to use `db` as the host.

2. **Docker Container Issues**:
   If you face any issues with Docker containers, try restarting the containers:

   ```bash
   docker-compose down
   docker-compose up --build
   ```

---

## Future Work

- Implement the frontend with React.
- Add external APIs for fetching book metadata (e.g., Google Books API).

---

## License

This project is licensed under the MIT License.