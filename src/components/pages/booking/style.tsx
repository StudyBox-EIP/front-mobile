import {StyleSheet} from 'react-native';

export const RoomScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  cardContentContainer: {
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 20,
  },
  txt: {
    textAlign: 'left',
    fontSize: 12,
    marginBottom: 12,
  },
  imageCover: {
    width: '100%',
    height: '30%',
    resizeMode: 'contain',
    backgroundColor: 'grey',
    flex: 1.5,
  },
  cardContainer: {
    borderTopColor: '#4bc63b',
    borderTopWidth: 3,
    width: '100%',
    paddingBottom: 80,
    flex: 10,
  },
  button: {
    flex: 0.8,
  },
});
