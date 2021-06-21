import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 * @param {string} value
 * check if string is valid hostname or IP address
 */
const validateHostname = value => {
  if (value.length === 0 || value.length > 511) {
    return false;
  }

  // const regExpIp = new RegExp(
  //   '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
  // );
  // const regResultIp = regExpIp.exec(value);
  const regExpHostname = new RegExp(
    /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/,
  ); // RFC 1123
  const regResultHostname = regExpHostname.exec(value);
  if (regResultHostname === null) {
    console.log('host not ok');
    return false;
  } else {
    console.log('host ok');
    return true;
  }
};

const storeData = async (key, data) => {
  try {
    const store = JSON.stringify(data);
    await AsyncStorage.setItem(`@fitcaza:${key}`, store);
  } catch (error) {
    console.log(`Error saving data: ${error}`);
  }
};
const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(`@fitcaza:${key}`);
    if (value !== null) {
      // We have data!!
      return JSON.parse(value);
    }
  } catch (error) {
    console.log(`Error retrieving data: ${error}`);
  }
};
const removeData = async key => {
  try {
    const value = await AsyncStorage.removeItem(`@fitcaza:${key}`);
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    console.log(`Error retrieving data: ${error}`);
  }
};
const validateEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const serializeJSON = data => {
  return Object.keys(data)
    .map(keyName => {
      return (
        encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
      );
    })
    .join('&');
};
const generateObjFromHeaders = str => {
  const headersObj = str.split(',').map(head => {
    let items;
    items = head.split(';').map(h => h.trim().replace('=', ':'));
    return items;
  });

  const joined = headersObj.join().split(',');

  let obj = {};
  joined.forEach(function (item) {
    const tup = item.split(':');
    obj[tup[0]] = tup[1];
  });
  return obj;
};
const generateRandomString = num => {
  const length = num;
  const chars = '0123456789abcd';
  let result = '';
  let i;
  for (i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};
// format seconds
// /////////////////////////////////////////////////////////////////////////////
const formatTime = sec => {
  const padTime = (num, size) => `000${num}`.slice(size * -1);
  const time = parseFloat(sec).toFixed(3);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);

  return `${padTime(minutes, 1)}:${padTime(seconds, 2)}`;
};

const validateFields = fields => {
  const isFilled = !Object.values(fields).some(
    o => o === null || o === '' || o === undefined,
  );

  return isFilled;
};

const getApi = async (url, tkn) => {
  let getData;
  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${tkn}`,
      },
    })
      .then(response =>
        response.json().then(res => ({status: response.status, body: res})),
      )
      .then(myJson => {
        if (myJson.status === 200) {
          getData = myJson.body?.data;
        }
      });
  } catch (error) {
    console.log('getApi', error);
  }
  return getData;
};

export default {
  validateHostname,
  storeData,
  retrieveData,
  removeData,
  serializeJSON,
  validateEmail,
  generateObjFromHeaders,
  generateRandomString,
  formatTime,
  validateFields,
  getApi,
};
