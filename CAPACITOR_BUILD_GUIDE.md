# Seerah App - Android Build Guide

## ✅ Completed Steps

The following have been successfully configured:

1. ✅ **Capacitor Initialized** - Project setup complete with proper configuration
2. ✅ **Android Platform Added** - Capacitor Android platform ready
3. ✅ **Frontend Built** - React app compiled to `dist/public` for production
4. ✅ **Keystore Generated** - Signing key created at `android/app/seerah-release-key.keystore`
5. ✅ **Android Build Configured** - `build.gradle` updated with release signing configuration

## 📋 Project Configuration Details

### Capacitor Config
- **App ID**: com.seerah.app
- **App Name**: Seerah
- **Web Directory**: dist/public
- **Android Scheme**: https

### Keystore Details
- Upload the release keystore to Codemagic under **Code signing identities → Android keystores**.
- Use the reference name `seerah_release_keystore` in `codemagic.yaml`.
- Codemagic provides the keystore path, alias and passwords securely through environment variables.

### Build Configuration
- **Package ID**: com.seerah.app
- **Version Code**: 1
- **Version Name**: 1.0
- **Min SDK**: 26
- **Target SDK**: 35

---

## 🏗️ Building APK and AAB Locally

Since the Android SDK is not available in the Replit environment, you need to build locally on your machine with Android Studio or command-line tools.

### Prerequisites on Your Local Machine

1. **Install Java JDK 17**
   - Download from: https://adoptopenjdk.net/ or https://www.oracle.com/java/technologies/javase-jdk11-downloads.html

2. **Install Android Studio** or **Android SDK Command-line Tools**
   - Download Android Studio: https://developer.android.com/studio
   - Or just SDK tools: https://developer.android.com/studio#command-tools

3. **Set ANDROID_HOME Environment Variable**
   ```bash
   # macOS/Linux - add to ~/.bash_profile, ~/.zshrc, or equivalent
   export ANDROID_HOME=$HOME/Library/Android/Sdk
   export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH

   # Windows - add to System Environment Variables
   ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
   ```

4. **Install Android SDK Components**
   ```bash
   # Using sdkmanager (comes with Android Studio)
    sdkmanager "platforms;android-35"
    sdkmanager "build-tools;35.0.0"
   sdkmanager "platform-tools"
   ```

### Option A: Build Using Command Line (Recommended for CI/CD)

1. **Clone/Download the project** to your local machine

2. **Navigate to the project directory**
   ```bash
   cd /path/to/seerah-app
   ```

3. **Build the Signed APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   Output: `android/app/build/outputs/apk/release/app-release.apk`

4. **Build the Signed AAB (Android App Bundle)**
   ```bash
   ./gradlew bundleRelease
   ```
   Output: `android/app/build/outputs/bundle/release/app-release.aab`

### Option B: Build Using Android Studio (User-Friendly)

1. **Open Android Studio**
   - File → Open → Select the `android` folder

2. **Build the APK**
   - Build → Build Bundle(s)/APK(s) → Build APK(s)
   - Output: `android/app/build/outputs/apk/release/app-release.apk`

3. **Build the AAB**
   - Build → Build Bundle(s)/APK(s) → Build Bundle(s)
   - Output: `android/app/build/outputs/bundle/release/app-release.aab`

### Signing Configuration

The Android project reads signing details from Codemagic's secure environment:

```text
CM_KEYSTORE_PATH
CM_KEYSTORE_PASSWORD
CM_KEY_ALIAS
CM_KEY_PASSWORD
```

Both APK and AAB are signed by the Codemagic workflow. A release build fails
explicitly when these variables are not available.

---

## 🎯 Google Play Store Submission Steps

### 1. Prepare Your App for Release

