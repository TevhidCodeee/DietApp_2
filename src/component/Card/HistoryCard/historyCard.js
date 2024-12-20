import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './hCStyle';

const HistoryCard = ({ meal }) => {
  // Tarih formatını düzenle
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.mealText}>{meal.text}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.timeText}>{formatDate(meal.date)}</Text>
          <Text style={styles.usernameText}>{meal.username}</Text>
        </View>
      </View>
    </View>
  );
};


export default HistoryCard;