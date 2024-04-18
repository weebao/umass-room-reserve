import { Events } from './Events.js';
import { fetch } from './Server.js';

export class TodoListView {
  constructor() {}

  async render() {
    // Create the root element
    const todoListViewElm = document.createElement('div');
    todoListViewElm.id = 'todo-list-view';

    const titleElm = document.createElement('h1');
    titleElm.innerText = 'Todo List';

    const todoListContainerElm = document.createElement('div');
    todoListContainerElm.id = 'todo-list-container';

    // Append the title and todo list container to the root element
    todoListViewElm.appendChild(titleElm);
    todoListViewElm.appendChild(todoListContainerElm);

    // Create a TodoList component and append it to the root element
    const todoList = new TodoList();
    todoListContainerElm.appendChild(await todoList.render());

    // Append the todolist container element to the view
    todoListViewElm.appendChild(todoListContainerElm);

    return todoListViewElm;
  }
}

class TodoList {
  constructor() {}

  async render() {
    // Create the root element
    const todoListElm = document.createElement('div');
    todoListElm.id = 'todo-list';

    // Render the text input and task list
    const taskInput = new TaskInput();
    const taskList = new TaskList();
    const textInputElm = taskInput.render();
    const taskListElm = await taskList.render();

    // Append the text input and task list to the root element
    todoListElm.appendChild(textInputElm);
    todoListElm.appendChild(taskListElm);

    return todoListElm;
  }
}

class TaskInput {
  #events = null;

  constructor() {
    this.#events = Events.events();
  }

  render() {
    // Create the root element
    const taskInputElm = document.createElement('div');
    taskInputElm.id = 'text-input';

    const inputElm = this.#renderTextBox();
    const buttonElm = this.#renderButton(inputElm);

    // Append the input and button to the root element
    taskInputElm.appendChild(inputElm);
    taskInputElm.appendChild(buttonElm);

    return taskInputElm;
  }

  #renderTextBox() {
    const inputElm = document.createElement('input');
    inputElm.id = 'task-input';
    inputElm.type = 'text';
    inputElm.placeholder = 'Enter a task';

    inputElm.addEventListener('keyup', event => {
      if (event.key !== 'Enter') {
        return;
      }

      this.#events.publish('task-input', new Task(inputElm.value));
      inputElm.value = '';
    });

    return inputElm;
  }

  #renderButton(inputElm) {
    const buttonElm = document.createElement('button');
    buttonElm.id = 'add-task-button';
    buttonElm.innerText = 'Add Task';

    buttonElm.addEventListener('click', () => {
      this.#events.publish('task-input', new Task(inputElm.value));
      inputElm.value = '';
    });

    return buttonElm;
  }
}

class TaskList {
  #events = null;
  #tasks = null;
  #list = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    if (this.#tasks === null) {
      this.#tasks = await this.#getTasks();
    }

    const taskListElm = document.createElement('div');
    taskListElm.id = 'task-list';

    this.#list = document.createElement('ul');
    const listItems = this.#tasks.map(task => this.#makeTaskItem(task));

    listItems.forEach(li => this.#list.appendChild(li));

    taskListElm.appendChild(this.#list);

    this.#events.subscribe('task-input', task => {
      this.#tasks.push(task);
      const li = this.#makeTaskItem(task);
      this.#list.appendChild(li);
      this.#saveTasks();
    });

    return taskListElm;
  }

  #makeTaskItem(task) {
    const li = document.createElement('li');
    li.innerText = task.name;
    li.id = task.id;

    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.classList.add('deleteButton');

    button.addEventListener('click', async () => {
      await this.#events.publish('delete-task', task);
      this.#list.removeChild(li);
      this.#tasks = this.#tasks.filter(t => t.id !== task.id);
      this.#deleteTask(task.id);
    });

    li.appendChild(button);
    return li;
  }

  async #getTasks() {
    const response = await fetch('/tasks');
    if (response.status === 200) {
      return this.#parse(response.body);
    } else {
      return [];
    }
  }

  async #saveTasks() {
    await fetch('/tasks', {
      method: 'POST',
      body: JSON.stringify(this.#tasks),
    });
  }

  async #deleteTask(id) {
    await fetch('/tasks', {
      method: 'DELETE',
      body: id,
    });
  }

  #parse(json) {
    const obj = JSON.parse(json);
    const tasks = obj.map(task => new Task(task.name, task.id));
    return tasks;
  }
}

class Task {
  constructor(name, id) {
    if (id === undefined) {
      this.id = Math.random().toString(36);
    } else {
      this.id = id;
    }
    this.name = name;
  }
}
