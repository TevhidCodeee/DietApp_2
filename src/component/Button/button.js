import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './buttonStyle';

export default function Button({onPress, text, theme="primary"}){
    return(
        <View style={styles[theme].container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles[theme].button}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}