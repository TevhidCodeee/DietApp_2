import React, { useState } from "react";
import { View, FlatList, Alert } from 'react-native';
import FloatingButton from "../../component/FloatingButton/FloatingButton.js";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from "../../utils/parseContentData.js";
import DpCard from "../../component/Card/DietPlansCard/dpCard.js";
import MealPlannerModal from "../../component/Modal/MealPlannerModal/mealPmodal.js";
import styles from './mdpStyle.js';

export default function MealDetailPage({ route }) {
  const { roomId } = route.params;
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [contentList, setContentList] = useState([]);
  const userMail = auth().currentUser.email;
  const username = userMail.split('@')[0];

  React.useEffect(() => {
    const mealDetailRef = database().ref(`mealDetail/${roomId}`);

    const onValueChange = mealDetailRef.on('value', snapshot => {
      const contentData = snapshot.val();
      const parsedData = parseContentData(contentData || {});

      const sortedData = parsedData.sort((a, b) =>
        new Date(a.date) - new Date(b.date)
      );

      setContentList(sortedData);
    });

    return () => mealDetailRef.off('value', onValueChange);
  }, [roomId]);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }

  function handleSendContent(content) {
    handleInputToggle();
    sendContent(content);
  }

  function sendContent(content) {
    const contentObject = {
      text: content,
      username: username,
      date: new Date().toISOString(),
    };

    database().ref(`mealDetail/${roomId}`).push(contentObject);
  }

  function handleDeleteCard(item) {
    Alert.alert(
      "Silme Onayı",
      "Bu öğeyi silmek istediğinizden emin misiniz?",
      [
        {
          text: "Vazgeç",
          style: "cancel"
        },
        {
          text: "Sil",
          onPress: () => deleteCard(item),
          style: "destructive"
        }
      ]
    );
  }

  function deleteCard(item) {
    database()
      .ref(`mealDetail/${roomId}/${item.id}`)
      .remove()
      .then(() => {
        console.log("Öğe başarıyla silindi");
        setContentList((prevList) => 
          prevList.filter((content) => content.id !== item.id)
        );
      })
      .catch((error) => {
        console.error("Silme hatası:", error);
        Alert.alert("Hata", "Öğe silinirken bir hata oluştu.");
      });
  }

  const renderContent = ({ item }) => (
    <DpCard
      dpCard={item}
      onDelete={() => handleDeleteCard(item)}
      isOwner={item.username === username}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contentList}
        renderItem={renderContent}
        keyExtractor={(item) => item.id || item.uniqueKey}
      />
      <FloatingButton icon="plus" onPress={handleInputToggle} />
      <MealPlannerModal
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
      />
    </View>
  );
}