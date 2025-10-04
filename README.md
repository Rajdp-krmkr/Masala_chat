# Phone Chat - Expo React Native App with Tailwind CSS

A modern, interactive chat application built with Expo React Native and styled with Tailwind CSS (NativeWind). Users authenticate with just their phone number and can chat with demo users in real-time.

## 🚀 Features

### 📱 **Phone Number Authentication**
- Simple login using any phone number format
- Phone number validation
- No complex registration process

### 💬 **Real-time Chat Interface**
- Modern WhatsApp-inspired design
- Message bubbles with timestamps
- Sent/received message distinction
- Auto-scrolling to latest messages

### 👥 **User Management**
- User list with colorful avatars
- Online/offline status indicators
- Dynamic status updates
- Avatar generation from phone numbers

### ⚡ **Interactive Features**
- Typing indicators with animated dots
- Simulated responses from other users
- Haptic feedback for sent messages
- Keyboard shortcuts (Enter to send)

### 🎨 **Modern UI with Tailwind CSS**
- Consistent design system
- Responsive layout
- Beautiful gradients and shadows
- Smooth animations

### 🎮 **Demo Mode**
- Pre-populated demo users
- Simulated conversations
- Automatic responses to test interactivity
- Dynamic online status changes

## 🛠️ Tech Stack

- **Framework**: Expo React Native
- **Styling**: Tailwind CSS (NativeWind)
- **Navigation**: React Navigation
- **State Management**: React Context
- **Icons**: Expo Vector Icons
- **Animations**: React Native Animated API
- **Gradients**: Expo Linear Gradient
- **Haptics**: Expo Haptics

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Setup Steps

1. **Clone or create the project directory**
```bash
mkdir phone-chat-expo
cd phone-chat-expo
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npx expo start
```

4. **Run on your preferred platform**
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your physical device

## 📁 Project Structure

```
phone-chat-expo/
├── App.js                          # Main app component with navigation
├── src/
│   ├── screens/
│   │   ├── AuthScreen.js           # Phone number authentication
│   │   └── ChatScreen.js           # Main chat interface
│   ├── components/
│   │   ├── UserList.js             # List of available users
│   │   ├── ChatArea.js             # Chat messages and input
│   │   ├── UserAvatar.js           # Colorful user avatars
│   │   ├── MessageBubble.js        # Individual message bubbles
│   │   └── TypingIndicator.js      # Animated typing indicator
│   └── context/
│       └── ChatContext.js          # Global state management
├── package.json                    # Dependencies and scripts
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel configuration with NativeWind
├── tailwind.config.js              # Tailwind CSS configuration
└── README.md                       # This file
```

## 🎨 Tailwind CSS Integration

This app uses **NativeWind** to bring Tailwind CSS to React Native:

### Key Benefits:
- **Consistent Design**: Unified design system across components
- **Rapid Development**: Quick styling with utility classes
- **Maintainable Code**: No more StyleSheet objects
- **Responsive Design**: Built-in responsive utilities
- **Custom Colors**: Extended color palette for branding

### Example Usage:
```jsx
// Before (StyleSheet)
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
</View>

// After (Tailwind)
<View className="flex-1 justify-center items-center bg-white">
  <Text className="text-2xl font-bold text-gray-800">Hello</Text>
</View>
```

### Custom Configuration:
The `tailwind.config.js` includes custom colors for the app's branding:
- `primary-500`: #667eea (main brand color)
- `secondary-500`: #764ba2 (accent color)

## 🚀 Usage

1. **Launch the app** and you'll see the authentication screen
2. **Enter any phone number** (e.g., `+1-555-1234`) to authenticate
3. **Browse the user list** to see available demo users
4. **Tap on a user** to start a conversation
5. **Type messages** and press Enter to send
6. **Enjoy interactive responses** from simulated users!

## 📱 Demo Users

The app includes several demo users for testing:
- `+1-555-0101` (Online) - Active responder
- `+1-555-0102` (Offline) - Has message history
- `+1-555-0103` (Online) - Welcome messages
- `+1-555-0104` (Offline) - Status changes dynamically
- `+1-555-0105` (Online) - Random interactions

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android  
npm run android

# Run on web
npm run web
```

### Key Components

#### AuthScreen
- Phone number input with validation
- Gradient background with modern design
- Demo user information display

#### UserList
- Scrollable list of users with avatars
- Online status indicators
- Last message previews
- Search functionality (UI only)

#### ChatArea
- Message history display
- Real-time typing indicators
- Message input with send button
- Header with user info and actions

#### MessageBubble
- Gradient bubbles for sent messages
- White bubbles for received messages
- Timestamps and proper spacing
- Rounded corners with tail effects

## 🎯 Future Enhancements

For a production version, consider adding:

### Backend Integration
- Real Socket.IO server for true real-time messaging
- User authentication with SMS verification
- Message persistence in database (MongoDB/PostgreSQL)
- Push notifications for new messages

### Advanced Features
- File and image sharing
- Voice messages
- Group chats
- Message reactions and replies
- End-to-end encryption
- Message search functionality

### UI/UX Improvements
- Dark mode support
- Custom themes
- Message status indicators (delivered, read)
- Better offline handling
- Swipe gestures for actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** for the amazing React Native framework
- **NativeWind** for bringing Tailwind CSS to React Native
- **Tailwind CSS** for the utility-first CSS framework
- **React Navigation** for seamless navigation
- **Expo Vector Icons** for beautiful icons

---

**Happy Chatting!** 📱💬✨