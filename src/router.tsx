import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/Auth/Login";
import Sign from "./pages/Auth/Sign";
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "./style/colors";
import FlashMessage from "react-native-flash-message";
import Rooms from "./pages/Rooms";
import DietPlans from "./pages/MainPage/DietPlans";
import History from "./pages/MainPage/History";
import MealDetailPage from "./pages/MealDetailPage";
import MealReminder from "./pages/MainPage/MealReminder";
import { notificationHandler } from './utils/notificationHandler';
import HealtyAdvice from "./pages/MainPage/HealthAdvice";


type RootStackParamList = {
  LoginPage:{ roomName: string; messageId: string } ;
  MealDetailPage: { roomName: string; messageId: string };
  SignPage:undefined;
  RoomsPage:undefined;
  DietPlans:undefined;
  MealReminder:undefined;
  History:undefined;
  HealthAdvice:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();



export default function App(){

  const [useSession, setUseSession] = useState(false);

  useEffect(()=>{
    auth().onAuthStateChanged((user)=>{
      setUseSession(!!user)
      notificationHandler.configure();
    })
  },[])
  

  function AuthStack(){
    return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="LoginPage" component={Login}/>
        <Stack.Screen name="SignPage" component={Sign}/>
      </Stack.Navigator>
    )
  }
  
  return (
    <NavigationContainer>
      {!useSession ? (
        <AuthStack />
      ) : (
        <Stack.Navigator screenOptions={{
          headerTransparent: true,
        }}>

          <Stack.Screen name="RoomsPage" component={Rooms} options={{
            title:"",
            headerTintColor:colors.sandybrown,
            headerTitleAlign:"center",
            headerLeft:()=>(
              <Icon
                  name="logout"
                  size={30}
                  color={colors.sandybrown}
                  style={{ marginLeft: 10, fontWeight:"bold" }}
                  onPress={() => auth().signOut()}
                />
            )
          }}/>
          <Stack.Screen name="DietPlans" component={DietPlans} options={{
            title:"Öğün Vakitleri",
            headerTintColor:colors.darkGray,
            headerTitleAlign:"center",
            
          }}/>
          <Stack.Screen
            name="MealDetailPage"
            component={MealDetailPage}
            options={({ route, navigation }) => ({
              title: route.params?.roomName || ' ', // Başlık olarak parametre veya boşluk
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
                color: colors.darkGray,
              },
              headerTransparent: false, // Şeffaf olmasın
              headerStyle: {
                backgroundColor:colors.elevation_white, // Turuncu arka plan (isteğe göre değiştirilebilir)
              },
              headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                      name="account-arrow-left-outline"
                      size={25}
                      color={colors.darkGray}
                      style={{ marginRight: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen name="MealReminder" component={MealReminder} 
          options={({navigation }) => ({
            title: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{marginLeft: 10, marginTop:12, color:colors.sandybrown, fontWeight:"bold" }}>Geri</Text>
              </TouchableOpacity>
            ),
          })}/>
          <Stack.Screen name="History" component={History} 
          options={({navigation }) => ({
            title: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ marginLeft: 15, marginTop:10, color:colors.sandybrown, fontWeight:"bold" }}>Geri</Text>
              </TouchableOpacity>
            ),
          })}/>
          <Stack.Screen name="HealthAdvice" component={HealtyAdvice} 
          options={({navigation }) => ({
              title: "",
              
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{marginLeft: 10, marginTop:12, color:colors.sandybrown, fontWeight:"bold" }}>Geri</Text>
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      )}
    <FlashMessage position="top"/>
    </NavigationContainer>
  );
}