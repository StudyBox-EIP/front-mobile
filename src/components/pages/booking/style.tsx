import {StyleSheet} from 'react-native';
import {COLORS_STUDYBOX} from '../../elements/colors';

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
    borderTopColor: COLORS_STUDYBOX.GREEN,
    borderTopWidth: 3,
    width: '100%',
    paddingBottom: 80,
    flex: 10,
  },
  button: {
    flex: 0.8,
  },
});

export const bookingStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  BookingButton: {
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  ButtonList: {
    margin: 10,
  },
  cardInput: {
    borderWidth: 1,
    borderColor: 'grey',
    minWidth: 100,
    borderRadius: 10,
  },
  bookingSelector: {
    alignItems: 'center',
  },
  cardInfoContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  cardInfoDate: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
