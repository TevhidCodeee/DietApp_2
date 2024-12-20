import { StyleSheet } from "react-native";
import colors from "../../../style/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color:colors.darkGray,
        paddingBottom:10
      },
      categories: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
      },
      categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        marginHorizontal: 5,
      },
      categoryButtonSelected: {
        backgroundColor: '#007BFF',
      },
      categoryButtonText: {
        fontSize: 14,
        color: '#000',
      },
      categoryButtonTextSelected: {
        color: '#fff',
      },
      list: {
        paddingBottom: 20,
      },
      card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 8,
        overflow: 'hidden',
        elevation: 2,
      },
      cardImage: {
        width: 80,
        height: 80,
      },
      cardContent: {
        flex: 1,
        padding: 10,
      },
      cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      cardDescription: {
        fontSize: 14,
        color: '#666',
      },
})