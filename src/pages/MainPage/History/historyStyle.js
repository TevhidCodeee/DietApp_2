import { StyleSheet } from "react-native";
import colors from "../../../style/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray_white,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign:"center",
        backgroundColor: colors.gray_white,
        padding:16,
        color:colors.darkGray
      },
      dateGroup: {
        marginHorizontal: 16,
        marginVertical: 8,
      },
      dateHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colors.green,
        flex:1,
        textAlign:"center",
      },
      mealsList: {
        gap: 8,
      },
      listContainer: {
        paddingBottom: 16,
      },
      mealTypeGroup: {
        marginVertical: 8,
        paddingHorizontal: 16,
      },
      mealTypeHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.orange,
        marginBottom: 8,
      },
})