import { StyleSheet, Dimensions } from "react-native";

const deviceSize= Dimensions.get('window');

export default StyleSheet.create({
    container:{
        backgroundColor:"white",
        margin:10,
        padding:15,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        height:deviceSize.height/3
    },
    input_container:{
        flex:1,
    },
    modal:{
        justifyContent:"flex-end",
        margin:0,
    }
})