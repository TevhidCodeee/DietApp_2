import { StyleSheet } from "react-native";
import colors from "../../style/colors";


const base_style = StyleSheet.create({
    container:{
        padding:13,
        marginHorizontal:16,
        marginTop:25,
        justifyContent:"center",
        alignItems:"center",
    }
})

export default StyleSheet.create({
    primary: StyleSheet.create({
        ...base_style,
        container:{
            ...base_style.container,
            backgroundColor:colors.sandybrown
        },
    }),
    secondary: StyleSheet.create({
        ...base_style,
        container:{
            ...base_style.container,
            backgroundColor:"#fff",
            marginTop:15,
            marginBottom:-50
        },
        button:{
            color:colors.sandybrown,
            fontSize:17,
            fontWeight:"bold"
        }
    })
})