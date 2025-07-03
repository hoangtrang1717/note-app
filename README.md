**Core:**
- React Native `0.78.0`
- React `19.0.0`
- TypeScript `5.0.4`
- Node.js `>=18`

**Navigation:**
- React Navigation v7

**State Management:**
- Redux Toolkit `2.5.1`
- MMKV Storage `3.2.0`

**UI & Styling:**
- Linear Gradient `2.8.3`
- Vector Icons `10.2.0`
- SVG Support `15.12.0`

**Development:**
- ESLint, Prettier, Jest
- Husky, Detox (E2E)

## 📱 Platform Requirements

**Android:** SDK 24+ (Android 7.0), Target SDK 35  
**iOS:** As per React Native 0.78.0 requirements

## � Quick Start

### Prerequisites
- Node.js 18+
- React Native CLI
- Android Studio / Xcode

### Installation
```bash
# Clone and install
git clone <repository-url>
cd note-app
npm install

# iOS setup (macOS only)
cd ios && pod install && cd ..

# Start development
npm start
npm run android  # or npm run ios
```

## 📜 Scripts

- `npm start` - Start Metro
- `npm run android/ios` - Run on device
- `npm test` - Run tests
- `npm run lint` - Lint code

## 📂 Project Structure

```
app/
├── components/     # Reusable UI components
├── screens/        # App screens
├── store/          # Redux store
├── constants/      # App constants
├── hooks/          # Custom hooks
```

## 🏗 Architecture

- **State**: Redux Toolkit + MMKV
- **Navigation**: React Navigation v7
- **Styling**: Centralized design tokens
- **Type Safety**: Full TypeScript
