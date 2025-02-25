# WebSocket Communication Demo

This project demonstrates the functionality of WebSockets, enabling real-time, bidirectional communication between clients through a server.

## Overview

This application consists of two main components:
- A client application for the user interface
- A WebSocket server that manages connections and message distribution

By opening multiple instances of the client, users can communicate with each other in real-time through the WebSocket protocol.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Chakibceran22/webSockets-small-app.git
   cd websocket-demo
   ```

2. Set up the client application
   ```bash
   cd app
   npm i
   ```

3. Set up the server application
   ```bash
   cd server
   npm i
   ```

## Running the Application

### Start the Server

1. Open a terminal in the server directory
   ```bash
   cd server
   npm start
   ```
   The server should start and display a message indicating it's running and listening on a specific port.

### Start the Client

1. Open a new terminal in the app directory
   ```bash
   cd app
   npm run dev
   ```
   This will start the development server for the client application.

2. Open your browser and navigate to the URL displayed in the terminal (typically http://localhost:3000 or similar).

### Testing the WebSocket Communication

1. Open two browser windows pointing to the client application.
2. In each window, you should see an interface allowing you to send messages.
3. Send a message from one client and observe it appear in the other client in real-time.

## Configuration

### Port Configuration

You may need to modify the port numbers if the default ports are already in use:

- For the client: Check the development server configuration (typically in `package.json` or a config file)
- For the server: Look for the port setting in the server initialization code (usually in `server.js` or `index.js`)

## Troubleshooting

Common issues and solutions:

- **Connection refused errors**: Ensure the server is running and the client is connecting to the correct WebSocket URL and port.
- **Module not found errors**: Make sure you've run `npm i` in both the app and server directories.
- **CORS issues**: Check that your server is properly configured to allow connections from your client's origin.

## Contact

For any bugs, questions, or feedback, please contact me at:
- Email: grabachakib008@gmail.com
- GitHub:[Gihub](https://github.com/Chakibceran22)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
