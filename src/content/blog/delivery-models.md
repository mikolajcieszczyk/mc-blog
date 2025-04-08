---
title: "Delivery Models (XaaS)"
description: "Overview of different cloud service delivery models and beyond"
pubDate: "Apr 8 2025"
heroImage: "/mc-blog/xaas.webp"
---

**TLDR:**

<div class="tldr">

XaaS (Everything as a Service) is a general term for various service delivery models over the internet. The most popular models are:

- **SaaS** - software as a service (e.g., Netflix, Dropbox)
- **PaaS** - platform as a service (e.g., Heroku, Google App Engine)
- **IaaS** - infrastructure as a service (e.g., AWS EC2, Azure VM)
- **FaaS** - function as a service (e.g., AWS Lambda)
- **BaaS** - backend as a service (e.g., Firebase)

The choice of model depends on project needs, budget, and technical requirements. Often, enterprises use multiple models simultaneously.

</div>

## What is XaaS?

XaaS (Everything as a Service) is a business model where various services are delivered over the internet. Instead of buying and installing software locally, users access services available in the cloud.

This model offers many benefits:

- **Flexibility** - ability to adapt services to needs
- **Scalability** - easy increase or decrease of resources
- **Cost savings** - payment only for used resources
- **Availability** - services available from anywhere
- **Updates** - automatic updates without user intervention

## Functional Patterns

### CRUD (Create, Read, Update, Delete)

Basic data operations that can occur in any application. CRUD is the foundation of most applications, allowing data management.

**Create** - adding new records to the database
**Read** - retrieving existing records
**Update** - modifying existing records
**Delete** - removing records from the database

```javascript
// Example of CRUD implementation in JavaScript
class UserService {
  // Create
  createUser(userData) {
    return db.users.add(userData);
  }

  // Read
  getUser(userId) {
    return db.users.get(userId);
  }

  // Update
  updateUser(userId, userData) {
    return db.users.update(userId, userData);
  }

  // Delete
  deleteUser(userId) {
    return db.users.delete(userId);
  }
}
```

**CRUD Applications:**

- Content Management Systems (CMS)
- E-commerce applications
- User management systems
- Task management applications (todo list)

### REST (Representational State Transfer)

An architectural pattern for APIs that can be used in any application. REST defines a set of principles and constraints that help create scalable and reliable applications.

**Key REST Principles:**

- **Statelessness** - each request contains all information needed for processing
- **Client-Server** - separation of user interface from data storage
- **Cache** - responses can be cached
- **Uniform Interface** - consistent way of interacting with resources

```javascript
// Example of REST API in Express.js
const express = require("express");
const app = express();

// GET - retrieving data
app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST - creating data
app.post("/api/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - updating data
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  // update logic
  res.json(updatedUser);
});

// DELETE - deleting data
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  // deletion logic
  res.status(204).send();
});
```

**REST Advantages:**

- Simple and understandable
- Uses standard HTTP methods
- Easy to test and debug
- Good documentation and community support

### MVC/MVVM (Model-View-Controller/ViewModel)

An architectural pattern that can be applied to any application. MVC/MVVM helps organize code by dividing it into logical components.

**MVC (Model-View-Controller):**

- **Model** - represents data and business logic
- **View** - represents the user interface
- **Controller** - handles user requests and updates the model

**MVVM (Model-View-ViewModel):**

- **Model** - represents data and business logic
- **View** - represents the user interface
- **ViewModel** - mediates between Model and View, transforming data

```javascript
// Example of MVC in JavaScript
// Model
class UserModel {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  addUser(user) {
    this.users.push(user);
  }
}

// View
class UserView {
  render(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = users.map((user) => `<li>${user.name}</li>`).join("");
  }
}

// Controller
class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Event handling
    document.getElementById("add-user-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("user-name").value;
      this.addUser({ name });
    });
  }

  addUser(user) {
    this.model.addUser(user);
    this.view.render(this.model.getUsers());
  }
}
```

**MVC/MVVM Advantages:**

- Separation of responsibilities
- Easier testing
- Better code organization
- Support for team collaboration

## Application Types (by platform/environment)

### Desktop

Applications running on a computer. Desktop applications are installed locally on the user's device and operate independently of internet connection.

**Desktop Application Advantages:**

- Faster access to functions
- Offline operation
- Full access to device resources
- Better performance for complex operations

**Technologies:**

