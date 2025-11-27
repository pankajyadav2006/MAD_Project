# 🎯 SkillSwap - Learn • Teach • Connect

A beautiful React Native app for skill sharing and learning, built with Expo.

## 📱 Features

### 🔐 **Authentication**
- Email/Password login with validation
- User registration
- Social login buttons (Google, Facebook)
- Secure logout functionality

### 🏠 **Home & Discovery**
- Browse available skills with beautiful cards
- Advanced search and filtering
- Category-based filtering with chips
- Location-based search
- Real-time skill ratings

### 📅 **Booking System**
- Book sessions with skill providers
- Date and time selection with validation
- Booking history and status tracking
- Confirmation notifications

### 💬 **Chat System**
- Real-time messaging with providers
- Beautiful chat bubbles
- Automatic chat creation after booking
- Message history persistence

### 👤 **Profile Management**
- Edit personal information
- Manage skills offered and wanted
- Profile customization
- Logout functionality

### 🔔 **Notifications**
- Booking confirmations
- System notifications
- Unread notification indicators

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Tab Navigation**: Intuitive bottom tabs with icons
- **Loading States**: Smooth loading animations
- **Form Validation**: Real-time input validation
- **Splash Screen**: Beautiful app launch experience
- **Responsive Layout**: Works on all screen sizes

## 🛠 Tech Stack

- **React Native** with Expo SDK 54
- **React Navigation** v7 (Stack + Bottom Tabs)
- **AsyncStorage** for data persistence
- **Context API** for state management
- **React Hooks** for component logic

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skill-swap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Scan QR code with Expo Go app
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## 🚀 Quick Start

1. **Launch the app** - See the beautiful splash screen
2. **Login/Register** - Create account or use existing credentials
3. **Browse Skills** - Explore available skills on Home tab
4. **Filter & Search** - Use category chips and search bar
5. **Book Sessions** - Select skills and book time slots
6. **Chat** - Message with skill providers
7. **Manage Profile** - Update your information and skills

## 📱 App Structure

```
skill-swap/
├── App.js                 # Main app component with splash screen
├── navigation/
│   └── AppNavigator.js    # Navigation setup with tabs and stacks
├── screens/
│   ├── LoginScreen.js     # Authentication screen
│   ├── SignupScreen.js    # User registration
│   ├── HomeScreen.js      # Skill discovery with filters
│   ├── BookingScreen.js   # Session booking and history
│   ├── ChatScreen.js      # Messaging interface
│   ├── ProfileScreen.js   # User profile management
│   └── NotificationsScreen.js # Notification center
├── components/
│   ├── SkillCard.js       # Skill display component
│   └── ChatBubble.js      # Chat message component
├── context/
│   └── AppContext.js      # Global state management
└── assets/                # App icons and images
```

## 🎯 Key Features Implemented

### ✅ **Core Functionality**
- [x] User authentication with validation
- [x] Skill browsing and discovery
- [x] Advanced search and filtering
- [x] Session booking system
- [x] Real-time chat messaging
- [x] Profile management
- [x] Notification system

### ✅ **UI/UX Enhancements**
- [x] Beautiful splash screen
- [x] Tab navigation with icons
- [x] Loading states and animations
- [x] Form validation with error messages
- [x] Category filter chips
- [x] Modern card designs
- [x] Responsive layouts

### ✅ **Data Management**
- [x] AsyncStorage persistence
- [x] Context API state management
- [x] Mock data with 8+ skills
- [x] Review and rating system
- [x] Booking history tracking

## 🌟 Demo Data

The app includes 8 sample skills across different categories:
- **Music**: Guitar Lessons
- **Design**: Web Design Help
- **Languages**: Spanish, French
- **Fitness**: Yoga & Meditation
- **Technology**: Python Programming
- **Business**: Digital Marketing
- **Arts**: Photography

## 🔧 Development

### **Available Scripts**
- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web

### **Key Dependencies**
- `expo` - Development platform
- `@react-navigation/native` - Navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/native-stack` - Stack navigation
- `@react-native-async-storage/async-storage` - Data persistence

## 📱 Screenshots & QR Code

The app generates a QR code when running `npx expo start --tunnel` that can be scanned with the Expo Go app for instant testing on your device.

## 🎉 Project Status: **COMPLETED** ✅

This is a fully functional skill-sharing application ready for use and further development!

---

**Built with ❤️ using React Native & Expo**