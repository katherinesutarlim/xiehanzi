import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = (key, value) => {
  try {
      return AsyncStorage.setItem(key, value);
  } catch (e) {
      console.log(e);
      return Promise.resolve(null);
  }
}

export const getData = (key) => {
  try {
    return AsyncStorage.getItem(key);
  } catch(e) {
    return Promise.resolve(null);
  }
}
