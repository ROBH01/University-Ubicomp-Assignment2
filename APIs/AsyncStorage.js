import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This method sets the value passed in as argument
 * for the key associated with it
 * @param {} key
 * @param {} value
 */
async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (exc) {
    console.error(exc);
    alert(`Failed to write ${value} to storage`);
  }
}

/**
 * This method reads the value based on the key provided
 * @param {} key
 */
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

/**
 * This method clears the AsyncStorage completely
 */
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
