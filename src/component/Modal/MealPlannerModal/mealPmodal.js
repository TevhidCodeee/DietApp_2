import React, { useState } from "react";
import { TextInput, View,Text } from 'react-native';
import styles from './mealPmodalStyle';
import Button from "../../Button";
import Modal from 'react-native-modal';

export default function MealPlannerModal({ visible, onClose, onSend }) {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    function handleSend() {
        // Remove leading/trailing whitespace
        const trimmedText = text ? text.trim() : '';
        
        if (!trimmedText) {
            setError('Lütfen bir metin giriniz.');
            return;
        }

        console.log("Gönderilen metin:", trimmedText);
        onSend(trimmedText);
        setText('');
        setError('');
    }

    function handleTextChange(value) {
        setText(value);
        if (error) {
            setError('');
        }
    }

    return (
        <Modal
            style={styles.modal}
            isVisible={visible}
            swipeDirection="down"
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
        >
            <View style={styles.container}>
                <View style={styles.input_container}>
                    <TextInput
                        placeholder="Ekle"
                        onChangeText={handleTextChange}
                        value={text}
                        multiline
                    />
                    {error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : null}
                </View>
                <Button 
                    text="Gönder" 
                    onPress={handleSend}
                    disabled={!text.trim()}
                />
            </View>
        </Modal>
    );
}