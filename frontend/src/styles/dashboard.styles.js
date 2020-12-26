import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  cardVet: {
    backgroundColor: 'rgb(255, 200, 36)',
  },
  cardClinic: {
    backgroundColor: 'rgb(150, 34, 36)',
  },
  cardPension: {
    backgroundColor: 'rgb(123, 344, 76)',
  },
  card: {
    flexGrow: 1,
    width: 150,
    height: 100,
    margin: 10,
  },
});
