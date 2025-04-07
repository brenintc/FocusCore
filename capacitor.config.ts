
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1980cd77696641fdb2714ef90cdf9e28',
  appName: 'focuscore-time-mastery',
  webDir: 'dist',
  server: {
    url: 'https://1980cd77-6966-41fd-b271-4ef90cdf9e28.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: "#4285F4"
  }
};

export default config;
