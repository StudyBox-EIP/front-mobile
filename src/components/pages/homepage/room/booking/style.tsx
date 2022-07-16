import {StyleSheet} from 'react-native';
import {COLORS_STUDYBOX} from '../../../../elements/colors';

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
    backgroundColor: COLORS_STUDYBOX.GREY,
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
  back: {
    flex: 1,
  },
  base: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginVertical: 8,
  },
  BookingButton: {
    flex: 0.5,
    margin: 10,
  },
  ButtonList: {
    margin: 2,
    width: '100%',
    flexDirection: 'column',
  },
  cardInputLarge: {
    borderWidth: 1,
    borderColor: COLORS_STUDYBOX.GREY,
    minWidth: 100,
    borderRadius: 10,
  },
  zoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 4,
  },
  cardInputSmall: {
    borderWidth: 1,
    borderColor: COLORS_STUDYBOX.GREY,
    minWidth: 100,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 2,
  },
  bookingSelector: {
    alignItems: 'center',
    flex: 10,
    width: '90%',
  },
  cardInfoContainer: {
    alignSelf: 'center',
    flex: 4,
    width: '90%',
    margin: 4,
  },
  cardInfoDate: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonTime: {
    marginVertical: 2,
    marginHorizontal: 16,
    borderRadius: 10,
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
  },
});
