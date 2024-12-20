import { StyleSheet } from "react-native";
import colors from "../../../style/colors";

export default StyleSheet.create({
    background:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        resizeMode:"cover"
    },
    overlay:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        backgroundColor:"rgba(0,0,0,0.5)"
    },
    container:{
        width:"90%",
        backgroundColor:"rgba(0,0,0,0.5)",
        padding:20,
        elevation:5
    },
    title:{
        color:colors.sandybrown,
        fontSize:32,
        fontWeight:"bold",
        margin:20,
    },
    link_container:{
        marginTop:15,
        marginLeft:"45%",
        marginBottom:20
    },
    link_text:{
        fontSize:16,
        color:colors.elevation_white,
        textDecorationLine:"underline",
    }
})