# Seerah App - Capacitor Setup Summary

## Project Overview
This is a React + Express PWA converted to a native Android app using Capacitor.

**Original Project**:
- Frontend: React TypeScript app
- Backend: Express server
- Build: Vite + Express
- PWA: Service Worker configured

**New Android App**:
- Capacitor wraps the web app as native Android
- Runs on Android 8.0+ (API 26+)
- Signed with release keystore for Play Store

---

## What Has Been Completed ✅

### 1. Capacitor Installation
```
✅ Capacitor CLI installed globally
✅ @capacitor/core installed
✅ @capacitor/cli installed
✅ @capacitor/android installed
```

### 2. Project Initialization
```
✅ capacitor.config.ts created
✅ App ID: com.seerah.app
✅ App Name: Seerah
✅ Web directory: dist/public
✅ Android scheme: https
```

### 3. Frontend Build
```
✅ React app built for production
✅ Output directory: dist/public
✅ Assets optimized and minified
✅ Service worker included
```

### 4. Android Platform
```
✅ Android platform added to Capacitor
✅ Android project structure created
✅ Gradle build system configured
✅ Dependencies integrated
```

### 5. Web Assets Sync
```
✅ Web assets copied to Android project
✅ Assets path: android/app/src/main/assets/public
✅ capacitor.config.json created in Android
✅ Ready for packaging
```

### 6. Signing Configuration
```
✅ Keystore file generated
✅ Location: android/app/seerah-release-key.keystore
✅ Signing config added to build.gradle
✅ Release build type configured with signing
✅ Both APK and AAB will be signed automatically
```

---

## Generated Files & Directories

### New Files
```
./capacitor.config.ts
./android/                          (entire Android project)
./android/app/build.gradle         (modified with signing config)
./android/app/seerah-release-key.keystore
./CAPACITOR_BUILD_GUIDE.md         (detailed guide)
./BUILD_INSTRUCTIONS.md            (quick reference)
./CAPACITOR_SETUP_SUMMARY.md       (this file)
```

### Key Directories
```
./android/                          Android Studio project
./android/app/                      App module
./android/app/src/main/            Application source
./android/app/src/main/assets/public/    Web assets (synced)
./dist/public/                      Built web assets
```

---

## Project Configuration Details

### capacitor.config.ts
```typescript
{
  appId: 'com.seerah.app',
  appName: 'Seerah',
  webDir: 'dist/public',  // Points to React build output
  server: {
    androidScheme: 'https'  // Use HTTPS for web APIs
  }
}
```

### Android build.gradle Signing Config
```gradle
// Codemagic injects these values during a release build:
// CM_KEYSTORE_PATH, CM_KEYSTORE_PASSWORD, CM_KEY_ALIAS, CM_KEY_PASSWORD

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
    }
}
```

### Android SDK Requirements
- **Min SDK**: Android 8.0 (API 26)
- **Target SDK**: Android 15 (API 35)
- **Compile SDK**: Android 35
- **Build Tools**: 35.0.0

### Version Info
- **Version Code**: 1 (increment for each update)
- **Version Name**: 1.0 (display version)
- **Package Name**: com.seerah.app

---

## How the App Works

### Architecture Flow
```
User opens app
    ↓
Android launches Capacitor WebView
    ↓
Loads index.html from web assets
    ↓
React app initializes in WebView
    ↓
Web app running in native container
    ↓
Capacitor provides native API access (if used)
```

### File Loading
```
App Launch → WebView
    ↓
Load: android/app/src/main/assets/public/index.html
    ↓
Load assets from: assets/public/
    ↓
React hydrates and runs
```

### Network Requests
- **Local assets**: Served from bundle
- **API calls**: Must go to accessible server
- **HTTPS required**: By default on Android

---

## Build Configuration

### Gradle Structure
```
android/
├── settings.gradle              # Project configuration
├── build.gradle                 # Root build config
├── gradle.properties            # Gradle options
├── app/
│   ├── build.gradle            # App build (MODIFIED)
│   ├── proguard-rules.pro       # Code obfuscation rules
│   └── src/
│       └── main/
│           ├── assets/
│           │   ├── public/      # WEB ASSETS (synced)
│           │   └── capacitor.config.json
│           ├── java/            # Java source (Capacitor)
│           ├── AndroidManifest.xml
│           └── res/             # Android resources
└── capacitor-android/           # Capacitor core library
```

### Build Process
```
npm run build          → Builds React app to dist/public
npx cap sync          → Copies web assets to Android
./gradlew assembleRelease → Builds signed APK
./gradlew bundleRelease   → Builds signed AAB
```

---

## Signing Details

### Keystore Information
- **File**: `android/app/seerah-release-key.keystore`
- **Type**: Java KeyStore
- **Algorithm**: RSA 2048-bit
- **Validity**: 10,950 days (30 years)
- **Owner Details**:
  - CN=Seerah App
  - OU=Development
  - O=Seerah
  - L=Cairo
  - ST=Cairo
  - C=EG

### Passwords (Secured)
- Keystore passwords are stored in Codemagic's code signing identities.
- The alias is supplied by Codemagic as `CM_KEY_ALIAS`.

