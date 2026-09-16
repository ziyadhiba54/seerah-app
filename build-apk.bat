@echo off
REM ==============================================================================
REM Seerah App - APK Builder Script (Windows)
REM Builds signed APK automatically for Google Play Store
REM ==============================================================================

setlocal enabledelayedexpansion

echo.
echo 🚀 Demarrage de la compilation Seerah APK...
echo.

REM Step 1: Check prerequisites
echo 📋 Verification des prerequis...
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ Java JDK n'est pas installe
    echo Telecharge: https://www.oracle.com/java/technologies/downloads/
    pause
    exit /b 1
)
echo ✅ Java JDK trouve

if "%ANDROID_HOME%"=="" (
    echo ❌ ANDROID_HOME n'est pas configure
    echo Configure la variable d'environnement ANDROID_HOME
    pause
    exit /b 1
)
echo ✅ ANDROID_HOME configure: %ANDROID_HOME%

REM Step 2: Build web app
echo.
echo 🔨 Compilation du web app (React)...
call npm run build
if errorlevel 1 (
    echo ❌ Erreur lors de la compilation web
    pause
    exit /b 1
)
echo ✅ Build web complete

REM Step 3: Sync with Capacitor
echo.
echo 📱 Synchronisation avec Capacitor...
call npx cap sync
if errorlevel 1 (
    echo ❌ Erreur lors de la synchronisation
    pause
    exit /b 1
)
echo ✅ Sync complete

REM Step 4: Build signed APK
echo.
echo 📦 Compilation APK signee...
cd android
call gradlew.bat assembleRelease --warning-mode all
if errorlevel 1 (
    echo ❌ Erreur lors de la compilation APK
    cd ..
    pause
    exit /b 1
)
cd ..
echo ✅ APK compile

REM Step 5: Build signed AAB
echo.
echo 📦 Compilation Android App Bundle (Play Store)...
cd android
call gradlew.bat bundleRelease --warning-mode all
if errorlevel 1 (
    echo ❌ Erreur lors de la compilation AAB
    cd ..
    pause
    exit /b 1
)
cd ..
echo ✅ AAB compile

REM Step 6: Output locations
echo.
echo ═══════════════════════════════════════════════════════
echo ✅ COMPILATION REUSSIE!
echo ═══════════════════════════════════════════════════════
echo.
echo 📁 Fichiers generes:
echo.
echo APK (pour test direct):
echo android\app\build\outputs\apk\release\app-release.apk
echo.
echo AAB (pour Google Play Store):
echo android\app\build\outputs\bundle\release\app-release.aab
echo.
echo ═══════════════════════════════════════════════════════
echo.
echo 📱 Prochaines etapes:
echo.
echo 1️⃣  TESTER L'APK sur un appareil Android:
echo    adb install -r android\app\build\outputs\apk\release\app-release.apk
echo.
echo 2️⃣  PUBLIER sur Google Play Store:
echo    - Va sur: https://play.google.com/console
echo    - Cree une app
echo    - Upload le fichier .aab
echo    - Remplis les details
echo    - Soumet pour review
echo.
echo Besoin d'aide? Voir: CAPACITOR_BUILD_GUIDE.md
echo.
pause
