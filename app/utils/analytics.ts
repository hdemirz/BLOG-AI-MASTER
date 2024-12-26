import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';
import { app } from '../firebase';

let analytics: Analytics | null = null;

// Analytics'i yalnızca tarayıcı ortamında başlat
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export function logUserInteraction(action: string, category: string, label: string) {
  if (!analytics) return;

  logEvent(analytics, action, {
    event_category: category,
    event_label: label
  });
} 