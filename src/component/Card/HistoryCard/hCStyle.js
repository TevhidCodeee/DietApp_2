import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../style/colors";


const device = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardContent: {
    gap: 10,
  },
  mealText: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    color: '#666',
    fontSize: 12,
  },
  usernameText: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
    })