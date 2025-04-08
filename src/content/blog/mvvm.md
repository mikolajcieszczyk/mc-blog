---
title: "MVVM: Basics"
description: "MVVM: Basics"
pubDate: "Apr 8 2025"
heroImage: "/mc-blog/mvvm-diagram.svg"
---

**TLDR:**

<div class="tldr">

**MVVM (Model-View-ViewModel)** is an architectural pattern that divides an application into 3 main components:

**Classical approach:**

1. **Model** - manages data and business logic
2. **View** - displays the user interface
3. **ViewModel** - mediates between Model and View

**Modern implementation (React + TypeScript):**

1. **Model** remains unchanged - represents data and business logic
2. **View** - React components displaying data
3. **ViewModel** - React hooks or classes managing state and presentation logic

**Main difference?**

- **In classical MVVM**, ViewModel was responsible for transforming data from Model into a format suitable for View.

- **In modern frameworks**, ViewModel is often implemented as React hooks or state management classes, which makes testing and maintenance easier.

**Modern data flow:**

```js
1. User interaction:
View -> ViewModel -> Model -> Database

2. UI update:
Database -> Model -> ViewModel -> View
```

Communication is bidirectional and always the same pairs of components communicate with each other:

```js
View <-> ViewModel <-> Model <-> Database
```

This evolution of MVVM helps maintain separation of concerns while adapting to modern application development needs.

</div>

**Model-View-ViewModel (MVVM)** is an **architectural pattern** that divides an application into **three interconnected components**, creating:

1. clear separation of concerns
2. better code organization and maintainability

#### Core Components (classical approach)

![Alternative text](../../../public/mvvm-diagram.svg)

#### 1. Model

- Manages data and business logic
- Handles data validation
- Contains business rules
- Independent of the user interface
- Manages application behavior
- Notifies observers about changes

#### 2. View

- Presents data to users
- Handles visual representation
- Receives user input and displays updates
- Can be any output representation (web page, chart, diagram)

#### 3. ViewModel

- Acts as an interface between Model and View
- Processes user input and business logic
- Updates Model and View accordingly
- Maintains program flow and data integrity

This architecture has become fundamental in modern application development, forming the basis for many frameworks and serving as a blueprint for scalable application design.

#### Modern Implementation (React + TypeScript)

In modern frameworks like React, the classic MVVM pattern has evolved to include additional layers:

##### Model vs ViewModel Pattern

**Classic MVVM Model:**

- Contains data structure and business logic
- Handles validation and data processing
- Manages application behavior
- Is responsible for business rules

**In modern frameworks like React, Model remains unchanged, while ViewModel is implemented as:**

- **React hooks** - manage state and presentation logic
- **State management classes** - handle complex logic and data transformations

This separation ensures better maintainability and testability. See the example below:

##### Benefits of MVVM and Modern Implementation

- Loose coupling between components improves maintainability
- Clear separation of concerns (data vs. logic vs. presentation)
- Better testability (ViewModel can be tested independently, Model can be mocked)
- Modular architecture, making scaling and extension easier
- Encourages parallel development of features

This modern interpretation of MVVM shows how architectural patterns can evolve to meet contemporary development needs while maintaining the core principles of separation of concerns and maintainable code.

#### React + TypeScript example

**1. Model**

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

class UserModel {
  private users: User[] = [];

  async fetchUsers(): Promise<User[]> {
    // Simulating data fetching from API
    return this.users;
  }

  async createUser(userData: Omit<User, "id">): Promise<User> {
    // Data validation
    if (!this.isValidUserData(userData)) {
      throw new Error("Invalid user data");
    }

    // Business logic
    const newUser: User = {
      id: this.users.length + 1,
      name: userData.name.trim(),
      email: userData.email.trim(),
    };

    this.users.push(newUser);
    return newUser;
  }

  private isValidUserData(data: Omit<User, "id">): boolean {
    return data.name && data.name.length >= 3 && data.email.includes("@");
  }
}
```

- Represents data structure and business logic
- Defines interfaces and types
- Contains entity attributes
- Contains business logic
- In React, presentation logic is moved to ViewModel

**2. ViewModel**

```ts
// React hook as ViewModel
function useUserViewModel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userModel = new UserModel();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await userModel.fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, "id">) => {
    setLoading(true);
    try {
      const newUser = await userModel.createUser(userData);
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError("Failed to create user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
  };
}
```

- Contains presentation logic extracted from Model
- Handles UI state and data transformations
- Manages data operations through Model
- Implements core application functionality
- Acts as a bridge between View and Model

This is where the actual presentation logic lives:

- Manages UI state
- Handles data transformations
- Performs data operations
- Handles error cases
- Manages application state

The ViewModel layer ensures that all presentation logic is centralized and reusable across different parts of the application while maintaining clean separation of concerns.

**3. View**

```tsx
function UserView() {
  const { users, loading, error, fetchUsers, createUser } = useUserViewModel();
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      await createUser({ name: newUserName, email: newUserEmail });
      setNewUserName("");
      setNewUserEmail("");
    } catch (err) {
      // Error is already handled in ViewModel
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users</h1>

      <div>
        <input
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="Email"
        />
        <button onClick={handleCreateUser}>Add User</button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- Uses React hook as ViewModel
- Displays user data
- Handles user interactions
- Passes input data to ViewModel
- Displays appropriate responses

This is a practical implementation of the View layer that:

- Receives user interactions
- Processes input data
- Delegates logic to ViewModel
- Returns appropriate responses

View acts as the presentation layer, displaying data to the user and passing interactions to ViewModel, maintaining clean separation of concerns.

**Data flow in this code:**

1. User interaction hits the View
2. View passes request to ViewModel
3. ViewModel works with Model
4. Result returns through ViewModel to View
