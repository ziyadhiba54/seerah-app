# Setup Verification Checklist

Run this checklist to verify all Capacitor configuration is correct.

## ✅ Files Generated

```bash
# Check key configuration files
ls -la capacitor.config.ts
ls -la android/app/build.gradle
ls -la android/app/seerah-release-key.keystore

# Check web assets synced
ls -la android/app/src/main/assets/public/index.html
```

## ✅ Capacitor Configuration

```bash
# Verify capacitor.config.ts
cat capacitor.config.ts
```

Expected output shows:
- ✅ appId: com.seerah.app
- ✅ appName: Seerah
- ✅ webDir: dist/public
- ✅ server.androidScheme: https

## ✅ Android Build Configuration

```bash
# Check gradle configuration
grep -A 10 "signingConfigs" android/app/build.gradle
```

Should show:
- ✅ storeFile: seerah-release-key.keystore
- ✅ keyAlias: seerah-release
- ✅ Release build type with signingConfig

## ✅ Keystore Verification

```bash
# List keystore contents
keytool -v -list -keystore android/app/seerah-release-key.keystore
```

Should show:
- ✅ Key Algorithm: RSA
- ✅ Key Size: 2048
- ✅ Alias: seerah-release
- ✅ Validity: ~10,950 days
- ✅ Owner: CN=Seerah App

## ✅ Web Assets

```bash
# Check built React app
ls -la dist/public/index.html
du -sh dist/public/

# Check if assets were synced to Android
ls -la android/app/src/main/assets/public/index.html
du -sh android/app/src/main/assets/public/
```

Should show:
- ✅ index.html present
- ✅ JS and CSS assets
- ✅ Images and other resources
- ✅ Same files in both locations

## ✅ NPM Dependencies

```bash
# Verify Capacitor packages installed
npm list | grep capacitor

# Should show:
# ├── @capacitor/android
# ├── @capacitor/cli
# └── @capacitor/core
```

## ✅ Android Project Structure

```bash
# Verify Android project exists
ls -d android/app/src/main/
ls -d android/capacitor-android/

# Check manifest
ls -la android/app/src/main/AndroidManifest.xml
```

## 📋 Configuration Summary

### App Details
- **App ID**: com.seerah.app
- **App Name**: Seerah
- **Min SDK**: 26 (Android 8.0)
- **Target SDK**: 34 (Android 14)
- **Version Code**: 1
- **Version Name**: 1.0

### Signing
- **Keystore**: android/app/seerah-release-key.keystore
- **Alias**: seerah-release
- Signing passwords are stored securely in Codemagic and are not committed to the repository.
- **Algorithm**: RSA 2048-bit
- **Owner**: Seerah App

### Build Artifacts Location
- **APK**: android/app/build/outputs/apk/release/app-release.apk
- **AAB**: android/app/build/outputs/bundle/release/app-release.aab
- ⚠️ Note: Not yet built (requires Android SDK)

## 🔧 Pre-Build Checklist

Before building locally, verify:

- [ ] Java JDK 11+ installed (`java -version`)
- [ ] Android SDK installed
- [ ] ANDROID_HOME environment variable set
- [ ] Gradle available in PATH
- [ ] All required SDK components installed:
  ```bash
  sdkmanager "platforms;android-34"
  sdkmanager "build-tools;34.0.0"
  sdkmanager "platform-tools"
  ```

## 🏗️ Build Commands Ready

### Build APK (for testing)
```bash
cd android
./gradlew assembleRelease
```

### Build AAB (for Play Store)
```bash
cd android
./gradlew bundleRelease
```

## 📱 Post-Build Testing

Once built locally, test with:
```bash
# Install on device
adb install -r android/app/build/outputs/apk/release/app-release.apk

# Check logs
adb logcat | grep "SEERAH"
```

## 📤 Submission Ready

After testing, ready to:
1. Upload AAB to Google Play Console
2. Fill store listing
3. Add screenshots and graphics
4. Submit for review

See detailed instructions in: `CAPACITOR_BUILD_GUIDE.md`

## ✅ Final Verification

Run this complete check:

```bash
echo "=== Checking Capacitor Configuration ==="
[ -f capacitor.config.ts ] && echo "✅ capacitor.config.ts exists" || echo "❌ Missing capacitor.config.ts"
[ -d android ] && echo "✅ Android directory exists" || echo "❌ Missing android directory"
[ -f android/app/seerah-release-key.keystore ] && echo "✅ Keystore exists" || echo "❌ Missing keystore"
[ -f dist/public/index.html ] && echo "✅ Web build exists" || echo "❌ Missing web build"
[ -f android/app/src/main/assets/public/index.html ] && echo "✅ Web assets synced" || echo "❌ Assets not synced"
grep -q "signingConfigs" android/app/build.gradle && echo "✅ Signing configured" || echo "❌ Signing not configured"

echo ""
echo "Configuration check complete!"
```

Expected output:
```
✅ capacitor.config.ts exists
✅ Android directory exists
✅ Keystore exists
✅ Web build exists
✅ Web assets synced
✅ Signing configured

Configuration check complete!
```

---

## Next Steps

1. **Setup local machine** with Android SDK
2. **Build APK/AAB** using provided commands
3. **Test on device** before submission
4. **Submit to Play Store** following CAPACITOR_BUILD_GUIDE.md

---

For issues, refer to:
- `CAPACITOR_SETUP_SUMMARY.md` - Detailed technical info
- `CAPACITOR_BUILD_GUIDE.md` - Complete build and submission guide
- `BUILD_INSTRUCTIONS.md` - Quick reference commands
