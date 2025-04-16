# REAL-TIME BASIC CHAT APP

## A basic real-time chat app using React Native(Expo) for the frontend and Node.js with socket.IO for the backend.

## Setup Instructions

### 1. Backend Setup (Node.js + Socket.IO + Express)

### Prerequisites

-Node.js installed
-Express installed (with `npm install`)
-Socket.IO installed (with `npm install`)

#### Install Dependencies

cd backend
npm install

## Start the server

node index.js

The Sever will start on:
http://localhost:3000

Note: Use your local ip address when your are testing on a physical phone.

# 2. Frontend Setup(React Native with Expo)

### Prerequisites

-Node.js installed
-Expo CLI installed globally( with `npm install -g expo-cli`
)
-socket.io-client installed (with `npm install`)

Android/iOs simulator or Expo Go app on installed on your phone

## Installed Dependencies

cd frontend
npm install

### Start the app

expo start

This will open Expo Dev Tools in your Terminal.
Scan the QR code using the Expo Go app on your phone.

**Connect Socket to the Backend**
In your frontend code, make sure your backend server is running and your phone is on the same WI-FI network if you're testing on a physical device.
Update the socket server URL in your frontend code:
const socket = io('http://192.168.xx.xx:3000')

To find your local IP address:
run ipconfig on Windows Powershell or Command Prompt
