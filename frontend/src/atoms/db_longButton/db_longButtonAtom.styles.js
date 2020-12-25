import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Button: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRadius: 10,
    elevation: 8,
    margin: 20,
  },
  InnerText: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'flex-start',
    padding: 35,
    color: 'white',
  },
  Image: {
    alignSelf: 'flex-end',
    height: 'auto',
  },
});
