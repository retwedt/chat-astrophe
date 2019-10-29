# Chat-astrophe!

## A Multi-User chat app

This multi-user chat app is a project from Course 4 Server-side Programming at CodeAbode. Users can enter their name, view a list of all users in the chat room, and communicate in real time with each other! This app takes advantage of several technologies:

- [Node.js](https://nodejs.org/en/) - a powerful tool for server-side scripting with JavaScript
- [Express](http://expressjs.com/) - a lightweight framework for Node.js
- [Socket.io](http://socket.io/) - a package for real-time communication using websockets and Node.js

## Directory Structure

```
├── public/
  ├── js/
  ├── css/
  └── index.html
├── app.js
├── package.json
├── assignment.txt
└── README.md
```

## Installation

1. Download and install [node](https://nodejs.org/en/) - Long-term support version recommended (currently 4.2.3).
2. Download/clone this repository.
3. Open terminal and navigate to the repository folder.
4. Let the node package manager install required dependencies: `npm install`. (On macs: `sudo npm install`).
5. Start the build by running: `node app.js`. You can open your browser to "http://localhost:8080/" to see the site running. Open a second tab and navigate to "http://localhost:8080/" to add another user to the chat room
