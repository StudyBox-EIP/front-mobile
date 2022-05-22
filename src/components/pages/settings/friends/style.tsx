import {StyleSheet} from 'react-native';

export const friendViewStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendView: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: '80%',
    height: 50,
    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  viewShareMail: {
    width: '80%',
    height: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    borderRadius: 10,
    marginVertical: 10,
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
  touchableopacity: {
    width: 40,
    height: 40,
    marginHorizontal: '5%',
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
    top: '50%',
    height: 100,
    backgroundColor: 'grey',
    width: '75%',
    borderRadius: 10,
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
