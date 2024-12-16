# Installation Guide for the Book Management API

Welcome to the Book Management API! Follow these simple steps to get the project up and running. 🚀

---

## Prerequisites

Before you start, make sure you have the following installed on your system:

1. **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
2. **Git** (optional, for cloning the repository) - [Download Git](https://git-scm.com/)

---

## Step 1: Clone the Repository

First, clone the project repository to your local machine. If you haven’t already, open a terminal and run:

```bash
git clone https://github.com/Daltonic/sia_test
cd sia_test
```

Or simply download the project files as a ZIP and extract them.

---

## Step 2: Install Dependencies

Next, navigate to the project folder and install the required dependencies using npm:

```bash
npm install
```

This will install:

- **express** (Web framework)
- **sqlite3** (Database driver)
- **body-parser** (Middleware for parsing JSON requests)

---

## Step 3: Start the Server

Once the dependencies are installed, start the server with the following command:

```bash
npm start
```

If everything is set up correctly, you’ll see:

```bash
Server running on http://localhost:3000
```

---

## Step 4: Test the API

Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to interact with the API endpoints.

### Available Endpoints

1. **Welcome Endpoint**

   - **GET /**
   - Response: `Welcome to the Book Management API!`

2. **Create a Book**

   - **POST /books**
   - Payload:
     ```json
     {
       "title": "Book Title",
       "author": "Author Name",
       "pages": 123,
       "published": "2024-01-01"
     }
     ```

3. **Get All Books**

   - **GET /books**

4. **Get a Book by ID**

   - **GET /books/:id**

5. **Update a Book**

   - **PUT /books/:id**
   - Payload (same as Create a Book)

6. **Delete a Book**
   - **DELETE /books/:id**

---

## Step 5: Manage the Database

The project uses **SQLite** for data storage. A file named `booksDB.sqlite` will be created automatically in the project directory. You can view and edit the database using tools like:

- [DB Browser for SQLite](https://sqlitebrowser.org/)
- Command-line SQLite tool

---

## Troubleshooting

- **Port Conflict**: If port `3000` is already in use, modify the `PORT` variable in `app.js`.
- **Dependency Issues**: Run `npm install` again to ensure all dependencies are installed.
- **API Documentation**: Visit [here](https://documenter.getpostman.com/view/3187120/2sAYHzHP92#43ae0dff-9670-4ee9-ae8c-d393c3b27ad8) to understand the API integration.

---

Enjoy managing your books with this API! If you run into any issues, feel free to ask for help. 🎉
