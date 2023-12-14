import axios from 'axios';
import { firedb } from './../firebase';

export const getExpoToken = (userId) => {
  let token = '';
  firedb.ref(`userGeneralInfo/${userId}`).on('value', (data) => {
    if (data.val() !== null) {
      let val = data.val();
      token = val.pushNotificationToken;
    }
  });
  return token;
};

export const sendPushNotification = async (message) => {
  const messages = {
    to: message.to,
    sound: message.sound,
    title: message.title,
    body: message.body,
  };
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  })
    .then(() => console.log('object'))
    .catch((err) => console.log(`err`, err));
};

export const sendEmail = async (email, countryname, requestID) => {
  console.log('email,countryname', email, countryname);

  await axios
    .post(
      `https://us-central1-touronapp-248e4.cloudfunctions.net/sendMail?dest=${email}&countryName=${countryname}&requestId=${requestID}`
    )
    .then((d) => console.log('d', d))
    .catch((err) => console.log('err', err))
    .catch((err) => console.log('err', err));
};

export const sendProcessEmail = async (email) => {
  await axios
    .post(
      `https://us-central1-touronapp-248e4.cloudfunctions.net/sendProcessMail?dest=${email}`
    )
    .then((d) => console.log('d', d))
    .catch((err) => console.log('err', err))
    .catch((err) => console.log('err', err));
};
