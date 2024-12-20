import React from 'react';
import { View } from 'react-native';
import RoomsCard from '../../component/Card/RoomsCard';
import { useNavigation } from '@react-navigation/native';
import styles from './roomsStyle'

export default function Rooms() {
  const navigation = useNavigation();

  const cards = [
    { id: 1, text: 'Diyet Planı', screen: 'DietPlans' },
    { id: 2, text: 'Hatırlatıcı', screen: 'MealReminder' },
    { id: 3, text: 'Geçmiş', screen: 'History' },
    { id: 4, text: 'Öneriler', screen: 'HealthAdvice' },
  ];

  return (
    <View style={styles.container}>
      {cards.map((card) => (
        <RoomsCard
          key={card.id}
          rooms={card}
          onPress={() => navigation.navigate(card.screen)} 
        />
      ))}
    </View>
  );
}

