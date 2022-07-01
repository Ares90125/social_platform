import { Storage } from 'aws-amplify';
import moment from 'moment';

export const fetchFromS3 = (key) => {
  return Storage.get(key, {level: 'public', download: true})
  .then(data => {
    return data;
  })
  .catch(err => console.log(err));
}

export const uploadToS3 = (file, type, randomUid, includeExtension = false) => {
  let path;
  let extension = '';
  if (type === 'image') {
    if (file.name) {
      const exten = file.name.split('.');
      extension = exten.length > 1 ? '.' + exten[1] : '.png';
    } else if (includeExtension) {
      extension = '.png';
    }
    path = `pics/${randomUid}_${moment().valueOf()}${extension}`;
  } else if (type === 'excel') {
    path = `insightsExcels/${randomUid}_${moment().valueOf()}.xlsx`;
  } else if (type === 'video') {
    if (file.name) {
      const exten = file.name.split('.');
      extension = exten.length > 1 ? '.' + exten[1] : '.mp4';
    } else if (includeExtension) {
      extension = '.mp4';
    }
    path = `video/${randomUid}_${moment().valueOf()}${extension}`;
  } else {
    path = `other/${randomUid}_${moment().valueOf()}`;
  }

  return Storage.put(`${path}`, file, {
    contentType: `${file.type}`
  }).then((data: any) => {
    return Storage.get(data.key)
      .then(result => {
        return result.toString().split('?')[0];
      })
      .catch(() => {
        const error = new Error('Error while fetching stored file data from s3');
        console.log('error on file uploading', error);
      });
  });
}