#### Test the APK First
```bash
# Install APK on Android device or emulator for testing
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

#### Verify App Works
- Test all major features
- Check both portrait and landscape modes
- Test on different Android versions (min SDK 26)

### 2. Create Google Play Developer Account

1. Go to: https://play.google.com/console/signup
2. Pay the one-time registration fee ($25 USD)
3. Complete your developer profile:
   - Name
   - Email
   - Developer website
   - Privacy policy URL (required)
   - Store listing details

### 3. Create a New App in Play Console

1. **Go to Play Console**: https://play.google.com/console
2. **Click "Create App"**
3. **Fill in app details**:
   - **App Name**: Seerah
   - **Default language**: English
   - **App or game**: Select appropriate category
   - **Free or paid**: Select "Free"

4. **Accept declarations**:
   - Target audience
   - Content rating
   - Privacy policy

### 4. Complete Store Listing

Navigate to **Store listing** section and fill in:

1. **App name**: Seerah
2. **Short description** (80 chars):
   ```
   Learn the life stories of Prophet Muhammad (PBUH)
   ```

3. **Full description** (4000 chars):
   ```
   Seerah is an interactive mobile app for learning about the life of Prophet Muhammad (peace be upon him). 
   
   Features:
   - Engaging stories about the Prophet's life
   - Interactive quizzes to test your knowledge
   - Gamification elements for motivation
   - Multi-language support (Arabic & English)
   - Audio narration (Text-to-Speech)
   - Offline reading capabilities
   
   Perfect for Islamic education, personal learning, or sharing with family.
   ```

4. **Screenshots** (required - 2 to 8 per device type)
   - 5.12 inch: 1080 × 2340 (recommended)
   - Upload screenshots showing main features

5. **Feature Graphic** (1024 × 500)
   - Promotional image for store listing

6. **App Icon** (512 × 512)
   - High-resolution icon

7. **Category**: Education or lifestyle

8. **Content rating**: Fill in the questionnaire

### 5. Upload Build (APK/AAB)

Navigate to **Releases** → **Production** section:

1. **Create new release**
2. **Upload APK or AAB**:
   - AAB is recommended (handles different devices automatically)
   - File: `android/app/build/outputs/bundle/release/app-release.aab`

3. **Add release notes** (what's new):
   ```
   Initial release - Seerah app with interactive stories about Prophet Muhammad
   ```

4. **Review app changes** (Play Console will review):
   - Check for policy violations
   - Verify targeting and content rating
   - Ensure proper permissions

### 6. Content Rating

1. Go to **Content rating** section
2. Complete the **IARC questionnaire**:
   - Answer questions about your app content
   - System automatically assigns age rating
3. Save rating

### 7. Privacy Policy

1. Create a privacy policy (required)
2. Host on your website or use privacy generator: https://termly.io/products/privacy-policy-generator/
3. Add URL in **App content** → **Privacy policy**

### 8. Target Audience & Content

1. Select **Target audience**:
   - Family Friendly: Yes (if appropriate)
   - Age: 13+ or All ages
   
2. Confirm **Content rating** details

### 9. App Signing

Google Play will handle app signing automatically (recommended):

1. **Let Google manage your app signing** (recommended):
   - More secure
   - Easier to manage
   - Your keystore is backed up by Google

2. Or **Manage signing yourself**:
   - Keep your keystore file safe
   - Our keystore path: `android/app/seerah-release-key.keystore`
   - ⚠️ **DO NOT lose this file** - you won't be able to update your app without it

### 10. Submit for Review

1. Review all sections:
   - ✅ Store listing complete
   - ✅ Content rating submitted
   - ✅ Privacy policy provided
   - ✅ Build uploaded and signed
   - ✅ All required graphics provided

2. Click **"Submit for review"**

3. **Review typically takes 1-24 hours**
   - You'll get email notifications about status
   - If rejected, follow feedback and resubmit

4. Once approved, app becomes **available on Google Play Store**

---

## 🔒 Security Best Practices

### Keystore Safety
⚠️ **CRITICAL**: Your keystore file (`seerah-release-key.keystore`) is essential for app updates.

1. **Backup your keystore**:
   ```bash
   cp android/app/seerah-release-key.keystore ~/secure-backup/
   ```

2. **Store securely**:
   - Don't commit to public repositories
   - Store in password-protected location
   - Cloud backup (encrypted)
   - Multiple secure backups

3. **Use Google Play's App Signing** (recommended):
   - Upload unsigned APK to Play Console
   - Google manages the signing key
   - More secure approach

### Password Management
- Never put keystore passwords in source code or documentation.
- Store the keystore and its passwords in Codemagic's code signing identities.
- Keep a secure backup of the keystore because it is required for future updates.

---

## 🚀 Next Steps After Approval

### 1. Monitor App Performance
- Check **Statistics** in Play Console
- Monitor crash reports
- Review user feedback and ratings

### 2. Update Your App
- Update version code and version name in `android/app/build.gradle`
- Rebuild APK/AAB with same keystore
- Upload new build to Play Console
- Submit for review (usually faster for updates)

### 3. Set Up CI/CD (Optional)
For automated builds and releases:

```bash
# Example GitHub Actions workflow
./gradlew assembleRelease \
  -PkeyStore="path/to/keystore.keystore" \
  -PkeyStorePassword="$KEYSTORE_PASSWORD" \
  -PkeyAlias="seerah-release" \
  -PkeyPassword="$KEY_PASSWORD"
