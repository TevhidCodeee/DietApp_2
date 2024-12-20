import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
import HistoryCard from '../../../component/Card/HistoryCard';
import styles from './historyStyle';


export default function History() {
  const [meals, setMeals] = useState([]);
  const [dietPlans, setDietPlans] = useState({});

  useEffect(() => {
    // Önce diet planlarını al
    const dietPlansRef = database().ref('dietplans/');
    const mealsRef = database().ref('mealDetail/');

    const fetchData = async () => {
      try {
        // Diet planlarını al
        const dietPlansSnapshot = await dietPlansRef.once('value');
        const dietPlansData = dietPlansSnapshot.val() || {};
        setDietPlans(dietPlansData);

        // Yemek verilerini dinle
        mealsRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (!data) {
            setMeals([]);
            return;
          }

          // Verileri düzleştir ve diet plan bilgisini ekle
          const flattenedMeals = [];
          Object.entries(data).forEach(([parentKey, parentValue]) => {
            // Diet plan bilgisini al
            const dietPlanInfo = dietPlansData[parentKey] || { text: 'Bilinmeyen Öğün' };
            
            Object.entries(parentValue).forEach(([childKey, childValue]) => {
              if (childValue && childValue.date && childValue.text) {
                flattenedMeals.push({
                  id: `${parentKey}-${childKey}`,
                  date: new Date(childValue.date),
                  text: childValue.text,
                  username: childValue.username || '',
                  mealType: dietPlanInfo.text || 'Bilinmeyen Öğün',
                  parentKey
                });
              }
            });
          });

          // Önce tarihe göre grupla
          const groupedByDate = flattenedMeals.reduce((groups, meal) => {
            if (isNaN(meal.date.getTime())) {
              console.log('Geçersiz tarih bulundu:', meal);
              return groups;
            }
            const dateStr = meal.date.toLocaleDateString('tr-TR');
            if (!groups[dateStr]) {
              groups[dateStr] = {};
            }
            if (!groups[dateStr][meal.mealType]) {
              groups[dateStr][meal.mealType] = [];
            }
            groups[dateStr][meal.mealType].push(meal);
            return groups;
          }, {});

          // Her gruptaki yemekleri saate göre sırala ve formatla
          const formattedData = Object.entries(groupedByDate)
            .map(([date, mealTypes]) => ({
              date,
              mealTypes: Object.entries(mealTypes).map(([type, meals]) => ({
                type,
                meals: meals.sort((a, b) => b.date - a.date)
              })),
              id: date
            }))
            .sort((a, b) => {
              const dateA = new Date(a.mealTypes[0].meals[0].date);
              const dateB = new Date(b.mealTypes[0].meals[0].date);
              return dateB - dateA;
            });

          setMeals(formattedData);
        });
      } catch (error) {
        console.error('Veri işleme hatası:', error);
        setMeals([]);
      }
    };

    fetchData();
    return () => mealsRef.off();
  }, []);

  const renderMealType = ({ type, meals }) => (
    <View key={type} style={styles.mealTypeGroup}>
      <Text style={styles.mealTypeHeader}>{type}</Text>
      {meals.map((meal) => (
        <HistoryCard key={meal.id} meal={meal} />
      ))}
    </View>
  );

  const renderDateGroup = ({ item }) => (
    <View style={styles.dateGroup}>
      <Text style={styles.dateHeader}>{item.date}</Text>
      {item.mealTypes.map((mealType) => renderMealType(mealType))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yemek Geçmişi</Text>
      <FlatList
        data={meals}
        renderItem={renderDateGroup}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz yemek kaydı bulunmuyor</Text>
        }
      />
    </View>
  );
}