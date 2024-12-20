import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import authErrorMessagesParser from "../../../utils/authErrorMessagesParser";
import { showMessage } from "react-native-flash-message";
import {Formik,} from 'formik';
import styles from './loginStyle';
import Input from "../../../component/Input";
import Button from "../../../component/Button";


const initialFormValues={
    userMail:"",
    password:""
}

export default function Login({navigation}){

    const[loading, setLoading]=useState(false)

    function handleSignUp(){
        navigation.navigate("SignPage")
    }

    async function handleFormSubmit(formValues) {
        try {
            setLoading(true)
            await auth().signInWithEmailAndPassword(
                formValues.userMail,
                formValues.password
            );
            console.log("giriş yapıldı")
            setLoading(false)
        } catch (error) {
            setLoading(true)
            showMessage({
                message:authErrorMessagesParser(error.code),
                type:"danger",
            })
            setLoading(false)
        }
    }
    return(
        <ImageBackground
            source={require("../../../assets/images/diyet_login.png")}
            style={styles.background}
        >
        <View style={styles.overlay}>
            <Text style={styles.big_title}>..Diyetim..</Text>
            <View style={styles.container}>
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                {({values, handleChange, handleSubmit})=>(
                    <>
                        <Text style={styles.title}>Hoşgeldiniz...</Text>
                        <Input value={values.userMail}  onType={handleChange('userMail')} placeholder="e-postanızı giriniz"/>
                        <Input value={values.password}  onType={handleChange('password')} placeholder="şifrenizi giriniz"/>
                        <Button theme="primary" text="Giriş Yap" loading={loading} onPress={handleSubmit}/>
                        <TouchableOpacity style={styles.link_container} onPress={handleSignUp}>
                          <Text style={styles.linkText}>Hesap oluştur</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
            </View>
            </View>
    </ImageBackground>
  );
}