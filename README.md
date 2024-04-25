# UMass Room Reserve

CS 326 Final Project

Members:

- [Bao Dang](https://github.com/weebao)
- [Phuoc Do (Patrick)](https://github.com/patdmp)
- [Minh Vu](https://github.com/Tristesse02)
- [Hoang Ly (Justin)](https://github.com/Unravel2802)

## Installation

```bash
git clone https://github.com/weebao/umass-room-reserve.git
npm install
```

## Running the app

Below would be the optimal way to run:
```bash
npm start
```

Since Milestone 2's criteria requires the website to be run on `http-server`, you can run the command below to run the app. Make sure not to reload the page since this is a SPA which manipulates the URL so the page will not be able to load another page since they don't exist.
```bash
npm run milestone-02
```

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
