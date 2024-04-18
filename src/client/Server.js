class Database {
  static #instance = null;

  static #initial = {
    tasks: [
      { id: 1, name: 'Learn about Web Components' },
      { id: 2, name: 'Go for a walk' },
    ],
  };

  static async db() {
    if (
      !Database.#instance ||
      (await Database.#instance.get('/tasks')) === null
    ) {
      Database.#instance = new Database();

      // Initialize the database with the initial tasks if it is empty.
      if ((await this.#instance.get('/tasks')) === null) {
        await Database.#instance.set(
          '/tasks',
          JSON.stringify(Database.#initial.tasks)
        );
      }
    }
    return Database.#instance;
  }

  #localStorage = null;

  constructor() {
    this.#localStorage = window.localStorage;
  }

  async set(key, value) {
    if (key === '/reset') {
      this.#localStorage.clear();
      this.#localStorage.setItem(
        '/tasks',
        JSON.stringify(Database.#initial.tasks)
      );
      return;
    }

    this.#localStorage.setItem(key, value);
  }

  async get(key) {
    return this.#localStorage.getItem(key);
  }
}

export async function fetch(
  path,
  options = { method: 'GET' },
  shouldFail = false,
  delay = 0
) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (shouldFail) {
        const response = {
          status: 500,
          statusText: 'Internal Server Error',
          body: null,
        };

        resolve(response);
      } else if (options.method === 'GET') {
        const db = await Database.db();
        const body = await db.get(path);
        const response = {
          status: 200,
          statusText: 'OK',
          body,
        };
        resolve(response);
      } else if (options.method === 'DELETE') {
        const db = await Database.db();
        const data = await db.get(path);
        const tasks = JSON.parse(data);
        const tasksN = tasks.filter(task => task.id !== options.body);
        await db.set(path, JSON.stringify(tasksN));
        const response = {
          status: 204,
          statusText: 'No Content',
          body: null,
        };
        resolve(response);
      } else if (options.method === 'POST') {
        if (typeof options.body !== 'string') {
          const response = {
            status: 500,
            statusText: 'Unsupported Body Format',
            body: null,
          };

          resolve(response);
        } else {
          const db = await Database.db();
          await db.set(path, options.body);
          const response = {
            status: 201,
            statusText: 'Created',
            body: null,
          };
          resolve(response);
        }
      } else {
        const response = {
          status: 500,
          statusText: 'Unsupported Method or Request',
          body: null,
        };

        resolve(response);
      }
    }, delay);
  });
}
