import AsyncStorage from "@react-native-async-storage/async-storage";
//TODO: Make saveUser, saveAge, saveCondition and pass the value only!!!! ADD KEYS HERE!

async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (exc) {
    console.error(exc);
    alert(`Failed to write ${value} to storage`);
  }
}

async function readData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    //console.log("Next val is async val");
    //console.log(typeof value);
    return value;
  } catch (exc) {
    console.error(exc);
    alert(`Failed to fetch value with key ${key} from the stage`);
  }
}

async function clearStorage() {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (exc) {
    console.error(exc);
    alert(`Failed to clear the storage`);
  }
}

export const AsyncStorageController = {
  saveData,
  readData,
  clearStorage,
};
