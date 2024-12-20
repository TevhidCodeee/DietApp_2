import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../style/colors";


const device = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 15,
        width: '48%', 
        marginHorizontal: 4, 
        marginVertical: 8,
        height: device.height / 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.orange
      },
      title: {
        textAlign:"center",
        color:colors.gray_white,
        fontSize:25,
        fontWeight:"bold"
      },
    })