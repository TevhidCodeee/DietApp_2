import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './dpCardStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DpCard = ({ dpCard, onPress, onDelete, isOwner }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{dpCard.text}</Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.username}>{dpCard.userMail}</Text>
          <Text style={styles.date}>
            {new Date(dpCard.date).toLocaleDateString('tr-TR')}
          </Text>
        </View>
        {isOwner && (
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={onDelete}
          >
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DpCard;