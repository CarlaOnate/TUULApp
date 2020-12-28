import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Button: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRadius: 10,
    elevation: 8,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  InnerText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-start',
    padding: 35,
    color: 'white',
  },
  Image: {
    alignSelf: 'flex-end',
    height: 'auto',
  },
});
