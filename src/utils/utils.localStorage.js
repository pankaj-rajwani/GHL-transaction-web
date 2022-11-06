export const set = (key, data) => {
  localStorage.setItem(key, data);
};

export const get = (key) => {
  return localStorage.getItem(key);
};

export const remove = (key) => {
  return localStorage.removeItem(key);
};

export const clear = () => {
  return localStorage.clear();
};
