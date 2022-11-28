import {StyleSheet} from 'react-native';
import {COLORS_STUDYBOX} from '../../../elements/colors';

export const style = StyleSheet.create({
  notationContainer: {
    width: '90%',
    backgroundColor: COLORS_STUDYBOX.STUDYBOX_BLACK,
    borderRadius: 10,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  textContainer: {
    width: '75%',
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
});
