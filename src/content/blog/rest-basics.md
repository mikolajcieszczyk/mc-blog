---
title: "REST Basics"
description: "Get to know CRUD endpoints using proper HTTP methods, status codes and naming conventions"
pubDate: "Mar 1 2025"
heroImage: "/mc-blog/rest.svg"
---

**TLDR:**

<div class="tldr">

**REST (Representational State Transfer)** is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol -- the HTTP protocol.

**Key REST principles:**

1. **Resources** - everything is a resource (users, products, orders)
2. **HTTP Methods** - standard operations on resources:
   - GET - retrieve data
   - POST - create new resources
   - PUT/PATCH - update existing resources
   - DELETE - remove resources
3. **Status Codes** - standard responses indicating success or failure
4. **Stateless** - each request contains all information needed to process it

**CRUD Operations with HTTP Methods:**

| Operation | HTTP Method | Example Endpoint | Description             |
| --------- | ----------- | ---------------- | ----------------------- |
| Create    | POST        | /api/users       | Create a new user       |
| Read      | GET         | /api/users/123   | Get user with ID 123    |
| Update    | PUT/PATCH   | /api/users/123   | Update user with ID 123 |
| Delete    | DELETE      | /api/users/123   | Delete user with ID 123 |

**Common Status Codes:**

- 2xx Success: 200 OK, 201 Created, 204 No Content
- 4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 5xx Server Error: 500 Internal Server Error, 503 Service Unavailable

</div>

**REST (Representational State Transfer)** is an **architectural style** for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol -- the HTTP protocol.

## Core REST Concepts

### Resources and URIs

In REST, everything is a resource. Resources are identified by URIs (Uniform Resource Identifiers):

```
https://api.example.com/users
https://api.example.com/products/123
https://api.example.com/orders/456/items
```

Best practices for URI design:

- Use nouns, not verbs (e.g., `/users` not `/getUsers`)
- Use plural nouns for collections (e.g., `/users` not `/user`)
- Use nested paths for related resources (e.g., `/users/123/posts`)
- Use query parameters for filtering, sorting, and pagination (e.g., `/users?role=admin&sort=name`)

### HTTP Methods

REST uses standard HTTP methods to perform operations on resources:

#### GET

- Used to retrieve data
- Should be idempotent (multiple identical requests should have the same effect as a single request)
- Should not modify data
- Can include query parameters for filtering

Example:

```
GET /api/users?role=admin&sort=name
```

#### POST

- Used to create new resources
- Not idempotent (multiple identical requests will create multiple resources)
- Request body typically contains the data for the new resource

Example:

```
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### PUT

- Used to update existing resources
- Idempotent (multiple identical requests should have the same effect as a single request)
- Typically requires the complete resource representation
- Creates the resource if it doesn't exist

Example:

```
PUT /api/users/123
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin"
}
```

#### PATCH

- Used to partially update existing resources
- Idempotent
- Only requires the fields to be updated

Example:

```
PATCH /api/users/123
Content-Type: application/json

