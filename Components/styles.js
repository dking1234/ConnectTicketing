// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-start',
  },
  HomeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20
  },
  inputDateRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 35
  },
  passengerText:{
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  counterView:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  SearchResultContainer:{
    backgroundColor: '#FF7927',
    width: '100%',
    height: 120,
  },
});

export default styles;
