---
title: "OOP: Very simple CRUD TODO app code"
description: "OOP: Very simple CRUD TODO app code"
pubDate: "Feb 15 2025 13:00"
heroImage: "/mc-blog/oop-todo.svg"
---

```js
class SingleTodo {
  id = Date.now().toString();
  completed = false;
  createdAt = new Date();

  constructor(title) {
    this.title = title;
  }

  toggleStatus() {
    this.completed = !this.completed;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  get formattedDate() {
    return new Date(this.createdAt).toLocaleString();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      createdAt: this.createdAt,
    };
  }
}

class TodoList {
  todos = [];

  #findTodoById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  // Create
  createTodo(title) {
    const todo = new SingleTodo(title);
    this.todos.push(todo);
  }

  // Read
  get todos() {
    return this.todos;
  }

  getTodo(id) {
    const todoToReturn = this.#findTodoById(id);
    if (todoToReturn) {
      return todoToReturn;
    } else {
      console.error("task not found");
      return null;
    }
  }

  // Update
  updateTodo(id, newTitle) {
    const todoToEdit = this.#findTodoById(id);
    if (todoToEdit) {
      todoToEdit.updateTitle(newTitle);
    } else {
      console.error("task not found");
      return null;
    }
  }

  updateStatus(id) {
    const todoToChange = this.#findTodoById(id);
    if (todoToChange) {
      todoToChange.toggleStatus();
    } else {
      console.error("task not found");
      return null;
    }
  }

  // Delete
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  deleteAll() {
    this.todos = [];
  }

  // Filters & Sorts
  filterByStatus(isCompleted) {
    if (isCompleted === undefined) {
      return this.todos;
    }
    return this.todos.filter((todo) => todo.completed === isCompleted);
  }

  sortByDate(type) {
    const todosCopy = [...this.todos];

    if (type === "asc") {
      return todosCopy.sort((a, b) => a.createdAt - b.createdAt);
    } else if (type === "desc") {
      return todosCopy.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      return this.todos;
    }
  }
}
```

And how to use this code:

```js
// 1. Create a new list instance
const todoList = new TodoList();

// 2. Adding new todos
todoList.createTodo("Learn OOP");
todoList.createTodo("Write a blog post");
todoList.createTodo("Go play Counter Strike");

// 3. Get all todos
const allTodos = todoList.todos;

// 4. Get single todo
const singleTodo = todoList.getTodo("123");

// 5. Update todo title
todoList.updateTodo("123", "Buy milk");

// 6. Toggle todo status
todoList.updateStatus("123");

// 7. Filter todos
const completedTodos = todoList.filterByStatus(true); // only completed
const uncompletedTodos = todoList.filterByStatus(false); // only uncompleted
const allTodosAgain = todoList.filterByStatus(); // all todos

// 8. Sort todos by date
const oldestFirst = todoList.sortByDate("asc");
const newestFirst = todoList.sortByDate("desc");

// 9. Delete single todo
todoList.deleteTodo("123");

// 10. Delete all todos
todoList.deleteAll();
```
