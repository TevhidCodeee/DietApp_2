import React from "react";
import{ View, TextInput } from 'react-native';
import styles from './inputStyle';

export default function Input({value, onType, placeholder, iconName, isSecure}){
    return(
        <View style={styles.container}>
            <TextInput 
            placeholderTextColor="#fff" autoCapitalize="none" 
            onChangeText={onType} 
            style={styles.input} 
            placeholder={placeholder}
            value={value}
            />
        </View>
    )
}