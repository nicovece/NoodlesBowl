# NoodlesBowl

A modern, cross-platform chat application built with React Native, Expo, and Firebase. NoodlesBowl allows users to join a chat anonymously, send messages, images, and share their location in real time. The app is designed with accessibility and user experience in mind.

---

## Features

- **Anonymous Chat:** Sign in anonymously and start chatting instantly.
- **Customizable Experience:** Choose your chat background color for a personalized look.
- **Real-Time Messaging:** Messages are synced in real time using Firebase Firestore.
- **Media Sharing:** Send images from your library or camera.
- **Location Sharing:** Share your current location in the chat.
- **Offline Support:** View cached messages when offline; messages sync when reconnected.
- **Accessibility:** Designed with accessible labels and color contrast options.

---

## Tech Stack

- **React Native** (with Expo)
- **Firebase** (Authentication, Firestore, Storage)
- **React Navigation**
- **AsyncStorage** (for offline message caching)
- **react-native-gifted-chat** (UI for chat)
- **Expo Location & Image Picker**
- **EAS (Expo Application Services)** for builds

---

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd NoodlesBowl
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up Firebase:
   - The app uses Firebase configuration from `app.config.js` under `expo.extra.firebase`.
   - To use your own Firebase project, create a `.env` file in the project root with the following variables:
     ```env
     FIREBASE_API_KEY=your-api-key
     FIREBASE_AUTH_DOMAIN=your-auth-domain
     FIREBASE_PROJECT_ID=your-project-id
     FIREBASE_STORAGE_BUCKET=your-storage-bucket
     FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     FIREBASE_APP_ID=your-app-id
     ```
   - These will be automatically injected into the app at build time via `app.config.js`.

### Running the App

- Start the development server:
  ```sh
  npm start
  # or
  yarn start
  ```
- Run on your device:
  - iOS: `npm run ios`
  - Android: `npm run android`
  - Web: `npm run web`

---

## Usage

1. Launch the app.
2. Enter a username and select a background color.
3. Tap **Start Chatting** to join the chat room.
4. In the chat, you can:
   - Send text messages
   - Tap the **+** button to send images or share your location
   - View messages and media from all users in real time

---

## Project Structure

```
NoodlesBowl/
├── App.js                # App entry, navigation, network handling
├── index.js              # Expo entry point
├── firebase.js           # Firebase initialization
├── components/
│   ├── Start.js          # Start screen (username, color selection)
│   ├── Chat.js           # Chat screen (main chat UI)
│   └── CustomActions.js  # Custom actions for media/location
├── assets/               # Images, icons, backgrounds
├── app.config.js         # Expo & Firebase config (uses .env)
├── package.json          # Dependencies & scripts
├── metro.config.js       # Metro bundler config
├── eas.json              # EAS build config
└── ...
```

---

## Configuration

- **Firebase:**
  - All Firebase credentials are managed via `app.config.js` under `expo.extra.firebase`.
  - The `.env` file is used for local development and build-time secrets. **Do not commit this file to version control.**
- **Environment Variables:**
  - For custom environments, use `.env` files (see `.gitignore`).

---

## Accessibility

- All interactive elements have descriptive accessibility labels and roles for screen readers.
- Color contrast is dynamically adjusted for text and buttons based on the selected background color, ensuring readability.
- Keyboard avoiding views are used for input fields to prevent the keyboard from covering important UI elements.
- Screen reader instructions are provided for key areas (e.g., the chat area explains how to interact with messages and media).
- Non-essential icons and decorative elements are hidden from assistive technologies to reduce noise for screen reader users.

---

## Scripts

- `npm start` – Start Expo development server
- `npm run ios` – Run on iOS simulator
- `npm run android` – Run on Android emulator
- `npm run web` – Run in web browser

---

## EAS Build & Deployment

- The app is configured for EAS (Expo Application Services) builds.
- See `eas.json` for build profiles (development, preview, production).
- To build:
  ```sh
  npx eas build --platform ios|android
  ```
- To submit:
  ```sh
  npx eas submit --platform ios|android
  ```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

_Specify your license here (e.g., MIT, Apache 2.0, etc.)_
