# Quick Build Instructions - Seerah Android App

## Current Status: ✅ Ready to Build Locally

All configuration is complete. You now need to build on your machine with Android SDK.

---

## Step-by-Step Build Process

### 1. Download Project Files
Get the configured project with all Capacitor setup:
- Repository contains all configured files
- Keystore: `android/app/seerah-release-key.keystore`
- Build config: `android/app/build.gradle` (pre-configured with signing)

### 2. Set Up Your Local Machine

**Required**:
- Java JDK 17 (https://adoptium.net/)
- Android SDK (via Android Studio or command-line tools)
- Gradle (usually included with Android SDK)

**Environment Setup**:
```bash
# macOS/Linux
export ANDROID_HOME=$HOME/Library/Android/Sdk
export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH

# Windows
# Set ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
```

### 3. Install Required SDK Components
```bash
sdkmanager "platforms;android-35"
sdkmanager "build-tools;35.0.0"
sdkmanager "platform-tools"
```

### 4. Build Signed APK
```bash
cd android
./gradlew assembleRelease
```
**Output**: `android/app/build/outputs/apk/release/app-release.apk`

### 5. Build Signed AAB (for Google Play Store)
```bash
./gradlew bundleRelease
```
**Output**: `android/app/build/outputs/bundle/release/app-release.aab`

---

## Pre-Build Configuration (Already Done ✅)

### Capacitor Configuration
- ✅ Initialized with app ID: `com.seerah.app`
- ✅ App name: `Seerah`
- ✅ Web directory set to: `dist/public`
- ✅ Build output configured

### Android Signing
- ✅ Keystore can be uploaded to Codemagic under **Code signing identities → Android keystores**
- ✅ Signing is read from Codemagic's secure environment variables
- ✅ Release build type configured

### Keystore Details

Upload the keystore in Codemagic under **Code signing identities → Android
keystores** and use the reference name `seerah_release_keystore`.
Codemagic injects the keystore path, alias and passwords during the build;
no signing password is stored in the repository.

---

## Files Generated/Modified

### New Files Created:
1. `capacitor.config.ts` - Capacitor configuration
2. `android/` - Full Android project
3. `android/app/build.gradle` - Updated with signing config
4. `android/app/seerah-release-key.keystore` - Signing keystore

### Modified Files:
1. None - original files unchanged

---

## Google Play Store Submission

After building, follow the detailed steps in `CAPACITOR_BUILD_GUIDE.md`:

1. Create Google Play Developer account ($25 one-time fee)
2. Create app in Play Console
3. Upload AAB file
4. Fill store listing details
5. Add screenshots and graphics
6. Submit for review (1-24 hours approval time)

---

## Build Output Files

**APK** (for direct testing):
```
android/app/build/outputs/apk/release/app-release.apk
```
- Can be directly installed on Android device
- Use with: `adb install app-release.apk`

**AAB** (for Google Play Store):
```
android/app/build/outputs/bundle/release/app-release.aab
```
- Upload to Play Console
- Automatically generates optimized APKs for different devices
- Recommended for store submission

---

## Version Management

To update the app:

1. Update version in `android/app/build.gradle`:
```gradle
defaultConfig {
    versionCode 2  // Increment this
    versionName "1.1"  // Update this
}
```

2. Rebuild:
```bash
./gradlew clean
./gradlew bundleRelease
```

3. Upload new AAB to Play Console

---

## Troubleshooting

**Build fails with SDK error**:
```bash
# Verify Android SDK is installed
ls $ANDROID_HOME/platforms
# Should see: android-35

# Re-download if needed
sdkmanager "platforms;android-35"
```

**Signing error**:
```bash
# Verify keystore
keytool -v -list -keystore android/app/seerah-release-key.keystore
```

**Out of memory during build**:
```bash
# Increase Gradle memory in android/gradle.properties
org.gradle.jvmargs=-Xmx4096m
```

---

## Security Notes

⚠️ **Important**: Protect your keystore file!
- Backup: `android/app/seerah-release-key.keystore`
- Store securely offline
- Don't commit to public repositories
- You need it for all future app updates

**Option**: Use Google Play App Signing
- Let Google manage your signing key
- More secure and convenient
- Can still generate signed APK locally

---

## Next Steps

1. ✅ Configure your machine with Android SDK
2. 🏗️ Run build commands above
3. 📱 Test APK on device: `adb install app-release.apk`
4. 📤 Upload AAB to Google Play Console
5. 🎯 Submit for review

See `CAPACITOR_BUILD_GUIDE.md` for detailed Play Store submission steps.

---

## Command Reference

```bash
# Clone/download project
git clone [repository-url]
cd seerah-app

# Build APK
cd android
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk

# Build AAB
./gradlew bundleRelease
# Output: app/build/outputs/bundle/release/app-release.aab

# Test on device
adb install -r app/build/outputs/apk/release/app-release.apk

# Clean build
./gradlew clean

# Check build configuration
./gradlew tasks
```

---

## Support Resources

- Capacitor Docs: https://capacitorjs.com/docs
- Android Build: https://developer.android.com/build
- Google Play Console: https://play.google.com/console
- Gradle Documentation: https://gradle.org/docs
