import { StyleSheet } from "react-native";
import colors from "../../../style/colors";

export default StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          backgroundColor: '#f5f5f5'
        },
        title: {
          fontSize: 24,
          color:colors.darkGray,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center'
        },
        inputContainer: {
          marginBottom: 20
        },
        input: {
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          backgroundColor: 'white'
        },
        timeButton: {
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#ddd',
          marginBottom: 10
        },
        timeButtonText: {
          textAlign: 'center'
        },
        addButton: {
          backgroundColor: '#007bff',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center'
        },
        addButtonText: {
          color: 'white',
          fontWeight: 'bold'
        },
        reminderItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 5,
          marginBottom: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        },
        reminderContent: {
          flex: 1
        },
        reminderText: {
          fontSize: 16,
          fontWeight: 'bold',
          color:colors.darkGray
        },
        reminderTime: {
          color: '#666'
        },
        reminderActions: {
          flexDirection: 'row'
        },
        editButton: {
          backgroundColor: '#ffc107',
          padding: 8,
          borderRadius: 5,
          marginRight: 5
        },
        deleteButton: {
          backgroundColor: '#dc3545',
          padding: 8,
          borderRadius: 5
        },
        buttonText: {
          color: 'white',
          fontSize: 12
        }
})