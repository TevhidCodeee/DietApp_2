import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export const notificationHandler = {
  configure: async () => {
    try {
      // Firebase Messaging izinlerini al
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Firebase izin durumu:', authStatus);
      } else {
        console.warn('Firebase bildirim izinleri reddedildi.');
      }

      // React Native Push Notification yapılandırması
      PushNotification.configure({
        onRegister: async function (token) {
          const fcmToken = await messaging().getToken();
          console.log('FCM Token:', fcmToken);
        },
        onNotification: function (notification) {
          console.log('Bildirim alındı:', notification);

          if (notification.userInteraction) {
            console.log('Kullanıcı bildirime tıkladı:', notification);
          }
        },
        requestPermissions: true,
      });

      // Android için bildirim kanalı oluştur
      if (Platform.OS === 'android') {
        PushNotification.createChannel(
          {
            channelId: 'meal_reminders',
            channelName: 'Yemek Hatırlatıcıları',
            channelDescription: 'Yemek hatırlatıcı bildirimleri',
            playSound: true,
            soundName: 'default',
            importance: 4, // Yüksek öncelikli bildirimler
            vibrate: true,
          },
          (created) =>
            console.log(
              `Kanal oluşturma durumu: ${created ? 'Başarılı' : 'Mevcut'}`
            )
        );
      }
    } catch (error) {
      console.error('NotificationHandler.configure hatası:', error);
    }
  },

  createLocalNotification: (title, message, date, options = {}) => {
    try {
      if (!(date instanceof Date)) {
        console.error('Geçersiz tarih formatı:', date);
        throw new Error('Tarih geçerli bir Date nesnesi olmalıdır.');
      }

      PushNotification.localNotificationSchedule({
        title,
        message,
        date,
        channelId: 'meal_reminders',
        playSound: true,
        soundName: 'default',
        vibrate: true,
        priority: 'high',
        ...options,
      });

      console.log('Yerel bildirim zamanlandı:', { title, message, date });
    } catch (error) {
      console.error('createLocalNotification hatası:', error);
    }
  },

  cancelNotification: (id) => {
    try {
      if (Platform.OS === 'ios') {
        PushNotification.cancelLocalNotifications({ id });
      } else {
        PushNotification.cancelLocalNotification(id);
      }
      console.log(`Bildirim iptal edildi: ID=${id}`);
    } catch (error) {
      console.error('cancelNotification hatası:', error);
    }
  },

  getInitialNotification: async () => {
    try {
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log(
          'Uygulama bildirimi ile açıldı:',
          initialNotification.notification
        );
        return initialNotification.notification;
      }

      const localInitial = PushNotification.popInitialNotification();
      if (localInitial) {
        console.log('Yerel başlangıç bildirimi:', localInitial);
        return localInitial;
      }

      return null;
    } catch (error) {
      console.error('getInitialNotification hatası:', error);
      return null;
    }
  },
};
