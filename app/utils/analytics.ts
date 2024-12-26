import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

// Olay Kaydetme
export const logAnalyticsEvent = (eventName: string, eventParams?: any) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

// Sayfa Görüntüleme
export const logPageView = (pageName: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_title: pageName,
      page_location: window?.location?.href,
      page_path: window?.location?.pathname
    });
  }
};

// Kullanıcı Etkileşimi
export const logUserInteraction = (action: string, category: string, label?: string) => {
  if (analytics) {
    logEvent(analytics, 'user_interaction', {
      action,
      category,
      label
    });
  }
}; 