import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
import authErrorMessagesParser from "../../../utils/authErrorMessagesParser";
import styles from './signStyle';
import { Formik } from "formik";
import Input from "../../../component/Input";
import Button from "../../../component/Button";

const initialFormValues={
    usermail:"",
    password:"",
    repassword:"",
}

export default function Sign({navigation}){

    const[loading, setLoading]=useState(false);

    function handleLogin(){
        navigation.goBack();
    }

    function handleLoginAfter(){
        navigation.navigate("LoginPage")
    }

    async function handleFormSubmit(formValues) {
        if (formValues.password !== formValues.repassword) {
            showMessage({
                message: "Şifreler uyuşmuyor", 
                type: "info", 
            });
            return;
        }
        try {
            setLoading(true)
            await auth().createUserWithEmailAndPassword(
                 formValues.usermail,
                 formValues.password);
            showMessage({
                message:"Kullanıcı Oluşturuldu",
                type:"success"
            });
            console.log("kullanıcı oluşturuldu")
            setLoading(false)
           await  navigation.goBack();
        } catch (error) {
            setLoading(true)
            showMessage({
                message:authErrorMessagesParser(error.code),
                type:"danger"
            })
            setLoading(false)
        }
    }

    return(
        <ImageBackground
          source={require("../../../assets/images/diet_sign.png")}
          style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                        {({values, handleChange, handleSubmit}) =>(
                            <>
                              <Text style={styles.title}>Kayıt Ol</Text>
                              <Input value={values.usermail} onType={handleChange("usermail")} placeholder="E-posta adresi giriniz"/>
                              <Input value={values.password} onType={handleChange("password")} placeholder="Şifrenizi giriniz"/>
                              <Input value={values.repassword} onType={handleChange("repassword")} placeholder="Şifrenizi tekrar giriniz"/>
                              <Button text="Kayıt Ol" onPress={handleSubmit}/>
                              <TouchableOpacity style={styles.link_container} onPress={handleLogin}>
                                    <Text style={styles.link_text}>Geri</Text>
                              </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
            </View>
        </ImageBackground>
    )
}