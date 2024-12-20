import { StyleSheet } from "react-native";
import colors from "../../../style/colors";

export default StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover", // Arka planın ekranı kaplaması
        justifyContent: "center", // Ortalamak için
        alignItems: "center", // Ortalamak için
      },
      overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Şeffaf siyah bir katman
        width: "100%",
      },
      container: {
        width: "90%",
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Beyaz form arka planı
        borderRadius: 8,
        elevation: 5, // Hafif gölge efekti
      },

      big_title:{
        color:colors.elevation_white,
        fontSize:50,
        marginBottom:"20%",
        fontWeight:"bold"
      },
      title: {
        color:colors.sandybrown,
        fontSize: 32,
        fontWeight: "bold",
        margin: 20,

    },

    link_container:{
        marginTop:15,
        marginLeft:"35%",
        marginBottom:30
    },

    linkText: {
        fontSize: 14,
        color: "#cccccc",
        textDecorationLine: "underline",
    },
})