- Electron (JavaScript)
- .NET (C#)
- Java (Swing, JavaFX)
- Python (PyQt, Tkinter)

```javascript
// Example of a desktop application in Electron
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
```

### Web

Applications running in a browser. Web applications are accessible via the internet and do not require installation.

**Web Application Advantages:**

- Access from any device
- No installation required
- Automatic updates
- Easier deployment

**Technologies:**

- React, Vue, Angular (JavaScript)
- HTML, CSS, JavaScript
- PHP, Python, Ruby (backend)

```javascript
// Example of a web application in React
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
```

### Mobile

Applications running on mobile devices. Mobile applications are installed on smartphones and tablets.

**Mobile Application Advantages:**

- Access to device features (camera, GPS)
- Push notifications
- Offline operation
- Better user experience

**Technologies:**

- React Native (JavaScript)
- Flutter (Dart)
- Swift (iOS)
- Kotlin (Android)

```javascript
// Example of a mobile application in React Native
import React from "react";
import { View, Text, Button } from "react-native";

function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the mobile app!</Text>
      <Button title="Click me" onPress={() => alert("Clicked!")} />
    </View>
  );
}

export default App;
```

### IoT

Applications running on internet-connected devices. IoT applications are used to collect and analyze data from sensors and devices.

**IoT Application Advantages:**

- Process automation
- Real-time data collection
- Device monitoring and control
- Resource optimization

**Technologies:**

- Node.js, Python
- MQTT, CoAP (communication protocols)
- Arduino, Raspberry Pi (hardware platforms)

```javascript
// Example of an IoT application with Node.js and MQTT
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  client.subscribe("sensor/temperature");
});

client.on("message", (topic, message) => {
  console.log(`Received data from sensor: ${message.toString()}`);
});
```

## Application Architectures

### Monolithic

Applications where all components are in a single application. Monolithic applications are simpler to develop and deploy but can be harder to scale.

**Monolithic Application Advantages:**

- Simpler development
- Easier deployment
- Less complexity
- Faster development for small teams

**Monolithic Application Disadvantages:**

- Harder scaling
- Dependency between components
- Longer deployment time
- More difficult testing

```javascript
// Example of a monolithic application in Node.js
const express = require("express");
const app = express();

// Routing
app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/users", (req, res) => {
  res.send("User list");
});

app.get("/products", (req, res) => {
  res.send("Product list");
});

// Server startup
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Microservices

Applications divided into small, independent services. Microservices allow for independent scaling and deployment of individual components.

**Microservices Advantages:**

- Independent scaling
- Independent deployment
- Technological flexibility
- Better fault tolerance

**Microservices Disadvantages:**

- Increased complexity
- More difficult management
- Higher operational costs
- More difficult diagnostics

```javascript
// Example of a microservice in Node.js
const express = require("express");
const app = express();

// User microservice
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Anna" },
  ]);
});

app.listen(3001, () => {
  console.log("User microservice running on port 3001");
});
```

### Serverless

Applications running in the cloud without a permanent server. Serverless allows payment only for actually performed operations.

**Serverless Advantages:**

- Payment only for usage
- Automatic scaling
- No server management
- Faster deployment

**Serverless Disadvantages:**

- Cold start
- Time limitations
- Debugging complexity
- Dependency on provider

```javascript
// Example of a serverless function in AWS Lambda
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!",
    }),
  };
  return response;
};
```

## Basic Delivery Models

### 1. SaaS (Software as a Service)

Software delivered as a service over the internet. SaaS is the most popular software delivery model, allowing access to applications through a browser.

**SaaS Advantages:**

- No installation required
- Automatic updates
- Access from any device
- Flexible payments (subscription)

**SaaS Examples:**

- Netflix (streaming)
- Dropbox (file storage)
- Salesforce (CRM)
- Slack (communication)

```javascript
// Example of SaaS integration (e.g., Dropbox API)
const dropbox = new Dropbox({ accessToken: "YOUR_ACCESS_TOKEN" });
dropbox
  .filesListFolder({ path: "" })
  .then((response) => console.log(response.entries))
  .catch((error) => console.error(error));
