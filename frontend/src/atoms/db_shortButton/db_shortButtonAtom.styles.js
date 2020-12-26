import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Button: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRadius: 10,
    elevation: 8,
    height: 150,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  InnerText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-start',
    padding: 20,
    color: 'white',
  },
  Image: {
    height: 'auto',
  },
});
