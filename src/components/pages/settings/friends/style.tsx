import {StyleSheet} from 'react-native';
import {COLORS_STUDYBOX} from '../../../elements/colors';

export const friendViewStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendView: {
    flexDirection: 'row',
    // backgroundColor: 'white',
    width: '80%',
    height: 50,
    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    elevation: 3,
  },
  viewShareMail: {
    width: '80%',
    height: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: 10,
    marginVertical: 10,
    minHeight: 50,
  },
  actionButtons: {
    flexDirection: 'row',
  },
});

export const addButton = StyleSheet.create({
  view: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: '5%',
    marginBottom: '5%',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  touchableOpacity: {
    shadowOpacity: 0,
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});

export const card = StyleSheet.create({
  text: {
    marginHorizontal: '5%',
  },
  rightTouchableOpacity: {
    width: 40,
    height: 40,
    marginRight: '2%',
  },
  leftTouchableOpacity: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export const imageButton = StyleSheet.create({
  round: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 100,
  },
  square: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export const modal = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 100,
    backgroundColor: 'white',
    borderColor: COLORS_STUDYBOX.GREEN,
    borderWidth: 1,
    width: '75%',
    borderRadius: 10,
    top: '50%',
  },
  viewContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  text: {
    marginTop: 10,
  },
  touchableopacity: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
});
