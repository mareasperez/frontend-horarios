export function getItemLocalCache(item: string) {
  //  console.log( localStorage.getItem(item))
  return JSON.parse(localStorage.getItem(item));
}
export function setItemLocalCache(item: string, value: string | number) {
  value = String(value);
  localStorage.setItem(item, value);
}
export const Horas = [
  { hora: '7-9', value: '7' },
  { hora: '9-11', value: '9' },
  { hora: '11-1', value: '11' },
  { hora: '1-3', value: '13' },
  { hora: '3-5', value: '15' },
  { hora: '5-7', value: '17' },
];
