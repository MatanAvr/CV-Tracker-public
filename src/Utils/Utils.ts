export const saveInLocalStorage = (key: string, data: any) => {
  const dataJson = JSON.stringify(data);
  localStorage.setItem(key, dataJson);
};

export const loadFromLocalStorage = (key: string) => {
  const dataFromLocalStorage = localStorage.getItem(key);
  if (dataFromLocalStorage) {
    const dataParsed = JSON.parse(dataFromLocalStorage);
    return dataParsed;
  }
  console.error("There is no such key", key, "in local storage");
  return null;
};

export const deleteFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export function deepEqual(obj1: any, obj2: any): boolean {
  // Check if both arguments are objects
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  // Check if both objects have the same number of properties
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all properties in obj1 exist in obj2 and are deeply equal
  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
