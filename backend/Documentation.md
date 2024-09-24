# Todo List API Documentation

This is the API documentation for a simple Todo List application. The API has authentication features to manage user access and CRUD operations for managing todos.

---

## Table of Contents

- [Authentication Features](#authentication-features)
  - [Register](#register)
  - [Login](#login)
  - [Get Me](#get-me)
  - [Refresh Token](#refresh-token)
  - [Logout](#logout)
- [Todos Features](#todos-features)
  - [Consume Public API](#consume-public-api)
  - [Get All Todos](#get-all-todos)
  - [Get Todo by ID](#get-todo-by-id)
  - [Create Todo](#create-todo)
  - [Edit Todo](#edit-todo)
  - [Delete Todo](#delete-todo)
- [ERD Todo List App](#erd-todo-list-app)

---

## Authentication Features

### Register

Create a new user account and upload a profile picture.

**Endpoint:** `POST /auth/register`

**URL:** `http://localhost:5000/auth/register`

#### Content Type:

- `multipart/form-data`

#### Request Body (Form Data):

- `name`: Full name of the user (string, required).
- `email`: A unique and valid email address (string, required).
- `password`: A strong password (minimum 8 characters, required).
- `confPassword`: Confirm password (must match the password, required).
- `profile_pict`: Profile picture in the form of an image file (optional).

#### Example Form Data:

```bash
name: Wisnu Saputra
email: nunusaputra17@gmail.com
password: WishMeLuck123
confPassword: WishMeLuck123
profile_pict: [file]  # Image in .jpg, .png, and .jpeg.
```

#### Response Example:

```json
{
  "message": "Register Successufully!"
}
```

### Login

Authenticate a user

**Endpoin:** `POST /auth/login`

**URL:** `http://localhost:5000/auth/login`

#### Request Body:

```json
{
  "email": "nunusaputra17@gmail.com",
  "password": "WishMeLuck123"
}
```

#### Response Example

```json
{
  "message": "Login Successfully!",
  "accessToken": "your_access_token"
}
```

### GET ME

Retrieve the currently authenticated users information.

**Endpoint:** `GET /auth/me`

**URL:** `http://localhost:5000/auth/me`

**Headers:** `Bearer token is required`

#### Response Example:

```json
{
  "id": 1,
  "name": "Wisnu Saputra",
  "email": "nunusaputra17@gmail.com",
  "profile_pict": "http://localhost:5000/uploads/profile_pictures/wisnu.jpg"
}
```

### Refresh Token

Call a new access token without having to re-login.

**Endpoint:** `GET /auth/token`

**URL:** `http://localhost:5000/auth/token`

**Headers:** `Bearer token is required`

#### Response Example:

```json
{
  "message": "Refresh token successfully!",
  "accessToken": "your_access_token"
}
```

### LOGOUT

Log out the authenticated user and invalidate the session.

**Endpoint:** `GET /auth/logout`

**URL:** `http://localhost:5000/auth/logout`

**Headers:** `Bearer token is required`

#### Response Example:

```json
{
  "message": "Logout Successfully!"
}
```

## Todos Features

### CONSUME PUBLIC API

user calls todos from public api and saves it into local database.

**Endpoint:** `GET /todos/fetch-todos`

**URL:** `http://localhost:5000/todos/fetch-todos`

**Headers:** `Bearer token is required`

#### Response Example

```json
{
  "message": "Todos fetched and stored to database",
  "data": [
    {
      "id": 1,
      "title": "delectus aut autem",
      "status": false,
      "desc": "todos from public api",
      "userId": 1,
      "updatedAt": "2024-09-22T12:23:28.263Z",
      "createdAt": "2024-09-22T12:23:28.263Z"
    },
    {
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "status": false,
      "desc": "todos from public api",
      "userId": 1,
      "updatedAt": "2024-09-22T12:23:28.279Z",
      "createdAt": "2024-09-22T12:23:28.279Z"
    }
  ]
}
```

### GET ALL TODOS

Retrieve a list of all todos.

**Endpoint:** `GET /todos`

**URL:** `http://localhost:5000/todos`

**Headers:** `Bearer token is requried`

#### Response Example:

```json
{
  "message": "Successufully get todos!",
  "data": [
    {
      "id": 1,
      "title": "delectus aut autem",
      "status": false,
      "desc": "todos from public api",
      "image": null,
      "document": null,
      "imageURL": null,
      "documentURL": null,
      "userId": 1,
      "createdAt": "2024-09-22T12:23:28.000Z",
      "User": {
        "id": 1,
        "name": "Wisnu Saputra",
        "email": "nunusaputra17@gmail.com",
        "profile_pict": "e569dc6937932ec22cb0e91980dc9db1.png",
        "profileURL": "http://localhost:5000/images/e569dc6937932ec22cb0e91980dc9db1.png",
        "createdAt": "2024-09-22T12:22:25.000Z"
      }
    },
    {
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "status": false,
      "desc": "todos from public api",
      "image": null,
      "document": null,
      "imageURL": null,
      "documentURL": null,
      "userId": 1,
      "createdAt": "2024-09-22T12:23:28.000Z",
      "User": {
        "id": 1,
        "name": "Wisnu Saputra",
        "email": "nunusaputra17@gmail.com",
        "profile_pict": "e569dc6937932ec22cb0e91980dc9db1.png",
        "profileURL": "http://localhost:5000/images/e569dc6937932ec22cb0e91980dc9db1.png",
        "createdAt": "2024-09-22T12:22:25.000Z"
      }
    }
  ]
}
```

### GET TODOS BY ID

Retrieve details of a specific todo by its ID.

**Endpoint:** `GET /todos/{id}`

**URL:** `http://localhost:5000/todos/{id}`

**Headers:** `Bearer token is required`

### Response Example:

```json
{
  "message": "Successufully get todos by id!",
  "data": {
    "id": 1,
    "title": "delectus aut autem",
    "status": false,
    "desc": "todos from public api",
    "image": null,
    "document": null,
    "imageURL": null,
    "documentURL": null,
    "userId": 1,
    "createdAt": "2024-09-22T12:23:28.000Z",
    "User": {
      "id": 1,
      "name": "Wisnu Saputra",
      "email": "nunusaputra17@gmail.com",
      "profile_pict": "e569dc6937932ec22cb0e91980dc9db1.png",
      "profileURL": "http://localhost:5000/images/e569dc6937932ec22cb0e91980dc9db1.png",
      "createdAt": "2024-09-22T12:22:25.000Z"
    }
  }
}
```

### CREATE TODOS

Create a new todo with an optional file or image attachment.

**Endpoint:** `POST /todos`

**URL:** `http://localhost:5000/todos`

**Headers:** `Bearer token is required`

**Content-Type:** `multipart/form-data`

**Request Body (Form Data):**

- `title`: Title of the todo (string, required).
- `status`: Mark as completed or not (boolean, default is false).
- `desc`: Description of the task (string, required).
- `image`: (Optional) A image attachment.
- `document:` (Optional) A document attachment

#### Example Form Data

```bash
    title: Do the BLP Beauty Skill Test
    status: false
    desc: I hope I pass this test
    image: [file]  # Optional file (.png, .jpg, .jpeg)
    document: [file] # Optional file (.pdf, .doc, .docx)
```

#### Response Example

```json
{
  "message": "Successufully create todos!",
  "data": {
    "id": 6,
    "title": "Do the BLP Beauty Skill Test",
    "desc": "I hope I pass this test",
    "status": false,
    "image": "9507410b76b3e6bd6fa61ee332c69dd1.jpg",
    "document": null,
    "imageURL": "http://localhost:5000/images/9507410b76b3e6bd6fa61ee332c69dd1.jpg",
    "documentURL": null,
    "userId": 1,
    "updatedAt": "2024-09-22T12:29:39.597Z",
    "createdAt": "2024-09-22T12:29:39.597Z"
  }
}
```

### UPDATE TODOS

Update an existing todo by its ID, with optional file attachment.

**Endpoint:** `PATCH /todos/{id}`

**URL:** `http://localhost:5000/todos/{id}`

**Content-Type:** `multipart/form-data`

**Headers:** `Bearer token is required`

#### Request Body (Form Data)

- `title`: Updated title of the todo (string, optional).
- `desc`: Updated description of the task (string, optional).
- `status`: Update completion status (boolean, optional).
- `image`: (Optional) a new image attachment to replace the old one.
- `document`: (Optional) a new document attachment to replace the old one.

#### Example Form Data

```bash
    title: Do the BLP Beauty Skill Test
    status: true
    desc: I hope I pass this test
    image: [file]  # Optional file (.png, .jpg, .jpeg)
    document: [file] # Optional file (.pdf, .doc, .docx)
```

#### Response Example

```json
{
  "message": "Successfully update todos!"
}
```

### DELETE TODOS

Delete a specific todo by its ID.

**Endpoin:** `DELETE /todos/{id}`

**URL:** `http://localhost:5000/todos/{id}`

**Headers:** `Bearer token is required`

#### Response Example

```json
{
  "message": "Successfully delete todos!"
}
```

<br><br>

## ERD TODO LIST APP

![ERD Diagram](./images/ERD%20TODO.jpg)