```

### 2. PaaS (Platform as a Service)

Platform for hosting and developing applications. PaaS provides an environment for creating, testing, and deploying applications.

**PaaS Advantages:**

- Quick deployment
- Built-in developer tools
- Automatic scaling
- Infrastructure management by provider

**PaaS Examples:**

- Heroku
- Google App Engine
- AWS Elastic Beanstalk
- Microsoft Azure App Service

```javascript
// Example of application configuration on PaaS (e.g., Heroku)
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
```

### 3. IaaS (Infrastructure as a Service)

Infrastruktura delivered as a service. IaaS provides virtual machines, networks, and data storage.

**IaaS Advantages:**

- Full control over infrastructure
- Configuration flexibility
- Payment only for used resources
- Ability to migrate between providers

**IaaS Examples:**

- AWS EC2
- Google Compute Engine
- Microsoft Azure VM
- DigitalOcean Droplets

```javascript
// Example of server configuration on IaaS (e.g., AWS EC2)
const AWS = require("aws-sdk");
const ec2 = new AWS.EC2();

ec2.describeInstances((err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
```

## Specialist Delivery Models

### 4. FaaS (Function as a Service)

Functions delivered as a service (serverless). FaaS allows running code without managing servers.

**FaaS Advantages:**

- Payment only for performed operations
- Automatic scaling
- No server management
- Faster deployment

**FaaS Examples:**

- AWS Lambda
- Google Cloud Functions
- Azure Functions
- IBM Cloud Functions

```javascript
// Example of a serverless function (e.g., AWS Lambda)
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!",
    }),
  };
  return response;
};
```

### 5. BaaS (Backend as a Service)

Backend delivered as a service. BaaS provides ready-made backend functions such as authentication, data storage, and notifications.

**BaaS Advantages:**

- Faster development
- Less code to write
- Built-in security features
- Automatic scaling

**BaaS Examples:**

- Firebase
- Parse
- AWS Amplify
- Supabase

```javascript
// Example of BaaS integration (e.g., Firebase)
const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
  // Firebase configuration
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
```

### 6. DBaaS (Database as a Service)

Database delivered as a service. DBaaS provides managed databases in the cloud.

**DBaaS Advantages:**

- Automatic backups
- Management by provider
- Scaling
- High availability

**DBaaS Examples:**

- MongoDB Atlas
- Amazon RDS
- Google Cloud Firestore
- Azure Cosmos DB

```javascript
// Example of connection to DBaaS (e.g., MongoDB Atlas)
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://<username>:<password>@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
```

## Advanced Delivery Models

### 7. AIaaS (AI as a Service)

Artificial Intelligence as a service. AIaaS provides ready-made AI models and machine learning services.

**AIaaS Advantages:**

- Access to advanced AI models
- No need to train own models
- Faster deployment of AI functions
- Cost savings

**AIaaS Examples:**

- AWS SageMaker
- Google AI Platform
- Azure Cognitive Services
- IBM Watson

```javascript
// Example of using AIaaS (e.g., Azure Cognitive Services)
const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");
const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));
```

### 8. SECaaS (Security as a Service)

Security delivered as a service. SECaaS provides security services in the cloud.

**SECaaS Advantages:**

- Advanced security
- Automatic updates
- 24/7 monitoring
- Regulatory compliance

**SECaaS Examples:**

- AWS WAF
- Cloudflare Security
- Microsoft Azure Security Center
- Google Cloud Security

```javascript
// Example of SECaaS configuration (e.g., AWS WAF)
const AWS = require("aws-sdk");
const waf = new AWS.WAF();

const params = {
  Name: "MyWebACL",
  DefaultAction: { Type: "BLOCK" },
  Rules: [
    // security rules
  ],
};
```

## When to Use Which Model?

- **SaaS**: When you need ready-made software without installation
- **PaaS**: When you want to focus on code, not infrastructure
- **IaaS**: When you need full control over infrastructure
- **FaaS**: When you have irregular load or need scaling
- **BaaS**: When you want to quickly create a backend without writing code
- **DBaaS**: When you need a managed database
- **AIaaS**: When you need advanced AI functions
- **SECaaS**: When you need advanced security

## Summary

The choice of the appropriate delivery model depends on many factors:

- **Project requirements** - what features are needed
- **Budget** - what costs are acceptable
- **Team and experience** - what technologies are known
- **Scaling needs** - how much traffic is expected
- **Security requirements** - what data is being processed

Often, the best solution is a combination of different models (hybrid approach), which allows for optimal use of the advantages of each. For example, an application can use SaaS for user management, PaaS for hosting, IaaS for data storage, and FaaS for event processing.

## Sources

[1] _Claude 3.7 Sonnet_. (2024). _Comprehensive understanding of cloud service delivery models and their applications_.
