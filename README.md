# **Swap A Book - A Platform to Lend and Borrow Books**

**Swap A Book** is a web application that allows users to lend and borrow books within their local community. It ensures
a
seamless user experience by leveraging modern technologies and secure authentication mechanisms.

---

## **Features**

### **Frontend Features**

- User-friendly interface for managing books and viewing available books.
- Search and filter functionality to find books based on location and other criteria.
- Responsive design powered by **Tailwind CSS** for an optimal experience across devices.

### **Backend Features**

- RESTful API to handle user authentication, book management, and borrowing requests.
- Secure authentication using **Auth0** with token-based protection for routes.
- Efficient database management with **Prisma** and PostgreSQL.
- Scalable architecture with Dockerized backend and database services.

---

## **Tech Stack**

### **Frontend**

- **React** with **TypeScript**: For building dynamic and type-safe user interfaces.
- **Vite**: For a fast and optimized development environment.
- **Tailwind CSS**: For rapid and responsive styling.

### **Backend**

- **Node.js** with **TypeScript**: For a robust, scalable, and maintainable server.
- **Express**: To create RESTful API routes.
- **Prisma**: For type-safe database interactions and simplified migrations.
- **PostgreSQL**: As the relational database for storing user and book data.

### **Other Tools**

- **Auth0**: To handle secure authentication and authorization.
- **Docker**: For containerizing the application, ensuring consistent environments for development and production.
- **Testing Frameworks**:
    - **Vitest** for unit tests.
    - **Cypress** for front-end testing and potential end-to-end (E2E) tests. (WIP)

---

## **Setup and Installation**

### **Prerequisites**

- **Node.js**: Ensure you have Node.js (v18 or above) installed.
- **Docker**: Install Docker and Docker Compose to run the app in containers.
- **Auth0 Account**: Create an Auth0 application and configure its settings.

---

### **1. Clone the Repository**

```bash
git clone https://github.com/zoeleca/swap-a-book
cd swap-a-book
```

## **Setup and Installation**

### **Prerequisites**

- **Node.js**: Ensure you have Node.js (v18 or above) installed.
- **Docker**: Install Docker and Docker Compose to run the app in containers.
- **Auth0 Account**: Create an Auth0 application and configure its settings.

---

### **2. Set Up Environment Variables**

- Create a `.env` file in both the frontend and backend directories.

#### **Example `.env` file for the Backend**

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/bookshare
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
```

---

### **3. Start the Application with Docker**

1 - Build and start the Docker containers:

```
docker-compose up --build
```

2 - Access the application:
Frontend: http://localhost:5173
Backend: http://localhost:3000

---

### **4. Development Setup**

### **Frontend**

Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
yarn
```

Start the development server:

```
yarn dev
```

### **Backend**

Navigate to the backend directory:

```
cd backend
```

Install dependencies:

```
yarn
```

Run database migrations:

```
yarn prisma migrate dev
```

Start the development server:

```
yarn dev
```

---

### **4. Testing**

### **Backend Testing**

Run tests using Vitest:

- Unit Tests:

```
yarn test
```

- Integration Tests:

```
yarn test:integration
```

- All Tests

```
yarn test:setup
yarn test:all
```

---

### **5. Project Structure**

### **BackEnd**

```
src/
├── prisma/                 # ORM 
│   ├── migrations/             
│   ├── seeds/      
├── domain/                 # Domain layer (business models and core logic)
│   ├── features/             
│   ├── interfaces/      
│   └── models/           
├── infrastructure/         # Infrastructure layer (adapters)
│   ├── config/               
│   ├── mocks/      
│   ├── providers/ /      
│   └── repositories/             
├── presentation/           # Presentation layer (adapters)         
│   ├── controller/        
│   ├── mappers/             
│   ├── routes/             
│   └Application.ts
├── main.ts         
│    
tests/                  # Test configuration and utilities
├── unit/               
├── integration/               
└── e2e/                
```

### **FrontEnd**

```
src/
├── core/                   # Core business logic and entities
│   ├── models/             
│   ├── usecases/           
├── data/                   # Data access and repositories
│   ├── api/                
│   ├── repositories/       
├── ui/                     # UI and presentation layer
│   ├── components/         
│   ├── pages/              
│   ├── routes/             # Custom React hooks
├── main.tsx                # Entry point
├── App.tsx                 # Root component
└── types.d.ts              
 
```

---

### **Future Enhancements**

- 1 . **Geolocalisation**: being able to see borrowable books not far from the user.
- 2 . **Push Notifications**: Notify users when their borrow requests are approved.
- 3 . **Admin Dashboard**: For better management of the system.