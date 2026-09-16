#!/bin/bash

# ==============================================================================
# Seerah App - APK Builder Script
# Builds signed APK automatically for Google Play Store
# ==============================================================================

set -e

echo "🚀 Démarrage de la compilation Seerah APK..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check prerequisites
echo -e "${BLUE}📋 Vérification des prérequis...${NC}"
if ! command -v java &> /dev/null; then
    echo "❌ Java JDK n'est pas installé"
    echo "Télécharge: https://www.oracle.com/java/technologies/downloads/"
    exit 1
fi
echo "✅ Java JDK trouvé"

if [ -z "$ANDROID_HOME" ]; then
    echo "❌ ANDROID_HOME n'est pas configuré"
    echo "Configure la variable d'environnement ANDROID_HOME"
    exit 1
fi
echo "✅ ANDROID_HOME configuré: $ANDROID_HOME"

# Step 2: Build web app
echo ""
echo -e "${BLUE}🔨 Compilation du web app (React)...${NC}"
npm run build
echo -e "${GREEN}✅ Build web complété${NC}"

# Step 3: Sync with Capacitor
echo ""
echo -e "${BLUE}📱 Synchronisation avec Capacitor...${NC}"
npx cap sync
echo -e "${GREEN}✅ Sync complété${NC}"

# Step 4: Build signed APK
echo ""
echo -e "${BLUE}📦 Compilation APK signée...${NC}"
cd android
./gradlew assembleRelease --warning-mode all
cd ..
echo -e "${GREEN}✅ APK compilé${NC}"

# Step 5: Build signed AAB (App Bundle for Play Store)
echo ""
echo -e "${BLUE}📦 Compilation Android App Bundle (Play Store)...${NC}"
cd android
./gradlew bundleRelease --warning-mode all
cd ..
echo -e "${GREEN}✅ AAB compilé${NC}"

# Step 6: Output locations
echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ COMPILATION RÉUSSIE!${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📁 Fichiers générés:${NC}"
echo ""
echo -e "${GREEN}APK (pour test direct):${NC}"
echo "android/app/build/outputs/apk/release/app-release.apk"
echo "Taille: ~$(du -sh android/app/build/outputs/apk/release/app-release.apk 2>/dev/null | cut -f1)"
echo ""
echo -e "${GREEN}AAB (pour Google Play Store):${NC}"
echo "android/app/build/outputs/bundle/release/app-release.aab"
echo "Taille: ~$(du -sh android/app/build/outputs/bundle/release/app-release.aab 2>/dev/null | cut -f1)"
echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📱 Prochaines étapes:${NC}"
echo ""
echo "1️⃣  TESTER L'APK sur un appareil Android:"
echo "   adb install -r android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "2️⃣  PUBLIER sur Google Play Store:"
echo "   - Va sur: https://play.google.com/console"
echo "   - Crée une app"
echo "   - Upload le fichier .aab"
echo "   - Remplis les détails"
echo "   - Soumets pour review"
echo ""
echo -e "${GREEN}Besoin d'aide? Voir: CAPACITOR_BUILD_GUIDE.md${NC}"
echo ""