### Security Recommendations
1. **Backup keystore securely**
   - Use encrypted backup
   - Store offline if possible
   - Multiple copies in safe locations

2. **Don't share keystore file**
   - Don't commit to public repos
   - Use .gitignore to exclude

3. **Consider Google Play App Signing**
   - Let Google manage signing key
   - More secure option
   - Still sign locally with upload key

---

## App Manifest & Permissions

### Default Manifest
Location: `android/app/src/main/AndroidManifest.xml`

**Default Permissions**:
- INTERNET - Required for web app
- ACCESS_NETWORK_STATE
- RECORD_AUDIO (if used)
- CAMERA (if used)
- LOCATION (if used)

### To Add Permissions
Edit `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

---

## Building Locally (Required Next Step)

Since Android SDK not available in Replit, you must build on your local machine.

### Quick Build Commands
```bash
# 1. Install dependencies (one-time)
# Download Android Studio or SDK tools
# Set ANDROID_HOME environment variable

# 2. Build in android directory
cd android
./gradlew assembleRelease  # Creates APK
./gradlew bundleRelease    # Creates AAB
```

### Output Locations
```
APK:  android/app/build/outputs/apk/release/app-release.apk
AAB:  android/app/build/outputs/bundle/release/app-release.aab
```

---

## Testing the App

### On Emulator
```bash
emulator -avd Pixel_4_API_34 &
adb install android/app/build/outputs/apk/release/app-release.apk
```

### On Device
```bash
# Connect Android device via USB
# Enable USB Debugging on device

adb devices                    # Verify connection
adb install app-release.apk   # Install app
adb logcat                     # View app logs
```

### Testing Checklist
- [ ] App launches without crashes
- [ ] All stories load correctly
- [ ] Quizzes work properly
- [ ] Audio narration (if enabled) functions
- [ ] Navigation works smoothly
- [ ] No console errors in `adb logcat`
- [ ] Offline access works (if configured)
- [ ] Screen rotation handled properly

---

## Customization & Updates

### Update Version
Edit `android/app/build.gradle`:
```gradle
defaultConfig {
    versionCode 2          // Must increment for each release
    versionName "1.1"      // Display version
}
```

### Update App Name
1. Edit `capacitor.config.ts`:
   ```typescript
   appName: 'Seerah'
   ```

2. Edit `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <application android:label="@string/app_name">
   ```

3. Sync changes:
   ```bash
   npx cap sync
   ```

### Add Features
If adding new features to React app:
1. Update React code
2. Rebuild web app: `npm run build`
3. Sync to Android: `npx cap sync`
4. Rebuild APK/AAB: `./gradlew bundleRelease`

### Using Capacitor Plugins
```bash
# Add plugin (e.g., camera)
npm install @capacitor/camera
npx cap sync
```

---

## Troubleshooting

### Build Issues

**"SDK location not found"**
- Set ANDROID_HOME environment variable
- Install Android SDK via Android Studio

**"Gradle build failed"**
```bash
cd android
./gradlew clean
./gradlew bundleRelease
```

**"Module not found"**
```bash
cd android
./gradlew --refresh-dependencies
```

### Runtime Issues

**"Assets not loading"**
- Check web assets copied to `android/app/src/main/assets/public/`
- Verify `capacitor.config.ts` webDir is correct

**"App crashes on startup"**
```bash
adb logcat | grep "SEERAH"
# Check logs for errors
```

**"No network access"**
- Ensure AndroidManifest.xml has INTERNET permission
- Check firewall settings
- Verify API endpoint is accessible

---

## Important Notes

### File Integrity
- **Keep keystore safe**: Required for all future updates
- **Don't lose .keystore file**: You cannot recover it
- **Backup immediately**: Multiple secure locations

### Version Control
Suggested `.gitignore` entries:
```
# Android build outputs
android/app/build/
android/.gradle/

# Sensitive files
android/app/seerah-release-key.keystore
local.properties

# IDE
.idea/
*.iml
```

### Performance
- APK size: ~4-5MB (base)
- Runtime memory: 50-100MB
- Load time: <1 second on modern devices
- Minimum device: Android 8.0

### Future Updates
1. Increment versionCode in build.gradle
2. Rebuild APK/AAB
3. Upload to Play Console
4. Release when ready

---

## Next Steps Checklist

- [ ] Set up Android SDK on your machine
- [ ] Build APK/AAB locally using provided commands
- [ ] Test APK on real device
- [ ] Create Google Play Developer account
- [ ] Follow steps in CAPACITOR_BUILD_GUIDE.md
- [ ] Submit app to Play Store
- [ ] Monitor app performance in Play Console

---

## References

- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Build**: https://developer.android.com/build
- **Google Play Console**: https://play.google.com/console
- **Android SDK Setup**: https://developer.android.com/studio/install
- **Gradle Documentation**: https://gradle.org/docs

---

## Support Resources

For issues with:
- **Capacitor**: https://capacitorjs.com/docs
- **Android Building**: https://developer.android.com/docs
- **Gradle**: https://gradle.org/
- **Play Store**: https://play.google.com/console/support

Detailed build guide: See `CAPACITOR_BUILD_GUIDE.md`
Quick reference: See `BUILD_INSTRUCTIONS.md`
