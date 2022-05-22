import {StyleSheet} from 'react-native';

export const members = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: '10%',
  },
});

export const member = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const team = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: '80%',
    height: 75,
    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  text: {
    marginHorizontal: '5%',
  },
  touchableOpacity: {
    width: 50,
    height: 50,
    marginHorizontal: '5%',
  },
});

export const modal = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'grey',
    width: '85%',
    height: '20%',
    minHeight: 100,
    position: 'absolute',
    opacity: 0.85,
  },
  touchableOpacity: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  text: {
    alignSelf: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 100,
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