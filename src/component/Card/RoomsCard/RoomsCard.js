import React from "react";
import { Text, TouchableOpacity } from 'react-native';
import styles from './RoomsCStyle';


export default function RoomsCard({ rooms, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{rooms.text}</Text>
    </TouchableOpacity>
  );
}