import React, { useEffect, useState } from "react";
import { FlatList, View, Alert } from "react-native";
import styles from "./dietPlansStyle";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import FloatingButton from "../../../component/FloatingButton";
import parseContentData from "../../../utils/parseContentData";
import MealPlannerModal from "../../../component/Modal/MealPlannerModal";
import DpCard from "../../../component/Card/DietPlansCard";

export default function DietPlans({ navigation }) {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [contentList, setContentList] = useState([]);
  const userMail = auth().currentUser.email;
  const username = userMail.split("@")[0];

  useEffect(() => {
    const reference = database().ref("dietplans/").orderByChild("date");

    const listener = reference.on("value", (snapshot) => {
      const contentData = snapshot.val();
      const parsedData = parseContentData(contentData);
      const sortedData = parsedData.sort((a, b) =>
        new Date(a.date) - new Date(b.date)
      );
      setContentList(sortedData);
    });

    return () => reference.off("value", listener);
  }, []);

  function handleInputToggle() {
    setInputModalVisible((prev) => !prev);
  }

  function handleSendContent(content) {
    const contentObject = {
      text: content,
      userMail: username,
      date: new Date().toISOString(),
    };

    const newRef = database().ref("dietplans/").push();
    newRef
      .set(contentObject)
      .then(() => {
        console.log("Veri başarıyla gönderildi.");
        const newItem = { 
          ...contentObject, 
          id: newRef.key, 
          uniqueKey: `content_${newRef.key}_${Date.now()}` 
        };

        setContentList((prevList) => [...prevList, newItem]);

        database()
          .ref(`history/${username}`)
          .push(newItem)
          .then(() => console.log("Geçmişe kaydedildi"))
          .catch((error) => console.error("Geçmiş kaydı hatası:", error));
      })
      .catch((error) => console.error("Veri gönderme hatası:", error));

    handleInputToggle();
  }

  function handleDeleteCard(item) {
    Alert.alert(
      "Silme Onayı",
      "Bu kartı silmek istediğinizden emin misiniz?",
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
    // Firebase'den dietplans'dan sil
    database()
      .ref(`dietplans/${item.id}`)
      .remove()
      .then(() => {
        console.log("Dietplans'dan silindi");
        
        // Firebase'den history'den sil
        database()
          .ref(`history/${username}`)
          .orderByChild("id")
          .equalTo(item.id)
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((child) => {
              child.ref.remove();
            });
          });

        // Local state'den sil
        setContentList((prevList) => 
          prevList.filter((content) => content.id !== item.id)
        );
      })
      .catch((error) => {
        console.error("Silme hatası:", error);
        Alert.alert("Hata", "Kart silinirken bir hata oluştu.");
      });
  }

  function handleCardSelect(item) {
    navigation.navigate("MealDetailPage", { roomId: item.id, roomName: item.text });
  }

  const renderContent = ({ item }) => (
    <DpCard
      key={item.uniqueKey}
      dpCard={item}
      onPress={() => handleCardSelect(item)}
      onDelete={() => handleDeleteCard(item)}
      isOwner={item.userMail === username}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contentList}
        renderItem={renderContent}
        keyExtractor={(item) => item.uniqueKey}
        numColumns={1}
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