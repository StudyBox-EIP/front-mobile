export function getPictureObject(picture: object) {
  return picture === undefined
    ? require('../assets/img/NoPicture.png')
    : {uri: picture};
}
