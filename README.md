
# 📝 Blog API

A RESTful API for a blogging platform that allows users to create, read, update, and delete blog posts, manage authentication, and interact with content through comments and likes.

## 🚀 Features

- 🔐 JWT-based Authentication
- 👤 User Registration & Login
- ✍️ CRUD operations on Blog Posts
- 💬 Comment System
- ❤️ Like / Unlike Posts
- 🏷️ Tags & Categories Support

## 🛠️ Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT (JSON Web Token)
- Tools: Thunder Client 

# 📂 Project Structure

```txt
├── src/
│   ├── app.js           # Express app setup
│   ├── config/
│   │   └── dbConnection.js  # Database connection
│   ├── controllers/
│   │   ├── postController.js  # Post-related business logic
│   │   └── userController.js  # User-related business logic
│   ├── middleware/
│   │   ├── errorHandler.js    # Error handling middleware
│   │   └── isLoggedIn.js      # Authentication middleware
│   ├── models/
│   │   ├── postModel.js       # Post schema
│   │   └── userModel.js       # User schema
│   └── routes/
│       ├── postRoute.js       # Post routes
│       └── userRoute.js       # User routes
├── package.json         # Dependencies and scripts
├── README.md            # Project documentation
└── server.js            # Entry point
```

# ⚙️ Installation

## Clone the repo
git clone https://github.com/bisu39/BLOG-APIs.git

## Navigate to project folder
cd BLOG-APIs

## Install dependencies
npm install

### Prerequisites
- Node.js installed
- MongoDB running locally or cloud (MongoDB Atlas)

## 🔑 Environment Variables
```txt
PORT = <your port>
MONGODB_URL = <your_mongodb_connection_string>
ACCESS_TOKEN_SECRET= <your_secret_key>
```
# ▶️ Running the Server
    
npm start

# 📌 API Endpoints

## 🔐 Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /users             | Register user |
| POST   | /users/auth        | Login user    |

## 📝 Post Routes

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| GET    | /posts         | Get all posts      |
| POST   | /posts         | Create post (auth) |
| PATCH  | /posts/:id     | Update post (auth) |
| DELETE | /posts/:id     | Delete post (auth) |

## 💬 Comment Routes

| Method | Endpoint                | Description  |
| ------ | ----------------------- | ------------ |
| POST   | /posts/:postID/comment  | Add comment  |

# 🔐 Authentication

Include token in headers for protected routes:

Authorization: Bearer <your_token>

# ❌ Error Handling

The API uses a centralized error handling middleware that returns consistent responses:

{
  "success": false,
  "message": "Error message",
  "stack": "Only in development"
}

# 📬 Request Example

POST /posts

{
  "title": "My First Blog",
  "content": "This is a long blog content...",
  "tags": ["tech", "node"],
  "category": "Programming"
}

# 📈 Future Improvements

Frontend Implemenation
Pagination
Image upload (Cloud storage)
Rate limiting & security enhancements

# 🤝 Contributing

Contributions are welcome!

## Fork the repo

## Create your branch
git checkout -b feature/new-feature

## Commit changes
git commit -m "Add new feature"

## Push
git push origin feature/new-feature


# 📄 License

This project is licensed under the MIT License.