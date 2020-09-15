export function isNil(obj) {
  return obj === undefined || obj === null;
}

export function isEmptyArray(arr) {
  return isNil(arr) || arr.length === 0;
}
