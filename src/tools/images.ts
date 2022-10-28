import {API} from '../../config';

export function getPictureObject(picture: String) {
  if (picture === null || picture === undefined) {
    return null;
  }
  return '' + API.WEB_ROOT + '/file/show/' + picture;
}
