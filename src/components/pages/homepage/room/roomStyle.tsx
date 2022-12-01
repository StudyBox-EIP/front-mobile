import {StyleSheet} from 'react-native';
import {COLORS_STUDYBOX} from '../../../elements/colors';

export const style = StyleSheet.create({
  notationContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLORS_STUDYBOX.BG_GREY,
    marginTop: 5,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  textContainer: {
    width: '75%',
    alignSelf: 'center',
    marginTop: 5,
  },
  text: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'black',
    fontFamily: 'RopaSans-Regular',
  },
});
