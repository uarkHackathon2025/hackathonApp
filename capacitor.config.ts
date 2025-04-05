import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Hackathon App',
  webDir: 'dist',
  ios: {
    // This will add required permission to info.plist for geolocation
    cordova: {
      preferences: {
        // Add iOS specific configurations for geolocation or other plugins
        'Geolocation': 'always'
      }
    }
  }
};

export default config;
