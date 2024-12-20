import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Platform, 
  Alert 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { notificationHandler } from '../../../utils/notificationHandler';
import styles from './mRStyle';

const MealReminder = () => {
  const [reminderText, setReminderText] = useState('');
  const [reminderTime, setReminderTime] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  const fetchReminders = useCallback(async () => {
    try {
      const snapshot = await firestore()
        .collection('meal_reminders')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();

      const loadedReminders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setReminders(loadedReminders);
    } catch (error) {
      console.error('Hatırlatıcı yükleme hatası:', error);
      Alert.alert('Hata', 'Hatırlatıcılar yüklenemedi');
    }
  }, []);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Bildirim izinlerini al
        await messaging().requestPermission();
        
        // Handler'ı yapılandır
        notificationHandler.configure();

        // Başlangıç bildirimini kontrol et
        const initialNotification = await notificationHandler.getInitialNotification();
        if (initialNotification) {
          console.log('Initial notification:', initialNotification);
        }

        // Hatırlatıcıları çek
        fetchReminders();
      } catch (error) {
        console.error('Notification setup error:', error);
        fetchReminders();
      }
    };

    setupNotifications();
  }, [fetchReminders]);

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || reminderTime;
    setShowTimePicker(Platform.OS === 'ios');
    setReminderTime(currentTime);
  };

  const addReminder = async () => {
    if (!reminderText.trim()) {
      Alert.alert('Uyarı', 'Yemek adını giriniz');
      return;
    }

    const now = new Date();
    if (reminderTime < now) {
      Alert.alert('Uyarı', 'Geçmiş zamanlı hatırlatıcı ekleyemezsiniz');
      return;
    }

    try {
      const newReminder = {
        text: reminderText,
        time: reminderTime.toISOString(),
        createdAt: firestore.FieldValue.serverTimestamp()
      };

      const docRef = await firestore().collection('meal_reminders').add(newReminder);

      notificationHandler.createLocalNotification(
        "Yemek Hatırlatıcısı", 
        `${reminderText} yemeği zamanı!`, 
        reminderTime,
        { 
          id: docRef.id,
          userInfo: { reminderId: docRef.id } 
        }
      );

      setReminders(prevReminders => [
        { id: docRef.id, ...newReminder }, 
        ...prevReminders
      ]);
      
      setReminderText('');
      setReminderTime(new Date());
    } catch (error) {
      console.error('Hatırlatıcı ekleme hatası:', error);
      Alert.alert('Hata', 'Hatırlatıcı eklenemedi');
    }
  };

  const deleteReminder = async (id) => {
    try {
      await firestore().collection('meal_reminders').doc(id).delete();
      notificationHandler.cancelNotification(id);
      
      setReminders(prevReminders => 
        prevReminders.filter(reminder => reminder.id !== id)
      );
    } catch (error) {
      console.error('Hatırlatıcı silme hatası:', error);
      Alert.alert('Hata', 'Hatırlatıcı silinemedi');
    }
  };

  const startEditing = (reminder) => {
    setEditingReminder(reminder);
    setReminderText(reminder.text);
    setReminderTime(new Date(reminder.time));
  };

  const updateReminder = async () => {
    if (!editingReminder) return;

    try {
      await firestore()
        .collection('meal_reminders')
        .doc(editingReminder.id)
        .update({
          text: reminderText,
          time: reminderTime.toISOString()
        });

      notificationHandler.cancelNotification(editingReminder.id);
      
      notificationHandler.createLocalNotification(
        "Yemek Hatırlatıcısı", 
        `${reminderText} yemeği zamanı!`, 
        reminderTime,
        { 
          id: editingReminder.id,
          userInfo: { reminderId: editingReminder.id } 
        }
      );

      setReminders(prevReminders => 
        prevReminders.map(reminder => 
          reminder.id === editingReminder.id 
            ? { 
                ...reminder, 
                text: reminderText, 
                time: reminderTime.toISOString() 
              } 
            : reminder
        )
      );

      setEditingReminder(null);
      setReminderText('');
      setReminderTime(new Date());
    } catch (error) {
      console.error('Hatırlatıcı güncelleme hatası:', error);
      Alert.alert('Hata', 'Hatırlatıcı güncellenemedi');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yemek Hatırlatıcısı</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Yemek Adı"
          value={reminderText}
          onChangeText={setReminderText}
        />
        
        <TouchableOpacity 
          style={styles.timeButton} 
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.timeButtonText}>
            {reminderTime.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={reminderTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
          />
        )}

        {editingReminder ? (
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={updateReminder}
          >
            <Text style={styles.addButtonText}>Güncelle</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addReminder}
          >
            <Text style={styles.addButtonText}>Ekle</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <View style={styles.reminderContent}>
              <Text style={styles.reminderText}>{item.text}</Text>
              <Text style={styles.reminderTime}>
                {new Date(item.time).toLocaleTimeString()}
              </Text>
            </View>
            <View style={styles.reminderActions}>
              <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => startEditing(item)}
              >
                <Text style={styles.buttonText}>Düzenle</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => deleteReminder(item.id)}
              >
                <Text style={styles.buttonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MealReminder;