{
  "email": "newemail@example.com"
}
```

#### DELETE

- Used to remove resources
- Idempotent (deleting a resource that doesn't exist should return the same result as deleting it once)

Example:

```
DELETE /api/users/123
```

### HTTP Status Codes

REST APIs use standard HTTP status codes to indicate the success or failure of a request:

#### 1xx Informational

- **100 Continue** - The server has received the request headers and the client should proceed to send the request body
- **102 Processing** - The server has received and is processing the request, but no response is available yet

#### 2xx Success

- **200 OK** - The request has succeeded
- **201 Created** - The request has succeeded and a new resource has been created
- **204 No Content** - The request has succeeded but there is no content to return
- **206 Partial Content** - The server is delivering only part of the resource due to a range header sent by the client

#### 3xx Redirection

- **301 Moved Permanently** - The URL of the requested resource has been changed permanently
- **302 Found** - The URL of the requested resource has been changed temporarily

#### 4xx Client Error

- **400 Bad Request** - The server cannot process the request due to a client error
- **401 Unauthorized** - The client must authenticate itself to get the requested response
- **403 Forbidden** - The client does not have access rights to the content
- **404 Not Found** - The server cannot find the requested resource

#### 5xx Server Error

- **500 Internal Server Error** - The server has encountered a situation it doesn't know how to handle
- **502 Bad Gateway** - The server, while acting as a gateway or proxy, received an invalid response from the upstream server
- **503 Service Unavailable** - The server is not ready to handle the request
- **504 Gateway Timeout** - The server, while acting as a gateway or proxy, did not get a response in time from the upstream server

#### 6xx Custom Status Codes

While not officially part of the HTTP standard, some organizations use custom 6xx status codes for specific purposes:

- **600 Unparseable Response Headers** - The response headers could not be parsed
- **601 Unparseable Response Body** - The response body could not be parsed

For a comprehensive list of all HTTP status codes and their meanings, visit [http.dev/status](https://http.dev/status).

## REST API Design Best Practices

### 1. Use Proper HTTP Methods

Always use the appropriate HTTP method for the operation you're performing:

- GET for retrieving data
- POST for creating new resources
- PUT/PATCH for updating existing resources
- DELETE for removing resources

### 2. Use Meaningful Status Codes

Return the appropriate HTTP status code to indicate the result of the operation:

- 2xx for success
- 4xx for client errors
- 5xx for server errors

### 3. Use Consistent Naming Conventions

- Use nouns for resources (e.g., `/users`, `/products`)
- Use plural nouns for collections
- Use kebab-case or snake_case for resource names (e.g., `/user-profiles`, `/order_items`)

### 4. Version Your API

Include the API version in the URI:

```
https://api.example.com/v1/users
https://api.example.com/v2/users
```

### 5. Use Query Parameters for Filtering, Sorting, and Pagination

```
GET /api/users?role=admin&sort=name&page=2&limit=10
```

### 6. Use Proper Content Types

Specify the content type in the request and response headers:

```
Content-Type: application/json
Accept: application/json
```

### 7. Use HATEOAS (Hypermedia as the Engine of Application State)

Include links to related resources in the response:

```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "_links": {
    "self": { "href": "/api/users/123" },
    "posts": { "href": "/api/users/123/posts" }
  }
}
```

## Example REST API

Let's look at a complete example of a REST API for managing users:

### Create a User

```
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

Response:

```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "created_at": "2023-04-08T12:00:00Z"
}
```

### Get a User

```
GET /api/users/123
```

Response:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "created_at": "2023-04-08T12:00:00Z"
}
```

### Update a User

```
PUT /api/users/123
Content-Type: application/json

{
  "name": "John Doe",
  "email": "newemail@example.com",
  "role": "admin"
}
```

Response:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "John Doe",
  "email": "newemail@example.com",
  "role": "admin",
  "created_at": "2023-04-08T12:00:00Z",
  "updated_at": "2023-04-08T13:00:00Z"
}
```

### Delete a User

```
DELETE /api/users/123
```

Response:

```
HTTP/1.1 204 No Content
```

### List Users with Filtering and Pagination

```
GET /api/users?role=admin&sort=name&page=2&limit=10
```

Response:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "created_at": "2023-04-08T12:00:00Z"
    },
    {
      "id": 124,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "admin",
      "created_at": "2023-04-08T12:30:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 2,
    "limit": 10,
    "pages": 3
  }
}
```

## Common REST API Mistakes to Avoid

### 1. Using Verbs in URIs

❌ Bad:

```
GET /api/getUser/123
POST /api/createUser
PUT /api/updateUser/123
DELETE /api/deleteUser/123
```

✅ Good:

```
GET /api/users/123
POST /api/users
PUT /api/users/123
DELETE /api/users/123
```

### 2. Not Using Proper HTTP Methods

❌ Bad:

```
GET /api/users/123/delete
GET /api/users/create
```

✅ Good:

```
DELETE /api/users/123
POST /api/users
```

### 3. Not Using Proper Status Codes

❌ Bad:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": false,
  "error": "User not found"
}
```

✅ Good:

```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "User not found"
}
```

### 4. Inconsistent Response Format

❌ Bad:

```
// Success response
{
  "data": { "id": 123, "name": "John Doe" }
}

// Error response
{
  "error": "User not found"
}
```

✅ Good:

```
// Success response
{
  "data": { "id": 123, "name": "John Doe" }
}

// Error response
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found"
  }
}
```

## Conclusion

REST is a powerful architectural style for designing networked applications. By following the principles and best practices outlined in this article, you can create APIs that are:

- Easy to understand and use
- Consistent and predictable
- Scalable and maintainable
- Compatible with a wide range of clients and platforms

Remember that REST is not a standard but a set of guidelines and best practices. The key is to be consistent in your API design and to follow the established conventions.
