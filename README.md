# UMass Room Reserve

Ever notice how repetitive it is to reserve a study room at UMass? You have to go on a different website for each building and fill out the same form over and over again. Is there a way we can automate it somehow? Yes there is! Here comes UMass Room Reserve, a platform where you only needs to fill out the form once and we will fill it out for you so that you can book the room with ease!

## Members:

- [Bao Dang](https://github.com/weebao)
- [Phuoc Do (Patrick)](https://github.com/patdmp)
- [Minh Vu](https://github.com/Tristesse02)
- [Hoang Ly (Justin)](https://github.com/Unravel2802)

## Table of Contents

- [Showcase](#showcase)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Backend Implementation](#backend-implementation)
  - [APIs](#apis)
- [Contribution rules](#contribution-rules)

## Showcase

[![UMass Room Reserve](https://img.youtube.com/vi/JtVMitNVZec/0.jpg)](https://youtu.be/JtVMitNVZec)

## Installation

```bash
git clone https://github.com/weebao/umass-room-reserve.git
npm install
```

## Running the app

Below would be the optimal way to run the app. We decided to run the client and server on the same port so that we can redirect all routes to `index.html`:
```bash
npm start
```
or
```bash
npm run milestone-03
```

Since Milestone 2's criteria requires the website to be run on `http-server`, you can run the command below to run the app. Make sure not to reload the page since this is a SPA which manipulates the URL so the page will not be able to load another page since they don't exist.
```bash
npm run milestone-02
```

## Backend Implementation

The backend is implemented using Node.js and Express.js. We have a simple server that authenticates user (need to have a UMass email account) and saves the user information inside the database.

Whenever the user books a room on our website, the backend will send a POST request to UMass's LibCal API, enter the user's information and book the room.

### APIs 

\* Endpoints need to always start with `/api` since the main path `/` is serving the frontend.

<details>
 <summary><code>GET</code> <code><b>/api/user</b></code> <code>(Retrieves user)</code></summary>

##### Query Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | email     |  required | string                  | The user's email.                                                    |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                 | `{"email":"<email>","name":"<name>","id":"<id>"}`                   |
> | `404`         | `application/json`                 | `{"message":"User not found"}`                                      |
> | `500`         | `application/json`                 | `{"message":"Internal server error"}`                               |

##### Example URL

> ```text
>  GET /api/user?email=richards@cs.umass.edu
> ```

</details>

<details>
  <summary><code>PUT</code> <code><b>/api/user</b></code> <code>(Updates user)</code></summary>

##### Query Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | email    |  required | string                  | The user's email.                                                    |

##### Request Body

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | firstName       |  required | string                  | The user's first name.                                                     |
> | lastName       |  required | string                  | The user's last name.                                                     |
> | role       |  required | string                  | The user's role. ("Undergraduate", "Graduate", "Other")                                                     |
> | major       |  required | string                  | The user's major.                                                     |

##### Responses


> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                 | `{"email":"<email>","name":"<name>","id":"<id>"}`                   |
> | `404`         | `application/json`                 | `{"message":"User not found"}`                                      |
> | `500`         | `application/json`                 | `{"message":"Internal server error"}`                               |

##### Example URL

> ```json
>  PUT /api/user?email=richards@cs.umass.edu
>  Request Body: 
>  {
>    "firstName": "Timothy D.",
>    "lastName": "Richards",
>    "role": "Other",
>    "major": "Computer Science"
>  }

</details>

<details>
 <summary><code>DELETE</code> <code><b>/api/user</b></code> <code>(Deletes user)</code></summary>

##### Query Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | email    |  required | string                  | The user's email.                                                    |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                 | `{"message":"User deleted"}`                                        |
> | `404`         | `application/json`                 | `{"message":"User not found"}`                                      |
> | `500`         | `application/json`                 | `{"message":"Internal server error"}`                               |


##### Example URL

> ```text
>  DELETE /api/user?email=richards@cs.umass.edu
> ``` 

</details>

<details>
 <summary><code>POST</code> <code><b>/api/user/login</b></code> <code>(Logs in user)</code></summary>

##### Request Body

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | email      |  required | string                  | The user's email.                                                    |
> | password   |  required | string                  | The user's password.                                                 |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                 | `{"email":"<email>","name":"<name>","id":"<id>"}`                   |
> | `400`         | `application/json`                 | `{"message":"Invalid credentials"}`                                 |
> | `404`         | `application/json`                 | `{"message":"User not found"}`                                      |
> | `500`         | `application/json`                 | `{"message":"Internal server error"}`                               |

##### Example URL

> ```json
>  POST /api/user/login
>  Request Body: 
>  {
>    "email": "richards@cs.umass.edu",
>    "password": "Iamthegoat"
>  }
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/api/user/register</b></code> <code>(Registers user)</code></summary>

##### Request Body

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | email      |  required | string                  | The user's email.                                                    |
> | password   |  required | string                  | The user's password.                                                 |
> | firstName       |  required | string                  | The user's first name.                                                     |
> | lastName       |  required | string                  | The user's last name.                                                     |
> | role       |  required | string                  | The user's role. ("Undergraduate", "Graduate", "Other")                                                     |
> | major       |  required | string                  | The user's major.                                                     |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                 | `{"email":"<email>","name":"<name>","id":"<id>"}`                   |
> | `400`         | `application/json`                 | `{"message":"Email already exists"}`                                |
> | `500`         | `application/json`                 | `{"message":"Internal server error"}`                               |

##### Example URL

> ```json
>  POST /api/user/register
>  Request Body: 
>  {
>    "email": "richards@cs.umass.edu",
>    "password": "Iamthegoat",
>    "firstName": "Tim",
>    "lastName": "Richards",
>    "role": "Other",
>    "major": "Computer Science"
>  }
> ```

</details>

</br>
<details>
 <summary><code>GET</code> <code><b>/api/room</b></code> <code>(Retrieves rooms by ID)</code></summary>

##### Query Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | string                  | The room's id.                                                        |
> | date      |  optional | string                  | The date. (YYYY-MM-DD format)                                         |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                 | `{"id":"<id>","name":"<name>","buildingId":"<buildingId>","buildingName":"<buildingName>","availableTimes":["<availableTimes>"],"img":"<img>","checksums":["<checksums>"]}`                   |
> | `400`         | `application/json`                 | `{"message":"Room ID is required"}`                                |
> | `400`         | `application/json`                 | `{"message":"Invalid time range"}`                                |
> | `404`         | `application/json`                 | `{"message":"Room not found"}`                                      |
> | `500`         | `application/json`                 | `{"message":"Internal server error"}`                               |

##### Example URL

> ```
>  GET /api/room?id=1
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/api/room/all </b></code> <code>(Retrieves all rooms within the time range or today if not specified)</code></summary>

##### Query Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | date      |  optional | string                  | The date. (YYYY-MM-DD format)                                         |
> | startTime      |  optional | string                  | The start time. (HH:MM:SS format)                                       |
> | endTime      |  optional | string                  | The end time. (HH:MM:SS format)                                         |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                 | `{"rooms":[{"id":"<id>","name":"<name>","buildingId":"<buildingId>","buildingName":"<buildingName>","availableTimes":["<availableTimes>"],"img":"<img>","checksums":["<checksums>"]}]}`                   |
> | `400`         | `application/json`                 | `{"message":"Invalid time range"}`                                |

##### Example URL

> ```
>  GET /api/room/all?date=2021-04-21&startTime=08:00:00&endTime=10:00:00
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/api/room/book</b></code> <code>(Books a room)</code></summary>

##### Query Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | string                  | The room's id.                                                        |
> | date      |  required | string                  | The date. (YYYY-MM-DD format)                                         |
> | startTime      |  required | string                  | The start time. (HH:MM:SS format)                                       |
> | endTime      |  required | string                  | The end time. (HH:MM:SS format)                                         |


##### Request Body (FormData)

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | firstName      |  required | string                  | The user's first name.                                                    |
> | lastName      |  required | string                  | The user's last name.                                                    |
> | email      |  required | string                  | The user's email.                                                    |
> | studentRole      |  required | string                  | The user's role.                                                    |
> | numPeople      |  required | ("3-5" \| "More than 5")                  | The number of people.                                                    |
> | useComputer      |  required | ("Yes" \| "No" \| "Maybe")               | Whether the user will use a computer.                                                    |
> | major      |  required | string                  | The user's major.                                                    

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                 | `{"message":"Room booked successfully"}`                 |
> | `400`         | `application/json`                 | `{"message":"Invalid time range"}`                                |
> | `400`         | `application/json`                 | `{"message":"Invalid form data"}`                                |
> | `404`         | `application/json`                 | `{"message":"Room not found"}`                                      |
> | `500`         | `application/json`                 | `{"message":"Internal server error"}`                               |

##### Example URL

> ```json
>  POST /api/room/book?id=1&date=2021-04-21&startTime=08:00:00&endTime=10:00:00
>  Request Body: 
>  {
>    "firstName": "Tim",
>    "lastName": "Richards",
>    "email": "richards@cs.umass.edu",
>    "studentRole": "Other",
>    "numPeople": "3-5",
>    "useComputer": "Yes",
>    "major": "Computer Science"
>  }

</details>

## Contribution rules

- Every commit/feature must be associated with an issue.
- Contributors must create a new branch using the format `<#issue>-<name>-<feature/description/etc>`.
- Follow the code below:

  ```bash
  git checkout -b "<branch-name>"
  git add .
  git commit -a -m "Message"
  git push origin <branch-name>
  ```
  
- Go to GitHub and create a pull request.