```

---

## 📱 Testing Before Submission

### Local Testing
```bash
# Install on device
adb install -r android/app/build/outputs/apk/release/app-release.apk

# Test key features
# - Navigation
# - Stories loading
# - Quizzes functionality
# - Audio narration
# - Offline access
```

### Beta Testing
1. Use Play Console's **Open testing** or **Closed testing**
2. Invite users to test via link
3. Gather feedback before public release

### Emulator Testing
```bash
# Create virtual device in Android Studio
# Or use:
emulator -avd Pixel_4_API_34 &
adb install android/app/build/outputs/apk/release/app-release.apk
```

---

## ❓ Troubleshooting

### Build Fails with Signing Error
```bash
# Verify keystore validity
keytool -v -list -keystore android/app/seerah-release-key.keystore

# Check gradle sync
cd android
./gradlew clean
./gradlew assembleRelease
```

### App Crashes on Launch
- Check Android logs: `adb logcat | grep "SEERAH"`
- Verify minimum SDK version
- Check web asset loading in `capacitor.config.ts`

### Play Console Upload Issues
- Ensure AAB format (not APK for store submission)
- Check version code is higher than previous
- Verify app signing certificate matches
- Check app size limits

### Performance Issues
- Reduce image sizes
- Enable code minification in build.gradle
- Test on actual devices (not just emulator)

---

## 📚 Useful Resources

- **Capacitor Docs**: https://capacitorjs.com/docs/getting-started
- **Android Build Documentation**: https://developer.android.com/build
- **Google Play Console**: https://play.google.com/console
- **Google Play Policies**: https://play.google.com/about/developer-content-policy/
- **App Signing**: https://developer.android.com/studio/publish/app-signing

---

## ✅ Checklist Before Submission

- [ ] App tested on real Android device
- [ ] Version code and version name set correctly
- [ ] Privacy policy URL configured
- [ ] All screenshots uploaded (5.12" format recommended)
- [ ] Feature graphic (1024×500) uploaded
- [ ] App icon (512×512) uploaded
- [ ] Content rating completed
- [ ] Target audience configured
- [ ] Store listing text complete and proofread
- [ ] Release notes prepared
- [ ] AAB file built and ready
- [ ] Keystore backed up securely
- [ ] Tested on minimum SDK version (Android 8.0 / API 26)

---

## 📞 Support

For issues:
1. Check Play Console **Messaging** section for feedback
2. Review crash reports in **Statistics**
3. Check Android Studio build logs
4. Visit: https://capacitorjs.com/docs
5. Consult: https://developer.android.com/docs
